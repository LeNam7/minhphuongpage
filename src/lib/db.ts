import { supabase } from "./supabase";

export interface BlockInstance {
  instanceId: string;
  blockId: string;
  visible: boolean;
}

const DEFAULT_LAYOUT: BlockInstance[] = [
  { instanceId: "hero-1", blockId: "hero", visible: true },
  { instanceId: "stats-1", blockId: "stats", visible: true },
  { instanceId: "about-1", blockId: "about", visible: true },
  { instanceId: "facilities-1", blockId: "facilities", visible: true },
  { instanceId: "products-1", blockId: "products", visible: true },
  { instanceId: "supply-chain-1", blockId: "supply-chain", visible: true },
  { instanceId: "certifications-1", blockId: "certifications", visible: true },
  { instanceId: "esg-1", blockId: "esg", visible: true },
  { instanceId: "faq-1", blockId: "faq", visible: true },
  { instanceId: "contact-1", blockId: "contact", visible: true },
];

export async function getLayout(): Promise<BlockInstance[]> {
  const { data, error } = await supabase
    .from("page_layouts")
    .select("blocks")
    .eq("page_id", "home")
    .single();

  if (error || !data) {
    console.error("Supabase getLayout error:", error);
    return DEFAULT_LAYOUT;
  }

  return data.blocks as BlockInstance[];
}

export async function saveLayout(layout: BlockInstance[]): Promise<boolean> {
  const { error } = await supabase
    .from("page_layouts")
    .upsert(
      {
        page_id: "home",
        blocks: layout,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "page_id" }
    );

  if (error) {
    console.error("Supabase saveLayout error:", error);
    return false;
  }
  return true;
}

export async function getCustomBlocks(): Promise<any[]> {
  const { data, error } = await supabase
    .from("custom_blocks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getCustomBlocks error:", error);
    return [];
  }
  return data || [];
}

export async function addCustomBlock(block: any): Promise<boolean> {
  const { error } = await supabase.from("custom_blocks").upsert(
    {
      id: block.id,
      title: block.title,
      category: block.category,
      summary: block.summary || "",
      content: block.content,
      images: block.images,
      created_at: block.createdAt,
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("Supabase addCustomBlock error:", error);
    return false;
  }
  return true;
}

export async function deleteCustomBlock(blockId: string): Promise<boolean> {
  const { error } = await supabase
    .from("custom_blocks")
    .delete()
    .eq("id", blockId);

  if (error) {
    console.error("Supabase deleteCustomBlock error:", error);
    return false;
  }
  return true;
}
