// 性能监控与A/B测试 - 课程数据

import type { Lesson } from '../../types';

export const optimizationLessons: Record<string, Lesson> = {
  'optimization-performance': {
    id: 'optimization-performance',
    title: '性能监控与调优',
    subtitle: '让AI应用更快更稳',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['性能优化', '监控', '调优'],
    objectives: [
      '理解AI应用的性能指标',
      '掌握性能监控和诊断方法',
      '学会常见的性能优化技巧',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：性能是用户体验的核心',
        content: `用户不会容忍一个慢吞吞的AI应用。3秒响应和300ms响应，体验天壤之别。

本节课我们将学习如何监控和优化AI应用的性能。`,
      },
      {
        type: 'concept',
        title: 'AI应用性能指标',
        content: `**关键指标**：

**1. 响应时间（Latency）**
- P50：50%请求的响应时间
- P95：95%请求的响应时间（关注长尾）
- P99：99%请求的响应时间
- TTFB：首字节时间（Time to First Byte）

**2. 吞吐量（Throughput）**
- QPS：每秒查询数
- RPS：每秒请求数
- TPM：每分钟Token数

**3. 资源利用率**
- GPU利用率：理想70-90%
- 内存使用率：避免OOM
- CPU利用率：平稳负载

**4. 错误率**
- HTTP错误率（4xx, 5xx）
- 模型调用失败率
- 超时率

**5. 用户体验指标**
- 流式输出的首Token时间（TTFT）
- 感知延迟（用户开始打字到看到输出）
- 完成率（请求完成的百分比）`,
        keyPoint: '关注P95/P99长尾延迟，不只是平均值；TTFT影响用户体验。流式输出的首Token时间是关键指标。',
      },
      {
        type: 'concept',
        title: '性能监控工具',
        content: `**APM工具**：
- Datadog、New Relic：全栈监控
- Grafana+Prometheus：开源方案
- Lightstep：分布式追踪

**AI专用监控**：
- LangSmith：LLM应用监控
- Weights & Biases：模型实验追踪
- Arize：模型性能监控

**基础监控指标**：
\`\`\`yaml
metrics:
  - name: response_time_p99
    type: histogram
    labels: [endpoint, model]
  - name: gpu_utilization
    type: gauge
    labels: [gpu_id, model]
  - name: token_throughput
    type: counter
    labels: [model]
  - name: error_rate
    type: gauge
    labels: [endpoint, error_type]
\`\`\``,
      },
      {
        type: 'code',
        title: '代码示例：性能指标收集',
        content: '使用Prometheus收集性能指标：',
        code: `from prometheus_client import Counter, Histogram, Gauge, start_http_server

# 定义指标
response_time = Histogram(
    'api_response_time_seconds',
    'API响应时间',
    ['endpoint', 'model']
)

token_throughput = Counter(
    'token_throughput_total',
    'Token吞吐量',
    ['model']
)

gpu_utilization = Gauge(
    'gpu_utilization_percent',
    'GPU利用率',
    ['gpu_id', 'model']
)

error_count = Counter(
    'api_error_count_total',
    'API错误计数',
    ['endpoint', 'error_type']
)

# 使用示例
import time
from contextlib import contextmanager

@contextmanager
def track_api_call(endpoint: str, model: str):
    """追踪API调用"""
    start = time.time()
    try:
        yield
    except Exception as e:
        error_count.labels(endpoint=endpoint, error_type=type(e).__name__).inc()
        raise
    finally:
        duration = time.time() - start
        response_time.labels(endpoint=endpoint, model=model).observe(duration)

# 在API中使用
with track_api_call('/api/chat', 'gpt-4'):
    result = call_llm_api("Hello")
    token_throughput.labels(model='gpt-4').inc(len(result))`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '性能优化技巧',
        content: `**1. 减少网络往返**
- 批量API调用
- 合并请求
- 使用连接池

**2. 优化模型调用**
- 批处理：一次处理多个输入
- KV Cache：复用计算结果
- 量化：使用量化模型（INT8/INT4）

**3. 缓存策略**
- 请求结果缓存
- 中间结果缓存
- 预加载热门数据

**4. 并发处理**
- 异步IO（asyncio）
- 并发请求（requests并发）
- 流式输出

**5. 数据处理优化**
- 向量化计算（NumPy）
- 数据库索引优化
- 避免N+1查询`,
      },
      {
        type: 'code',
        title: '代码示例：异步并发调用',
        content: '使用asyncio并发处理多个请求：',
        code: `import asyncio
import aiohttp

async def fetch_with_timeout(session, url, timeout=10):
    """带超时的异步请求"""
    try:
        async with session.get(url, timeout=timeout) as response:
            return await response.json()
    except asyncio.TimeoutError:
        return {"error": "timeout"}

async def parallel_llm_calls(queries: list, max_concurrent=5):
    """并发调用LLM API"""
    semaphore = asyncio.Semaphore(max_concurrent)

    async def bounded_call(query):
        async with semaphore:
            # 模拟API调用
            return await fetch_with_timeout(
                session=f"api.example.com",
                url=f"/api/chat?q={query}"
            )

    async with aiohttp.ClientSession() as session:
        # 并发执行所有请求
        results = await asyncio.gather(
            *[bounded_call(q) for q in queries],
            return_exceptions=True
        )

        return results

# 使用示例
queries = ["What is AI?", "Explain ML", "Tell me about Python"]
results = asyncio.run(parallel_llm_calls(queries))`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：慢查询诊断',
        content: `**问题**：某API P99延迟达到5秒

**诊断步骤**：

1. **查看追踪数据**
   - 数据库查询：2.5秒
   - LLM调用：2秒
   - 其他处理：0.5秒

2. **深入分析**
   - 数据库：发现一个N+1查询问题
   - LLM：模型选择不合适，用了超大模型

3. **优化措施**
   - 数据库：添加索引，修复N+1查询 → 降至0.2秒
   - LLM：换用中等模型 → 降至1秒

4. **结果**
   - P99延迟：5秒 → 1.7秒
   - 成本降低40%`,
      },
      {
        type: 'note',
        title: '优化原则',
        content: '先测量再优化：不要假设瓶颈在哪。优化要基于数据，而不是感觉。重点优化P95/P99长尾延迟，而不是平均值。',
      },
    ],
    summary: 'AI应用性能指标包括响应时间、吞吐量、资源利用率、错误率。关注P95/P99长尾延迟和TTFT首Token时间。优化技巧包括减少网络往返、批处理、缓存、异步并发。',
    keyPoints: [
      '关键指标：响应时间（P95/P99）、吞吐量、资源利用率、错误率',
      '流式输出的TTFT（首Token时间）是用户体验关键',
      '优化技巧：批处理、缓存、异步IO、KV Cache',
      '先测量再优化，基于数据决策',
    ],
    exercises: [
      {
        type: 'choice',
        question: '为什么关注P99延迟而不是平均延迟？',
        options: [
          'P99更小',
          'P99反映最差的用户体验',
          '计算更简单',
          'P99是平均值',
        ],
        answer: 'P99反映最差的用户体验',
        explanation: '平均延迟会被少数快速请求拉低，P99反映99%用户的实际体验，更能发现性能问题。',
      },
      {
        type: 'choice',
        question: 'TTFT指的是？',
        options: [
          'Total Time For Test',
          'Time To First Token（首Token时间）',
          'Time To Finish Test',
          'Total Tokens For Transfer',
        ],
        answer: 'Time To First Token（首Token时间）',
        explanation: 'TTFT（Time to First Token）是用户看到第一个输出Token的等待时间，直接影响流式输出的用户体验。',
      },
    ],
  },

  'optimization-ab-testing': {
    id: 'optimization-ab-testing',
    title: 'A/B测试与持续优化',
    subtitle: '用数据驱动产品决策',
    duration: 40,
    difficulty: 'intermediate',
    tags: ['A/B测试', '优化', '数据驱动'],
    objectives: [
      '理解A/B测试的原理和价值',
      '掌握A/B实验的设计方法',
      '学会解读实验结果并做决策',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：不要凭感觉做决策',
        content: `"我觉得这个Prompt更好"、"用户应该喜欢这个功能"——这些是主观判断，没有数据支撑。

A/B测试用真实数据告诉我们哪个方案更好。`,
      },
      {
        type: 'concept',
        title: 'A/B测试原理',
        content: `**什么是A/B测试？**
将用户随机分组，每组看到不同版本（A组：当前版本，B组：新版本），比较两组的指标差异。

**核心原则**：

**1. 随机分组**
- 每个用户有相同概率进入各组
- 分组与用户特征无关
- 保证统计有效性

**2. 对照实验**
- A组是对照基线
- B组是实验变量
- 同时运行，排除时间干扰

**3. 统计显著**
- 样本量足够
- 差异具有统计显著性
- 排除随机波动

**AI应用中的A/B场景**：
- Prompt A vs Prompt B：哪种回答更好？
- 模型A vs 模型B：性能和成本对比
- 界面A vs 界面B：用户转化率
- 流程A vs 流程B：完成率和耗时`,
        keyPoint: 'A/B测试通过随机对照实验，用真实数据验证假设，避免主观决策。',
      },
      {
        type: 'concept',
        title: '实验设计步骤',
        content: `**Step 1：定义假设**
"使用更短的系统提示，用户满意度会提升10%"

**Step 2：选择指标**
- 主要指标：用户满意度评分
- 次要指标：响应时间、Token成本
- 防护指标：API调用量（确保不会下降）

**Step 3：确定样本量**
根据期望提升幅度和置信度计算：
- 期望提升10%
- 置信度95%
- 计算得到需要10000个用户

**Step 4：随机分组**
- 使用一致性哈希
- 固定分组（用户每次进入同一组）
- 分组比例：A组50%，B组50%

**Step 5：运行实验**
- 同时运行两个版本
- 收集指标数据
- 监控异常情况

**Step 6：分析结果**
- 计算差异的置信区间
- 判断是否统计显著
- 检查防护指标`,
      },
      {
        type: 'code',
        title: '代码示例：A/B分组实现',
        content: '实现用户随机分组：',
        code: `import hashlib

class ABTestManager:
    def __init__(self, experiment_id: str, group_weights=None):
        self.experiment_id = experiment_id
        self.group_weights = group_weights or {"A": 0.5, "B": 0.5}

    def get_group(self, user_id: str) -> str:
        """根据用户ID获取分组（一致性哈希）"""
        # 使用用户ID和实验ID生成哈希
        hash_input = f"{self.experiment_id}:{user_id}"
        hash_value = hashlib.md5(hash_input.encode()).hexdigest()

        # 将哈希值转换为0-1的数字
        hash_num = int(hash_value[:8], 16) / (2**32 - 1)

        # 根据权重分配分组
        cumulative = 0.0
        for group, weight in self.group_weights.items():
            cumulative += weight
            if hash_num < cumulative:
                return group

        return list(self.group_weights.keys())[-1]

    def get_config(self, group: str) -> dict:
        """获取分组对应的配置"""
        configs = {
            "A": {"model": "gpt-3.5-turbo", "prompt": "简短Prompt"},
            "B": {"model": "gpt-3.5-turbo", "prompt": "优化Prompt"},
        }
        return configs.get(group, configs["A"])

# 使用示例
ab_test = ABTestManager(experiment_id="prompt_optimization_v1")

def handle_chat_request(user_id: str, query: str):
    # 获取用户分组
    group = ab_test.get_group(user_id)

    # 获取对应配置
    config = ab_test.get_config(group)

    # 记录实验事件（用于分析）
    log_event({
        "experiment_id": ab_test.experiment_id,
        "user_id": user_id,
        "group": group,
        "event": "chat_request",
        "query": query
    })

    # 使用配置处理请求
    return call_llm_api(query, **config)`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '结果分析与决策',
        content: `**统计检验方法**：

**1. t检验**
- 适用于连续变量（如满意度分数）
- 比较两组均值差异
- 前提：数据正态分布

**2. 卡方检验**
- 适用于分类变量（如点击/未点击）
- 比较两组比例差异

**3. Bootstrap**
- 不假设数据分布
- 计算差异的置信区间
- 适用范围广

**决策规则**：

✅ **采用B版本**：
- 主要指标显著提升
- 防护指标不下降
- 置信区间全部在正值范围

❌ **保留A版本**：
- 主要指标无显著提升
- 或者防护指标下降

⚠️ **继续实验**：
- 数据量不足
- 置信区间跨零（不确定）

**示例结果**：
\`\`\`
指标          A组      B组      提升     置信区间    显著性
满意度      4.2       4.5      +7.1%   [3%, 12%]   ✅显著
响应时间    1.2s      1.3s      +8.3%   [2%, 15%]   ❌变慢
\`\`\`
决策：B版本提升满意度但响应变慢，需要权衡`,
      },
      {
        type: 'example',
        title: '实战：Prompt优化A/B测试',
        content: `**实验目的**：
优化系统提示，让回答更简洁。

**实验设计**：
- A组（基线）："你是一个有用的AI助手"
- B组（实验）："你是一个有用的AI助手。回答要简洁，不超过200字"

**结果**：
\`\`\`
指标              A组      B组      变化
用户满意度       3.8      4.1      +7.9%
Token成本        150      85       -43.3%
响应时间        1.2s     0.8s     -33.3%
\`\`\`

**决策**：采用B版本
- 满意度显著提升
- 成本降低43%（减少Token）
- 响应更快

**后续**：
- 全量发布B版本
- 继续监控指标
- 计划下一步实验（尝试更短的限制）`,
      },
      {
        type: 'note',
        title: '避免常见错误',
        content: '不要过早停止实验：需要足够样本量才有效。不要同时测试多个变量：一次只改一个因素，否则无法知道是哪个因素带来的效果。',
      },
    ],
    summary: 'A/B测试通过随机对照实验验证假设，用真实数据做决策。实验步骤：定义假设、选择指标、确定样本量、随机分组、运行实验、分析结果。决策需要看统计显著性和置信区间。',
    keyPoints: [
      'A/B测试用随机对照验证假设',
      '实验设计六步：假设、指标、样本、分组、运行、分析',
      '决策规则：主要指标显著提升且防护指标不下降',
      '避免过早停止和同时测试多个变量',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'A/B测试的核心原则是？',
        options: [
          '让用户自愿选择',
          '随机分组和对照实验',
          '选择VIP用户测试',
          '只在开发环境测试',
        ],
        answer: '随机分组和对照实验',
        explanation: '随机分组确保无偏，对照实验确保公平比较，两者结合才能得到可信结论。',
      },
      {
        type: 'choice',
        question: '置信区间跨零表示？',
        options: [
          '结果显著',
          '结果确定是正面的',
          '结果不确定，无法排除随机波动',
          '实验设计完美',
        ],
        answer: '结果不确定，无法排除随机波动',
        explanation: '置信区间跨零（例如[-5%, +10%]）表示差异可能是正也可能是负，无法确定是随机波动还是真实效果。',
      },
    ],
  },
};
