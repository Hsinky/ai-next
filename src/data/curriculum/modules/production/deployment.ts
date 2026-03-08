// 生产环境部署 - 课程数据

import type { Lesson } from '../../types';

export const deploymentLessons: Record<string, Lesson> = {
  'deployment-intro': {
    id: 'deployment-intro',
    title: '生产环境部署概述',
    subtitle: '从Demo到生产的转变',
    duration: 35,
    difficulty: 'intermediate',
    tags: ['生产部署', '架构'],
    objectives: [
      '理解生产环境与Demo的核心差异',
      '掌握生产级系统的关键要求',
      '了解AI应用的部署架构',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么Demo和生产差距大',
        content: `你可能发现一个Demo在本地运行很好，但一上生产就出问题。延迟高、不稳定、成本超标……这些问题在生产环境中暴露无遗。

本节课，我们讨论生产级系统的关键要求。`,
      },
      {
        type: 'concept',
        title: '生产环境的五大要求',
        content: `**1. 可靠性（Reliability）**
- 服务可用性：99.9%以上SLA
- 故障恢复：自动failover
- 数据安全：备份和恢复机制

**2. 可扩展性（Scalability）**
- 水平扩展：增加实例应对流量增长
- 弹性伸缩：根据负载自动增减资源
- 无状态设计：便于扩展和恢复

**3. 可观测性（Observability）**
- 日志：结构化日志，便于搜索和分析
- 指标：延迟、错误率、吞吐量
- 追踪：请求链路追踪，定位问题

**4. 安全性（Security）**
- 数据传输加密
- 访问控制和认证
- 敏感数据脱敏

**5. 成本效率（Cost Efficiency）**
- 资源利用率优化
- 按需付费模型
- 成本监控和预警`,
        keyPoint: '生产系统需要关注可靠性、可扩展性、可观测性、安全性和成本效率。',
      },
      {
        type: 'concept',
        title: 'AI应用的部署架构',
        content: `**典型架构**：

\`\`\`
用户 → CDN → 负载均衡 → API网关 → 应用服务 → 模型推理
                                      ↓
                                   向量数据库
                                      ↓
                                   缓存层(Redis)
\`\`\`

**关键组件**：

**API网关**：
- 认证授权
- 限流熔断
- 请求路由

**应用服务**：
- 无状态设计
- 容器化部署（Docker/K8s）
- 水平扩展

**模型推理**：
- 模型服务化（如vLLM）
- 批处理优化
- GPU资源管理

**数据层**：
- 向量数据库集群
- 主从复制
- 定期备份`,
      },
      {
        type: 'example',
        title: '实战：从Demo到生产的改造清单',
        content: `**Demo特点**：
- 单实例运行
- 无监控告警
- 硬编码配置
- 无错误恢复
- 无限流保护

**改造清单**：

1. **容器化**：写Dockerfile，用K8s部署
2. **配置管理**：环境变量，配置中心
3. **监控日志**：接入Prometheus/Grafana，结构化日志
4. **限流熔断**：API网关限流，服务熔断
5. **缓存优化**：Redis缓存热点数据
6. **数据备份**：数据库定时备份
7. **自动化测试**：CI/CD流水线
8. **文档完善**：部署文档、运维手册`,
      },
      {
        type: 'note',
        title: '重要提醒',
        content: '生产环境变更要谨慎：灰度发布、回滚预案、变更审批流程。任何变更都可能导致系统不稳定。',
      },
    ],
    summary: '生产环境部署需要关注可靠性、可扩展性、可观测性、安全性和成本效率。从Demo到生产需要系统化改造，包括容器化、监控、限流、备份等。',
    keyPoints: [
      '生产系统关注五大要求：可靠、可扩展、可观测、安全、成本效率',
      'AI应用典型架构包括API网关、应用服务、模型推理、数据层',
      '从Demo到生产需要全面改造，不能直接上线',
    ],
    exercises: [
      {
        type: 'choice',
        question: '生产环境最重要的特性是？',
        options: [
          '功能最多',
          '可靠性和可用性',
          '代码最复杂',
          '界面最漂亮',
        ],
        answer: '可靠性和可用性',
        explanation: '生产环境首先要保证系统稳定可靠，用户能够正常使用。功能再多，不稳定也没有意义。',
      },
      {
        type: 'choice',
        question: '可观测性包括哪三要素？',
        options: [
          'CPU、内存、磁盘',
          '日志、指标、追踪',
          '输入、处理、输出',
          '开发、测试、部署',
        ],
        answer: '日志、指标、追踪',
        explanation: '可观测性三要素：日志用于记录事件、指标用于监控系统状态、追踪用于定位请求链路。',
      },
    ],
  },

  'deployment-costs': {
    id: 'deployment-costs',
    title: '成本优化策略',
    subtitle: '让AI应用更经济',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['成本优化', '生产部署'],
    objectives: [
      '理解AI应用的主要成本来源',
      '掌握Token和计算成本优化方法',
      '学会成本监控和控制',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：AI成本为什么容易失控',
        content: `AI应用的成本结构与传统应用不同：
- LLM API按Token计费，调用越多成本越高
- GPU资源昂贵，闲置就是浪费
- 向量数据库存储成本随数据量增长

如果不加控制，一个小功能可能带来巨额账单。`,
      },
      {
        type: 'concept',
        title: '主要成本来源',
        content: `**1. LLM API成本**
- 输入Token：按量计费（如GPT-4：$0.03/1K输入Token）
- 输出Token：通常比输入更贵（如GPT-4：$0.06/1K输出Token）
- 高峰期：调用量激增时成本快速上涨

**2. 计算资源成本**
- GPU实例：按小时计费，昂贵
- CPU/内存：相对便宜但影响性能
- 存储：向量数据库、日志存储

**3. 网络成本**
- API调用网络费用
- CDN流量费用
- 数据传输费用

**成本占比示例**：
\`\`\`
LLM API调用：60%
GPU计算：25%
存储和网络：15%
\`\`\``,
        keyPoint: 'LLM API调用是AI应用最大的成本来源，占比通常超过50%。',
      },
      {
        type: 'concept',
        title: 'Token成本优化',
        content: `**策略一：减少输入Token**
- 压缩Prompt：去除冗余描述
- 上下文裁剪：只传相关内容
- 使用更短的系统提示

**策略二：减少输出Token**
- 限制最大输出长度
- 要求简洁回答
- 使用结构化输出（JSON比叙述更短）

**策略三：模型降级**
- 简单任务用小模型（如GPT-3.5）
- 复杂任务才用大模型
- 路由策略：根据问题复杂度选择模型

**策略四：结果缓存**
- 缓存热门查询的结果
- 相似查询复用缓存
- 设置合理的缓存过期时间

**策略五：批处理**
- 合并多个请求一次处理
- 减少API调用次数
- 利用批量折扣（如果有）`,
      },
      {
        type: 'code',
        title: '代码示例：模型路由策略',
        content: '根据问题复杂度选择模型：',
        code: `class ModelRouter:
    def __init__(self):
        self.small_model = "gpt-3.5-turbo"
        self.large_model = "gpt-4"
        self.cache = {}

    def route_query(self, query: str) -> str:
        """根据问题复杂度选择模型"""
        # 1. 检查缓存
        cache_key = self._hash_query(query)
        if cache_key in self.cache:
            return self.cache[cache_key]

        # 2. 分析问题复杂度
        complexity = self._analyze_complexity(query)

        # 3. 选择模型
        if complexity < 0.3:
            model = self.small_model  # 简单问题用小模型
        elif complexity < 0.7:
            model = self.small_model  # 中等问题也用小模型
        else:
            model = self.large_model  # 复杂问题用大模型

        return model

    def _analyze_complexity(self, query: str) -> float:
        """分析问题复杂度（0-1）"""
        complexity = 0.0

        # 关键词判断
        complex_keywords = ["分析", "对比", "推理", "为什么", "怎么理解"]
        for kw in complex_keywords:
            if kw in query:
                complexity += 0.2

        # 长度判断
        if len(query) > 100:
            complexity += 0.2

        # 多条件判断
        if "和" in query or "以及" in query:
            complexity += 0.1

        return min(complexity, 1.0)`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '计算资源优化',
        content: `**GPU资源优化**：

**方法一：GPU共享**
- 多个模型共享一个GPU
- 使用模型服务框架（如vLLM）
- 批处理推理提升利用率

**方法二：CPU推理**
- 小模型用CPU推理
- 使用推理优化框架（如ONNX Runtime）
- 延迟要求不高的场景

**方法三：自动伸缩**
- 根据负载自动扩缩容
- 低谷期减少实例
- 使用Spot实例降低成本

**方法四：无服务器架构**
- 按实际调用量付费
- 无需管理服务器
- 适合波动较大的负载`,
      },
      {
        type: 'example',
        title: '实战：成本监控Dashboard',
        content: `**监控指标**：

**实时成本**：
- 今日Token消耗量
- 今日API费用估算
- 当前QPS和成本速率

**趋势分析**：
- 每日成本趋势图
- 模型使用分布
- 用户成本排行

**告警规则**：
- 日成本超过阈值告警
- 单用户成本异常告警
- 模型调用失败率告警

**优化效果追踪**：
- 优化前后成本对比
- 缓存命中率统计
- 模型路由分布`,
      },
      {
        type: 'note',
        title: '成本与体验的平衡',
        content: '过度降本可能影响用户体验：缓存过多导致回答不新鲜、模型降级导致质量下降。需要在成本和体验之间找到平衡。',
      },
    ],
    summary: 'AI应用成本主要来自LLM API调用，占比超过50%。优化策略包括减少Token、模型降级、结果缓存、计算资源优化。需要建立成本监控体系，在成本和体验之间找到平衡。',
    keyPoints: [
      'LLM API是最大成本来源，占比通常超过50%',
      'Token优化：压缩输入、限制输出、模型降级、缓存',
      '计算资源优化：GPU共享、CPU推理、自动伸缩',
      '建立成本监控体系，设置告警阈值',
    ],
    exercises: [
      {
        type: 'choice',
        question: '哪种策略最有效降低LLM成本？',
        options: [
          '购买更多服务器',
          '模型降级和结果缓存',
          '增加代码注释',
          '使用更复杂的Prompt',
        ],
        answer: '模型降级和结果缓存',
        explanation: '模型降级（简单任务用小模型）和结果缓存（复用热门查询）是降低LLM成本最有效的策略。',
      },
      {
        type: 'choice',
        question: 'GPU资源优化的最佳实践是？',
        options: [
          '每个模型独占一个GPU',
          '使用CPU推理所有模型',
          'GPU共享和自动伸缩',
          '24小时全负载运行',
        ],
        answer: 'GPU共享和自动伸缩',
        explanation: 'GPU共享提升利用率，自动伸缩应对负载波动，两者结合最经济高效。',
      },
    ],
  },

  'deployment-multitenant': {
    id: 'deployment-multitenant',
    title: '多租户架构设计',
    subtitle: 'SaaS产品的架构基础',
    duration: 50,
    difficulty: 'advanced',
    tags: ['多租户', '架构设计', 'SaaS'],
    objectives: [
      '理解多租户架构的核心概念',
      '掌握数据隔离的实现方式',
      '学会多租户系统的资源管理',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么需要多租户',
        content: `如果你的AI产品要服务多个企业客户，每个客户的数据需要隔离。多租户架构就是解决这个问题的。

本节课讨论如何设计一个安全、高效的多租户系统。`,
      },
      {
        type: 'concept',
        title: '多租户架构概述',
        content: `**什么是多租户？**
一个应用实例服务多个客户（租户），每个租户的数据和配置相互隔离。

**三种隔离模型**：

**1. 独立数据库**
- 每个租户一个数据库
- 隔离性最强
- 成本最高

**2. 共享数据库，独立Schema**
- 共享数据库实例，每个租户一个Schema
- 隔离性中等
- 成本适中

**3. 共享数据库，共享Schema**
- 通过租户ID区分数据
- 隔离性最弱
- 成本最低

**选择依据**：
- 安全要求高的选独立数据库
- 成本敏感的选共享Schema
- 大部分SaaS选择共享Schema+租户ID`,
        keyPoint: '多租户三种隔离模型：独立数据库、独立Schema、共享Schema，各有取舍。',
      },
      {
        type: 'concept',
        title: '数据隔离实现',
        content: `**共享Schema方案实现**：

**1. 数据库层面**：
- 每个表添加tenant_id字段
- 创建复合索引：(tenant_id, id)
- 查询必须带tenant_id条件

**2. 应用层面**：
- 请求上下文传递租户信息
- 中间件自动注入租户条件
- ORM层自动过滤

**3. 安全层面**：
- API层验证租户身份
- 越权访问检测
- 数据导出审核

**关键原则**：
- 永远不要相信客户端传的tenant_id
- 从认证Token中提取租户信息
- 所有查询必须带租户过滤`,
      },
      {
        type: 'code',
        title: '代码示例：多租户中间件',
        content: 'Express中间件自动注入租户过滤：',
        code: `// 多租户中间件
function tenantMiddleware(req, res, next) {
  // 从JWT Token中获取租户ID（不信任客户端）
  const token = req.headers.authorization?.split(' ')[1];
  const decoded = verifyToken(token);

  if (!decoded.tenantId) {
    return res.status(401).json({ error: 'Tenant not found' });
  }

  // 注入到请求上下文
  req.tenantId = decoded.tenantId;
  next();
}

// 数据库查询封装
class TenantAwareRepository {
  constructor(model, tenantId) {
    this.model = model;
    this.tenantId = tenantId;
  }

  async findAll(filter = {}) {
    // 自动添加租户过滤
    return this.model.findAll({
      where: {
        ...filter,
        tenantId: this.tenantId,  // 关键：自动注入
      },
    });
  }

  async create(data) {
    // 自动添加租户ID
    return this.model.create({
      ...data,
      tenantId: this.tenantId,  // 关键：自动注入
    });
  }
}

// 使用示例
app.get('/api/documents', tenantMiddleware, async (req, res) => {
  const repo = new TenantAwareRepository(Document, req.tenantId);
  const docs = await repo.findAll();
  res.json(docs);
});`,
        language: 'javascript',
      },
      {
        type: 'concept',
        title: '资源配额管理',
        content: `**为什么需要配额？**
防止单个租户占用过多资源，影响其他租户。

**配额维度**：

**1. 调用量限制**
- 每日/每月API调用次数
- 每分钟请求频率（Rate Limit）
- 并发请求限制

**2. 数据量限制**
- 文档数量上限
- 向量存储容量
- 数据库存储空间

**3. 功能限制**
- 可用模型（大模型额外付费）
- 高级功能（如自定义Agent）
- 导出数据量

**实现方式**：
- Redis计数器：实时统计调用量
- 配置表：存储租户配额
- 中间件：配额检查和拒绝`,
      },
      {
        type: 'code',
        title: '代码示例：配额检查中间件',
        content: '实现API调用配额限制：',
        code: `import Redis from 'ioredis';
const redis = new Redis();

// 配额检查中间件
function quotaMiddleware(quotaConfig) {
  return async (req, res, next) => {
    const tenantId = req.tenantId;
    const today = new Date().toISOString().split('T')[0];

    // 1. 检查日配额
    const dailyKey = \`quota:\${tenantId}:daily:\${today}\`;
    const dailyCount = await redis.incr(dailyKey);
    await redis.expire(dailyKey, 86400);  // 24小时过期

    if (dailyCount > quotaConfig.dailyLimit) {
      return res.status(429).json({
        error: 'Daily quota exceeded',
        limit: quotaConfig.dailyLimit,
        used: dailyCount,
      });
    }

    // 2. 检查频率限制（每分钟）
    const minuteKey = \`quota:\${tenantId}:minute:\${Date.now() / 60000 | 0}\`;
    const minuteCount = await redis.incr(minuteKey);
    await redis.expire(minuteKey, 60);

    if (minuteCount > quotaConfig.rateLimit) {
      return res.status(429).json({
        error: 'Rate limit exceeded',
        limit: quotaConfig.rateLimit,
      });
    }

    next();
  };
}

// 使用
app.get('/api/chat',
  tenantMiddleware,
  quotaMiddleware({ dailyLimit: 1000, rateLimit: 10 }),
  chatHandler
);`,
        language: 'javascript',
      },
      {
        type: 'example',
        title: '实战：AI SaaS的多租户方案',
        content: `**场景**：企业知识库SaaS

**架构设计**：

**数据隔离**：
- 向量数据库：Pinecone namespace（每个租户一个命名空间）
- 文档存储：共享S3，路径区分（/tenant-{id}/）
- 元数据存储：共享数据库，tenant_id字段

**配额设计**：
- 基础版：1000次查询/天，1000文档
- 专业版：10000次查询/天，10000文档
- 企业版：无限制，按量付费

**安全设计**：
- JWT认证，租户ID在Token中
- API Key绑定租户
- 所有查询自动注入租户过滤
- 管理后台跨租户操作需审批`,
      },
      {
        type: 'note',
        title: '合规考虑',
        content: '某些行业（医疗、金融）要求数据物理隔离，必须选择独立数据库方案。多租户架构选择需要考虑合规要求。',
      },
    ],
    summary: '多租户架构有三种隔离模型：独立数据库、独立Schema、共享Schema。共享Schema方案成本最低但需要严格的租户过滤。配额管理防止资源滥用。架构选择需要考虑合规要求。',
    keyPoints: [
      '三种隔离模型：独立数据库、独立Schema、共享Schema',
      '共享Schema需要所有查询带tenant_id过滤',
      '租户ID必须从认证Token获取，不信任客户端',
      '配额管理包括调用量、数据量、功能限制',
    ],
    exercises: [
      {
        type: 'choice',
        question: '多租户架构中，最经济的隔离方案是？',
        options: [
          '独立数据库',
          '独立Schema',
          '共享Schema+租户ID',
          '独立服务器',
        ],
        answer: '共享Schema+租户ID',
        explanation: '共享Schema通过tenant_id区分数据，资源利用率最高，成本最低。',
      },
      {
        type: 'choice',
        question: '为什么租户ID不能信任客户端传入？',
        options: [
          '影响性能',
          '客户端可能伪造，导致数据越权访问',
          '增加代码复杂度',
          '服务器不接收客户端数据',
        ],
        answer: '客户端可能伪造，导致数据越权访问',
        explanation: '恶意用户可能修改tenant_id访问其他租户数据，必须从认证Token中安全获取租户信息。',
      },
    ],
  },
};
