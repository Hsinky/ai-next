import { NextResponse } from "next/server";
import { getKnowledgeBases } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ knowledgeBases: getKnowledgeBases() });
}
