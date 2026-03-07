import { NextResponse } from "next/server";
import { KnowledgeBase } from "@/types";

const knowledgeDetails: Record<number, KnowledgeBase> = {
  1: {
    id: 1,
    name: "产品知识库",
    description: "产品功能、使用指南、FAQ等知识集合。支持智能问答，帮助用户快速找到答案，提升客户满意度。",
    icon: "📚",
    category: "产品",
    documents: 256,
    chunks: 12500,
    queries: 8900,
    accuracy: "95.5%",
    tags: ["推荐"],
    updatedAt: "1小时前",
    author: "产品团队",
    documentation: "https://docs.example.com/knowledge-base",
    embeddingModel: "text-embedding-3-small",
    chunkSize: 500,
    sources: ["产品文档", "用户手册", "FAQ", "培训视频"],
    accessControl: "公开"
  },
  2: {
    id: 2,
    name: "技术文档库",
    description: "API文档、架构设计、开发规范等技术资料。为开发团队提供统一的技术参考，确保代码质量和一致性。",
    icon: "🔧",
    category: "技术",
    documents: 180,
    chunks: 8900,
    queries: 5600,
    accuracy: "97.2%",
    tags: ["热门"],
    updatedAt: "3小时前",
    author: "技术团队",
    documentation: "https://docs.example.com/tech-docs",
    embeddingModel: "text-embedding-3-large",
    chunkSize: 1000,
    sources: ["API文档", "架构文档", "代码规范", "技术博客"],
    accessControl: "团队内部"
  },
  3: {
    id: 3,
    name: "客服知识库",
    description: "常见问题、解决方案、服务流程等。帮助客服人员快速响应客户问题，提高服务效率。",
    icon: "💬",
    category: "客服",
    documents: 420,
    chunks: 15000,
    queries: 25000,
    accuracy: "94.8%",
    tags: ["推荐", "热门"],
    updatedAt: "30分钟前",
    author: "客服团队",
    documentation: "https://docs.example.com/support-kb",
    embeddingModel: "text-embedding-3-small",
    chunkSize: 300,
    sources: ["FAQ", "工单记录", "服务流程", "话术库"],
    accessControl: "客服团队"
  },
  6: {
    id: 6,
    name: "法律合规库",
    description: "法律法规、合规要求、案例分析等。为企业提供法律参考，确保业务合规运营。",
    icon: "⚖️",
    category: "法务",
    documents: 280,
    chunks: 12000,
    queries: 1500,
    accuracy: "96.3%",
    tags: ["推荐"],
    updatedAt: "5小时前",
    author: "法务团队",
    documentation: "https://docs.example.com/legal-kb",
    embeddingModel: "text-embedding-3-large",
    chunkSize: 800,
    sources: ["法律法规", "合规指南", "案例分析", "合同模板"],
    accessControl: "高管+法务"
  }
};

const defaultKnowledgeDetail = (id: number, baseData: Partial<KnowledgeBase>): KnowledgeBase => ({
  id,
  name: baseData.name || `知识库 ${id}`,
  description: baseData.description || "专业知识库，支持智能检索和问答。",
  icon: baseData.icon || "📚",
  category: baseData.category || "通用",
  documents: baseData.documents || 0,
  chunks: baseData.chunks || 0,
  queries: baseData.queries || 0,
  accuracy: baseData.accuracy || "90%",
  tags: baseData.tags || [],
  updatedAt: baseData.updatedAt || "-",
  author: "知识管理团队",
  embeddingModel: "text-embedding-3-small",
  chunkSize: 500,
  sources: ["文档"],
  accessControl: "团队内部"
});

const baseKnowledgeBases = [
  { id: 1, name: "产品知识库", description: "产品功能、使用指南、FAQ等", icon: "📚", category: "产品", documents: 256, chunks: 12500, queries: 8900, accuracy: "95.5%", tags: ["推荐"], updatedAt: "1小时前" },
  { id: 2, name: "技术文档库", description: "API文档、架构设计、开发规范", icon: "🔧", category: "技术", documents: 180, chunks: 8900, queries: 5600, accuracy: "97.2%", tags: ["热门"], updatedAt: "3小时前" },
  { id: 3, name: "客服知识库", description: "常见问题、解决方案、服务流程", icon: "💬", category: "客服", documents: 420, chunks: 15000, queries: 25000, accuracy: "94.8%", tags: ["推荐", "热门"], updatedAt: "30分钟前" },
  { id: 4, name: "行业知识库", description: "行业动态、竞品分析、市场研究", icon: "📊", category: "市场", documents: 95, chunks: 4200, queries: 1200, accuracy: "92.1%", tags: [], updatedAt: "1天前" },
  { id: 5, name: "内部制度库", description: "公司制度、流程规范、培训资料", icon: "📋", category: "行政", documents: 150, chunks: 5600, queries: 2800, accuracy: "98.5%", tags: ["新上线"], updatedAt: "2天前" },
  { id: 6, name: "法律合规库", description: "法律法规、合规要求、案例分析", icon: "⚖️", category: "法务", documents: 280, chunks: 12000, queries: 1500, accuracy: "96.3%", tags: ["推荐"], updatedAt: "5小时前" },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const knowledgeId = parseInt(id);

  if (isNaN(knowledgeId)) {
    return NextResponse.json({ error: "Invalid knowledge base ID" }, { status: 400 });
  }

  if (knowledgeDetails[knowledgeId]) {
    return NextResponse.json({ knowledgeBase: knowledgeDetails[knowledgeId] });
  }

  const baseData = baseKnowledgeBases.find(k => k.id === knowledgeId);
  if (baseData) {
    return NextResponse.json({ knowledgeBase: defaultKnowledgeDetail(knowledgeId, baseData) });
  }

  return NextResponse.json({ error: "Knowledge base not found" }, { status: 404 });
}
