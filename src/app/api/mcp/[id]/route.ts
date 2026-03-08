import { NextResponse } from "next/server";
import { getMCPServer } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mcpId = parseInt(id);

  if (isNaN(mcpId)) {
    return NextResponse.json({ error: "Invalid MCP server ID" }, { status: 400 });
  }

  const mcpServer = getMCPServer(mcpId);
  
  if (!mcpServer) {
    return NextResponse.json({ error: "MCP server not found" }, { status: 404 });
  }

  return NextResponse.json({ mcpServer });
}
