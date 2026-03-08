// 多模态AI - 课程数据

import type { Lesson } from '../../types';

export const multimodalLessons: Record<string, Lesson> = {
  'multimodal-intro': {
    id: 'multimodal-intro',
    title: '多模态AI入门',
    subtitle: '从文本到多感官智能',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['多模态', 'AI', '前沿'],
    objectives: [
      '理解多模态AI的核心概念',
      '了解多模态模型的架构原理',
      '掌握多模态应用的设计思路',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：超越文本的AI',
        content: `传统AI主要处理文本，但真实世界是多感官的：图像、音频、视频、触觉……

多模态AI让机器像人类一样，同时理解和使用多种模态的信息。`,
      },
      {
        type: 'concept',
        title: '什么是多模态AI？',
        content: `**多模态（Multimodal）**指能够处理和理解多种类型数据（模态）的AI系统。

**常见模态**：
- 文本：自然语言
- 图像：视觉信息
- 音频：声音和语音
- 视频：时序视觉
- 3D：空间信息
- 触觉：压力、温度等

**多模态能力**：

**输入理解**：
- 看图说话（图像→文本）
- 听音识别（音频→文本）
- 跨模态检索（文搜图）

**输出生成**：
- 文生图（Text-to-Image）
- 文生视频（Text-to-Video）
- 文生音频（Text-to-Audio）

**跨模态交互**：
- 图像问答（Image Q&A）
- 视觉对话
- 多模态推理

**为什么重要？**
- 更丰富的交互体验
- 更准确的信息理解
- 更广的应用场景`,
        keyPoint: '多模态AI能理解、生成和交互多种类型的数据，突破单一模态的限制。',
      },
      {
        type: 'concept',
        title: '多模态模型架构',
        content: `**架构一：早期融合**
\`\`\`
图像 → Encoder → ┐
                 ├→ 融合层 → Decoder → 输出
文本 → Encoder → ┘
\`\`\`
特点：在特征层面早期融合，优点是模态交互充分，缺点是模态表示对齐困难。

**架构二：晚期融合**
\`\`\`
图像 → Encoder → 特征A → ┐
                           ├→ 融合层 → 输出
文本 → Encoder → 特征B → ┘
\`\`\`
特点：在各模态独立编码后融合，优点是设计简单，缺点是跨模态交互受限。

**架构三：交叉注意力（主流）**
\`\`\`
文本编码 → ┐
           ├→ Cross-Attention → 输出
图像编码 → ┘
\`\`\`
特点：通过注意力机制让模态间信息流动，如CLIP、GPT-4V、Gemini。`,
      },
      {
        type: 'concept',
        title: '经典多模态模型',
        content: `**CLIP（Contrastive Language-Image Pre-training）**
- 模型：OpenAI
- 能力：文本-图像对齐，实现文搜图、图搜文
- 原理：对比学习，让文本和图像在共享空间对齐

**GPT-4V（GPT-4 with Vision）**
- 模型：OpenAI
- 能力：理解图像，支持图像+文本输入
- 原理：视觉编码器+语言模型，交叉注意力融合

**Gemini（Google）**
- 模型：Google DeepMind
- 能力：文本、图像、音频、视频、代码多模态
- 原理：原生多模态架构，统一表示空间

**DALL-E 3 / Midjourney**
- 模型：OpenAI / Midjourney
- 能力：文本生成高质量图像
- 原理：扩散模型，从噪声逐步生成图像

**Whisper**
- 模型：OpenAI
- 能力：语音转文字
- 原理：Transformer编码器，端到端训练`,
      },
      {
        type: 'code',
        title: '代码示例：使用CLIP进行文搜图',
        content: '用CLIP实现文本搜索图片：',
        code: `import torch
from PIL import Image
import clip
from tqdm import tqdm

# 加载CLIP模型
device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/32", device=device)

# 1. 编码查询文本
text_query = "a beautiful sunset over the ocean"
text_tokens = clip.tokenize([text_query]).to(device)

with torch.no_grad():
    text_features = model.encode_text(text_tokens)
    text_features = text_features / text_features.norm(dim=1, keepdim=True)

# 2. 编码图片库（假设已提前编码）
# image_features = ...

# 3. 计算相似度
similarity = (text_features @ image_features.T).squeeze(0)

# 4. 排序返回最相似的图片
sorted_indices = similarity.argsort(descending=True)
top_k = sorted_indices[:5]  # 返回Top-5

print(f"最匹配的图片索引: {top_k.tolist()}")`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：多模态应用场景',
        content: `**场景一：智能客服**
- 用户上传截图描述问题
- 系统同时理解图片和文字
- 给出精准解决方案

**场景二：教育辅助**
- 拍照识别题目
- 分析题目类型
- 提供解题思路

**场景三：医疗影像**
- 上传X光片/CT
- AI结合图像和病历文本
- 辅助诊断建议

**场景四：内容审核**
- 同时分析文本、图像、视频
- 多维度识别违规内容
- 降低误判率`,
      },
      {
        type: 'note',
        title: '多模态挑战',
        content: '多模态AI仍面临挑战：模态对齐困难、计算资源需求大、数据标注成本高、模型偏见更复杂。需要谨慎选择应用场景。',
      },
    ],
    summary: '多模态AI能处理文本、图像、音频等多种数据，核心架构包括早期融合、晚期融合和交叉注意力。经典模型如CLIP、GPT-4V、Gemini已广泛应用于文搜图、图像问答等场景。',
    keyPoints: [
      '多模态AI处理多种类型数据：文本、图像、音频、视频',
      '主流架构是交叉注意力，让模态间信息流动',
      '经典模型：CLIP、GPT-4V、Gemini、DALL-E、Whisper',
      '应用场景：智能客服、教育辅助、医疗影像、内容审核',
    ],
    exercises: [
      {
        type: 'choice',
        question: '多模态AI指的是？',
        options: [
          '只处理文本的AI',
          '能处理多种类型数据的AI',
          '运行在多种设备上的AI',
          '有多个模型的AI',
        ],
        answer: '能处理多种类型数据的AI',
        explanation: '多模态AI能够同时理解和处理多种类型（模态）的数据，如文本、图像、音频等。',
      },
      {
        type: 'choice',
        question: 'CLIP的主要能力是？',
        options: [
          '生成图像',
          '语音识别',
          '文本-图像对齐，实现文搜图',
          '代码生成',
        ],
        answer: '文本-图像对齐，实现文搜图',
        explanation: 'CLIP通过对比学习实现文本和图像在共享空间的对齐，支持文搜图、图搜文等跨模态任务。',
      },
    ],
  },

  'multimodal-applications': {
    id: 'multimodal-applications',
    title: '多模态AI应用',
    subtitle: '构建跨感官的AI产品',
    duration: 50,
    difficulty: 'advanced',
    tags: ['多模态', '应用', '产品'],
    objectives: [
      '掌握多模态应用的产品设计',
      '学会多模态API的调用方法',
      '了解多模态应用的挑战与对策',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：设计多模态产品',
        content: `从纯文本到多模态，产品设计需要重新思考：
- 用户如何输入多种信息？
- 不同模态如何组合理解？
- 输出应该用什么形式？

本节课讨论多模态应用的实战设计。`,
      },
      {
        type: 'concept',
        title: '多模态交互设计',
        content: `**输入设计**：

**单模态输入**：
- 只传文本：传统方式
- 只传图片：如识别场景
- 只传音频：如语音转文字

**多模态输入**：
- 文本+图片：截图+描述问题
- 图片+音频：图片配音
- 多图：对比分析

**输入组合策略**：
\`\`\`
优先级：图片 > 文本 > 音频

处理流程：
1. 如果有图片 → 图像理解为主
2. 结合文本补充细节
3. 音频作为辅助说明
\`\`\`

**输出设计**：

**单模态输出**：
- 纯文本回复
- 纯图像生成
- 纯音频输出

**多模态输出**：
- 文本+图片：回答+示意图
- 文本+图表：数据可视化
- 视频输出：动态演示`,
      },
      {
        type: 'code',
        title: '代码示例：多模态API调用',
        content: '调用GPT-4V处理图像+文本：',
        code: `from openai import OpenAI
import base64
from PIL import Image
import io

client = OpenAI(api_key="your-api-key")

def encode_image(image_path):
    """将图片编码为base64"""
    with Image.open(image_path) as img:
        # 调整大小减少Token消耗
        img = img.resize((512, 512))
        buffered = io.BytesIO()
        img.save(buffered, format="JPEG")
        return base64.b64encode(buffered.getvalue()).decode()

def analyze_image_with_text(image_path, question):
    """用GPT-4V分析图片并回答问题"""
    base64_image = encode_image(image_path)

    response = client.chat.completions.create(
        model="gpt-4-vision-preview",
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": question
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}",
                            "detail": "low"  # low/high/auto
                        }
                    }
                ]
            }
        ],
        max_tokens=500
    )

    return response.choices[0].message.content

# 使用示例
result = analyze_image_with_text(
    "screenshot.jpg",
    "这个截图显示的是什么？有什么问题吗？"
)
print(result)`,
        language: 'python',
      },
      {
        type: 'code',
        title: '代码示例：文生图应用',
        content: '使用DALL-E 3生成图片：',
        code: `from openai import OpenAI
import requests

client = OpenAI(api_key="your-api-key")

def generate_image(prompt, style="vivid", size="1024x1024"):
    """生成图片"""
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size=size,
        style=style,  # "vivid" 或 "natural"
        quality="standard",  # "standard" 或 "hd"
        n=1
    )

    return response.data[0]

def save_image(image_url, filename):
    """保存图片到本地"""
    response = requests.get(image_url)
    with open(filename, 'wb') as f:
        f.write(response.content)

# 使用示例
prompt = "A futuristic city with flying cars, cyberpunk style, sunset lighting"

print("正在生成图片...")
image_data = generate_image(prompt, style="vivid")

# 保存图片
filename = f"generated_{image_data.revised_prompt[:20].replace(' ', '_')}.png"
save_image(image_data.url, filename)

print(f"图片已保存为: {filename}")
print(f"优化后的提示词: {image_data.revised_prompt}")`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '多模态应用挑战',
        content: `**挑战一：成本控制**
- 图像编码消耗大量Token（如GPT-4V）
- 生成图片API较贵
- 大文件传输成本

**解决**：
- 图片压缩（512x512足够）
- 使用detail="low"降低Token
- 缓存常见分析结果

**挑战二：延迟优化**
- 图像处理慢
- 生成图片需要时间
- 大文件传输慢

**解决**：
- 异步处理
- 流式进度显示
- CDN分发生成内容

**挑战三：内容审核**
- 图片+文本的组合审核复杂
- 生成内容可能有违规
- 用户上传的图片可能有隐含风险

**解决**：
- 多阶段审核（输入、输出、生成）
- 专用图片审核API
- 人工复审机制

**挑战四：用户体验**
- 输入方式学习成本高
- 输出质量不稳定性
- 失败场景如何处理

**解决**：
- 提供多种输入方式（上传/拖拽/粘贴）
- 预设模板降低使用门槛
- 降级方案（纯文本模式）`,
      },
      {
        type: 'example',
        title: '实战：多模态学习助手',
        content: `**产品**：拍照解题+讲解

**功能流程**：

1. **用户上传**
   - 拍照上传题目图片
   - 可选：补充文字说明

2. **多模态理解**
   - 图像识别：识别题目类型、数学公式
   - 文字解析：OCR提取文字
   - 跨模态推理：结合图片和文字

3. **生成解答**
   - 解题步骤（文本）
   - 辅助图示（生成图片）
   - 语音讲解（TTS）

4. **交互学习**
   - 用户可追问某个步骤
   - 用笔迹标注提问
   - 生成相似题目练习

**技术栈**：
- 图像识别：GPT-4V / Gemini Pro Vision
- 文生图：DALL-E 3
- 语音：Whisper + TTS
- 存储：对象存储（S3/OSS）

**关键设计**：
- 图片压缩减少Token
- 缓存相似题目
- 分步加载，先给快速反馈`,
      },
      {
        type: 'note',
        title: '伦理考虑',
        content: '多模态AI的伦理问题更加复杂：深度伪造、隐私侵犯、偏见放大。需要建立内容溯源机制和用户教育。',
      },
    ],
    summary: '多模态应用需要设计输入输出方式、处理多模态API调用。挑战包括成本、延迟、内容审核、用户体验。实战中要考虑压缩、缓存、异步处理等优化策略。',
    keyPoints: [
      '多模态交互设计：单模态输入、多模态输入、组合策略',
      '调用GPT-4V处理图像+文本，DALL-E生成图片',
      '主要挑战：成本、延迟、内容审核、用户体验',
      '优化策略：图片压缩、缓存、异步处理、降级方案',
    ],
    exercises: [
      {
        type: 'choice',
        question: '多模态输入的组合策略中，通常是？',
        options: [
          '音频 > 图片 > 文本',
          '图片 > 文本 > 音频',
          '文本 > 图片 > 音频',
          '所有模态平等',
        ],
        answer: '图片 > 文本 > 音频',
        explanation: '图片包含的信息密度最高，其次文本，音频作为辅助。优先处理图片能获得更多上下文。',
      },
      {
        type: 'choice',
        question: 'GPT-4V的detail参数"low"的作用是？',
        options: [
          '降低输出质量',
          '减少Token消耗，加快处理',
          '只处理黑白图片',
          '生成小尺寸图片',
        ],
        answer: '减少Token消耗，加快处理',
        explanation: 'detail="low"使用低分辨率图像编码，大幅减少Token消耗和处理时间，适合不需要高精度的场景。',
      },
    ],
  },
};
