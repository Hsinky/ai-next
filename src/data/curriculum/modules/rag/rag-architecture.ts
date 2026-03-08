// RAG架构 - 课程数据

import type { Lesson } from '../../types';

export const ragArchitectureLessons: Record<string, Lesson> = {
  'rag-core': {
    id: 'rag-core',
    title: 'RAG架构核心原理',
    subtitle: '理解检索增强生成的价值',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['RAG', '架构'],
    objectives: [
      '理解RAG与传统生成模式的区别',
      '掌握RAG的核心组件和流程',
      '了解RAG解决的具体问题'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么需要RAG？',
        content: `大语言模型有知识截止时间，也容易产生"幻觉"。企业需要用AI处理私有数据，如何做到？

检索增强生成（RAG）是解决方案：先检索相关文档，再基于检索内容生成答案。`,
      },
      {
        type: 'concept',
        title: 'RAG与纯生成的对比',
        content: `**纯生成模式（Non-RAG）**：
- 依赖模型训练时学到的知识
- 无法访问私有数据
- 可能产生幻觉（编造事实）

**RAG模式**：
- 从外部知识库检索相关文档
- 将检索内容作为上下文输入模型
- 模型基于上下文生成答案

**核心差异**：
| 方面 | 纯生成 | RAG |
|-----|---------|-----|
| 知识来源 | 训练数据 | 实时检索 |
| 私有数据 | 不支持 | 支持 |
| 幻觉风险 | 高 | 低 |
| 可溯源 | 否 | 是 |`,
        keyPoint: 'RAG通过检索外部知识，让AI基于实时、私有数据生成答案，降低幻觉。',
      },
      {
        type: 'concept',
        title: 'RAG的核心组件',
        content: `**组件一：文档处理（Document Processing）**
- 接收PDF、Word、HTML等多种格式
- 清洗和标准化文本

**组件二：切分（Chunking）**
- 将长文档分成语义完整的片段
- 考虑段落、章节等自然边界

**组件三：Embedding**
- 将文本转化为向量表示
- 使用模型如 OpenAI embeddings、HuggingFace 模型

**组件四：向量数据库（Vector Database）**
- 存储和检索相似向量
- 如：Pinecone、Milvus、Chroma

**组件五：检索器（Retriever）**
- 查询向量数据库，返回最相关片段
- 可配置返回数量和相似度阈值

**组件六：生成器（Generator）**
- 将检索结果作为上下文
- 构建Prompt让模型生成答案`,
      },
      {
        type: 'code',
        title: '代码示例：基础RAG流程',
        content: '一个简化的RAG管道伪代码：',
        code: `class RAGPipeline:
    def __init__(self, embedding_model, vector_db):
        self.embedding_model = embedding_model
        self.vector_db = vector_db

    def add_document(self, document: str, chunks: list):
        """添加文档到知识库"""
        for chunk in chunks:
            vector = self.embedding_model.embed(chunk)
            self.vector_db.store(vector, metadata={"chunk": chunk})

    def query(self, question: str, top_k=3):
        """查询RAG"""
        # 1. 查询向量获取相关文档
        query_vector = self.embedding_model.embed(question)
        results = self.vector_db.search(query_vector, top_k=top_k)

        # 2. 构建上下文
        context = "\\n\\n".join([r["chunk"] for r in results])

        # 3. 生成答案
        prompt = f"""
基于以下上下文回答问题：
{context}

问题：{question}
"""
        answer = self.generate(prompt)
        return answer, results

# 使用
rag = RAGPipeline(embedding_model, vector_db)
answer, sources = rag.query("公司的隐私政策是什么？")`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：企业知识库问答',
        content: `场景：员工通过RAG系统查询公司内部文档

流程：
1. 员工提问："今年的年假政策是什么？"
2. 系统检索：从员工手册、HR公告中检索相关段落
3. 上下文构建：将检索到的3个段落组合
4. AI生成：基于上下文生成清晰的年假政策说明
5. 结果溯源：提供"来源：员工手册v3.0第12页"`,
      },
    ],
    summary: 'RAG通过检索外部知识、再生成答案，解决了纯生成无法访问私有数据、易产生幻觉的问题。核心组件包括文档处理、切分、Embedding、向量数据库、检索器和生成器。',
    keyPoints: [
      'RAG让AI基于实时、私有数据生成答案',
      '降低幻觉风险、支持结果溯源',
      '核心组件：文档处理、切分、Embedding、向量数据库、检索器、生成器',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'RAG相比纯生成模式，主要优势是？',
        options: [
          '输出更快',
          '可以访问私有数据且降低幻觉',
          '不需要模型训练',
          '更便宜',
        ],
        answer: '可以访问私有数据且降低幻觉',
        explanation: 'RAG通过检索外部知识，让AI基于实时数据生成，减少编造。',
      },
      {
        type: 'choice',
        question: 'RAG中Embedding的作用是？',
        options: [
          '存储文本原文',
          '将文本转化为向量表示用于相似度计算',
          '过滤敏感信息',
          '压缩数据',
        ],
        answer: '将文本转化为向量表示用于相似度计算',
        explanation: 'Embedding将文本映射到高维向量空间，相似向量在空间中靠近，便于检索。',
      },
    ],
  },

  'rag-embedding-vectors': {
    id: 'rag-embedding-vectors',
    title: 'Embedding与向量数据库',
    subtitle: '理解RAG的向量存储与检索原理',
    duration: 40,
    difficulty: 'intermediate',
    tags: ['RAG', 'Embedding', '向量数据库'],
    objectives: [
      '理解Embedding的数学原理',
      '掌握向量相似度计算方法',
      '了解向量数据库的核心特性'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：文本如何变成数字？',
        content: `要让计算机判断两段文字"相似"，首先需要把文字变成可以计算距离的数字。这就是Embedding（嵌入）的作用。

本节课我们深入Embedding和向量数据库的原理。`,
      },
      {
        type: 'concept',
        title: 'Embedding原理：高维空间映射',
        content: `**什么是Embedding？**
将文字（词、句、段落）映射到高维向量，如128维、1536维。

**为什么有效？**
- 语义相近的文本在向量空间中距离近
- 语义无关的文本距离远
- 可用数学方法计算相似度

**示例**：
- "苹果"水果 → [0.3, -0.1, 0.8, ...]
- "Apple"公司 → [0.28, -0.09, 0.79, ...]
- "香蕉"水果 → [0.1, 0.2, 0.5, ...]

距离：苹果水果 ↔ Apple公司（近）
距离：苹果水果 ↔ 香蕉（较远）`,
        keyPoint: 'Embedding将文本映射到高维向量，语义相近的文本在空间中靠近。',
      },
      {
        type: 'concept',
        title: '相似度计算方法',
        content: `**余弦相似度（Cosine Similarity）**
最常用的相似度计算方法，不关心向量长度，只关心方向相似度 = (A · B) / (|A| × |B|)
结果范围：-1（完全相反）到 1（完全相同）

**欧几里得距离（Euclidean Distance）**
计算向量在空间中的直线距离
距离越小，相似度越高
适合需要绝对距离的场景

**点积（Dot Product）**
直接计算向量点积，值越大越相似
计算快速，但未归一化时受向量长度影响

**选择建议**：
- 通常使用余弦相似度（归一化Embedding）
- 欧几里得距离适合某些聚类场景
- 点积最快但需要提前归一化`,
      },
      {
        type: 'code',
        title: '代码示例：相似度计算',
        content: '用Python实现几种相似度计算方法：',
        code: `import numpy as np
from typing import List

def cosine_similarity(a: List[float], b: List[float]) -> float:
    """余弦相似度"""
    a = np.array(a)
    b = np.array(b)
    dot_product = np.dot(a, b)
    norm_a = np.linalg.norm(a)
    norm_b = np.linalg.norm(b)
    return dot_product / (norm_a * norm_b)

def euclidean_distance(a: List[float], b: List[float]) -> float:
    """欧几里得距离"""
    a = np.array(a)
    b = np.array(b)
    return np.linalg.norm(a - b)

# 示例向量
apple_fruit = [0.3, -0.1, 0.8, 0.2]
apple_company = [0.28, -0.09, 0.79, 0.21]
banana = [0.1, 0.2, 0.5, 0.15]

print(f"苹果水果 vs 苹果公司: {cosine_similarity(apple_fruit, apple_company):.3f}")
print(f"苹果水果 vs 香蕉: {euclidean_distance(apple_fruit, banana):.3f}")`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '向量数据库核心特性',
        content: `**特性一：高维索引**
支持1000+维向量，使用HNSW、IVF等索引加速查询

**特性二：近似搜索（ANN）**
不要求精确匹配，返回"足够相似"的结果
牺牲少量准确度换取速度

**特性三：元数据存储**
每个向量附带元数据：文档ID、段落、时间、标签
便于检索后返回原始内容

**特性四：过滤和范围搜索**
基于元数据过滤（如只搜索2024年的文档）
基于向量范围搜索（如查找指定时间窗口内相似文档

**常用向量数据库**：
- Pinecone：托管服务，易上手
- Milvus：开源，功能丰富
- Chroma：轻量级，本地部署
- Qdrant：Rust实现，性能优异`,
        keyPoint: '向量数据库使用高维索引和近似搜索，快速检索相似向量。',
      },
      {
        type: 'example',
        title: '实战：选择向量数据库',
        content: `场景：为知识库选择向量数据库

决策因素：
1. 部署方式：托管（Pinecone） vs 自建（Milvus）
2. 数据量：小量用轻量级，大量用分布式
3. 延迟要求：实时交互选择内存优化型
4. 成本：托管按月计费，自建需要服务器

推荐：
- PoC阶段：Chroma（零配置）
- 生产阶段：Pinecone或Milvus（根据团队技能）`,
      },
    ],
    summary: 'Embedding将文本映射到高维向量空间，语义相近的文本距离近。相似度常用余弦相似度、欧几里得距离等计算方法。向量数据库使用近似搜索和索引技术，支持快速检索。',
    keyPoints: [
      'Embedding将文本转为向量，语义相近在空间靠近',
      '余弦相似度是最常用的相似度计算',
      '向量数据库特性：高维索引、近似搜索、元数据过滤',
      '常见数据库：Pinecone、Milvus、Chroma',
    ],
    exercises: [
      {
        type: 'choice',
        question: '余弦相似度的结果是？',
        options: [
          '0到100之间的整数',
          '-1到1之间的浮点数',
          '正数的向量',
          '距离的绝对值',
        ],
        answer: '-1到1之间的浮点数',
        explanation: '余弦相似度值域为[-1, 1]，1表示完全相同，-1表示完全相反。',
      },
      {
        type: 'choice',
        question: '向量数据库的近似搜索（ANN）特性是？',
        options: [
          '返回完全匹配的结果',
          '牺牲少量准确度换取速度',
          '不支持元数据过滤',
          '只支持2维向量',
        ],
        answer: '牺牲少量准确度换取速度',
        explanation: 'ANN（近似最近邻）不要求精确匹配，返回"足够相似"的结果，大幅提升检索速度。',
      },
    ],
  },

  'rag-chunking': {
    id: 'rag-chunking',
    title: '文档切分策略',
    subtitle: '如何合理切分文档以保持语义完整',
    duration: 35,
    difficulty: 'intermediate',
    tags: ['RAG', '切分', '文档处理'],
    objectives: [
      '理解文档切分对RAG效果的影响',
      '掌握不同的切分策略',
      '学会根据文档类型选择合适方法'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：文档切分的艺术',
        content: `将一整份文档切成多个小片段，听起来简单，但其实很关键。切分不合理会导致上下文不完整、语义割裂。

这节课我们学习如何切分才能让RAG效果最好。`,
      },
      {
        type: 'concept',
        title: '切分策略一：固定长度',
        content: `**方法**：按固定字符数或Token数切分。

优点：
- 简单易实现
- 每个片段大小可控

缺点：
- 可能在句中、段落中间断开
- 语义不完整

示例：
"今天天气很好，我们决定去公园玩..."
固定切分500字符：
["今天天气很好，我们决", "定去公园玩..."]

**适用场景**：
- 文档格式简单、无明显结构
- 需要严格控制大小时`,
      },
      {
        type: 'concept',
        title: '切分策略二：语义分割',
        content: `**方法**：按自然语言边界切分（句子、段落、章节）。

优点：
- 语义完整，每个片段可独立理解
- 符合人类阅读习惯

缺点：
- 片段长度不一
- 实现稍复杂

示例：
章节切分：
["第一章：引言...", "第二章：方法...", "第三章：结果..."]

**适用场景**：
- 有明确结构的文档（Markdown、标题）
- 需要高语义完整性的场景`,
      },
      {
        type: 'concept',
        title: '切分策略三：滑动窗口',
        content: `**方法**：使用滑动窗口，片段之间有重叠。

优点：
- 保持上下文连续性
- 避免关键信息被断开

示例：窗口大小100，重叠20
文档："AI是一种革命性的技术，改变我们..."

片段：
- 片段1：0-100字
- 片段2：80-180字（重叠20）
- 片段3：160-260字（重叠20）

**适用场景**：
- 长文档、学术论文
- 需要连续上下文的检索`,
        keyPoint: '滑动窗口切分让片段有重叠，保证关键信息不被截断。',
      },
      {
        type: 'code',
        title: '代码示例：多种切分策略',
        content: '实现三种切分方法：',
        code: `from typing import List

def fixed_length_chunk(text: str, chunk_size: int) -> List[str]:
    """固定长度切分"""
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

def semantic_chunk(text: str, delimiters: List[str]) -> List[str]:
    """语义切分"""
    import re
    pattern = "|".join(map(re.escape, delimiters))
    chunks = re.split(pattern, text)
    return [c.strip() for c in chunks if c.strip()]

def sliding_window_chunk(text: str, window_size: int, overlap: int) -> List[str]:
    """滑动窗口切分"""
    chunks = []
    start = 0
    while start < len(text):
        end = start + window_size
        chunk = text[start:end]
        chunks.append(chunk)
        start = end - overlap  # 移动窗口，保留重叠
    return chunks

# 使用示例
text = "AI是一种革命性的技术，改变我们工作和生活的方式。"
print(fixed_length_chunk(text, 20))
print(semantic_chunk(text, ["。", "，"]))
print(sliding_window_chunk(text, window_size=30, overlap=10))`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：根据文档类型选择策略',
        content: `**技术文档** → 语义分割（按标题、代码块）
**学术论文** → 滑动窗口（保持引用上下文）
**合同文档** → 固定长度（条款独立，不需要连续）
**聊天记录** → 按会话分割（每个对话独立）`,
      },
    ],
    summary: '文档切分策略包括固定长度、语义分割和滑动窗口。固定长度简单但可能割裂语义，语义分割保持完整但长度不一，滑动窗口通过重叠保证连续性。应根据文档类型选择合适策略。',
    keyPoints: [
      '固定长度切分：简单，但可能割裂语义',
      '语义切分：保持段落、句子完整，适合结构化文档',
      '滑动窗口：片段有重叠，保证关键信息不断开',
      '根据文档类型选择策略',
    ],
    exercises: [
      {
        type: 'choice',
        question: '滑动窗口切分的主要优势是？',
        options: [
          '实现最简单',
          '片段长度完全一致',
          '片段之间有重叠，保证关键信息不被截断',
          '不需要额外内存',
        ],
        answer: '片段之间有重叠，保证关键信息不被截断',
        explanation: '滑动窗口让相邻片段有重叠，避免关键词被边界切断。',
      },
      {
        type: 'choice',
        question: '哪种文档最适合用语义分割？',
        options: [
          '无结构的长文本',
          '有明确标题和结构的Markdown文档',
          '代码片段',
          '纯数字数据',
        ],
        answer: '有明确标题和结构的Markdown文档',
        explanation: '语义分割利用文档的自然边界（标题、段落），对结构化文档效果好。',
      },
    ],
  },
};
