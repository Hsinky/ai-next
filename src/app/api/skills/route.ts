import { NextResponse } from "next/server";
import { getSkills } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ skills: getSkills() });
}
