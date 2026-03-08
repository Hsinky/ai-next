// Agent智能助手 - 课程数据

import type { Lesson } from '../../types';

export const agentCoreLessons: Record<string, Lesson> = {
  'agent-concepts': {
    id: 'agent-concepts',
    title: 'Agent的核心概念',
    subtitle: '理解自主智能体的能力边界和组成',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['Agent', '自主智能'],
    objectives: [
      '理解Agent与传统Prompt的区别',
      '掌握Agent的主要能力组成',
      '了解Agent在复杂任务中的价值和挑战'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么要Agent？',
        content: `当任务变得复杂，单个Prompt无法解决多步决策。Agent作为可以自主规划和调用工具的智能体，正是应对复杂任务的关键。

本节课，我们从概念层面理解Agent的能力边界、结构和适用场景。`,
      },
      {
        type: 'concept',
        title: 'Agent vs Prompt：核心差异',
        content: `**Prompt：** 给AI一个明确指令，期待一次性输出结果。
**Agent：** 拥有计划能力，可以拆解任务、调用工具、执行循环，并在必要时回调自己。

Agent具备的关键能力：
1. **环境观察**（感知上下文）
2. **计划推理**（拆解、排序）
3. **工具调用**（执行外部操作）
4. **结果验证**（判断是否完成任务）

Agent的设计思想来源于真实世界的人类协作，让AI像助手一样在环境中完成实实在在的目标。`,
        keyPoint: 'Agent具备计划、工具调用和反馈机制，能处理多步骤任务。',
      },
      {
        type: 'example',
        title: '示例：Agent完成旅行规划',
        content: `假设任务：为团队制定三天的日本京都深度游路线。

传统Prompt：一次性输出一个行程，无法根据任务变化调整。
Agent流程：
1. **任务理解**：确认范围（预算、人数、偏好）
2. **拆解子任务**：查找高赞景点、计算交通、预定餐厅
3. **调用工具**：使用地图API查询距离、搜索票价、调用餐厅数据库
4. **汇总结果**：生成完整行程并验证时间冲突
5. **迭代优化**：如果预算超出，可重新调整景点列表`,
      },
      {
        type: 'note',
        title: 'Agent的挑战',
        content: 'Agent需要在计划与执行之间不断反馈，面对模糊输入、业务边界和工具错误时，必须具备自我修正能力。',
      },
    ],
    summary: 'Agent不仅仅是更强的Prompt，它能感知环境、规划执行、调用工具并验证结果。理解Agent的能力边界，是设计复杂AI工作流的第一步。',
    keyPoints: [
      'Agent具备感知、计划、执行、验证能力',
      '相比Prompt，Agent更适合多步骤、多工具的任务',
      'Agent需要不断反馈和自我修正',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Agent与Prompt相比，最大的优势是什么？',
        options: [
          '响应更快',
          '能使用更多语气',
          '具备计划与工具调用能力，能解决多步骤任务',
          '更会生成长文本',
        ],
        answer: '具备计划与工具调用能力，能解决多步骤任务',
        explanation: 'Agent可以拆解任务、调用工具并验证结果，适合复杂场景。',
      },
      {
        type: 'choice',
        question: 'Agent需要哪些核心能力？',
        options: [
          '随机输出、高温度',
          '环境感知、计划推理、工具调用、结果验证',
          '重复单句答案、低温度',
          '只需模仿示例',
        ],
        answer: '环境感知、计划推理、工具调用、结果验证',
        explanation: 'Agent通过感知、规划、执行、验证实现多步骤任务。',
      },
    ],
  },

  'agent-tool-calling': {
    id: 'agent-tool-calling',
    title: '工具调用机制',
    subtitle: '让Agent协同外部系统完成任务',
    duration: 40,
    difficulty: 'intermediate',
    tags: ['Agent', '工具调用'],
    objectives: [
      '理解Agent工具调用的流程',
      '学习设计工具描述与契约',
      '掌握处理工具失败的策略'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：Agent怎么下指令给工具？',
        content: `Agent本质上是一个控制器，将复杂任务分发到多个工具。工具可以是搜索、数据库、浏览器、代码执行等。正确描述工具和处理返回值，是Agent成功的关键。`,
      },
      {
        type: 'concept',
        title: '工具契约（Tool Specification）',
        content: `每个工具必须有明确的契约（名称、参数、行为、返回结构）。

**示例**：
\`\`\`
工具名：search_web
参数：query（字符串）、locale（区域）
返回：{results: [{title, url, snippet}]}
\`\`\`
Agent通过契约：
1. 选择工具
2. 填写参数
3. 调用工具
4. 解析结果

**小技巧**：
- 提供示例调用
- 指定最大返回条数
- 明确异常处理（超时、空结果）`,
        keyPoint: '工具契约是Agent与工具之间唯一可信的沟通方式。',
      },
      {
        type: 'code',
        title: '代码示例：调用Web Search工具',
        content: '一个伪代码调用流程：',
        code: `def search_and_summarize(agent, query):
    tool_input = {
        "query": query,
        "locale": "zh-CN",
        "max_results": 3,
    }

    response = agent.call_tool("search_web", tool_input)
    snippets = [item["snippet"] for item in response["results"]]

    summary_prompt = f"根据以下搜索片段总结最新进展：\\n{snippets}"
    return agent.call_tool("chat", {"prompt": summary_prompt})`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '异常处理与重试策略',
        content: `工具调用可能失败：网络超时、权限拒绝、参数错误。Agent必须做三件事：
1. **捕获异常**：识别出错类型
2. **尝试修复**：调整参数、等待重试、找备用工具
3. **优雅退出**：如果无法完成，给出用户友好提示

**示例策略**：
- 搜索返回空：换一个相近query
- API限制：降低请求频率，等待下一轮
- 工具崩溃：记录错误，切换到降级方案`
      },
      {
        type: 'note',
        title: '安全提示',
        content: 'Agent调用工具时必须通过权限控制，避免调用未经授权的敏感API或执行任意代码。',
      },
    ],
    summary: 'Agent工具调用依赖明确的契约、健壮的调用流程和异常处理策略。设计良好的工具描述和错误恢复逻辑，是构建可靠Agent的基础。',
    keyPoints: [
      '工具契约定义名称、参数、返回结构',
      'Agent需执行工具选择、参数填充、调用、解析',
      '必须处理工具异常并提供降级方案',
    ],
    exercises: [
      {
        type: 'choice',
        question: '工具契约应该包含哪些内容？',
        options: [
          '工具名、参数、行为、返回结构',
          '工具的实现语言',
          '工具调用频率',
          '工具作者姓名',
        ],
        answer: '工具名、参数、行为、返回结构',
        explanation: '契约需要明确工具能做什么，需要哪些参数以及返回什么结果。',
      },
      {
        type: 'choice',
        question: '当工具调用失败时Agent应该？',
        options: [
          '立即中断所有流程',
          '自动忽略错误继续',
          '根据错误类型尝试修复或降级',
          '不停地无限重试',
        ],
        answer: '根据错误类型尝试修复或降级',
        explanation: 'Agent应识别异常，尝试修复或使用备用方案，避免无限重试。',
      },
    ],
  },

  'agent-planning-vs-reactive': {
    id: 'agent-planning-vs-reactive',
    title: '规划型Agent vs 反应型Agent',
    subtitle: '选择合适的Agent策略',
    duration: 40,
    difficulty: 'intermediate',
    tags: ['Agent', '规划', '反应'],
    objectives: [
      '理解规划型与反应型的区别',
      '掌握混合型Agent的设计原则',
      '学会根据任务选择策略'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：何时需要规划？',
        content: `规划型Agent会先制定完整计划，适合长任务；反应型Agent根据当前上下文即时决策，适合实时响应。
本节课帮助你根据任务特性选择合适的Agent策略。`,
      },
      {
        type: 'concept',
        title: '规划型Agent特征',
        content: `规划型Agent特点：
- 任务被拆解为多个步骤
- 每一步都有明确目标
- 可在执行前校验整个计划

**优点**：可控制性强、易于验证
**缺点**：规划阶段耗时，难应对突发变化

适用场景：报告撰写、流程自动化、复杂数据分析`,
      },
      {
        type: 'concept',
        title: '反应型Agent特征',
        content: `反应型Agent特点：
- 不提前规划，依据当前输入立刻决定下一步
- 适应性强，能实时响应新信息

**优点**：灵活、低延迟
**缺点**：难控制全局一致性，容易忘记历史

适用场景：客服对话、实时监控、应急响应`,
        keyPoint: '反应型Agent适合需要快速响应和频繁变更的场景。',
      },
      {
        type: 'example',
        title: '混合型策略：计划+反应',
        content: `一个混合Agent：
1. 规划阶段：制定总体目标和步骤
2. 执行阶段：每步在调用工具前检查是否需要重新计划（响应新信息）
3. 异常阶段：遇到突发情况立即进入反应模式，调整计划后继续

这个模式兼顾了可控性和灵活性。`,
      },
      {
        type: 'note',
        title: '决策建议',
        content: '为复杂任务设计Agent时，先判断任务是否有明确流程、是否容易定义计划，再决定采用规划型、反应型或混合策略。',
      },
    ],
    summary: '规划型Agent适合有明确流程的任务，反应型Agent适合实时和动态场景。混合策略可以兼顾控制性和适应性。',
    keyPoints: [
      '规划型Agent先制定任务计划，适合复杂任务',
      '反应型Agent即时决策，适合实时场景',
      '混合策略在执行中可以随时调整计划',
    ],
    exercises: [
      {
        type: 'choice',
        question: '哪种情况更适合反应型Agent？',
        options: [
          '撰写详细报告',
          '实时客服支持',
          '批量处理结构化数据',
          '部署生产环境',
        ],
        answer: '实时客服支持',
        explanation: '实时客服需要快速响应，反应型Agent能根据最新输入即时处理。',
      },
      {
        type: 'choice',
        question: '混合型Agent的关键能力是？',
        options: [
          '只执行反应逻辑',
          '只依赖计划不响应变化',
          '在执行中随时重新评估并调整计划',
          '完全交给工具选择',
        ],
        answer: '在执行中随时重新评估并调整计划',
        explanation: '混合Agent在执行过程中根据新信息调整计划，兼顾控制和灵活。',
      },
    ],
  },

  'agent-build-task': {
    id: 'agent-build-task',
    title: '实战：构建任务型Agent',
    subtitle: '从需求到部署的Agent开发流程',
    duration: 50,
    difficulty: 'intermediate',
    tags: ['Agent', '实战'],
    objectives: [
      '掌握需求拆解与工具设计流程',
      '学会编写Agent执行策略与监控指标',
      '理解部署与迭代的关键步骤'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：Agent项目开发五步法',
        content: `构建Agent的五个阶段：
1. 需求采集
2. 工具与数据准备
3. 策略与计划逻辑设计
4. 实现与测试
5. 监控与迭代

本节课我们将跟随一个案例，从需求到部署逐步走一遍。`,
      },
      {
        type: 'concept',
        title: '阶段一：需求与KPI',
        content: `明确Agent要完成的目标（如："在1分钟内自动整理会议纪要"）。设定KPI，如准确率、响应时间、失败率。

问：这个Agent的成功指标是什么？答：100%覆盖会议要点、<2分钟响应。`,
      },
      {
        type: 'example',
        title: '阶段二：工具+数据设计',
        content: `选择工具：
- 转录工具：将音频转文字
- 摘要工具：生成结构化会议纪要
- 日历工具：创建任务提醒

准备数据：会议模板、关键词库、镜像历史数据

工具之间的契约必须清晰，确保Agent调用时参数一致。`,
      },
      {
        type: 'code',
        title: '阶段三：计划与执行逻辑',
        content: '示例任务执行流程：',
        code: `def summarize_meeting(agent, meeting_audio_url):
    transcript = agent.call_tool("transcribe_audio", {"url": meeting_audio_url})
    summary = agent.call_tool("summarize_text", {"text": transcript, "style": "bullet"})
    action_items = agent.call_tool("extract_action_items", {"text": transcript})
    return {
        "transcript": transcript,
        "summary": summary,
        "actions": action_items,
    }`,
        language: 'python',
      },
      {
        type: 'note',
        title: '阶段四：监控与反馈',
        content: '部署后监控指标：任务完成率、工具错误次数、人工干预比例。通过日志和用户反馈不断调优策略。',
      },
    ],
    summary: '构建任务型Agent需要明确需求、准备工具、设计计划逻辑、编写执行流程，并通过监控不断迭代。实战案例帮助你把抽象流程落到实处。',
    keyPoints: [
      '需求清晰、KPI明确是成功的前提',
      '工具契约和数据准备决定执行质量',
      '计划流程对可控性至关重要，部署后需持续监控',
    ],
    exercises: [
      {
        type: 'choice',
        question: '任务型Agent的开发流程第一步是？',
        options: [
          '部署监控',
          '编写代码',
          '需求采集与KPI确定',
          '写文档',
        ],
        answer: '需求采集与KPI确定',
        explanation: '明确目标和成功指标，才能设计合理的Agent流程。',
      },
      {
        type: 'choice',
        question: 'Agent部署后应该关注哪个指标？',
        options: [
          'KPI完成率、工具错误次数、人工干预比例',
          '代码行数',
          'API调用次数越多越好',
          '日志大小',
        ],
        answer: 'KPI完成率、工具错误次数、人工干预比例',
        explanation: '这些指标反映Agent是否正常运行，是否需要调整策略。',
      },
    ],
  },
};
