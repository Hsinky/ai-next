// RAG优化与企业实战 - 课程数据

import type { Lesson } from '../../types';

export const ragOptimizationLessons: Record<string, Lesson> = {
  'rag-retrieval': {
    id: 'rag-retrieval',
    title: '检索优化与重排序',
    subtitle: '提升RAG检索质量的实战技巧',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['RAG', '检索优化', '重排序'],
    objectives: [
      '掌握检索质量优化的核心方法',
      '学会使用重排序提升结果相关性',
      '了解混合检索策略',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么检索质量决定RAG效果',
        content: `RAG的效果上限由检索质量决定。如果检索到的文档不相关，即使最好的生成模型也无法给出正确答案。本节课我们将学习如何优化检索环节。`,
      },
      {
        type: 'concept',
        title: '检索优化的核心问题',
        content: `**问题一：语义鸿沟**
用户问"怎么买苹果"，可能指水果也可能指iPhone。向量检索可能返回不相关结果。

**问题二：多义性**
同一个词在不同语境下含义不同，如"Java"可以指编程语言或咖啡。

**问题三：长尾查询**
用户用非常具体的描述提问，但文档中没有完全匹配的表述。

**解决思路**：
1. 混合检索（向量+关键词）
2. 查询重写/扩展
3. 重排序（Reranking）
4. 多路召回`,
        keyPoint: '检索优化需要解决语义鸿沟、多义性和长尾查询问题。',
      },
      {
        type: 'concept',
        title: '混合检索策略',
        content: `**向量检索**：
- 优点：语义理解能力强
- 缺点：对精确匹配支持弱

**关键词检索（BM25）**：
- 优点：精确匹配、可解释性强
- 缺点：无法理解语义相似性

**混合检索公式**：
\`\`\`
最终分数 = α × 向量相似度 + (1-α) × BM25分数
\`\`\`

**实现方式**：
1. 分别用两种方式检索
2. 取Top-K结果合并
3. 去重后按融合分数排序

**适用场景**：
- 需要同时匹配语义和关键词
- 文档包含专业术语和编号`,
      },
      {
        type: 'concept',
        title: '重排序（Reranking）',
        content: `**什么是重排序？**
先用轻量级模型召回大量候选（如100个），再用更强的模型对候选重新打分，选出最相关的Top-K（如10个）。

**为什么有效？**
- 第一阶段注重召回率（不漏掉相关文档）
- 第二阶段注重精确率（确保返回的文档确实相关）
- 重排序模型可以更复杂，因为只需处理少量候选

**常用重排序模型**：
- Cohere Rerank
- BGE-Reranker
- Cross-Encoder

**流程**：
1. 查询 → 向量检索Top-100
2. 查询+每个文档 → 重排序模型打分
3. 按分数排序 → 返回Top-10`,
        keyPoint: '重排序用两阶段策略提升检索质量：先召回再精排。',
      },
      {
        type: 'code',
        title: '代码示例：混合检索实现',
        content: '一个简化的混合检索实现：',
        code: `from typing import List, Dict
import numpy as np

class HybridRetriever:
    def __init__(self, vector_db, keyword_index, alpha=0.5):
        self.vector_db = vector_db
        self.keyword_index = keyword_index
        self.alpha = alpha  # 融合权重

    def retrieve(self, query: str, top_k: int = 10) -> List[Dict]:
        # 1. 向量检索
        vector_results = self.vector_db.search(
            query_vector=self.embed(query),
            top_k=top_k * 2
        )

        # 2. 关键词检索
        keyword_results = self.keyword_index.search(
            query=query,
            top_k=top_k * 2
        )

        # 3. 融合结果
        fused = self._fuse_results(vector_results, keyword_results)

        # 4. 返回Top-K
        return fused[:top_k]

    def _fuse_results(self, vector_results, keyword_results):
        """RRF融合算法"""
        scores = {}

        # 向量检索分数（按排名）
        for rank, doc in enumerate(vector_results):
            doc_id = doc['id']
            scores[doc_id] = scores.get(doc_id, 0) + 1.0 / (rank + 60)

        # 关键词检索分数（按排名）
        for rank, doc in enumerate(keyword_results):
            doc_id = doc['id']
            scores[doc_id] = scores.get(doc_id, 0) + 1.0 / (rank + 60)

        # 按分数排序
        sorted_docs = sorted(scores.items(), key=lambda x: x[1], reverse=True)
        return [{'id': doc_id, 'score': score} for doc_id, score in sorted_docs]`,
        language: 'python',
      },
      {
        type: 'code',
        title: '代码示例：重排序实现',
        content: '使用Cross-Encoder进行重排序：',
        code: `from sentence_transformers import CrossEncoder

class Reranker:
    def __init__(self, model_name='BAAI/bge-reranker-base'):
        self.model = CrossEncoder(model_name)

    def rerank(self, query: str, documents: List[Dict], top_k: int = 5) -> List[Dict]:
        """对检索结果重排序"""
        # 构建查询-文档对
        pairs = [[query, doc['content']] for doc in documents]

        # 计算相关性分数
        scores = self.model.predict(pairs)

        # 添加分数到文档
        for doc, score in zip(documents, scores):
            doc['rerank_score'] = float(score)

        # 按重排序分数排序
        sorted_docs = sorted(documents, key=lambda x: x['rerank_score'], reverse=True)

        return sorted_docs[:top_k]

# 使用示例
retriever = HybridRetriever(vector_db, keyword_index)
reranker = Reranker()

# 第一阶段：检索
candidates = retriever.retrieve("如何优化数据库查询？", top_k=20)

# 第二阶段：重排序
final_results = reranker.rerank("如何优化数据库查询？", candidates, top_k=5)`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：查询重写与扩展',
        content: `**场景**：用户查询"Python性能优化"

**查询重写策略**：
1. **同义词扩展**：Python → Python3、Py
2. **相关概念**：性能 → 速度、效率、优化、加速
3. **具体化**：添加"技巧"、"最佳实践"、"指南"

**重写后查询**：
"Python Python3 Py 性能 速度 效率 优化 加速 技巧 最佳实践 指南"

**实现方式**：
- 使用LLM生成多个查询变体
- 对每个变体分别检索
- 合并结果去重

**效果**：
- 原始查询召回率：65%
- 扩展查询召回率：89%`,
      },
      {
        type: 'note',
        title: '性能考量',
        content: '重排序提升质量但增加延迟。生产环境需要权衡：对延迟敏感的场景可减少重排序候选数量，或异步执行。',
      },
    ],
    summary: '检索优化通过混合检索、查询扩展和重排序提升RAG效果。两阶段策略（召回+精排）在保证效率的同时提升质量。',
    keyPoints: [
      '混合检索结合向量语义和关键词精确匹配',
      '重排序用两阶段策略提升检索质量',
      '查询扩展可以解决语义鸿沟问题',
      '需要在质量和性能之间做权衡',
    ],
    exercises: [
      {
        type: 'choice',
        question: '混合检索的主要优势是？',
        options: [
          '减少存储空间',
          '结合向量语义和关键词精确匹配',
          '降低计算成本',
          '简化系统架构',
        ],
        answer: '结合向量语义和关键词精确匹配',
        explanation: '混合检索融合向量检索的语义理解能力和关键词检索的精确匹配能力。',
      },
      {
        type: 'choice',
        question: '重排序的两阶段策略是？',
        options: [
          '先训练再推理',
          '先召回再精排',
          '先过滤再排序',
          '先分类再回归',
        ],
        answer: '先召回再精排',
        explanation: '第一阶段用轻量级模型召回大量候选，第二阶段用更强的模型对候选重新打分排序。',
      },
    ],
  },

  'rag-enterprise': {
    id: 'rag-enterprise',
    title: '企业级RAG实战',
    subtitle: '从Demo到生产的完整方案',
    duration: 55,
    difficulty: 'advanced',
    tags: ['RAG', '企业级', '生产部署'],
    objectives: [
      '掌握企业级RAG的架构设计',
      '学会处理大规模文档的实践经验',
      '了解RAG系统的监控和优化',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：企业级RAG的挑战',
        content: `企业级RAG与Demo版本的区别：
- 数据量：从几百篇到百万级文档
- 用户量：从单用户到并发数千
- 要求：高可用、低延迟、可审计

本节课我们将学习企业级RAG的完整方案。`,
      },
      {
        type: 'concept',
        title: '企业级架构设计',
        content: `**分层架构**：

**接入层**：
- API Gateway：限流、认证、路由
- 负载均衡：分发请求到多个实例

**处理层**：
- Query理解：意图识别、查询重写
- 检索服务：向量检索 + 关键词检索
- 重排序服务：精排候选文档

**数据层**：
- 向量数据库：存储文档向量
- 文档存储：原始文档内容
- 缓存层：热点查询缓存

**关键组件**：
- 文档处理Pipeline：异步处理新文档
- 索引更新服务：增量更新向量索引
- 监控告警：延迟、准确率、错误率`,
        keyPoint: '企业级RAG需要分层架构，各层职责清晰，支持水平扩展。',
      },
      {
        type: 'concept',
        title: '大规模文档处理',
        content: `**挑战**：
- 百万级文档的索引构建时间
- 增量更新如何不影响查询
- 多租户数据隔离

**解决方案**：

**分批处理**：
- 将文档分批处理，避免内存溢出
- 使用消息队列（Kafka/SQS）削峰填谷

**增量索引**：
- 新文档进入"待处理队列"
- 异步生成向量并更新索引
- 支持索引版本管理，便于回滚

**多租户隔离**：
- 方案A：每个租户独立索引（成本高）
- 方案B：共享索引+租户ID过滤（推荐）
- 方案C：命名空间隔离（如Pinecone的namespace）

**性能优化**：
- 预计算热门查询的检索结果
- 使用HNSW等高效索引算法
- 向量量化减少存储和计算`,
      },
      {
        type: 'concept',
        title: 'RAG系统监控',
        content: `**核心指标**：

**检索质量指标**：
- 召回率：相关文档被检索到的比例
- 精确率：检索结果中相关文档的比例
- MRR（平均倒数排名）：相关文档的排名位置

**系统性能指标**：
- 检索延迟：P50、P95、P99
- 生成延迟：首Token时间、总时间
- 吞吐量：QPS

**业务指标**：
- 用户满意度：点赞/点踩比例
- 回答准确率：人工评估或自动评估
- 引用准确率：生成内容是否基于检索文档

**监控告警**：
- 延迟超过阈值告警
- 错误率超过阈值告警
- 检索结果为空比例异常告警`,
        keyPoint: '完善的监控体系是RAG系统稳定运行的保障。',
      },
      {
        type: 'code',
        title: '代码示例：多租户RAG实现',
        content: '多租户数据隔离的实现：',
        code: `class MultiTenantRAG:
    def __init__(self, vector_db):
        self.vector_db = vector_db

    def add_document(self, tenant_id: str, doc_id: str, content: str):
        """添加文档（带租户隔离）"""
        # 生成向量
        vector = self.embed(content)

        # 存储时附加租户ID
        self.vector_db.store(
            vector=vector,
            id=f"{tenant_id}:{doc_id}",
            metadata={
                "tenant_id": tenant_id,
                "doc_id": doc_id,
                "content": content,
            }
        )

    def query(self, tenant_id: str, question: str, top_k: int = 5):
        """查询（带租户过滤）"""
        query_vector = self.embed(question)

        # 检索时过滤租户ID
        results = self.vector_db.search(
            vector=query_vector,
            filter={"tenant_id": tenant_id},  # 关键：租户隔离
            top_k=top_k
        )

        return results

    def delete_document(self, tenant_id: str, doc_id: str):
        """删除文档"""
        self.vector_db.delete(id=f"{tenant_id}:{doc_id}")`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：企业知识库RAG',
        content: `**场景**：大型企业内部知识库

**需求**：
- 支持10万+文档
- 1000+并发用户
- 响应时间<2秒
- 多部门数据隔离

**架构方案**：
1. **文档处理**：
   - 定时任务扫描新文档
   - 异步处理生成向量
   - 增量更新索引

2. **检索优化**：
   - 混合检索（向量+关键词）
   - 查询缓存（Redis）
   - 热点数据预热

3. **生成优化**：
   - 流式输出提升体验
   - 上下文压缩减少Token
   - 多模型降级策略

4. **监控运维**：
   - 实时指标看板
   - 自动扩缩容
   - 定期索引重建`,
      },
      {
        type: 'note',
        title: '成本控制',
        content: '企业级RAG成本主要来自：Embedding API调用、向量数据库存储、LLM生成。优化策略：批量处理文档、使用小模型做Embedding、缓存热门查询、控制上下文长度。',
      },
    ],
    summary: '企业级RAG需要分层架构、多租户隔离、完善的监控体系。大规模文档处理需要异步Pipeline和增量索引。成本控制和性能优化是生产环境的关键。',
    keyPoints: [
      '企业级RAG采用分层架构，支持水平扩展',
      '多租户可通过命名空间或元数据过滤实现',
      '监控指标包括检索质量、系统性能和业务指标',
      '成本控制需要优化Embedding、存储和生成环节',
    ],
    exercises: [
      {
        type: 'choice',
        question: '多租户RAG推荐的数据隔离方案是？',
        options: [
          '每个租户独立部署一套系统',
          '共享索引+租户ID过滤',
          '所有租户数据混合存储',
          '禁止多租户使用',
        ],
        answer: '共享索引+租户ID过滤',
        explanation: '共享索引+租户ID过滤在成本和隔离性之间取得平衡，是企业级RAG的推荐方案。',
      },
      {
        type: 'choice',
        question: 'RAG系统的核心监控指标不包括？',
        options: [
          '检索延迟',
          '回答准确率',
          '模型训练loss',
          '用户满意度',
        ],
        answer: '模型训练loss',
        explanation: 'RAG系统使用预训练模型，不涉及模型训练，因此训练loss不是监控指标。',
      },
    ],
  },
};
