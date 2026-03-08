import { NextResponse } from "next/server";
import { getWorkflow } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const workflowId = parseInt(id);

  if (isNaN(workflowId)) {
    return NextResponse.json({ error: "Invalid workflow ID" }, { status: 400 });
  }

  const workflow = getWorkflow(workflowId);
  
  if (!workflow) {
    return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
  }

  return NextResponse.json({ workflow });
}
