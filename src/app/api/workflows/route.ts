import { NextResponse } from "next/server";
import { getWorkflows } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ workflows: getWorkflows() });
}
