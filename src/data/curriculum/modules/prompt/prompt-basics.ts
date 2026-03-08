// Prompt工程入门 - 课程数据

import type { Lesson } from '../../types';

export const promptBasicsLessons: Record<string, Lesson> = {
  'prompt-good-practices': {
    id: 'prompt-good-practices',
    title: '好Prompt的特征',
    subtitle: '学会识别和写出高质量的Prompt',
    duration: 40,
    difficulty: 'beginner',
    tags: ['Prompt工程', '最佳实践'],
    objectives: [
      '理解好Prompt的核心特征',
      '学会编写清晰、具体、可执行的Prompt',
      '掌握评估Prompt质量的方法'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么有些Prompt有效，有些无效？',
        content: `你可能遇到过这种情况：同样的请求，不同的表述方式，得到的结果天差地别。这背后的原因是什么？

这节课，我们将揭示好Prompt的共同特征，让你的每一次请求都能得到想要的结果。`,
      },
      {
        type: 'concept',
        title: '好Prompt的四大特征',
        content: `**特征一：清晰明确（Clear）**
好的Prompt没有歧义，明确告诉AI要做什么。
- ❌ 坏示例："写一篇文章"
- ✅ 好示例："写一篇800字的技术博客文章，主题是AI在医疗行业的应用，风格为专业但不晦涩"

**特征二：具体详细（Specific）**
提供足够的细节和约束条件。
- ❌ 坏示例："帮我优化这段代码"
- ✅ 好示例："帮我优化这段Python代码，要求：1.提高可读性，2.添加注释，3.优化性能，4.保持功能不变"

**特征三：上下文完整（Complete Context）**
包含必要的背景信息和示例。
- ❌ 坏示例："翻译成英文"
- ✅ 好示例："翻译成英文，这段是商务邮件，需要保持正式和礼貌的语调：[内容]"

**特征四：格式明确（Explicit Format）**
明确说明期望的输出格式。
- ❌ 坏示例："列出主要优点"
- ✅ 好示例："用Markdown列表格式列出主要优点，每个优点用一行"`,
        keyPoint: '好Prompt的四大特征：清晰明确、具体详细、上下文完整、格式明确。',
      },
      {
        type: 'example',
        title: '示例对比：同一请求的不同表述',
        content: `**任务**：让AI写一个产品描述

❌ **模糊的Prompt**：
"写一个产品介绍"
→ 结果：可能是手机、可能是食品、内容千差万别

✅ **清晰的Prompt**：
\`\`\`
写一个智能手表的产品介绍，要求：
- 目标用户：年轻职场人士
- 核心卖点：健康监测、长续航、时尚外观
- 风格：简洁有力，适合电商详情页
- 字数：200字左右
\`\`\`
→ 结果：精准符合需求`,
      },
      {
        type: 'code',
        title: '代码示例：Prompt质量检查清单',
        content: '用代码实现一个简单的Prompt质量检查工具：',
        code: `def validate_prompt(prompt: str) -> dict:
    """检查Prompt质量"""
    issues = []

    # 检查长度
    if len(prompt) < 20:
        issues.append("Prompt太短，可能缺少上下文")

    # 检查是否包含动作动词
    action_verbs = ["写", "分析", "解释", "总结", "翻译", "优化"]
    if not any(verb in prompt for verb in action_verbs):
        issues.append("缺少明确的动作指令")

    # 检查是否有格式要求
    if "格式" not in prompt and "format" not in prompt.lower():
        issues.append("未指定输出格式")

    # 检查是否过于模糊
    vague_words = ["东西", "那个", "内容"]
    if any(word in prompt for word in vague_words):
        issues.append("包含模糊词汇，请更具体")

    return {
        "valid": len(issues) == 0,
        "issues": issues,
        "score": max(0, 100 - len(issues) * 20)
    }

# 使用示例
prompt = "写一篇文章"
result = validate_prompt(prompt)
print(f"评分: {result['score']}/100")
print(f"问题: {result['issues']}")`,
        language: 'python',
      },
      {
        type: 'note',
        title: '实践建议',
        content: '在写Prompt时，可以先在心里问自己：如果我是AI，这个请求足够清晰吗？能准确理解我的意图吗？',
      },
    ],
    summary: '本节课我们学习了好Prompt的四大特征：清晰明确、具体详细、上下文完整、格式明确。通过对比模糊和清晰的Prompt示例，我们看到了高质量Prompt的重要性。记住，编写Prompt就像给同事布置任务，越清晰、越具体，效果越好。',
    keyPoints: [
      '好Prompt的四大特征：清晰明确、具体详细、上下文完整、格式明确',
      '模糊的Prompt导致模糊的结果，清晰的Prompt得到精准的输出',
      '在编写Prompt时，先检查是否足够清晰和具体',
    ],
    exercises: [
      {
        type: 'choice',
        question: '以下哪个是高质量的Prompt？',
        options: [
          '写一个故事',
          '写一个关于时间旅行的科幻短篇故事，800字，包含意外结局',
          '给我一些内容',
          '随便写点什么',
        ],
        answer: '写一个关于时间旅行的科幻短篇故事，800字，包含意外结局',
        explanation: '这个Prompt清晰（科幻故事）、具体（800字、意外结局）、明确（短篇故事）。',
      },
      {
        type: 'choice',
        question: '好Prompt的四大特征不包括？',
        options: [
          '清晰明确',
          '冗长复杂',
          '上下文完整',
          '格式明确',
        ],
        answer: '冗长复杂',
        explanation: '好Prompt需要清晰、具体、完整、明确格式，但不需要冗长复杂。',
      },
    ],
  },

  'prompt-basic-techniques': {
    id: 'prompt-basic-techniques',
    title: '基础技巧：清晰、具体、格式化',
    subtitle: '掌握编写Prompt的基本技巧和原则',
    duration: 45,
    difficulty: 'beginner',
    tags: ['Prompt工程', '基础技巧'],
    objectives: [
      '掌握让Prompt更清晰的技巧',
      '学习如何提供具体的约束条件',
      '学会指定输出格式来控制结果'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：从能用到好用的跨越',
        content: `你可能已经能用AI完成基本任务，但如何让它更好用？

这节课，我们将系统学习三个核心技巧：让Prompt更清晰、提供具体约束、明确输出格式。掌握了这些，你就能让AI变成你的高效助手。`,
      },
      {
        type: 'concept',
        title: '技巧一：使用"角色设定"（Role Playing）',
        content: `**什么是角色设定？**
告诉AI它是什么角色，可以让它用相应的视角和风格回答。

**常用角色设定**：
- "你是一位经验丰富的Python开发者"
- "你是一位专业的产品经理"
- "你是一位耐心的小学老师"
- "你是一位技术文档撰写专家"

**为什么有效？**
不同角色有不同的：
- 专业术语和表达方式
- 思考问题的角度
- 输出的详细程度
- 建议的语气

**示例**：
❌ 没有角色设定："如何学习Python？"
→ 结果：泛泛而谈，可能不够实用

✅ 有角色设定："你是一位有10年Python教学经验的老师，如何从零开始学习Python？请给出分阶段的学习路径和推荐资源。"
→ 结果：系统、专业、可落地`,
        keyPoint: '角色设定让AI用专业视角回答，效果更精准。',
      },
      {
        type: 'concept',
        title: '技巧二：提供背景和示例（Context & Examples）',
        content: `**提供背景信息**
让AI了解任务背景，能给出更相关的建议。

示例：
- "我正在做一个创业项目，需要写商业计划书..."
- "我的用户主要是退休老人，希望UI设计..."
- "这是我的数据集描述..."

**提供示例（Few-Shot）**
给AI展示你想要的格式和风格。

示例：
"按照以下格式输出：
输入：苹果
输出：
- 中文名：苹果
- 英文名：Apple
- 营养价值：富含维生素C和纤维

输入：香蕉
输出："`,
        keyPoint: '背景信息让AI理解上下文，示例让AI模仿你想要的输出。',
      },
      {
        type: 'code',
        title: '代码示例：使用Few-Shot模式',
        content: 'Few-Shot是通过提供示例来引导AI输出风格：',
        code: `def few_shot_prompt():
    """Few-Shot示例"""
    prompt = """
你是一个文本分类器，判断文本的情感。

示例1：
文本：这个产品太棒了！
分类：正面

示例2：
服务态度很差，再也不来了。
分类：负面

示例3：
产品质量还行，价格有点贵。
分类：中性

现在请分类：
文本：今天购物体验很不错，推荐！
分类：
"""
    return prompt

# 使用
print(few_shot_prompt())`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '技巧三：明确输出格式（Output Format）',
        content: `**常用格式指定方式**：

**Markdown格式**
"用Markdown格式输出，包括标题、列表和代码块"

**JSON格式**
"以JSON格式输出，包含字段：title, content, tags"

**表格格式**
"以Markdown表格形式输出，包含列：项目、状态、负责人"

**代码格式**
"用Python编写，添加注释，包含错误处理"

**分步格式**
"分3步完成：
步骤1：...
步骤2：...
步骤3：..."

**示例**：
❌ 模糊："列出API设计要点"
✅ 明确："以JSON数组格式列出API设计要点，每个要点包含：name（名称）和description（描述）"`,
        keyPoint: '明确输出格式可以精准控制结果结构和风格。',
      },
      {
        type: 'example',
        title: '实战示例：写产品功能文档',
        content: `**任务**：为新功能写用户文档

❌ 简单版本：
"写一个用户文档"

✅ 综合运用技巧：
"你是一位专业的技术文档撰写专家，擅长将复杂功能用简单语言解释。

请为以下功能撰写用户文档：
[功能描述]

要求：
1. 目标用户：非技术背景的产品经理
2. 风格：简洁友好，避免技术术语
3. 格式：Markdown，包含：
   - 功能概述（100字内）
   - 使用步骤（编号列表）
   - 常见问题（Q&A格式）
4. 包含一个使用场景示例

请开始撰写："`,
      },
    ],
    summary: '本节课学习了三个核心Prompt技巧：角色设定、背景与示例、输出格式。角色设定让AI用专业视角回答，提供背景和示例让AI理解需求，明确输出格式控制结果结构。综合运用这些技巧，可以大幅提升AI回答的质量。',
    keyPoints: [
      '角色设定让AI用专业视角和风格回答',
      '背景信息帮助AI理解上下文，示例引导输出风格',
      '明确输出格式可以精准控制结果结构和样式',
      '综合运用多个技巧效果最佳',
    ],
    exercises: [
      {
        type: 'choice',
        question: '以下哪种方式能最好地获取代码审查建议？',
        options: [
          '帮我看看这段代码有什么问题',
          '你是一位资深代码审查员，审查以下Python代码，指出性能问题、安全漏洞和可读性问题',
          '这个代码对不对',
          '优化代码',
        ],
        answer: '你是一位资深代码审查员，审查以下Python代码，指出性能问题、安全漏洞和可读性问题',
        explanation: '这个Prompt包含了角色设定、明确任务、具体要求（性能、安全、可读性）。',
      },
      {
        type: 'choice',
        question: 'Few-Shot的作用是？',
        options: [
          '让AI记住之前的对话',
          '通过提供示例引导AI的输出风格和格式',
          '增加AI的上下文窗口',
          '让AI运行多次',
        ],
        answer: '通过提供示例引导AI的输出风格和格式',
        explanation: 'Few-Shot（少样本学习）通过在Prompt中提供示例，让AI模仿示例的格式和风格来输出。',
      },
    ],
  },

  'prompt-few-shot': {
    id: 'prompt-few-shot',
    title: 'Few-Shot学习：给模型示例',
    subtitle: '掌握通过示例引导AI输出的方法',
    duration: 35,
    difficulty: 'beginner',
    tags: ['Prompt工程', 'Few-Shot'],
    objectives: [
      '理解Few-Shot的原理和作用',
      '掌握不同类型的Few-Shot模式',
      '学会构建有效的示例来引导AI'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么给示例这么有效？',
        content: `你可能发现，给AI几个示例后，它的输出风格立刻就对了。

这就像教孩子：告诉他"要这样做"，比单纯说"这样做"更有效。

这节课，我们深入探索Few-Shot模式，让你的AI输出精准符合期望。`,
      },
      {
        type: 'concept',
        title: 'Few-Shot原理：从模仿到内化',
        content: `**什么是Few-Shot？**
Few-Shot（少样本学习）是在Prompt中提供几个示例，引导AI按照示例的模式输出。

**为什么有效？**
1. **模式识别**：AI从示例中学习模式和规律
2. **风格模仿**：AI会模仿示例的语言风格和格式
3. **约束理解**：示例隐式地告诉AI应该遵循什么规则

**类比思考**：
- Zero-Shot（0示例）：像从没见过类似问题，直接尝试解决
- Few-Shot（1-5示例）：像看过几个例题后，再解决问题
- Many-Shot（大量示例）：像做了大量练习后，熟能生巧

**提示**：
大多数情况下，2-3个精心设计的示例就足够了。示例不是越多越好，而是越典型越好。`,
        keyPoint: 'Few-Shot通过提供示例，引导AI学习模式和模仿风格。2-3个精心设计的示例通常足够。',
      },
      {
        type: 'concept',
        title: 'Few-Shot的几种常见模式',
        content: `**模式一：格式模仿（Format Imitation）**
用于控制输出格式。

示例：
"按照以下格式提取信息：
文本：张三，电话13812345678
输出：{"name": "张三", "phone": "13812345678"}

文本：李四，邮箱lisi@example.com
输出："，

**模式二：风格模仿（Style Imitation）**
用于控制语言风格。

示例：
"用以下风格重写：
原文：代码有很多bug。
重写：代码中存在若干待修复的缺陷。

原文：这个功能很好用。
重写："，

**模式三：逻辑模仿（Logic Imitation）**
用于展示推理过程。

示例：
"按照以下方式分析：
问题：5 + 3 = ?
分析：从5开始，加上3，得到8
答案：8

问题：10 - 4 = ?
分析："`,
      },
      {
        type: 'code',
        title: '代码示例：构建Few-Shot Prompt',
        content: '一个动态构建Few-Shot Prompt的函数：',
        code: `def build_few_shot_prompt(examples: list, test_input: str) -> str:
    """构建Few-Shot Prompt"""
    prompt = "你是一个文本处理助手。按照示例的格式处理输入。\\n\\n"

    for i, example in enumerate(examples, 1):
        prompt += f"示例{i}:\\n"
        prompt += f"输入：{example['input']}\\n"
        prompt += f"输出：{example['output']}\\n\\n"

    prompt += f"现在处理：\\n"
    prompt += f"输入：{test_input}\\n"
    prompt += "输出："

    return prompt

# 使用示例
examples = [
    {"input": "今天天气真好", "output": "正面"},
    {"input": "这个产品太糟糕了", "output": "负面"},
    {"input": "还凑合吧", "output": "中性"}
]

test_input = "这个功能很棒！"
prompt = build_few_shot_prompt(examples, test_input)
print(prompt)`,
        language: 'python',
      },
      {
        type: 'note',
        title: '最佳实践',
        content: '选择示例时要注意：1) 示例要覆盖不同情况 2) 示例之间要一致 3) 难度和测试输入要相近。',
      },
    ],
    summary: '本节课深入学习了Few-Shot模式，理解了通过示例引导AI的原理。我们掌握了格式模仿、风格模仿、逻辑模仿三种模式，以及如何构建有效的Few-Shot Prompt。记住，精心设计的示例比数量更重要。',
    keyPoints: [
      'Few-Shot通过提供示例，引导AI学习模式和模仿风格',
      '三种常见模式：格式模仿、风格模仿、逻辑模仿',
      '2-3个精心设计的示例通常足够',
      '示例要覆盖不同情况、保持一致、难度相近',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Few-Shot的主要作用是？',
        options: [
          '增加AI的记忆容量',
          '通过示例引导AI的输出风格和格式',
          '提高AI的处理速度',
          '增加Prompt的长度',
        ],
        answer: '通过示例引导AI的输出风格和格式',
        explanation: 'Few-Shot的核心作用是通过提供示例，让AI模仿示例的模式、风格和格式来输出。',
      },
      {
        type: 'choice',
        question: '以下关于Few-Shot的说法正确的是？',
        options: [
          '示例越多越好，至少要10个以上',
          '示例要精心设计，覆盖不同情况',
          'Few-Shot需要模型重新训练',
          'Few-Shot只能用于代码任务',
        ],
        answer: '示例要精心设计，覆盖不同情况',
        explanation: 'Few-Shot中，示例的质量比数量更重要。2-3个精心设计的示例通常足够，且要覆盖不同情况。',
      },
    ],
  },

  'prompt-common-errors': {
    id: 'prompt-common-errors',
    title: '常见错误与调试',
    subtitle: '识别并避免常见的Prompt编写错误',
    duration: 35,
    difficulty: 'beginner',
    tags: ['Prompt工程', '调试', '常见错误'],
    objectives: [
      '识别常见的Prompt编写错误',
      '学习如何诊断和修复问题',
      '掌握调试Prompt的技巧'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：AI不按你的想法输出？可能犯了这些错',
        content: `AI的回答总是和你期望的不一样？问题可能不在AI，而在你的Prompt。

这节课，我们将总结最常见的错误，以及如何快速诊断和修复它们。`,
      },
      {
        type: 'concept',
        title: '常见错误一：假设AI知道你的背景',
        content: `**错误表现**：
"分析这个" → AI不知道你指的是什么
"优化它" → AI不知道要优化什么

**正确做法**：
"分析这个Python函数的性能问题"
"优化这段代码的可读性"

**诊断方法**：
检查你的Prompt中是否有需要AI"猜"的地方。凡是AI需要猜测的，都是潜在问题。`,
      },
      {
        type: 'concept',
        title: '常见错误二：指令自相矛盾',
        content: `**错误表现**：
"写一个简洁但详细的说明" → 简洁和详细矛盾
"用简单语言，但包含技术细节" → 简单和技术细节矛盾

**正确做法**：
选择一个主要方向，或分开请求：
"先写一个简洁的概述（50字），再写详细说明"

**诊断方法**：
检查Prompt中的形容词，看是否存在对立或矛盾的词。`,
      },
      {
        type: 'concept',
        title: '常见错误三：缺少约束条件',
        content: `**错误表现**：
"写一篇文章" → 可能写100字，也可能写10000字
"列出要点" → 可能列出3个，也可能列出30个

**正确做法**：
"写一篇800字的文章"
"列出5个主要要点"

**诊断方法**：
对于没有明确数量限制的请求，AI可能按照自己的判断输出，而这个判断可能与你的期望不同。`,
      },
      {
        type: 'concept',
        title: '常见错误四：一次性要求太多',
        content: `**错误表现**：
在一个Prompt中要求：总结 + 分析 + 建议 + 示例 + 格式化
→ 结果：每个部分都不够深入

**正确做法**：
拆分成多个Prompt，或明确优先级：
"首先总结主要内容（200字），然后分析3个关键技术点"

**诊断方法**：
检查Prompt是否包含3个以上并列的主要动词。如果太多，考虑拆分。`,
      },
      {
        type: 'code',
        title: '调试技巧：逐步简化法',
        content: '当Prompt效果不好时，用这个方法定位问题：',
        code: `def debug_prompt(original_prompt: str) -> str:
    """逐步简化调试Prompt"""
    steps = [
        "检查是否有模糊词汇",
        "移除次要要求，保留核心",
        "添加明确的输出格式",
        "提供示例",
        "重新组织逻辑",
    ]

    print(f"原始Prompt: {original_prompt}\\n")
    print("逐步调试：\\n")

    for i, step in enumerate(steps, 1):
        print(f"步骤{i}: {step}")
        # 这里用户需要根据步骤逐步修改Prompt

    return "按照步骤逐一尝试，找到问题所在"

# 调试示例
bad_prompt = "帮我写一个东西，要好的，但不要太长"
debug_prompt(bad_prompt)`,
        language: 'python',
      },
      {
        type: 'note',
        title: '调试清单',
        content: '每次Prompt效果不好时，快速检查：1) 是否有歧义？2) 指令是否矛盾？3) 约束是否明确？4) 要求是否太多？',
      },
    ],
    summary: '本节课总结了Prompt编写中的常见错误：假设AI知道背景、指令自相矛盾、缺少约束条件、一次性要求太多。我们学习了逐步简化调试法，并掌握了快速诊断问题的清单。记住，好的Prompt是迭代出来的，通过不断调试和优化。',
    keyPoints: [
      '常见错误：假设AI知道背景、指令矛盾、缺少约束、要求太多',
      '检查模糊词汇、对立形容词、数量限制',
      '3个以上主要动词时考虑拆分',
      '调试清单：歧义、矛盾、约束、数量',
    ],
    exercises: [
      {
        type: 'choice',
        question: '以下哪个Prompt最可能导致问题？',
        options: [
          '用200字总结这篇文章',
          '分析这个项目的优缺点，给出建议，写一个示例代码，并解释技术细节',
          '翻译这段话为英语，保持正式语调',
          '按照表格格式列出以下5个项目',
        ],
        answer: '分析这个项目的优缺点，给出建议，写一个示例代码，并解释技术细节',
        explanation: '这个Prompt包含了5个不同的要求（分析、建议、示例、解释），一次性要求太多可能导致每个部分都不够深入。',
      },
      {
        type: 'choice',
        question: '逐步简化调试法的主要目的是？',
        options: [
          '让AI逐步完成任务',
          '通过逐步移除和修改来定位问题所在',
          '让Prompt变得更短',
          '测试AI的性能',
        ],
        answer: '通过逐步移除和修改来定位问题所在',
        explanation: '逐步简化调试法是通过一步步移除次要要求、添加明确格式等，观察效果变化，从而定位导致问题的部分。',
      },
    ],
  },
};
