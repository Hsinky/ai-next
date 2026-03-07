import { NextResponse } from "next/server";
import { Skill } from "@/types";

const skillDetails: Record<number, Skill> = {
  1: {
    id: 1,
    name: "AI 写作助手",
    description: "智能写作助手，帮你快速生成文章、文案、邮件等内容。支持多种写作风格，包括专业、活泼、正式等，可根据目标受众自动调整语气和表达方式。",
    icon: "✍️",
    category: "写作",
    version: "2.1.0",
    status: "已启用",
    users: "12.5万",
    rating: 4.8,
    tags: ["热门", "推荐"],
    lastUsed: "10分钟前",
    apiCalls: 12580,
    author: "AI写作团队",
    homepage: "https://github.com/ai-writing-assistant",
    documentation: "https://docs.ai-writing.com",
    repository: "https://github.com/ai-writing-assistant/core",
    installCommand: "npm install @ai/writing-assistant",
    configExample: `// next.config.js
module.exports = {
  ai: {
    skills: {
      writing: {
        enabled: true,
        model: 'gpt-4',
        maxTokens: 4000,
        styles: ['professional', 'casual', 'formal']
      }
    }
  }
}`,
    usageExample: `import { WritingAssistant } from '@ai/writing-assistant';

const assistant = new WritingAssistant({
  style: 'professional',
  language: 'zh-CN'
});

const article = await assistant.generate({
  topic: '人工智能发展趋势',
  length: 1000,
  tone: 'informative'
});`,
    requirements: [
      "Node.js >= 18.0.0",
      "OpenAI API Key 或兼容的 LLM API",
      "至少 512MB 可用内存"
    ],
    features: [
      "多风格写作：支持专业、活泼、正式等多种风格",
      "智能续写：根据上下文自动续写内容",
      "语法纠错：自动检测和修正语法错误",
      "SEO优化：生成搜索引擎友好的内容",
      "多语言支持：支持中英日韩等多种语言"
    ]
  },
  2: {
    id: 2,
    name: "PPT 生成器",
    description: "一键生成专业PPT，支持多种模板和主题。通过AI分析内容自动规划幻灯片结构，生成高质量演示文稿。",
    icon: "📊",
    category: "办公",
    version: "1.8.5",
    status: "已启用",
    users: "8.2万",
    rating: 4.6,
    tags: ["推荐"],
    lastUsed: "2小时前",
    apiCalls: 8230,
    author: "Office AI Labs",
    homepage: "https://ppt-generator.ai",
    documentation: "https://docs.ppt-generator.ai",
    repository: "https://github.com/office-ai/ppt-generator",
    installCommand: "npm install @ai/ppt-generator",
    configExample: `// 配置文件
{
  "pptGenerator": {
    "defaultTemplate": "professional",
    "maxSlides": 30,
    "exportFormats": ["pptx", "pdf", "images"],
    "ai": {
      "provider": "openai",
      "model": "gpt-4"
    }
  }
}`,
    usageExample: `import { PPTGenerator } from '@ai/ppt-generator';

const generator = new PPTGenerator();

const presentation = await generator.create({
  topic: '季度销售报告',
  outline: [
    '市场概览',
    '销售数据分析',
    '竞品对比',
    '下季度计划'
  ],
  template: 'corporate-blue',
  language: 'zh-CN'
});

// 导出为 PPTX
await presentation.export('pptx', './sales-report.pptx');`,
    requirements: [
      "Node.js >= 16.0.0",
      "OpenAI API Key",
      "至少 1GB 可用内存（用于图片生成）"
    ],
    features: [
      "智能大纲：自动生成结构化演示大纲",
      "模板库：100+ 专业模板可选",
      "图表生成：自动创建数据可视化图表",
      "图片配图：AI生成或搜索相关配图",
      "动画效果：一键添加专业动画"
    ]
  },
  3: {
    id: 3,
    name: "AI 绘画",
    description: "文字描述生成精美图片，支持多种风格。基于 Stable Diffusion 和 DALL-E 等先进模型，一键生成艺术级图像。",
    icon: "🎨",
    category: "创意",
    version: "3.0.2",
    status: "已启用",
    users: "15.3万",
    rating: 4.9,
    tags: ["热门"],
    lastUsed: "5分钟前",
    apiCalls: 18560,
    author: "Creative AI Studio",
    homepage: "https://ai-painting.studio",
    documentation: "https://docs.ai-painting.studio",
    repository: "https://github.com/creative-ai/painting",
    installCommand: "npm install @ai/painting-sdk",
    configExample: `// painting.config.js
export default {
  models: {
    default: 'stable-diffusion-xl',
    available: ['sd-xl', 'dalle-3', 'midjourney-style']
  },
  output: {
    format: 'png',
    quality: 'high',
    maxSize: 2048
  },
  nsfw: {
    filter: true,
    threshold: 0.8
  }
}`,
    usageExample: `import { AIPainting } from '@ai/painting-sdk';

const painter = new AIPainting({
  model: 'stable-diffusion-xl'
});

const image = await painter.generate({
  prompt: '一只可爱的猫咪坐在窗台上，阳光洒入，水彩画风格',
  negativePrompt: '模糊, 低质量',
  style: 'watercolor',
  size: '1024x1024',
  steps: 30
});

// 保存图片
await image.save('./cat-watercolor.png');`,
    requirements: [
      "Node.js >= 18.0.0",
      "Stability AI API Key 或 OpenAI API Key",
      "建议 2GB+ 可用内存"
    ],
    features: [
      "多模型支持：SD XL、DALL-E 3 等",
      "风格迁移：支持50+艺术风格",
      "高清放大：4K级别图像生成",
      "局部重绘：精确修改图像局部",
      "批量生成：一次生成多个变体"
    ]
  },
  6: {
    id: 6,
    name: "代码助手",
    description: "智能代码补全、重构和Bug修复。支持多种编程语言，提供实时代码建议和自动修复功能。",
    icon: "💻",
    category: "开发",
    version: "2.4.1",
    status: "已启用",
    users: "9.1万",
    rating: 4.8,
    tags: ["推荐"],
    lastUsed: "15分钟前",
    apiCalls: 10240,
    author: "DevTools AI",
    homepage: "https://code-assistant.dev",
    documentation: "https://docs.code-assistant.dev",
    repository: "https://github.com/devtools-ai/code-assistant",
    installCommand: "npm install @ai/code-assistant",
    configExample: `// .code-assistant.json
{
  "provider": "anthropic",
  "model": "claude-3-sonnet",
  "languages": ["typescript", "python", "go", "rust"],
  "features": {
    "autocomplete": true,
    "refactor": true,
    "debug": true,
    "test": true
  },
  "rules": {
    "maxLineLength": 100,
    "indentStyle": "space",
    "indentSize": 2
  }
}`,
    usageExample: `import { CodeAssistant } from '@ai/code-assistant';

const assistant = new CodeAssistant({
  language: 'typescript'
});

// 代码补全
const completion = await assistant.complete({
  code: 'function sortArray(arr: number[]) {',
  cursorPosition: 32
});

// 代码重构
const refactored = await assistant.refactor({
  code: originalCode,
  type: 'extract-function',
  selection: { start: 10, end: 50 }
});

// Bug 修复
const fixed = await assistant.fixBug({
  code: buggyCode,
  error: errorStack
});`,
    requirements: [
      "Node.js >= 18.0.0",
      "Anthropic API Key 或 OpenAI API Key",
      "VS Code 扩展（可选）"
    ],
    features: [
      "智能补全：上下文感知的代码补全",
      "重构建议：自动识别重构机会",
      "Bug修复：自动诊断和修复问题",
      "测试生成：自动生成单元测试",
      "代码解释：AI解释复杂代码逻辑"
    ]
  }
};

// 默认详情模板
const defaultSkillDetail = (id: number, baseData: Partial<Skill>): Skill => ({
  id,
  name: baseData.name || `Skill ${id}`,
  description: baseData.description || "这是一个AI技能模块，可扩展AI助手的能力。",
  icon: baseData.icon || "🔧",
  category: baseData.category || "通用",
  version: baseData.version || "1.0.0",
  status: baseData.status || "可用",
  users: baseData.users || "0",
  rating: baseData.rating || 4.0,
  tags: baseData.tags || [],
  lastUsed: baseData.lastUsed || "-",
  apiCalls: baseData.apiCalls || 0,
  author: "社区贡献者",
  homepage: "https://github.com",
  documentation: "https://docs.example.com",
  installCommand: `npm install @ai/skill-${id}`,
  configExample: `// 配置示例
{
  "skill": {
    "enabled": true,
    "options": {}
  }
}`,
  usageExample: `// 使用示例
import { Skill } from '@ai/skill-${id}';

const skill = new Skill();
await skill.execute();`,
  requirements: [
    "Node.js >= 16.0.0"
  ],
  features: [
    "基础功能支持",
    "可扩展架构"
  ]
});

// 基础数据（与列表API保持一致）
const baseSkills = [
  { id: 1, name: "AI 写作助手", description: "智能写作助手", icon: "✍️", category: "写作", version: "2.1.0", status: "已启用", users: "12.5万", rating: 4.8, tags: ["热门", "推荐"], lastUsed: "10分钟前", apiCalls: 12580 },
  { id: 2, name: "PPT 生成器", description: "一键生成专业PPT", icon: "📊", category: "办公", version: "1.8.5", status: "已启用", users: "8.2万", rating: 4.6, tags: ["推荐"], lastUsed: "2小时前", apiCalls: 8230 },
  { id: 3, name: "AI 绘画", description: "文字描述生成精美图片", icon: "🎨", category: "创意", version: "3.0.2", status: "已启用", users: "15.3万", rating: 4.9, tags: ["热门"], lastUsed: "5分钟前", apiCalls: 18560 },
  { id: 4, name: "智能表格", description: "自动处理表格数据", icon: "📈", category: "办公", version: "1.2.0", status: "已禁用", users: "6.8万", rating: 4.5, tags: [], lastUsed: "3天前", apiCalls: 4120 },
  { id: 5, name: "视频生成", description: "AI生成短视频", icon: "🎬", category: "创意", version: "1.5.0", status: "已启用", users: "5.2万", rating: 4.7, tags: ["新上线"], lastUsed: "1小时前", apiCalls: 3580 },
  { id: 6, name: "代码助手", description: "智能代码补全、重构和Bug修复", icon: "💻", category: "开发", version: "2.4.1", status: "已启用", users: "9.1万", rating: 4.8, tags: ["推荐"], lastUsed: "15分钟前", apiCalls: 10240 },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const skillId = parseInt(id);

  if (isNaN(skillId)) {
    return NextResponse.json({ error: "Invalid skill ID" }, { status: 400 });
  }

  // 优先使用详细数据
  if (skillDetails[skillId]) {
    return NextResponse.json({ skill: skillDetails[skillId] });
  }

  // 查找基础数据
  const baseData = baseSkills.find(s => s.id === skillId);
  if (baseData) {
    return NextResponse.json({ skill: defaultSkillDetail(skillId, baseData) });
  }

  return NextResponse.json({ error: "Skill not found" }, { status: 404 });
}
