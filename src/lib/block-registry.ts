export interface BlockDefinition {
  id: string;
  labelKey: string;       // i18n key in PageBuilder namespace
  icon: string;           // Lucide icon name
  descriptionKey: string; // i18n key
  required?: boolean;     // Cannot be removed
  unique?: boolean;       // Only one instance allowed
  category: "layout" | "content" | "marketing";
}

export const BLOCK_REGISTRY: BlockDefinition[] = [
  {
    id: "hero",
    labelKey: "blockHero",
    icon: "Image",
    descriptionKey: "blockHeroDesc",
    required: true,
    unique: true,
    category: "layout",
  },
  {
    id: "stats",
    labelKey: "blockStats",
    icon: "BarChart3",
    descriptionKey: "blockStatsDesc",
    unique: true,
    category: "content",
  },
  {
    id: "about",
    labelKey: "blockAbout",
    icon: "Info",
    descriptionKey: "blockAboutDesc",
    unique: true,
    category: "content",
  },
  {
    id: "facilities",
    labelKey: "blockFacilities",
    icon: "Factory",
    descriptionKey: "blockFacilitiesDesc",
    unique: true,
    category: "content",
  },
  {
    id: "products",
    labelKey: "blockProducts",
    icon: "Package",
    descriptionKey: "blockProductsDesc",
    unique: true,
    category: "content",
  },
  {
    id: "supply-chain",
    labelKey: "blockSupplyChain",
    icon: "Link",
    descriptionKey: "blockSupplyChainDesc",
    unique: true,
    category: "content",
  },
  {
    id: "certifications",
    labelKey: "blockCerts",
    icon: "Award",
    descriptionKey: "blockCertsDesc",
    unique: true,
    category: "marketing",
  },
  {
    id: "esg",
    labelKey: "blockESG",
    icon: "Leaf",
    descriptionKey: "blockESGDesc",
    unique: true,
    category: "content",
  },
  {
    id: "faq",
    labelKey: "blockFAQ",
    icon: "HelpCircle",
    descriptionKey: "blockFAQDesc",
    unique: true,
    category: "content",
  },
  {
    id: "contact",
    labelKey: "blockContact",
    icon: "Phone",
    descriptionKey: "blockContactDesc",
    required: true,
    unique: true,
    category: "layout",
  },
];

export function getBlockDef(blockId: string): BlockDefinition | undefined {
  if (blockId.startsWith("custom-post-")) {
    if (typeof window !== "undefined") {
      const customBlocksStr = localStorage.getItem("mp_custom_blocks");
      if (customBlocksStr) {
        try {
          const customBlocks = JSON.parse(customBlocksStr) as any[];
          const block = customBlocks.find((b) => b.id === blockId);
          if (block) {
            return {
              id: block.id,
              labelKey: block.title, // store title directly in labelKey to bypass i18n
              icon: "FileText",
              descriptionKey: block.summary || "Khối bài viết tùy chỉnh",
              category: "content",
              unique: true,
            };
          }
        } catch (e) {
          // ignore
        }
      }
    }
    return {
      id: blockId,
      labelKey: "Khối bài viết mới",
      icon: "FileText",
      descriptionKey: "Khối bài viết tùy chỉnh",
      category: "content",
      unique: true,
    };
  }
  return BLOCK_REGISTRY.find((b) => b.id === blockId);
}
