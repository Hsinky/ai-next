import { NextResponse } from "next/server";
import { getPrompts } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ prompts: getPrompts() });
}
