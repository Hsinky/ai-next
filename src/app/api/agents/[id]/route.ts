import { NextResponse } from "next/server";
import { Agent } from "@/types";

const agentDetails: Record<number, Agent> = {
  1: {
    id: 1,
    name: "代码审查助手",
    description: "自动审查代码质量，提供改进建议和最佳实践。支持多种编程语言，可检测安全漏洞、性能问题和代码风格问题。",
    icon: "🤖",
    category: "开发",
    model: "GPT-4",
    status: "运行中",
    tasks: 1250,
    successRate: "98.5%",
    avgTime: "2.3s",
    tags: ["推荐", "热门"],
    lastRun: "5分钟前",
    author: "DevTools AI",
    homepage: "https://github.com/devtools-ai/code-reviewer",
    documentation: "https://docs.devtools.ai/code-reviewer",
    repository: "https://github.com/devtools-ai/code-reviewer",
    capabilities: [
      "代码质量检测 - 检测代码异味和反模式",
      "安全漏洞扫描 - 识别常见安全问题",
      "性能优化建议 - 分析性能瓶颈",
      "代码风格检查 - 确保符合团队规范",
      "最佳实践推荐 - 提供改进建议"
    ],
    configExample: `# 代码审查配置
codeReviewer:
  model: gpt-4
  languages:
    - typescript
    - python
    - go
  rules:
    maxComplexity: 10
    maxLineLength: 100
    requireDocstrings: true
  checks:
    - security
    - performance
    - style
    - best-practices`,
    usageExample: `from devtools_ai import CodeReviewer

reviewer = CodeReviewer(api_key="your-api-key")

# 审查代码
result = reviewer.review(
    code="""
    def calculate_total(items):
        total = 0
        for item in items:
            total += item.price * item.quantity
        return total
    """,
    language="python"
)

# 输出审查结果
for issue in result.issues:
    print(f"[{issue.severity}] {issue.message}")
    print(f"  位置: 第{issue.line}行")
    if issue.suggestion:
        print(f"  建议: {issue.suggestion}")`
  },
  2: {
    id: 2,
    name: "数据分析专家",
    description: "智能分析数据，生成可视化报表和洞察。支持多种数据格式，自动识别数据模式并生成专业的分析报告。",
    icon: "📊",
    category: "分析",
    model: "Claude-3",
    status: "运行中",
    tasks: 890,
    successRate: "97.2%",
    avgTime: "5.1s",
    tags: ["推荐"],
    lastRun: "15分钟前",
    author: "DataInsight Labs",
    homepage: "https://datainsight.ai",
    documentation: "https://docs.datainsight.ai",
    repository: "https://github.com/datainsight/analyst",
    capabilities: [
      "自动数据清洗 - 处理缺失值和异常值",
      "统计分析 - 描述性统计和推断统计",
      "可视化生成 - 自动创建图表和仪表板",
      "趋势预测 - 时间序列分析和预测",
      "报告生成 - 生成专业的分析报告"
    ],
    configExample: `# 数据分析配置
dataAnalyst:
  model: claude-3-sonnet
  outputFormats:
    - pdf
    - html
    - excel
  visualization:
    engine: plotly
    theme: corporate
    interactive: true
  analysis:
    autoDetectTypes: true
    includeOutliers: true
    confidenceLevel: 0.95`,
    usageExample: `from datainsight import DataAnalyst

analyst = DataAnalyst()

# 分析数据
report = analyst.analyze(
    data="sales_data.csv",
    analysis_type="comprehensive",
    include_visualizations=True
)

# 导出报告
report.export("sales_report.pdf")

# 获取洞察
for insight in report.insights:
    print(f"发现: {insight.finding}")
    print(f"重要性: {insight.importance}")`
  },
  3: {
    id: 3,
    name: "客服机器人",
    description: "7x24小时智能客服，自动回答常见问题。支持多轮对话，可连接知识库提供准确回答。",
    icon: "💬",
    category: "客服",
    model: "GPT-3.5",
    status: "运行中",
    tasks: 5680,
    successRate: "95.8%",
    avgTime: "1.2s",
    tags: ["热门"],
    lastRun: "1分钟前",
    author: "ServiceBot Inc.",
    homepage: "https://servicebot.ai",
    documentation: "https://docs.servicebot.ai",
    repository: "https://github.com/servicebot/customer-agent",
    capabilities: [
      "智能问答 - 基于知识库的准确回答",
      "意图识别 - 理解用户真实需求",
      "多轮对话 - 支持上下文连续对话",
      "工单创建 - 自动创建和分配工单",
      "情感分析 - 识别用户情绪状态"
    ],
    configExample: `# 客服机器人配置
customerAgent:
  model: gpt-3.5-turbo
  knowledgeBase:
    - faq.json
    - products.md
    - policies.pdf
  personality:
    tone: friendly
    language: zh-CN
    formalLevel: moderate
  escalation:
    enabled: true
    triggers:
      - sentiment: negative
      - keywords: ["投诉", "退款", "经理"]
    transferTo: human-support`,
    usageExample: `from servicebot import CustomerAgent

agent = CustomerAgent(
    knowledge_base="./knowledge/",
    escalation_webhook="https://api.example.com/escalate"
)

# 处理消息
response = agent.chat(
    user_id="user123",
    message="我的订单什么时候发货？"
)

print(response.text)
# "您好！您的订单已发货，预计明天送达..."

# 检查是否需要转人工
if response.needs_escalation:
    transfer_to_human(response)`
  }
};

const defaultAgentDetail = (id: number, baseData: Partial<Agent>): Agent => ({
  id,
  name: baseData.name || `Agent ${id}`,
  description: baseData.description || "智能代理，可自主执行复杂任务。",
  icon: baseData.icon || "🤖",
  category: baseData.category || "通用",
  model: baseData.model || "GPT-4",
  status: baseData.status || "可用",
  tasks: baseData.tasks || 0,
  successRate: baseData.successRate || "95%",
  avgTime: baseData.avgTime || "-",
  tags: baseData.tags || [],
  lastRun: baseData.lastRun || "-",
  author: "社区贡献者",
  homepage: "https://github.com",
  documentation: "https://docs.example.com",
  capabilities: ["任务执行", "决策支持"],
});

const baseAgents = [
  { id: 1, name: "代码审查助手", description: "自动审查代码质量", icon: "🤖", category: "开发", model: "GPT-4", status: "运行中", tasks: 1250, successRate: "98.5%", avgTime: "2.3s", tags: ["推荐", "热门"], lastRun: "5分钟前" },
  { id: 2, name: "数据分析专家", description: "智能分析数据", icon: "📊", category: "分析", model: "Claude-3", status: "运行中", tasks: 890, successRate: "97.2%", avgTime: "5.1s", tags: ["推荐"], lastRun: "15分钟前" },
  { id: 3, name: "客服机器人", description: "7x24小时智能客服", icon: "💬", category: "客服", model: "GPT-3.5", status: "运行中", tasks: 5680, successRate: "95.8%", avgTime: "1.2s", tags: ["热门"], lastRun: "1分钟前" },
  { id: 4, name: "文档生成器", description: "自动生成技术文档", icon: "📄", category: "文档", model: "Claude-3", status: "已暂停", tasks: 320, successRate: "94.1%", avgTime: "8.5s", tags: [], lastRun: "2小时前" },
  { id: 5, name: "测试用例生成", description: "自动生成测试用例", icon: "🧪", category: "测试", model: "GPT-4", status: "运行中", tasks: 560, successRate: "96.3%", avgTime: "3.2s", tags: ["新上线"], lastRun: "30分钟前" },
  { id: 6, name: "翻译助手", description: "多语言智能翻译", icon: "🌐", category: "翻译", model: "GPT-4", status: "运行中", tasks: 2100, successRate: "99.1%", avgTime: "0.8s", tags: ["推荐"], lastRun: "3分钟前" },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const agentId = parseInt(id);

  if (isNaN(agentId)) {
    return NextResponse.json({ error: "Invalid agent ID" }, { status: 400 });
  }

  if (agentDetails[agentId]) {
    return NextResponse.json({ agent: agentDetails[agentId] });
  }

  const baseData = baseAgents.find(a => a.id === agentId);
  if (baseData) {
    return NextResponse.json({ agent: defaultAgentDetail(agentId, baseData) });
  }

  return NextResponse.json({ error: "Agent not found" }, { status: 404 });
}
