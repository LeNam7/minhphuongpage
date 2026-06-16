import { NextResponse } from "next/server";
import { getCustomBlocks, addCustomBlock, deleteCustomBlock } from "@/lib/db";

export async function GET() {
  try {
    const blocks = await getCustomBlocks();
    // Map DB column names back to frontend expected format
    const mapped = blocks.map((b: any) => ({
      id: b.id,
      title: b.title,
      category: b.category,
      summary: b.summary,
      content: b.content,
      images: b.images,
      createdAt: b.created_at,
    }));
    return NextResponse.json(mapped);
  } catch (e) {
    console.error("GET /api/custom-blocks error:", e);
    return NextResponse.json({ error: "Failed to fetch custom blocks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || !body.id) {
      return NextResponse.json({ error: "Invalid block data" }, { status: 400 });
    }
    const success = await addCustomBlock(body);
    if (!success) {
      return NextResponse.json({ error: "Failed to save block" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("POST /api/custom-blocks error:", e);
    return NextResponse.json({ error: "Failed to save block" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing block id" }, { status: 400 });
    }
    const success = await deleteCustomBlock(id);
    if (!success) {
      return NextResponse.json({ error: "Failed to delete block" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("DELETE /api/custom-blocks error:", e);
    return NextResponse.json({ error: "Failed to delete block" }, { status: 500 });
  }
}
