import { NextResponse } from "next/server";
import { getKnowledgeBase } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const knowledgeId = parseInt(id);

  if (isNaN(knowledgeId)) {
    return NextResponse.json({ error: "Invalid knowledge base ID" }, { status: 400 });
  }

  const knowledgeBase = getKnowledgeBase(knowledgeId);
  
  if (!knowledgeBase) {
    return NextResponse.json({ error: "Knowledge base not found" }, { status: 404 });
  }

  return NextResponse.json({ knowledgeBase });
}
