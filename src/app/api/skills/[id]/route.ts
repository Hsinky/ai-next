import { NextResponse } from "next/server";
import { getSkill } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const skillId = parseInt(id);

  if (isNaN(skillId)) {
    return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
  }

  const skill = getSkill(skillId);
  
  if (!skill) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  return NextResponse.json({ skill });
}
