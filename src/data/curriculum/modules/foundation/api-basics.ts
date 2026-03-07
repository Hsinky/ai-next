// Foundation - 参数控制与API调用 课程数据

import type { Lesson } from '../types';

export const apiBasicsLessons: Record<string, Lesson> = {
  'parameters-explained': {
    id: 'parameters-explained',
    title: '核心参数详解：Temperature、Top-P、Top-K',
    subtitle: '掌握控制AI输出的关键参数',
    duration: 40,
    difficulty: 'beginner',
    tags: ['API参数', 'Temperature', '输出控制'],
    objectives: [
      '理解Temperature参数的作用和最佳实践',
      '掌握Top-P和Top-K的区别与应用',
      '学会根据场景选择合适的参数组合',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么AI的回答有时候"创意十足"，有时候"一本正经"？',
        content: `你可能发现，有时候ChatGPT的回答很"活泼"，有时候又很"严谨"。这不是随机现象，而是由一个关键参数控制的：**Temperature（温度）**。

这节课，我们将深入理解控制AI输出的核心参数，让你能够精准控制AI的"性格"。`,
      },
      {
        type: 'concept',
        title: 'Temperature：控制"创意度"',
        content: `**什么是Temperature？**
Temperature控制模型选择下一个词时的"随机性"程度。

**形象理解**：
- Temperature低（0-0.3）：像考试答题，选择最"标准"的答案
- Temperature高（0.7-1.0）：像创意写作，愿意尝试"出人意料"的表达

**工作原理**：
模型为每个可能的下一个词计算概率，Temperature影响这些概率分布：

- **Temperature = 0**：只选概率最高的词，输出完全确定
- **Temperature = 0.3**：倾向于选择概率高的词，但有小概率选择其他词
- **Temperature = 0.7**：概率分布更平均，更可能选择"意外"的词
- **Temperature = 1.0+**：概率非常平均，输出更加随机

**实际例子**：
输入："今天天气"
- Temperature=0: "很好"（最高概率，最常见）
- Temperature=0.3: "很好"或"不错"（选择概率较高的）
- Temperature=0.7: "真好"或"晴朗"或"不错"（更多变化）
- Temperature=1.0: "多变"或"糟糕"或"晴朗"（更随机）`,
        keyPoint: 'Temperature控制输出的随机性。低温度=确定性高，高温度=创意性强。',
      },
      {
        type: 'code',
        title: '代码示例：不同Temperature的效果',
        content: '让我们看看Temperature如何影响输出：',
        code: `from openai import OpenAI

client = OpenAI()

def generate_with_temperature(prompt: str, temperature: float) -> str:
    """使用不同温度生成文本"""
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=temperature,
    )
    return response.choices[0].message.content

prompt = "用一句话描述春天"

print("Temperature = 0 (确定性最高):")
for _ in range(3):
    print(f"  {generate_with_temperature(prompt, 0)}")

print("\\nTemperature = 0.7 (创意适中):")
for _ in range(3):
    print(f"  {generate_with_temperature(prompt, 0.7)}")

print("\\nTemperature = 1.0 (创意最强):")
for _ in range(3):
    print(f"  {generate_with_temperature(prompt, 1.0)}")

# 输出示例：
# Temperature = 0:
#   春天是万物复苏的季节，鲜花盛开，生机盎然。
#   春天是万物复苏的季节，鲜花盛开，生机盎然。
#   春天是万物复苏的季节，鲜花盛开，生机盎然。
#
# Temperature = 0.7:
#   春风拂面，樱花烂漫，大地披上了五彩斑斓的新装。
#   春天的脚步轻盈，带来满园的芬芳与希望。
#   春雨润物细无声，唤醒了沉睡的大地。
#
# Temperature = 1.0:
#   樱花如雪飘落，空气中弥漫着新生的气息。
#   沉睡的种子破土而出，迎接第一缕暖阳。
#   春天的画笔勾勒出生命的色彩。`,
        language: 'python',
      },
      {
        type: 'concept',
        title: 'Temperature使用场景指南',
        content: `**Temperature = 0（确定性输出）**
适用场景：
- 代码生成：需要准确、一致的代码
- 数据提取：格式化输出，如JSON
- 翻译任务：需要准确翻译
- 问答系统：期望标准答案

**Temperature = 0.3-0.5（平衡模式）**
适用场景：
- 客服对话：友好但不过于随意
- 内容改写：保留原意但有些变化
- 文档总结：准确但不死板

**Temperature = 0.7-1.0（创意模式）**
适用场景：
- 创意写作：故事、诗歌、文案
- 头脑风暴：产生多样化的想法
- 角色扮演：更有个性的回答
- 游戏对话：更自然的互动`,
      },
      {
        type: 'concept',
        title: 'Top-P：核采样参数',
        content: `**什么是Top-P？**
Top-P（也称为nucleus sampling）控制模型从概率累计达到P的词中选择。

**工作原理**：
模型将所有可能的下一个词按概率从高到低排序，然后只从概率累计达到P的词中选择。

**例子**：
假设下一个词的概率分布：
- "很好": 40%
- "不错": 25%
- "晴朗": 15%
- "真好": 10%
- "糟糕": 5%
- 其他: 5%

- **Top-P = 0.5**：只从["很好", "不错"]中选择（累计65% > 50%）
- **Top-P = 0.9**：从["很好", "不错", "晴朗", "真好", "糟糕"]中选择（累计95% > 90%）

**与Temperature的区别**：
- Temperature：平滑概率分布
- Top-P：截断候选词列表

**实际使用**：
- 通常设置Top-P=1，只用Temperature控制
- 或者设置Temperature=1，只用Top-P控制
- 不建议同时调整两者`,
        keyPoint: 'Top-P从概率累计达到P的词中选择，是一种截断策略。通常只用Temperature或Top-P之一。',
      },
      {
        type: 'concept',
        title: 'Top-K：另一种采样策略',
        content: `**什么是Top-K？**
Top-K限制模型只从概率最高的K个词中选择。

**例子**：
- Top-K = 5：只从概率最高的5个词中选择
- Top-K = 1：等同于Temperature=0，只选最高概率的词

**Top-P vs Top-K**：
- Top-K：固定候选词数量
- Top-P：动态调整候选词数量（根据概率分布）

**实践建议**：
现代API（如OpenAI）通常只暴露Temperature和Top-P参数，Top-K较少使用。

**参数组合建议**：
| 场景 | Temperature | Top-P | Top-K |
|------|-------------|-------|-------|
| 代码生成 | 0 | 1 | - |
| 数据提取 | 0 | 1 | - |
| 客服对话 | 0.3 | 1 | - |
| 创意写作 | 0.7-1 | 1 | - |
| 多样化输出 | 1 | 0.9 | - |`,
      },
      {
        type: 'code',
        title: '代码示例：生产环境的参数配置',
        content: '不同场景的推荐参数配置：',
        code: `from openai import OpenAI
from typing import Literal

client = OpenAI()

# 预设配置
PRESETS = {
    "code": {"temperature": 0, "top_p": 1},
    "data_extraction": {"temperature": 0, "top_p": 1},
    "chat": {"temperature": 0.3, "top_p": 1},
    "creative": {"temperature": 0.8, "top_p": 0.95},
    "brainstorm": {"temperature": 1.0, "top_p": 0.9},
}

def generate(
    prompt: str,
    preset: Literal["code", "data_extraction", "chat", "creative", "brainstorm"],
    system_prompt: str = None,
) -> str:
    """使用预设配置生成文本"""
    params = PRESETS[preset]

    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})

    response = client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        temperature=params["temperature"],
        top_p=params["top_p"],
    )

    return response.choices[0].message.content

# 使用示例
code = generate("写一个Python函数计算斐波那契数列", "code")
chat = generate("介绍一下你自己", "chat")
story = generate("写一个关于时间旅行的短篇故事", "creative")`,
        language: 'python',
      },
      {
        type: 'warning',
        title: '常见误区',
        content: `1. **Temperature=0不等于完全确定性**：API层面可能有微小差异，生产环境需要固定seed参数
2. **高Temperature不等于高质量**：创意任务才需要高Temperature，准确性任务用低值
3. **不要同时调Temperature和Top-P**：可能导致不可预测的行为
4. **Temperature影响输出长度**：高Temperature可能产生更长或更短的输出`,
      },
    ],
    summary: '本节课深入理解了控制AI输出的核心参数：Temperature控制随机性，低温度适合确定性任务，高温度适合创意任务。Top-P和Top-K是另一种采样策略，通常只需用Temperature或Top-P之一。根据场景选择合适的参数组合，是高效使用AI的关键。',
    keyPoints: [
      'Temperature控制输出随机性：0=确定性，1=高创意',
      '低Temperature适合代码生成、数据提取等准确性任务',
      '高Temperature适合创意写作、头脑风暴等创意任务',
      'Top-P从概率累计达到P的词中选择',
      '通常只用Temperature或Top-P之一，不建议同时调整',
    ],
    exercises: [
      {
        type: 'choice',
        question: '生成代码时，应该使用什么Temperature值？',
        options: [
          'Temperature = 1.0（高创意）',
          'Temperature = 0.5（平衡）',
          'Temperature = 0（确定性）',
          '无所谓，任何值都可以',
        ],
        answer: 'Temperature = 0（确定性）',
        explanation: '代码生成需要准确、一致的输出，应该使用Temperature=0确保确定性。',
      },
      {
        type: 'choice',
        question: '关于Top-P和Temperature，以下说法正确的是？',
        options: [
          '必须同时调整才能获得最佳效果',
          '通常只用其中之一，不建议同时调整',
          'Top-P比Temperature更重要',
          'Temperature是旧参数，已被Top-P取代',
        ],
        answer: '通常只用其中之一，不建议同时调整',
        explanation: 'Temperature和Top-P都用于控制输出的随机性，同时调整可能导致不可预测的行为。',
      },
    ],
  },

  'context-window': {
    id: 'context-window',
    title: '上下文窗口与输出控制',
    subtitle: '理解模型的"记忆"限制和输出控制',
    duration: 35,
    difficulty: 'beginner',
    tags: ['上下文窗口', '输出控制', 'Token限制'],
    objectives: [
      '深入理解上下文窗口的概念和影响',
      '掌握输出长度控制方法',
      '学会处理长文本的策略',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么AI会"忘记"之前说过的话？',
        content: `你可能遇到过这样的情况：和一个AI聊了很久，突然发现它"忘记"了最开始讨论的内容。这不是AI的问题，而是**上下文窗口**的限制。

理解上下文窗口，对于构建可靠的AI应用至关重要。`,
      },
      {
        type: 'concept',
        title: '深入理解上下文窗口',
        content: `**什么是上下文窗口？**
上下文窗口是模型一次能处理的Token数量上限，包括：
- 输入Prompt
- 对话历史
- 模型输出

**形象理解**：
把AI想象成一个只能看到最近N个词的"窗口"。超出窗口的内容，AI就"看不见"了。

**主流模型的上下文窗口**：
| 模型 | 上下文窗口 | 约等于中文字符 |
|------|-----------|---------------|
| GPT-3.5 | 4K | ~2,000字 |
| GPT-4 | 8K | ~4,000字 |
| GPT-4-32K | 32K | ~16,000字 |
| GPT-4-Turbo | 128K | ~64,000字 |
| Claude 3 | 200K | ~100,000字 |

**上下文窗口的影响**：
1. **对话长度限制**：长对话会被截断
2. **文档处理限制**：长文档需要分段
3. **成本影响**：输入Token越多，成本越高`,
        keyPoint: '上下文窗口是模型一次能处理的Token上限，包括输入、历史和输出。超出窗口的内容会被"忘记"。',
      },
      {
        type: 'concept',
        title: '输入与输出的Token分配',
        content: `**Token分配计算**：
总上下文 = 输入Prompt + 对话历史 + 输出预留

**示例计算**（GPT-4，8K窗口）：
- 总窗口：8,000 tokens
- 系统提示：500 tokens
- 用户输入：500 tokens
- 对话历史：3,000 tokens
- 输出预留：4,000 tokens
- **已使用**：500 + 500 + 3,000 = 4,000 tokens
- **剩余可用输出**：4,000 tokens

**关键点**：
1. 输入越多，输出空间越少
2. 长对话需要管理历史
3. 复杂任务需要更多输出空间`,
      },
      {
        type: 'code',
        title: '代码示例：管理上下文窗口',
        content: '如何有效管理上下文窗口：',
        code: `from openai import OpenAI
from typing import List, Dict
import tiktoken

client = OpenAI()

class ContextManager:
    """上下文管理器"""

    def __init__(self, model: str = "gpt-4", max_tokens: int = 4096):
        self.model = model
        self.max_tokens = max_tokens
        self.encoder = tiktoken.encoding_for_model(model)
        self.messages: List[Dict] = []

    def count_tokens(self, text: str) -> int:
        """计算文本的Token数量"""
        return len(self.encoder.encode(text))

    def add_message(self, role: str, content: str):
        """添加消息到历史"""
        self.messages.append({"role": role, "content": content})

    def truncate_history(self, reserved_output_tokens: int = 1000):
        """截断历史消息以适应上下文窗口"""
        # 计算系统提示占用的Token
        system_tokens = sum(
            self.count_tokens(m["content"])
            for m in self.messages
            if m["role"] == "system"
        )

        # 计算可用历史Token
        available = self.max_tokens - system_tokens - reserved_output_tokens

        # 从最新的消息开始保留
        truncated = []
        current_tokens = 0

        for message in reversed(self.messages):
            if message["role"] == "system":
                continue
            tokens = self.count_tokens(message["content"])
            if current_tokens + tokens <= available:
                truncated.insert(0, message)
                current_tokens += tokens
            else:
                break

        # 保留系统消息
        system_messages = [m for m in self.messages if m["role"] == "system"]

        return system_messages + truncated

# 使用示例
manager = ContextManager(model="gpt-4", max_tokens=4096)
manager.add_message("system", "你是一个有用的助手。")

# 模拟长对话
for i in range(20):
    manager.add_message("user", f"这是第{i+1}条消息，内容较长...")
    manager.add_message("assistant", f"收到第{i+1}条消息，这是回复...")

# 获取截断后的消息列表
truncated_messages = manager.truncate_history()
print(f"原始消息数: {len(manager.messages)}")
print(f"截断后消息数: {len(truncated_messages)}")`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '输出长度控制',
        content: `**max_tokens参数**
直接控制输出的最大Token数量：

\`\`\`python
response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": "介绍一下Python"}],
    max_tokens=100  # 限制输出在100个Token内
)
\`\`\`

**使用场景**：
- API调用成本控制
- 需要简洁回答
- 格式化输出（如单行回复）

**注意事项**：
- max_tokens只限制输出长度
- 超出限制会被截断，可能不完整
- 不影响输入Token限制

**输出截断检测**：
\`\`\`python
response = client.chat.completions.create(...)
finish_reason = response.choices[0].finish_reason

if finish_reason == "length":
    print("输出被截断，需要增加max_tokens或优化Prompt")
\`\`\``,
        keyPoint: 'max_tokens参数控制输出的最大Token数量，超出会被截断。通过finish_reason可以检测是否截断。',
      },
      {
        type: 'concept',
        title: '处理长文本的策略',
        content: `**策略一：分段处理**
将长文本分成多个部分，分别处理：

\`\`\`python
def process_long_document(document: str, chunk_size: int = 2000):
    chunks = [document[i:i+chunk_size] for i in range(0, len(document), chunk_size)]
    results = []
    for chunk in chunks:
        result = process_chunk(chunk)
        results.append(result)
    return combine_results(results)
\`\`\`

**策略二：摘要压缩**
先对长文本进行摘要，再处理：

\`\`\`python
def process_with_summary(long_text: str):
    # 第一步：生成摘要
    summary = generate_summary(long_text)
    # 第二步：基于摘要回答
    answer = generate_answer(summary, question)
    return answer
\`\`\`

**策略三：检索增强（RAG）**
只检索相关部分处理：
- 建立文档的向量索引
- 根据问题检索相关片段
- 只将相关片段作为上下文

**策略四：使用大窗口模型**
对于特别长的文档，考虑使用：
- GPT-4-Turbo（128K）
- Claude 3（200K）`,
      },
    ],
    summary: '本节课深入理解了上下文窗口——模型一次能处理的Token上限。我们学习了如何管理对话历史、控制输出长度、以及处理长文本的多种策略。理解这些限制和策略，是构建可靠AI应用的基础。',
    keyPoints: [
      '上下文窗口包括输入Prompt、对话历史和输出',
      '超出窗口的内容会被"忘记"',
      '输入越多，输出空间越少',
      'max_tokens控制输出长度，可能被截断',
      '长文本策略：分段处理、摘要压缩、RAG检索、使用大窗口模型',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'GPT-4的8K上下文窗口大约能处理多少中文字符？',
        options: [
          '8,000字',
          '4,000字',
          '16,000字',
          '2,000字',
        ],
        answer: '4,000字',
        explanation: '中文的Token效率较低，通常1-2个字符一个Token，所以8K tokens约等于4,000中文字符。',
      },
      {
        type: 'choice',
        question: '当输出被截断时，finish_reason的值是什么？',
        options: [
          'stop',
          'length',
          'content_filter',
          'truncated',
        ],
        answer: 'length',
        explanation: 'finish_reason为"length"表示输出达到max_tokens限制被截断，"stop"表示正常结束。',
      },
    ],
  },
};