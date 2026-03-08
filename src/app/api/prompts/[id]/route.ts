import { NextResponse } from "next/server";
import { getPrompt } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const promptId = parseInt(id);

  if (isNaN(promptId)) {
    return NextResponse.json({ error: "Invalid prompt ID" }, { status: 400 });
  }

  const prompt = getPrompt(promptId);
  
  if (!prompt) {
    return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
  }

  return NextResponse.json({ prompt });
}
