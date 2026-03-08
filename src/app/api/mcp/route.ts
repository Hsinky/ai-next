import { NextResponse } from "next/server";
import { getMCPServers } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ mcpServers: getMCPServers() });
}
