import { NextResponse } from "next/server";
import { getAgents } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ agents: getAgents() });
}
