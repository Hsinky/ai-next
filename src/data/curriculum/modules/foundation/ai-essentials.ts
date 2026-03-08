// Foundation - AI 本质与原理 课程数据

import type { Lesson } from '../../types';

export const aiEssentialsLessons: Record<string, Lesson> = {
  'ai-what-is': {
    id: 'ai-what-is',
    title: 'AI是什么？打破常见认知误区',
    subtitle: '建立正确的AI认知，理解AI的真实工作方式',
    duration: 45,
    difficulty: 'beginner',
    tags: ['AI基础', '认知误区', '大模型原理'],
    objectives: [
      '理解AI的真实工作方式，消除"AI有智能"的认知误区',
      '掌握大语言模型的基本原理',
      '了解AI的能力边界和局限性',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：我们到底在谈论什么？',
        content: `很多人每天都在用ChatGPT、Claude等AI工具，但很少有人真正理解它们是如何工作的。这节课，我将带你从零开始，建立对AI的正确认知。

作为你的AI博士导师，我要先告诉你一个可能让你惊讶的事实：**AI不思考，它在计算概率**。

这不是谦虚，而是事实。理解这一点，是你成为AI应用专家的第一步。`,
      },
      {
        type: 'concept',
        title: '核心概念：AI是数学，不是魔法',
        content: `让我们先澄清几个常见的认知误区：

**误区一：AI在"思考"**
真相：AI没有意识，不会思考。它只是基于海量数据训练出来的统计模型，通过计算概率来预测"下一个最可能出现的词"。

**误区二：AI"理解"内容**
真相：AI并不真正理解语言的含义。它将文字转换为数字（向量），通过数学运算找出词语之间的关联模式。

**误区三：AI有"知识"**
真相：AI没有知识库。它的"知识"实际上是训练数据中的统计规律。这就是为什么它会产生"幻觉"——自信地编造不存在的信息。

**核心原理：下一个词预测**
大语言模型（LLM）的核心任务很简单：给定前面的词，预测下一个最可能出现的词。

比如输入"今天天气"，模型会计算：
- "很好" 的概率：35%
- "不错" 的概率：28%
- "晴朗" 的概率：20%
- ...

然后选择概率最高的词，继续预测下一个，直到生成完整的回答。`,
        keyPoint: 'AI的本质是统计模型，预测下一个词。它不思考、不理解、没有意识。',
      },
      {
        type: 'example',
        title: '示例：AI如何"写"出一篇文章',
        content: `让我们看一个具体的例子。假设你问AI："请介绍一下北京"

AI的处理过程：

1. **接收输入**："请介绍一下北京"
2. **Token化**：将文字转换为数字序列 [2341, 8923, 1234, 5678, ...]
3. **计算概率**：
   - 第一个词："北京" → 概率最高（上下文匹配）
   - 第二个词："是" → 概率较高（语法结构）
   - 第三个词："中国" → 概率很高（语义关联）
   - 第四个词："的" → 概率很高（语法延续）
   - 第五个词："首都" → 概率最高（事实关联）
4. **逐词生成**："北京是中国的首都，位于华北地区..."

整个过程就是不断重复：预测下一个词 → 选择概率最高的 → 添加到序列 → 继续预测。

这就是为什么AI有时会"胡说"——如果训练数据中有错误的统计模式，或者概率分布导致选择了不准确的词，就会产生错误信息。`,
      },
      {
        type: 'note',
        title: '关键提醒',
        content: '永远要验证AI的事实性回答，尤其是在医疗、金融、法律等敏感领域。AI的自信不等于正确。',
      },
      {
        type: 'concept',
        title: 'Transformer：现代AI的核心架构',
        content: `现在你理解了AI在"预测下一个词"，但它是如何做到这一点的呢？答案是：**Transformer架构**。

Transformer是2017年Google提出的神经网络架构，它革命性地改变了自然语言处理领域。

**核心创新：自注意力机制（Self-Attention）**

自注意力机制让模型能够：
1. **理解上下文关系**：当读到"苹果"时，模型能根据上下文判断是指水果还是公司
2. **捕捉长距离依赖**：理解文章开头和结尾之间的关联
3. **并行处理**：相比之前的RNN，Transformer可以并行计算，大大提高了训练效率

**简单理解自注意力**：
想象你在读一句话时，眼睛会自然地在相关词语之间跳跃。比如读到"它"时，你会回头看"苹果"或"公司"。自注意力机制就是模拟这种"回头看"的能力，让模型知道哪些词之间有关联。

**为什么Transformer如此强大？**
- 可以处理非常长的文本（上下文窗口）
- 训练效率高，可以处理海量数据
- 学到的表示能力强，可以迁移到各种任务`,
        keyPoint: 'Transformer通过自注意力机制理解词与词之间的关系，是现代大语言模型的基础架构。',
      },
      {
        type: 'concept',
        title: '训练三阶段：预训练、微调、RLHF',
        content: `大语言模型不是一蹴而就的，它经历了三个阶段的训练：

**第一阶段：预训练（Pre-training）**
- **数据**：海量互联网文本（数百亿到数万亿词）
- **目标**：学习语言的基本规律和世界知识
- **结果**：基础模型（如GPT-3）
- **特点**：通用能力强，但可能产生有害内容

**第二阶段：微调（Fine-tuning）**
- **数据**：高质量、有标注的数据
- **目标**：让模型更好地完成特定任务
- **结果**：任务专用模型
- **特点**：在特定领域表现更好

**第三阶段：RLHF（人类反馈强化学习）**
- **数据**：人类对模型输出的偏好排序
- **目标**：让模型输出更符合人类价值观
- **结果**：ChatGPT、Claude等对话模型
- **特点**：更安全、更有用、更符合人类期望

**为什么需要RLHF？**
预训练模型虽然能力强，但：
- 可能生成有害内容
- 回答风格不符合人类偏好
- 不会说"我不知道"

RLHF通过人类反馈告诉模型："这个回答比那个更好"，让模型学会生成人类喜欢的回答。`,
        keyPoint: '大模型训练分三阶段：预训练学习语言规律，微调提升特定能力，RLHF对齐人类价值观。',
      },
      {
        type: 'warning',
        title: 'AI的局限性',
        content: `了解AI的局限性，才能正确使用它：

1. **知识截止日期**：模型不知道训练数据之后发生的事情
2. **幻觉问题**：可能自信地编造不存在的信息
3. **缺乏常识**：在某些常识推理上表现不佳
4. **数学能力**：复杂计算容易出错
5. **上下文限制**：一次能处理的文本长度有限
6. **无法真正理解**：只是模式匹配，不是真正理解`,
      },
    ],
    summary: '本节课我们建立了对AI的正确认知：AI是数学，不是魔法。它通过预测下一个词来生成文本，使用Transformer架构理解词之间的关系，经过预训练、微调和RLHF三个阶段成为可用的对话模型。记住AI的局限性，才能正确使用它。',
    keyPoints: [
      'AI的本质是统计模型，预测下一个词',
      'AI不思考、不理解、没有意识',
      'Transformer的自注意力机制让模型理解词与词之间的关系',
      '训练分三阶段：预训练→微调→RLHF',
      'AI有局限性：知识截止、幻觉、缺乏真正理解',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'AI的"思考"过程本质是什么？',
        options: [
          '真正的智能推理',
          '计算概率预测下一个词',
          '搜索数据库',
          '模拟人类大脑神经元',
        ],
        answer: '计算概率预测下一个词',
        explanation: 'AI不真正"思考"，它基于训练数据计算每个可能的下一个词的概率，选择概率最高的词继续生成。',
      },
      {
        type: 'choice',
        question: 'Transformer架构的核心创新是什么？',
        options: [
          '更多的神经网络层',
          '自注意力机制（Self-Attention）',
          '更大的训练数据集',
          '更快的GPU计算',
        ],
        answer: '自注意力机制（Self-Attention）',
        explanation: '自注意力机制让模型能够理解词与词之间的关系，捕捉上下文信息，是Transformer的核心创新。',
      },
      {
        type: 'choice',
        question: 'RLHF（人类反馈强化学习）的主要目的是什么？',
        options: [
          '提高模型的计算速度',
          '让模型学习更多知识',
          '让模型输出更符合人类价值观',
          '减少模型的参数量',
        ],
        answer: '让模型输出更符合人类价值观',
        explanation: 'RLHF通过人类反馈告诉模型哪些回答更好，让模型学会生成更安全、更有用、更符合人类期望的回答。',
      },
    ],
    references: [
      {
        type: 'paper',
        title: 'Attention Is All You Need',
        url: 'https://arxiv.org/abs/1706.03762',
        note: 'Transformer架构的原始论文',
      },
      {
        type: 'article',
        title: 'How ChatGPT Works',
        url: 'https://openai.com/research/chatgpt',
        note: 'OpenAI官方对ChatGPT工作原理的解释',
      },
    ],
  },

  'tokenization-basics': {
    id: 'tokenization-basics',
    title: 'Tokenization：文字如何变成数字',
    subtitle: '理解AI处理文本的第一步',
    duration: 35,
    difficulty: 'beginner',
    tags: ['Tokenization', '文本处理', '技术基础'],
    objectives: [
      '理解Tokenization的概念和作用',
      '掌握Token和字符的区别',
      '了解上下文窗口的限制',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：AI如何"读"文字？',
        content: `上节课我们知道了AI预测下一个词来生成文本。但这里有个问题：AI是计算机程序，它只认识数字，不认识文字。

那么，"今天天气不错"这句话，是如何变成AI能理解的数字的呢？

答案就是：**Tokenization（分词）**。`,
      },
      {
        type: 'concept',
        title: '什么是Tokenization？',
        content: `Tokenization是将文本分割成小块（Token），并将每个Token映射为数字的过程。

**简单理解**：
- 英文："Hello world" → ["Hello", " world"] → [15496, 995]
- 中文："你好世界" → ["你", "好", "世", "界"] → [1234, 5678, 9012, 3456]

**Token ≠ 字/词**
这是一个常见的误解。Token不一定是完整的字或词：

- 常见词通常是一个Token："the", "and", "你好"
- 生僻词可能被拆成多个Token："Tokenization" → ["Token", "ization"]
- 中文通常1-2个字符一个Token

**为什么需要Tokenization？**
1. **统一表示**：将所有语言转换为统一的数字表示
2. **控制词汇量**：限制模型需要学习的词汇数量（通常5万左右）
3. **处理未登录词**：通过子词拆分，处理从未见过的词`,
        keyPoint: 'Tokenization将文本转换为数字序列。Token不等于字或词，常见词通常一个Token，生僻词可能拆成多个。',
      },
      {
        type: 'code',
        title: '代码示例：使用Tiktoken进行Tokenization',
        content: '让我们看看实际的Tokenization过程：',
        code: `import tiktoken

# 获取GPT-4的编码器
encoder = tiktoken.encoding_for_model("gpt-4")

# 示例文本
text = "今天天气真不错，适合出去散步！"

# 编码：文本 → Token IDs
tokens = encoder.encode(text)
print(f"文本: {text}")
print(f"Token数量: {len(tokens)}")
print(f"Token IDs: {tokens}")
# 输出: Token IDs: [23729, 63842, 11838, 63842, ...]

# 解码：Token IDs → 文本
decoded = encoder.decode(tokens)
print(f"解码后: {decoded}")

# 查看每个Token对应的文本
for token_id in tokens:
    token_text = encoder.decode([token_id])
    print(f"Token {token_id}: '{token_text}'")`,
        language: 'python',
      },
      {
        type: 'example',
        title: 'Token数量对比',
        content: `不同语言的Token效率不同：

**英文**：
- "Hello, how are you?" → 6 tokens
- 效率较高，常见词都是单个Token

**中文**：
- "你好，你好吗？" → 8 tokens
- 效率较低，通常1-2个字符一个Token

**代码**：
- "def hello_world():" → 8 tokens
- 标点符号和空格也占用Token

**实际影响**：
- 中文内容的API调用成本通常是英文的1.5-2倍
- 上下文窗口能容纳的中文字符数比英文少`,
      },
      {
        type: 'concept',
        title: '上下文窗口：AI的"记忆"限制',
        content: `Tokenization直接影响一个重要的概念：**上下文窗口（Context Window）**。

**什么是上下文窗口？**
上下文窗口是模型一次能处理的Token数量上限。比如：
- GPT-3.5: 4K tokens（约3000英文词/2000中文字）
- GPT-4: 8K/32K/128K tokens
- Claude 3: 200K tokens

**为什么有上限？**
1. **计算复杂度**：自注意力机制的计算量与Token数量的平方成正比
2. **内存限制**：存储注意力矩阵需要大量显存
3. **训练成本**：长序列训练成本极高

**实际意义**：
- 如果你的文档太长，需要分段处理
- 对话历史太长时，早期的内容会被"遗忘"
- 设计Prompt时要考虑Token数量`,
        keyPoint: '上下文窗口是模型一次能处理的Token数量上限。中文的Token效率较低，同样的窗口能处理的字数更少。',
      },
      {
        type: 'code',
        title: '代码示例：计算文本的Token数量',
        content: '在开发AI应用时，经常需要计算Token数量：',
        code: `import tiktoken

def count_tokens(text: str, model: str = "gpt-4") -> int:
    """计算文本的Token数量"""
    encoder = tiktoken.encoding_for_model(model)
    return len(encoder.encode(text))

def estimate_cost(input_tokens: int, output_tokens: int, model: str = "gpt-4") -> float:
    """估算API调用成本（美元）"""
    # 价格示例（实际价格请参考OpenAI官网）
    pricing = {
        "gpt-4": {"input": 0.03, "output": 0.06},  # 每1K tokens
        "gpt-3.5-turbo": {"input": 0.0015, "output": 0.002},
    }

    price = pricing.get(model, pricing["gpt-4"])
    input_cost = (input_tokens / 1000) * price["input"]
    output_cost = (output_tokens / 1000) * price["output"]

    return input_cost + output_cost

# 使用示例
long_text = "这是一段很长的文本..." * 100
token_count = count_tokens(long_text)
print(f"Token数量: {token_count}")
print(f"预估成本: {estimate_cost(token_count, 500):.4f}")`,
        language: 'python',
      },
    ],
    summary: '本节课我们学习了Tokenization——将文本转换为数字的过程。Token不等于字或词，中文的Token效率较低。上下文窗口限制了模型一次能处理的Token数量，这是设计AI应用时必须考虑的重要因素。',
    keyPoints: [
      'Tokenization将文本分割成Token并映射为数字',
      'Token不等于字或词，常见词通常一个Token',
      '中文Token效率较低，1-2个字符通常一个Token',
      '上下文窗口限制模型一次能处理的Token数量',
      '设计Prompt和AI应用时要考虑Token数量',
    ],
    exercises: [
      {
        type: 'choice',
        question: '关于Token，以下说法正确的是？',
        options: [
          '一个Token一定对应一个汉字',
          '一个Token一定对应一个英文单词',
          'Token是文本的数字表示，可能对应多个字符或部分单词',
          'Token数量与字符数量总是相等',
        ],
        answer: 'Token是文本的数字表示，可能对应多个字符或部分单词',
        explanation: 'Token是文本的数字表示，常见词通常一个Token，但生僻词可能被拆成多个Token，中文通常1-2个字符一个Token。',
      },
      {
        type: 'choice',
        question: '为什么中文的API调用成本通常比英文高？',
        options: [
          '中文模型更贵',
          '中文的Token效率较低，同样内容需要更多Token',
          '中文计算更复杂',
          '中文需要特殊的处理',
        ],
        answer: '中文的Token效率较低，同样内容需要更多Token',
        explanation: '中文通常1-2个字符一个Token，而英文常见词都是单个Token，所以同样内容中文需要更多Token，成本更高。',
      },
    ],
  },
};
