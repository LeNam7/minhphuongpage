"use client";

import { useEffect, useState } from "react";
import { BlockInstance, loadPageLayout, DEFAULT_BLOCKS } from "@/lib/page-layout";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import FacilitiesSection from "@/components/sections/FacilitiesSection";
import ProductsSection from "@/components/sections/ProductsSection";
import SupplyChainSection from "@/components/sections/SupplyChainSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ESGSection from "@/components/sections/ESGSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import CustomPostSection from "@/components/sections/CustomPostSection";

const BLOCK_COMPONENTS: Record<string, React.ComponentType<{ blockId?: string }>> = {
  hero: HeroSection,
  stats: StatsSection,
  about: AboutSection,
  facilities: FacilitiesSection,
  products: ProductsSection,
  "supply-chain": SupplyChainSection,
  certifications: CertificationsSection,
  esg: ESGSection,
  faq: FAQSection,
  contact: ContactSection,
};

export default function PageRenderer() {
  const [blocks, setBlocks] = useState<BlockInstance[]>(DEFAULT_BLOCKS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch("/api/layout")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlocks(data);
        } else {
          setBlocks(loadPageLayout());
        }
        setMounted(true);
      })
      .catch((err) => {
        console.error("Failed to fetch layout from DB API:", err);
        setBlocks(loadPageLayout());
        setMounted(true);
      });
  }, []);

  // Before mount, render default to avoid hydration mismatch
  const renderBlocks = mounted ? blocks : DEFAULT_BLOCKS;

  return (
    <main className="w-full flex flex-col min-h-screen">
      {renderBlocks
        .filter((b) => b.visible)
        .map((block) => {
          if (block.blockId.startsWith("custom-post-")) {
            return <CustomPostSection key={block.instanceId} blockId={block.blockId} />;
          }
          const Component = BLOCK_COMPONENTS[block.blockId];
          if (!Component) return null;
          return <Component key={block.instanceId} />;
        })}
    </main>
  );
}
