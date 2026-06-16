"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { BlockInstance, loadPageLayout, savePageLayout, generateInstanceId } from "@/lib/page-layout";
import { getBlockDef } from "@/lib/block-registry";

const MAX_HISTORY = 30;

export function usePageBuilder() {
  const [past, setPast] = useState<BlockInstance[][]>([]);
  const [present, setPresent] = useState<BlockInstance[]>([]);
  const [future, setFuture] = useState<BlockInstance[][]>([]);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const initialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (!initialized.current) {
      const layout = loadPageLayout();
      setPresent(layout);
      initialized.current = true;
    }
  }, []);

  // Push new state (records undo history)
  const pushState = useCallback(
    (newBlocks: BlockInstance[]) => {
      setPast((prev) => {
        const newPast = [...prev, present];
        return newPast.length > MAX_HISTORY ? newPast.slice(-MAX_HISTORY) : newPast;
      });
      setPresent(newBlocks);
      setFuture([]);
      setIsDirty(true);
    },
    [present]
  );

  // Undo
  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    setPast((prev) => prev.slice(0, -1));
    setFuture((prev) => [present, ...prev]);
    setPresent(previous);
    setIsDirty(true);
  }, [past, present]);

  // Redo
  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    setFuture((prev) => prev.slice(1));
    setPast((prev) => [...prev, present]);
    setPresent(next);
    setIsDirty(true);
  }, [future, present]);

  // Save to localStorage
  const save = useCallback(() => {
    savePageLayout(present);
    const now = new Date();
    setSavedAt(now.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }));
    setIsDirty(false);
  }, [present]);

  // Auto-save with debounce
  useEffect(() => {
    if (!isDirty || !initialized.current) return;
    const timer = setTimeout(() => {
      save();
    }, 800);
    return () => clearTimeout(timer);
  }, [isDirty, present, save]);

  // Move block to new position
  const moveBlock = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;
      const newBlocks = [...present];
      const [moved] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, moved);
      pushState(newBlocks);
    },
    [present, pushState]
  );

  // Add block from palette
  const addBlock = useCallback(
    (blockId: string, atIndex?: number) => {
      const def = getBlockDef(blockId);
      if (!def) return;
      // If unique, check if already exists
      if (def.unique && present.some((b) => b.blockId === blockId)) return;

      const newInstance: BlockInstance = {
        instanceId: generateInstanceId(),
        blockId,
        visible: true,
      };

      const newBlocks = [...present];
      const insertAt = atIndex !== undefined ? atIndex : newBlocks.length;
      newBlocks.splice(insertAt, 0, newInstance);
      pushState(newBlocks);
    },
    [present, pushState]
  );

  // Remove block
  const removeBlock = useCallback(
    (instanceId: string) => {
      const block = present.find((b) => b.instanceId === instanceId);
      if (!block) return;
      const def = getBlockDef(block.blockId);
      if (def?.required) return; // Can't remove required blocks
      pushState(present.filter((b) => b.instanceId !== instanceId));
    },
    [present, pushState]
  );

  // Toggle visibility
  const toggleVisibility = useCallback(
    (instanceId: string) => {
      pushState(
        present.map((b) =>
          b.instanceId === instanceId ? { ...b, visible: !b.visible } : b
        )
      );
    },
    [present, pushState]
  );

  // Reset to default
  const resetLayout = useCallback(() => {
    const { DEFAULT_BLOCKS } = require("@/lib/page-layout");
    pushState([...DEFAULT_BLOCKS]);
  }, [pushState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  return {
    blocks: present,
    past,
    future,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
    undoCount: past.length,
    redoCount: future.length,
    savedAt,
    isDirty,
    moveBlock,
    addBlock,
    removeBlock,
    toggleVisibility,
    resetLayout,
    undo,
    redo,
    save,
  };
}
