export interface BlockInstance {
  instanceId: string;
  blockId: string;
  visible: boolean;
}

export interface PageLayout {
  version: number;
  blocks: BlockInstance[];
  updatedAt: string;
}

const STORAGE_KEY = "mp_page_layout";

export const DEFAULT_BLOCKS: BlockInstance[] = [
  { instanceId: "default-hero", blockId: "hero", visible: true },
  { instanceId: "default-stats", blockId: "stats", visible: true },
  { instanceId: "default-about", blockId: "about", visible: true },
  { instanceId: "default-facilities", blockId: "facilities", visible: true },
  { instanceId: "default-products", blockId: "products", visible: true },
  { instanceId: "default-supply-chain", blockId: "supply-chain", visible: true },
  { instanceId: "default-certifications", blockId: "certifications", visible: true },
  { instanceId: "default-esg", blockId: "esg", visible: true },
  { instanceId: "default-faq", blockId: "faq", visible: true },
  { instanceId: "default-contact", blockId: "contact", visible: true },
];

export function loadPageLayout(): BlockInstance[] {
  if (typeof window === "undefined") return DEFAULT_BLOCKS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BLOCKS;
    const parsed: PageLayout = JSON.parse(raw);
    if (!parsed.blocks || parsed.blocks.length === 0) return DEFAULT_BLOCKS;
    return parsed.blocks;
  } catch {
    return DEFAULT_BLOCKS;
  }
}

export function savePageLayout(blocks: BlockInstance[]): void {
  if (typeof window === "undefined") return;
  const layout: PageLayout = {
    version: 1,
    blocks,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
}

export function generateInstanceId(): string {
  return `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
