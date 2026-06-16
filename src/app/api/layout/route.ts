import { NextResponse } from "next/server";
import { getLayout, saveLayout } from "@/lib/db";

export async function GET() {
  try {
    const layout = await getLayout();
    return NextResponse.json(layout);
  } catch (e) {
    console.error("GET /api/layout error:", e);
    return NextResponse.json({ error: "Failed to fetch layout" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid layout format" }, { status: 400 });
    }
    const success = await saveLayout(body);
    if (!success) {
      return NextResponse.json({ error: "Failed to save layout" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("POST /api/layout error:", e);
    return NextResponse.json({ error: "Failed to save layout" }, { status: 500 });
  }
}
