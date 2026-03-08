// Agent协作与Swarm - 课程数据

import type { Lesson } from '../../types';

export const swarmLessons: Record<string, Lesson> = {
  'swarm-intro': {
    id: 'swarm-intro',
    title: 'Agent协作与Swarm',
    subtitle: '多个AI智能体如何协同工作',
    duration: 45,
    difficulty: 'advanced',
    tags: ['Agent', 'Swarm', '协作'],
    objectives: [
      '理解多Agent协作的概念',
      '掌握Swarm系统的架构设计',
      '学会设计Agent之间的通信协议',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：从单Agent到Agent群体',
        content: `单个Agent的能力有限，就像一个人面对复杂任务也会力不从心。

Swarm（群智）让多个Agent协作，每个Agent专注自己的领域，共同完成复杂任务。`,
      },
      {
        type: 'concept',
        title: '什么是Agent Swarm？',
        content: `**Agent Swarm（群智）**是指多个自主Agent协作完成共同目标的系统。

**类比**：
- 单Agent：一个超级专家，什么都做但可能不够专
- Swarm：多个专家团队，分工协作，更专业高效

**Swarm的优势**：

**1. 专业分工**
- Agent A：专注文档处理
- Agent B：专注数据分析
- Agent C：专注格式整理
- 各司其职，质量更高

**2. 并行执行**
- 多个Agent同时工作
- 缩短总处理时间
- 资源利用率更高

**3. 容错能力**
- 单个Agent失败不影响整体
- 自动重试和降级
- 系统更健壮

**4. 可扩展性**
- 新增任务只需添加新Agent
- 不影响现有Agent
- 灵活适应变化

**适用场景**：
- 复杂报告生成：调研Agent + 分析Agent + 写作Agent
- 多步骤工作流：采集Agent + 处理Agent + 存储Agent
- 代码开发：设计Agent + 编码Agent + 测试Agent + Review Agent`,
        keyPoint: 'Swarm通过多个专业Agent的分工协作，实现比单Agent更强的能力和健壮性。',
      },
      {
        type: 'concept',
        title: 'Swarm架构模式',
        content: `**模式一：层级式（Hierarchical）**
\`\`\`
Manager Agent（管理者）
    ├→ Research Agent（研究员）
    ├→ Writer Agent（写作者）
    └→ Editor Agent（编辑者）
\`\`\`
特点：有明确的指挥者，其他Agent执行指令。
适用：需要明确控制的场景。

**模式二：去中心化（Decentralized）**
\`\`\`
Agent A ⇄ Agent B ⇄ Agent C
   ↑        ↓
Agent D ⇄ Agent E ⇄ Agent F
\`\`\`
特点：Agent之间平等协作，通过通信达成共识。
适用：需要灵活协调的场景。

**模式三：流水线（Pipeline）**
\`\`\`
Agent A → Agent B → Agent C → Agent D
  采集     处理     分析     输出
\`\`\`
特点：按顺序传递数据，每个Agent处理一环。
适用：数据处理流程。

**模式四：动态联盟（Dynamic Coalition）**
\`\`\`
任务A: Agent A + Agent B
任务B: Agent B + Agent C + Agent E
任务C: Agent D + Agent F
\`\`\`
特点：根据任务动态组建Agent团队。
适用：多任务并发的场景。`,
      },
      {
        type: 'concept',
        title: 'Agent通信协议',
        content: `**核心问题**：Agent之间如何交流？

**协议要素**：

**1. 消息格式**
\`\`\`
{
  "from": "agent_1",
  "to": "agent_2",
  "type": "request/acknowledge/result",
  "payload": {...},
  "timestamp": 1234567890,
  "message_id": "msg_123"
}
\`\`\`

**2. 消息类型**
- Request：请求帮助
- Response：返回结果
- Acknowledge：确认收到
- Error：报告错误
- Broadcast：广播通知

**3. 通信机制**
\`\`\`
方式A：消息队列（推荐）
   所有Agent订阅队列
   通过队列异步通信

方式B：共享状态
   Agent读写共享数据结构
   适合强一致性场景

方式C：直接调用
   Agent之间函数调用
   同步但耦合度高
\`\`\`

**4. 冲突处理**
- 资源竞争：加锁机制
- 意见不一致：投票或仲裁
- 死锁：超时和回滚`,
      },
      {
        type: 'code',
        title: '代码示例：简单的Swarm系统',
        content: '实现一个层级式Swarm：',
        code: `from dataclasses import dataclass
from typing import List, Dict
import time

@dataclass
class Message:
    """Agent消息"""
    from_agent: str
    to_agent: str
    content: str
    message_type: str = "request"

class Agent:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role
        self.message_queue: List[Message] = []

    def send_message(self, to_agent: 'Agent', content: str):
        """发送消息"""
        msg = Message(
            from_agent=self.name,
            to_agent=to_agent.name,
            content=content
        )
        to_agent.message_queue.append(msg)
        print(f"{self.name} → {to_agent.name}: {content[:30]}...")

    def process_messages(self) -> List[Message]:
        """处理消息"""
        responses = []
        while self.message_queue:
            msg = self.message_queue.pop(0)
            response = self.handle_message(msg)
            if response:
                responses.append(response)
        return responses

    def handle_message(self, msg: Message) -> Message | None:
        """处理消息（子类实现）"""
        print(f"{self.name} 收到: {msg.content[:30]}...")
        return None

class ResearchAgent(Agent):
    def handle_message(self, msg: Message) -> Message:
        """研究员Agent：收集信息"""
        if "research" in msg.content.lower():
            result = f"已完成关于{msg.content}的研究"
            return Message(
                from_agent=self.name,
                to_agent=msg.from_agent,
                content=result
            )
        return super().handle_message(msg)

class WriterAgent(Agent):
    def handle_message(self, msg: Message) -> Message:
        """写作者Agent：生成文档"""
        if "write" in msg.content.lower():
            result = f"已根据{msg.content}生成文档"
            return Message(
                from_agent=self.name,
                to_agent=msg.from_agent,
                content=result
            )
        return super().handle_message(msg)

class ManagerAgent(Agent):
    """管理者Agent：协调其他Agent"""
    def __init__(self, name: str, agents: List[Agent]):
        super().__init__(name, "manager")
        self.agents = agents

    def coordinate_task(self, task: str):
        """协调任务"""
        print(f"\n【{self.name}】分配任务: {task}")

        # 步骤1：指派研究Agent
        research_agent = next(a for a in self.agents if a.role == "researcher")
        self.send_message(research_agent, f"请研究：{task}")

        # 模拟执行
        research_agent.process_messages()

        # 步骤2：指派写作者Agent
        writer_agent = next(a for a in self.agents if a.role == "writer")
        self.send_message(writer_agent, f"请基于研究结果写文档")

        # 模拟执行
        writer_agent.process_messages()

# 创建Swarm
research = ResearchAgent("ResearchBot", "researcher")
writer = WriterAgent("WriterBot", "writer")
manager = ManagerAgent("ManagerBot", [research, writer])

# 运行任务
manager.coordinate_task("AI技术发展趋势")`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：报告生成Swarm',
        content: `**场景**：自动生成行业研究报告

**Swarm组成**：

1. **Manager Agent**
   - 接收用户需求
   - 分解任务
   - 协调各Agent
   - 汇总最终报告

2. **Research Agent**
   - 搜索最新资料
   - 提取关键信息
   - 整理数据

3. **Analysis Agent**
   - 分析数据趋势
   - 识别关键洞察
   - 发现问题机会

4. **Writing Agent**
   - 组织内容结构
   - 撰写各章节
   - 优化语言表达

5. **Review Agent**
   - 检查语法错误
   - 验证数据准确性
   - 评估整体质量

**协作流程**：
\`\`\`
用户 → Manager → Research (并行: 3个子任务）
                ↓
              Analysis (并行: 2个子任务）
                ↓
              Writing (串行：按章节顺序）
                ↓
              Review (检查+反馈）
                ↓
              Manager → 用户
\`\`\`

**优化点**：
- 并行执行子任务，缩短时间
- 设置超时，避免Agent卡住
- 质量阈值，Review不通过返工`,
      },
      {
        type: 'note',
        title: 'Swarm挑战',
        content: 'Swarm系统复杂度高：Agent间通信延迟、协调逻辑复杂、调试困难、成本倍增。建议从简单场景开始，逐步扩展。',
      },
    ],
    summary: 'Agent Swarm通过多个专业Agent的协作，实现比单Agent更强的能力。架构模式包括层级式、去中心化、流水线、动态联盟。Agent通信协议定义消息格式和交互方式。',
    keyPoints: [
      'Swarm优势：专业分工、并行执行、容错能力、可扩展',
      '四种架构模式：层级式、去中心化、流水线、动态联盟',
      '通信协议包含：消息格式、类型、机制、冲突处理',
      'Swarm挑战：复杂度高、调试困难、成本倍增',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Swarm的主要优势是？',
        options: [
          '只有单个Agent',
          '多个专业Agent分工协作，能力更强',
          '成本更低',
          '实现更简单',
        ],
        answer: '多个专业Agent分工协作，能力更强',
        explanation: 'Swarm通过多个专业Agent的分工协作，每个Agent专注自己领域，整体能力更强。',
      },
      {
        type: 'choice',
        question: '流水线架构模式的特征是？',
        options: [
          'Agent之间平等协作',
          'Agent按顺序传递数据，各处理一环',
          '有明确的管理者',
          '动态组建团队',
        ],
        answer: 'Agent按顺序传递数据，各处理一环',
        explanation: '流水线模式中，Agent按顺序传递数据，每个Agent处理一环，适合数据处理流程。',
      },
    ],
  },

  'swarm-advanced': {
    id: 'swarm-advanced',
    title: '高级Swarm架构',
    subtitle: '构建复杂的企业级Agent协作系统',
    duration: 55,
    difficulty: 'advanced',
    tags: ['Swarm', '高级架构', '企业级'],
    objectives: [
      '掌握Swarm的高级设计模式',
      '学会处理复杂的Agent协调问题',
      '了解Swarm系统的运维和监控',
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：Swarm的进阶挑战',
        content: `从简单的多Agent协作到企业级Swarm，需要解决更多问题：
- 如何动态发现和调度Agent？
- Agent之间如何协商和投票？
- 如何保证系统的一致性和可靠性？`,
      },
      {
        type: 'concept',
        title: '动态Agent发现与注册',
        content: `**问题**：Agent不是固定的，需要动态加入/退出系统

**解决方案：Agent Registry（注册中心）**

\`\`\`
所有Agent → 注册 → 注册中心
              ↓
    查询可用Agent
              ↓
    按需分配任务
\`\`\`

**注册中心功能**：

**1. Agent注册**
- Agent启动时注册
- 声明能力（capabilities）
- 声明状态（available/busy/offline）
- 定期心跳保活

**2. Agent发现**
- 按能力查询Agent
- 按状态过滤Agent
- 负载均衡选择

**3. Agent注销**
- Agent正常退出时注销
- 超时未心跳自动注销
- 通知相关Agent

**实现示例**：
\`\`\`
class AgentRegistry:
    def __init__(self):
        self.agents = {}

    def register(self, agent_id, capabilities, endpoint):
        self.agents[agent_id] = {
            "capabilities": capabilities,
            "endpoint": endpoint,
            "status": "available",
            "last_heartbeat": time.time()
        }

    def find_agents(self, required_capability):
        return [
            (aid, info)
            for aid, info in self.agents.items()
            if required_capability in info["capabilities"]
            and info["status"] == "available"
        ]
\`\`\``,
      },
      {
        type: 'concept',
        title: 'Agent协商与共识',
        content: `**场景**：多个Agent对同一问题有不同看法

**协商机制**：

**1. 投票（Voting）**
- 多数票决
- 加权投票（权威Agent权重高）
- 超过阈值即通过

\`\`\`
示例：代码质量评估
Agent A: 8分
Agent B: 6分
Agent C: 7分
结果: (8+6+7)/3 = 7分
\`\`\`

**2. 仲裁（Arbitration）**
- 指定仲裁Agent
- 最终决策由仲裁者确定
- 适用于冲突不多的场景

**3. 混合（Hybrid）**
- 投票+仲裁
- 投票结果接近时仲裁
- 投票结果悬殊时直接采纳

**4. 多轮协商（Negotiation）**
- Agent交换观点
- 根据证据调整
- 迭代达成共识

**示例：任务分配协商**
\`\`\`
Agent A: "我擅长数据分析，接这个任务"
Agent B: "我也擅长，但我负载高，你接吧"
Agent C: "我有相关经验，可以Review"

结果: A执行，C监督
\`\`\``,
      },
      {
        type: 'concept',
        title: 'Swarm监控与可观测性',
        content: `**核心监控指标**：

**Agent级别**：
- 状态分布：available/busy/offline数量
- 任务完成率：成功率
- 平均处理时间
- 错误率

**消息级别**：
- 消息吞吐量：消息/秒
- 消息延迟：P50/P95/P99
- 队列积压：pending消息数
- 消息丢失率

**协作级别**：
- 协商耗时：达成共识的平均时间
- 冲突次数：协商不一致的次数
- 重试次数：任务重试比例

**拓扑级别**：
- Agent数量变化：新加入/退出
- 连接健康：Agent间连接状态
- 系统吞吐：整体任务处理能力

**监控实现**：

\`\`\`
# 每个Agent上报指标
class MetricsCollector:
    def record_agent_status(self, agent_id, status):
        self.metrics["agent_status"][agent_id] = {
            "status": status,
            "timestamp": time.time()
        }

    def record_message_latency(self, from_id, to_id, latency_ms):
        self.metrics["message_latency"].append({
            "from": from_id,
            "to": to_id,
            "latency_ms": latency_ms
        })

    def get_dashboard(self):
        """生成监控Dashboard数据"""
        return {
            "total_agents": len(self.metrics["agent_status"]),
            "active_agents": sum(
                1 for s in self.metrics["agent_status"].values()
                if s["status"] == "available"
            ),
            "avg_latency": sum(
                m["latency_ms"] for m in self.metrics["message_latency"]
            ) / len(self.metrics["message_latency"]),
            ...
        }
\`\`\``,
      },
      {
        type: 'code',
        title: '代码示例：高级Swarm协调器',
        content: '实现动态Agent分配和任务监控：',
        code: `import time
from typing import List, Dict, Optional
from dataclasses import dataclass

@dataclass
class Task:
    id: str
    required_capability: str
    payload: dict
    priority: int = 1
    status: str = "pending"
    assigned_agent: Optional[str] = None

class AdvancedSwarmOrchestrator:
    def __init__(self):
        self.agents: Dict[str, dict] = {}
        self.tasks: Dict[str, Task] = {}
        self.task_queue: List[str] = []

    def register_agent(self, agent_id: str, capabilities: List[str], endpoint: str):
        """注册Agent"""
        self.agents[agent_id] = {
            "capabilities": capabilities,
            "endpoint": endpoint,
            "status": "available",
            "last_heartbeat": time.time(),
            "load": 0
        }
        print(f"Agent {agent_id} 注册成功，能力: {capabilities}")

    def submit_task(self, task: Task):
        """提交任务"""
        self.tasks[task.id] = task
        # 按优先级插入队列
        inserted = False
        for i, tid in enumerate(self.task_queue):
            if self.tasks[tid].priority < task.priority:
                self.task_queue.insert(i, task.id)
                inserted = True
                break
        if not inserted:
            self.task_queue.append(task.id)

        print(f"任务 {task.id} 已提交，优先级: {task.priority}")

    def schedule_tasks(self):
        """调度任务"""
        while self.task_queue:
            task_id = self.task_queue.pop(0)
            task = self.tasks[task_id]

            # 查找可用Agent
            available_agents = [
                (aid, info) for aid, info in self.agents.items()
                if task.required_capability in info["capabilities"]
                and info["status"] == "available"
                and info["load"] < 5  # 负载限制
            ]

            if not available_agents:
                # 没有可用Agent，重新入队
                self.task_queue.append(task_id)
                print(f"任务 {task_id} 没有可用Agent，等待...")
                break

            # 选择负载最低的Agent
            best_agent = min(available_agents, key=lambda x: x[1]["load"])
            agent_id, _ = best_agent

            # 分配任务
            self._assign_task(agent_id, task)
            print(f"任务 {task.id} 分配给 {agent_id}")

    def _assign_task(self, agent_id: str, task: Task):
        """分配任务给Agent"""
        task.assigned_agent = agent_id
        task.status = "assigned"
        self.agents[agent_id]["load"] += 1
        self.agents[agent_id]["status"] = "busy"

        # 这里应该通过RPC调用Agent执行任务
        # self._call_agent(agent_id, task)

    def complete_task(self, task_id: str, agent_id: str):
        """完成任务"""
        task = self.tasks[task_id]
        task.status = "completed"
        self.agents[agent_id]["load"] -= 1
        if self.agents[agent_id]["load"] == 0:
            self.agents[agent_id]["status"] = "available"
        print(f"任务 {task_id} 由 {agent_id} 完成")

# 使用示例
orchestrator = AdvancedSwarmOrchestrator()

# 注册Agent
orchestrator.register_agent("agent_1", ["research", "analysis"], "http://localhost:8001")
orchestrator.register_agent("agent_2", ["writing", "editing"], "http://localhost:8002")
orchestrator.register_agent("agent_3", ["research", "analysis"], "http://localhost:8003")

# 提交任务
orchestrator.submit_task(Task("task_1", "research", {"topic": "AI趋势"}))
orchestrator.submit_task(Task("task_2", "writing", {"content": "报告大纲"}, priority=2))

# 调度
orchestrator.schedule_tasks()`,
        language: 'python',
      },
      {
        type: 'example',
        title: '实战：企业级知识Swarm',
        content: `**场景**：企业知识处理系统

**Swarm组成**：

1. **Ingestion Agents** (数据采集)
   - WebCrawler: 爬取公开资讯
   - EmailCollector: 收集邮件
   - DocumentParser: 解析PDF/Word
   - 每类Agent可多实例并行

2. **Processing Agents** (数据处理)
   - Extractor: 提取关键信息
   - Classifier: 内容分类打标
   - Embedder: 生成向量
   - Queue: 任务队列分发

3. **Analysis Agents** (分析推理)
   - Summarizer: 生成摘要
   - InsightAgent: 发现洞察
   - TrendAgent: 识别趋势

4. **Storage Agents** (存储管理)
   - VectorDB: 存储向量
   - DocumentDB: 存储原文
   - CacheManager: 管理缓存

5. **Gateway Agent** (网关管理)
   - 路由Agent: 分发请求
   - MonitorAgent: 监控状态
   - HealAgent: 自愈恢复

**架构图**：
\`\`\`
外部源 → Ingestion Agents → Queue → Processing Agents
                                 ↓
                            Analysis Agents
                                 ↓
                            Storage Agents
                                 ↓
                            Gateway → 用户
\`\`\`

**关键特性**：
- 动态扩缩容：高负载自动增加Agent实例
- 故障自愈：Agent失败自动重启和重新分配
- 负载均衡：任务均匀分配
- 实时监控：Dashboard展示Agent状态和任务进度`,
      },
      {
        type: 'note',
        title: 'Swarm治理',
        content: 'Swarm需要治理：版本管理、升级策略、成本控制、合规审计。建议建立Swarm运维平台，提供可视化管理和操作界面。',
      },
    ],
    summary: '高级Swarm架构包括动态Agent发现、协商共识机制、完整监控体系。企业级Swarm需要考虑扩缩容、自愈、负载均衡、成本控制等运维能力。',
    keyPoints: [
      'Agent Registry实现动态发现和注册',
      '协商机制：投票、仲裁、混合、多轮协商',
      '监控指标：Agent状态、消息延迟、协作耗时、系统吞吐',
      '企业级特性：动态扩缩容、故障自愈、负载均衡',
    ],
    exercises: [
      {
        type: 'choice',
        question: 'Agent Registry的主要功能是？',
        options: [
          '存储所有数据',
          '动态发现和管理Agent',
          '生成报告',
          '处理用户请求',
        ],
        answer: '动态发现和管理Agent',
        explanation: 'Agent Registry（注册中心）用于动态发现和管理Agent，支持注册、查询、注销等功能。',
      },
      {
        type: 'choice',
        question: 'Swarm协商机制中，投票适用于？',
        options: [
          '只有两个Agent需要决策',
          '多个Agent对同一问题有不同看法需要决策',
          '单个Agent处理任务',
          '不需要任何协商',
        ],
        answer: '多个Agent对同一问题有不同看法需要决策',
        explanation: '投票机制用于多个Agent对同一问题有不同看法时，通过多数票决达成共识。',
      },
    ],
  },
};
