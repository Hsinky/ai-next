import { NextResponse } from "next/server";
import { Prompt } from "@/types";

const promptDetails: Record<number, Prompt> = {
  1: {
    id: 1,
    name: "代码优化提示词",
    description: "用于优化和重构代码的高质量提示词模板。分析代码结构，提供改进建议，生成优化后的代码版本。",
    icon: "📝",
    category: "开发",
    uses: 1560,
    rating: 4.9,
    variables: ["language", "code", "goal"],
    tags: ["推荐", "热门"],
    author: "AI团队",
    updatedAt: "2小时前",
    template: `你是一位资深的代码优化专家。请分析以下 {{language}} 代码，并根据目标进行优化。

## 原始代码
\`\`\`{{language}}
{{code}}
\`\`\`

## 优化目标
{{goal}}

## 请提供：
1. **代码分析**：指出当前代码的问题和改进空间
2. **优化方案**：详细的优化策略说明
3. **优化后代码**：提供完整的优化后代码
4. **性能对比**：说明优化前后的性能差异`,
    exampleInput: {
      language: "python",
      code: "def find_duplicates(arr):\n    duplicates = []\n    for i in range(len(arr)):\n        for j in range(i+1, len(arr)):\n            if arr[i] == arr[j] and arr[i] not in duplicates:\n                duplicates.append(arr[i])\n    return duplicates",
      goal: "提高时间复杂度，使用更高效的数据结构"
    },
    exampleOutput: `## 代码分析
当前代码使用嵌套循环查找重复元素，时间复杂度为 O(n²)。主要问题：
1. 双重循环效率低下
2. \`not in duplicates\` 检查也是 O(n) 操作
3. 整体复杂度接近 O(n³)

## 优化方案
使用集合（Set）数据结构，将时间复杂度降为 O(n)

## 优化后代码
\`\`\`python
def find_duplicates(arr):
    seen = set()
    duplicates = set()
    for num in arr:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)
    return list(duplicates)
\`\`\`

## 性能对比
| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 时间复杂度 | O(n³) | O(n) |
| 空间复杂度 | O(n) | O(n) |
| 10万元素耗时 | ~30秒 | ~0.02秒 |`,
    documentation: "https://prompts.example.com/code-optimization",
    bestPractices: [
      "明确指定编程语言以获得更准确的分析",
      "提供具体的优化目标（如性能、可读性、安全性）",
      "对于大型代码，建议分段优化",
      "结合单元测试验证优化结果"
    ]
  },
  2: {
    id: 2,
    name: "文章写作模板",
    description: "生成高质量文章的提示词模板，支持多种风格。适合博客、公众号、新闻稿等场景。",
    icon: "✍️",
    category: "写作",
    uses: 2340,
    rating: 4.8,
    variables: ["topic", "style", "length"],
    tags: ["热门"],
    author: "内容组",
    updatedAt: "1天前",
    template: `你是一位专业的文章写作专家。请根据以下要求撰写一篇高质量文章。

## 主题
{{topic}}

## 写作风格
{{style}}

## 目标长度
{{length}} 字左右

## 写作要求
1. 标题吸引眼球，准确概括主题
2. 开头引人入胜，快速抓住读者注意力
3. 结构清晰，使用小标题分段
4. 内容有价值，提供实用信息或独到见解
5. 结尾有力，引导读者行动或思考

## 输出格式
# 标题

[文章正文]`,
    exampleInput: {
      topic: "AI如何改变我们的工作方式",
      style: "专业但通俗易懂，适合科技博客",
      length: "1500"
    },
    exampleOutput: `# AI革命：从助手到合伙人，工作方式的五大变革

你是否注意到，每天的工作正在悄然发生变化？当你还在用ChatGPT写邮件、用Midjourney做设计时，AI已经从简单的工具升级为工作伙伴。今天，让我们一起探讨AI如何重新定义"工作"本身。

## 一、效率革命：从重复劳动到创造性工作

过去，我们80%的时间花在重复性工作上——整理数据、写报告、回复邮件。现在，AI可以在几秒内完成这些任务，让我们有更多时间专注于真正重要的创造性工作...

[继续显示完整文章...]`,
    documentation: "https://prompts.example.com/article-writing",
    bestPractices: [
      "提供明确的目标读者画像",
      "指定具体的写作风格和语气",
      "可以要求包含特定关键词（SEO优化）",
      "对于长文，建议先生成大纲再展开"
    ]
  },
  3: {
    id: 3,
    name: "需求分析模板",
    description: "帮助分析和梳理产品需求的提示词模板。将模糊需求转化为清晰的产品规格。",
    icon: "📋",
    category: "产品",
    uses: 890,
    rating: 4.7,
    variables: ["context", "stakeholders", "constraints"],
    tags: ["推荐"],
    author: "产品组",
    updatedAt: "3小时前",
    template: `你是一位资深产品经理。请根据以下信息进行需求分析，并输出完整的需求文档。

## 项目背景
{{context}}

## 相关方
{{stakeholders}}

## 约束条件
{{constraints}}

## 请输出以下内容：

### 1. 需求概述
简要描述核心需求和业务目标

### 2. 用户故事
按用户角色分解需求
- 作为 [角色]，我希望 [功能]，以便 [价值]

### 3. 功能清单
| 功能 | 优先级 | 复杂度 | 依赖 |
|------|--------|--------|------|

### 4. 非功能需求
- 性能要求
- 安全要求
- 兼容性要求

### 5. 验收标准
每个核心功能的具体验收标准

### 6. 风险分析
潜在风险及应对措施`,
    exampleInput: {
      context: "电商平台需要开发一个智能推荐系统，提高用户购买转化率",
      stakeholders: "产品团队、技术团队、运营团队、用户",
      constraints: "预算50万，3个月内上线，需要支持百万级用户"
    },
    exampleOutput: `## 1. 需求概述
开发智能商品推荐系统，通过分析用户行为和偏好，在首页、商品详情页、购物车等场景展示个性化推荐内容，目标是将购买转化率提升20%。

## 2. 用户故事
- 作为普通用户，我希望看到符合我兴趣的商品推荐，以便快速发现想要购买的商品
- 作为新用户，我希望看到热门和趋势商品，以便了解平台主打产品
- 作为运营人员，我希望可以调整推荐策略，以便配合促销活动

## 3. 功能清单
| 功能 | 优先级 | 复杂度 | 依赖 |
|------|--------|--------|------|
| 协同过滤推荐 | P0 | 高 | 用户行为数据 |
| 内容推荐 | P0 | 中 | 商品标签系统 |
| 热门推荐 | P1 | 低 | - |
| 实时推荐 | P2 | 高 | 流式计算 |

...`,
    documentation: "https://prompts.example.com/requirement-analysis",
    bestPractices: [
      "提供尽可能详细的背景信息",
      "明确各方利益相关者的诉求",
      "列出技术、时间、预算等约束条件",
      "可以要求生成甘特图或里程碑计划"
    ]
  }
};

const defaultPromptDetail = (id: number, baseData: Partial<Prompt>): Prompt => ({
  id,
  name: baseData.name || `Prompt ${id}`,
  description: baseData.description || "提示词模板，可快速生成所需内容。",
  icon: baseData.icon || "📝",
  category: baseData.category || "通用",
  uses: baseData.uses || 0,
  rating: baseData.rating || 4.0,
  variables: baseData.variables || [],
  tags: baseData.tags || [],
  author: baseData.author || "社区贡献者",
  updatedAt: baseData.updatedAt || "-",
  template: "请根据以下要求生成内容：\n\n{{input}}",
  bestPractices: ["清晰描述你的需求", "提供必要的上下文信息"],
});

const basePrompts = [
  { id: 1, name: "代码优化提示词", description: "用于优化和重构代码", icon: "📝", category: "开发", uses: 1560, rating: 4.9, variables: ["language", "code", "goal"], tags: ["推荐", "热门"], author: "AI团队", updatedAt: "2小时前" },
  { id: 2, name: "文章写作模板", description: "生成高质量文章", icon: "✍️", category: "写作", uses: 2340, rating: 4.8, variables: ["topic", "style", "length"], tags: ["热门"], author: "内容组", updatedAt: "1天前" },
  { id: 3, name: "需求分析模板", description: "帮助分析和梳理产品需求", icon: "📋", category: "产品", uses: 890, rating: 4.7, variables: ["context", "stakeholders", "constraints"], tags: ["推荐"], author: "产品组", updatedAt: "3小时前" },
  { id: 4, name: "SQL生成器", description: "根据自然语言生成SQL", icon: "🗄️", category: "数据库", uses: 1200, rating: 4.6, variables: ["schema", "question", "dialect"], tags: [], author: "数据组", updatedAt: "5小时前" },
  { id: 5, name: "API文档生成", description: "自动生成API接口文档", icon: "📚", category: "文档", uses: 670, rating: 4.5, variables: ["endpoint", "method", "params"], tags: ["新上线"], author: "API组", updatedAt: "1天前" },
  { id: 6, name: "面试问题生成", description: "根据岗位要求生成面试问题", icon: "🎯", category: "HR", uses: 450, rating: 4.8, variables: ["position", "level", "skills"], tags: ["推荐"], author: "HR组", updatedAt: "2天前" },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const promptId = parseInt(id);

  if (isNaN(promptId)) {
    return NextResponse.json({ error: "Invalid prompt ID" }, { status: 400 });
  }

  if (promptDetails[promptId]) {
    return NextResponse.json({ prompt: promptDetails[promptId] });
  }

  const baseData = basePrompts.find(p => p.id === promptId);
  if (baseData) {
    return NextResponse.json({ prompt: defaultPromptDetail(promptId, baseData) });
  }

  return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
}
