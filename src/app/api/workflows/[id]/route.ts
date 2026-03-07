import { NextResponse } from "next/server";
import { Workflow, WorkflowStep } from "@/types";

const workflowDetails: Record<number, Workflow> = {
  1: {
    id: 1,
    name: "自动化测试流程",
    description: "代码提交后自动运行测试、生成报告。支持单元测试、集成测试、E2E测试，自动生成覆盖率报告和测试报告。",
    icon: "🔄",
    category: "DevOps",
    steps: 5,
    status: "运行中",
    runs: 1250,
    successRate: "97.5%",
    avgDuration: "3m 20s",
    tags: ["推荐"],
    lastRun: "10分钟前",
    author: "DevOps Team",
    homepage: "https://github.com/devops/automated-testing",
    documentation: "https://docs.devops.io/automated-testing",
    repository: "https://github.com/devops/automated-testing",
    stepDetails: [
      { id: "s1", name: "代码检出", description: "从 Git 仓库拉取最新代码", type: "checkout" },
      { id: "s2", name: "依赖安装", description: "安装项目依赖包", type: "install" },
      { id: "s3", name: "单元测试", description: "运行 Jest 单元测试", type: "test" },
      { id: "s4", name: "集成测试", description: "运行集成测试套件", type: "test" },
      { id: "s5", name: "报告生成", description: "生成测试报告和覆盖率报告", type: "report" },
    ],
    configExample: `# .github/workflows/test.yml
name: Automated Testing

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:unit -- --coverage
      
      - name: Run integration tests
        run: npm run test:integration
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info`,
    triggers: ["Push 到主分支", "Pull Request 创建", "手动触发"]
  },
  2: {
    id: 2,
    name: "内容发布流程",
    description: "文章审核、SEO优化、定时发布的自动化流程。支持多平台同步发布，自动生成社交媒体预览。",
    icon: "📢",
    category: "内容",
    steps: 8,
    status: "运行中",
    runs: 890,
    successRate: "99.1%",
    avgDuration: "5m 15s",
    tags: ["热门"],
    lastRun: "1小时前",
    author: "Content Team",
    homepage: "https://github.com/content/publish-workflow",
    documentation: "https://docs.content.io/workflow",
    repository: "https://github.com/content/publish-workflow",
    stepDetails: [
      { id: "s1", name: "内容审核", description: "AI 内容审核，检测敏感词和合规问题", type: "ai" },
      { id: "s2", name: "SEO分析", description: "分析关键词密度、标题优化建议", type: "analysis" },
      { id: "s3", name: "图片优化", description: "压缩图片、生成 WebP 格式", type: "transform" },
      { id: "s4", name: "生成预览", description: "生成社交媒体预览图", type: "generate" },
      { id: "s5", name: "草稿保存", description: "保存到 CMS 草稿箱", type: "save" },
      { id: "s6", name: "定时任务", description: "设置定时发布时间", type: "schedule" },
      { id: "s7", name: "平台发布", description: "发布到各内容平台", type: "publish" },
      { id: "s8", name: "通知推送", description: "发送发布通知", type: "notify" },
    ],
    configExample: `# content-workflow.yaml
name: Content Publishing

triggers:
  - type: manual
  - type: schedule
    cron: "0 9 * * *"  # 每天早上9点

workflow:
  steps:
    - name: content-review
      type: ai-moderation
      config:
        model: gpt-4
        rules: [sensitive, legal, quality]
    
    - name: seo-optimize
      type: seo-analyzer
      config:
        keywords: required
        readability: true
    
    - name: image-optimize
      type: image-processor
      config:
        formats: [webp, avif]
        quality: 85
    
    - name: publish
      type: multi-platform
      config:
        platforms:
          - wechat
          - weibo
          - xiaohongshu
        schedule: auto`,
    triggers: ["手动触发", "定时任务", "Webhook 触发"]
  },
  3: {
    id: 3,
    name: "数据同步流程",
    description: "多数据源自动同步和ETL处理。支持数据库、API、文件等多种数据源，自动进行数据清洗和转换。",
    icon: "🔄",
    category: "数据",
    steps: 12,
    status: "运行中",
    runs: 2100,
    successRate: "98.8%",
    avgDuration: "15m 30s",
    tags: ["推荐", "热门"],
    lastRun: "5分钟前",
    author: "Data Team",
    homepage: "https://github.com/data/sync-workflow",
    documentation: "https://docs.data.io/sync",
    repository: "https://github.com/data/sync-workflow",
    stepDetails: [
      { id: "s1", name: "连接数据源", description: "建立与各数据源的连接", type: "connect" },
      { id: "s2", name: "数据抽取", description: "从源系统抽取增量数据", type: "extract" },
      { id: "s3", name: "数据校验", description: "校验数据完整性和格式", type: "validate" },
      { id: "s4", name: "数据清洗", description: "处理缺失值、异常值", type: "clean" },
      { id: "s5", name: "数据转换", description: "格式转换和字段映射", type: "transform" },
      { id: "s6", name: "数据聚合", description: "多源数据聚合计算", type: "aggregate" },
      { id: "s7", name: "质量检查", description: "数据质量检测", type: "quality" },
      { id: "s8", name: "写入目标", description: "写入目标数据库", type: "load" },
    ],
    configExample: `# data-sync.yaml
name: Data Synchronization

sources:
  - name: mysql_source
    type: mysql
    connection: mysql://user:pass@host:3306/db
    tables: [users, orders, products]
  
  - name: api_source
    type: rest_api
    endpoint: https://api.example.com/data
    auth: bearer
    token: \${API_TOKEN}

transformations:
  - source: mysql_source.users
    target: warehouse.users
    mapping:
      user_id: id
      created_at: created_date
    filters:
      - status = 'active'

  - source: api_source
    target: warehouse.external_data
    mapping: auto

destination:
  type: postgresql
  connection: postgres://user:pass@warehouse:5432/db
  mode: upsert

schedule:
  interval: hourly
  retry: 3`,
    triggers: ["定时执行", "事件触发", "手动触发"]
  }
};

const defaultWorkflowDetail = (id: number, baseData: Partial<Workflow>): Workflow => ({
  id,
  name: baseData.name || `Workflow ${id}`,
  description: baseData.description || "自动化工作流程。",
  icon: baseData.icon || "🔄",
  category: baseData.category || "通用",
  steps: baseData.steps || 0,
  status: baseData.status || "可用",
  runs: baseData.runs || 0,
  successRate: baseData.successRate || "95%",
  avgDuration: baseData.avgDuration || "-",
  tags: baseData.tags || [],
  lastRun: baseData.lastRun || "-",
  author: "社区贡献者",
  stepDetails: [{ id: "s1", name: "执行", description: "执行工作流", type: "action" }],
  triggers: ["手动触发"],
});

const baseWorkflows = [
  { id: 1, name: "自动化测试流程", description: "代码提交后自动运行测试", icon: "🔄", category: "DevOps", steps: 5, status: "运行中", runs: 1250, successRate: "97.5%", avgDuration: "3m 20s", tags: ["推荐"], lastRun: "10分钟前" },
  { id: 2, name: "内容发布流程", description: "文章审核、SEO优化、定时发布", icon: "📢", category: "内容", steps: 8, status: "运行中", runs: 890, successRate: "99.1%", avgDuration: "5m 15s", tags: ["热门"], lastRun: "1小时前" },
  { id: 3, name: "数据同步流程", description: "多数据源自动同步和ETL处理", icon: "🔄", category: "数据", steps: 12, status: "运行中", runs: 2100, successRate: "98.8%", avgDuration: "15m 30s", tags: ["推荐", "热门"], lastRun: "5分钟前" },
  { id: 4, name: "客户服务流程", description: "工单自动分类、分配和跟进", icon: "🎫", category: "客服", steps: 6, status: "已暂停", runs: 560, successRate: "94.2%", avgDuration: "2m 45s", tags: [], lastRun: "3天前" },
  { id: 5, name: "报告生成流程", description: "定时生成业务报告并发送邮件", icon: "📊", category: "报表", steps: 4, status: "运行中", runs: 320, successRate: "100%", avgDuration: "8m 10s", tags: ["新上线"], lastRun: "2小时前" },
  { id: 6, name: "部署发布流程", description: "自动化CI/CD部署流程", icon: "🚀", category: "DevOps", steps: 10, status: "运行中", runs: 780, successRate: "96.5%", avgDuration: "12m 00s", tags: ["推荐"], lastRun: "30分钟前" },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const workflowId = parseInt(id);

  if (isNaN(workflowId)) {
    return NextResponse.json({ error: "Invalid workflow ID" }, { status: 400 });
  }

  if (workflowDetails[workflowId]) {
    return NextResponse.json({ workflow: workflowDetails[workflowId] });
  }

  const baseData = baseWorkflows.find(w => w.id === workflowId);
  if (baseData) {
    return NextResponse.json({ workflow: defaultWorkflowDetail(workflowId, baseData) });
  }

  return NextResponse.json({ error: "Workflow not found" }, { status: 404 });
}
