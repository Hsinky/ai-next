// Workflow工作流 - 课程数据

import type { Lesson } from '../../types';

export const workflowDesignLessons: Record<string, Lesson> = {
  'workflow-principles': {
    id: 'workflow-principles',
    title: '工作流设计原则',
    subtitle: '学会设计可理解、可维护的AI工作流',
    duration: 40,
    difficulty: 'intermediate',
    tags: ['Workflow', '设计原则'],
    objectives: [
      '理解工作流设计的核心原则',
      '掌握流程控制和分支的基本方法',
      '学会设计可复用的工作流模块'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：什么时候需要工作流？',
        content: `当单次AI回复不能完成多步任务时，就需要工作流。它通过一系列节点、分支和条件，让AI按既定流程执行任务，具备可维护和可观测性。`,
      },
      {
        type: 'concept',
        title: '设计原则一：原子性与可组合',
        content: `**原子性**：每个节点做一件事，如"查询用户"、"写报告"。职责清晰便于测试。

**可组合**：节点可按需组装，如[查订单→分析→邮件]和[查订单→分析→退款]复用节点。

**实现**：每个节点定义为函数，明确输入输出结构。`,
        keyPoint: '将工作流拆解为原子节点，通过组合实现复用。',
      },
      {
        type: 'concept',
        title: '设计原则二：上下文传递与状态机',
        content: `**上下文传递**：
每个节点读/写共享上下文对象，确保信息在节点间流转。

**状态机模型**：
- 初始状态→验证节点→执行节点→完成/失败状态
- 每个状态有明确的触发条件

**示例**：
状态pending → 执行数据查询 → 状态queried → 生成报告 → 状态completed`,
      },
      {
        type: 'code',
        title: '代码示例：工作流节点定义',
        content: '一个节点抽象的简单实现：',
        code: `from typing import Callable, Any
from dataclasses import dataclass

@dataclass
class NodeOutput:
    data: Any
    status: str
    logs: list

class WorkflowNode:
    def __init__(self, name: str, handler: Callable):
        self.name = name
        self.handler = handler

    def execute(self, context: dict) -> NodeOutput:
        try:
            result = self.handler(context)
            return NodeOutput(data=result, status="success", logs=[])
        except Exception as e:
            return NodeOutput(data=None, status="error", logs=[str(e)])

def query_user_node(context):
    return {"user_data": "张三，订单#12345"}

def analyze_node(context):
    return {"analysis": "用户下单5天，物流正常"}

def email_node(context):
    return {"email_sent": True}

# 组装工作流
nodes = [
    WorkflowNode("query_user", query_user_node),
    WorkflowNode("analyze", analyze_node),
    WorkflowNode("email", email_node),
]`,
        language: 'python',
      },
      {
        type: 'note',
        title: '最佳实践',
        content: '工作流设计时，用可视化工具绘制流程图，帮助团队理解。节点应该有清晰的前后依赖。复杂工作流建议先做原型测试。',
      },
    ],
    summary: '工作流设计原则包括原子性、可组合性、上下文传递和状态机。通过节点化和组合，可以构建复用性强、可观测的AI自动化流程。',
    keyPoints: [
      '节点应该原子化、职责单一',
      '上下文在节点间传递，状态机保证流程清晰',
      '节点抽象便于单元测试',
      '复杂工作流建议先原型验证',
    ],
    exercises: [
      {
        type: 'choice',
        question: '工作流节点应该？',
        options: [
          '尽可能多地处理任务',
          '职责单一且原子化',
          '直接访问全局变量',
          '不需要明确的输入输出',
        ],
        answer: '职责单一且原子化',
        explanation: '节点职责单一时，测试和组合更容易。',
      },
      {
        type: 'choice',
        question: '状态机在Workflow中的作用是？',
        options: [
          '让AI模型更聪明',
          '定义流程状态和触发条件，保证流程可控',
          '减少API调用次数',
          '提高输出质量',
        ],
        answer: '定义流程状态和触发条件，保证流程可控',
        explanation: '状态机明确定义流程中的各个状态和状态转换条件，确保流程按预期执行。',
      },
    ],
  },

  'workflow-branching': {
    id: 'workflow-branching',
    title: '条件分支与循环',
    subtitle: '实现智能分支和重复处理逻辑',
    duration: 40,
    difficulty: 'intermediate',
    tags: ['Workflow', '分支', '循环'],
    objectives: [
      '掌握条件分支的设计方法',
      '学会在工作流中实现循环逻辑',
      '理解如何避免无限循环'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：不是线性流程的世界',
        content: `实际任务往往需要分支（如条件判断、多路径选择）和循环（如重试、批量处理）。本节课将教你如何在Workflow中实现这些逻辑。`,
      },
      {
        type: 'concept',
        title: '条件分支的实现方式',
        content: `**方式一：条件判断节点**
节点根据输入值选择不同路径。例如："如果用户有订单，走处理流程；否则走欢迎流程"。

**方式二：多路选择**
并行执行多个分支，按最早返回的结果决定后续。用于不确定哪条路径更快的场景。

**方式三：规则引擎**
配置化规则如：
\`\`\`
规则1：如果 order_amount > 1000，走高级审核
规则2：如果 order_amount <= 1000，走自动通过
规则3：如果 用户等级=VIP，跳过审核
\`\`\`

**方式四：动态路由**
由AI根据上下文动态决定下一步执行哪个节点（类似Agent行为）。`,
        keyPoint: '条件分支让工作流根据输入和规则选择不同路径。',
      },
      {
        type: 'code',
        title: '代码示例：条件节点实现',
        content: '一个简单的条件分支示例：',
        code: `class ConditionalNode(WorkflowNode):
    def __init__(self, name, condition, true_branch, false_branch):
        super().__init__(name, self._execute)
        self.condition = condition  # 函数: context -> bool
        self.true_branch = true_branch
        self.false_branch = false_branch

    def _execute(self, context):
        if self.condition(context):
            return self.true_branch.execute(context)
        else:
            return self.false_branch.execute(context)

def has_order_condition(context):
    return "order_id" in context

# 使用示例
conditional_node = ConditionalNode(
    name="check_order",
    condition=has_order_condition,
    true_branch=WorkflowNode("process", process_order_node),
    false_branch=WorkflowNode("welcome", welcome_node),
)
output = conditional_node.execute({"order_id": "12345"})`,
        language: 'python',
      },
      {
        type: 'concept',
        title: '循环逻辑：避免无限陷阱',
        content: `**循环类型**：
1. **重试循环**：失败后重试，最多N次
2. **遍历循环**：对列表中每一项执行相同流程
3. **等待循环**：定期检查条件，直到满足后继续

**避免无限循环的方法**：
- 设置最大迭代次数（如重试最多3次）
- 使用退出条件（如status=success）
- 超时机制（如最多运行5分钟）

**示例**：
遍历订单列表，每单都走相同的处理流程，但整体设置超时和总量上限。`,
        keyPoint: '循环必须有明确的退出条件和次数限制，避免无限执行。',
      },
      {
        type: 'example',
        title: '实战：订单处理分支逻辑',
        content: `场景：处理用户订单
1. 判断节点：是否有未处理订单？
   - 有 → 进入处理流程
   - 无 → 返回欢迎消息
2. 金额判断节点：
   - 金额>5000 → 人工审核分支
   - 金额≤5000 → 自动通过分支
3. 库存判断节点：
   - 有库存 → 通知发货分支
   - 无库存 → 等待补货分支
`,
      },
    ],
    summary: '条件分支让工作流根据不同输入走不同路径，循环处理重复或等待条件。必须设置明确的退出条件和最大次数，避免无限循环。',
    keyPoints: [
      '条件分支方式：条件节点、多路选择、规则引擎、动态路由',
      '循环类型：重试、遍历、等待',
      '必须有退出条件和最大次数限制',
    ],
    exercises: [
      {
        type: 'choice',
        question: '实现循环逻辑时，最重要的一点是？',
        options: [
          '让循环运行越久越好',
          '设置明确的退出条件和最大次数',
          '尽可能使用多个循环嵌套',
          '循环体要足够长',
        ],
        answer: '设置明确的退出条件和最大次数',
        explanation: '退出条件（如status=success）和最大次数限制避免无限循环。',
      },
      {
        type: 'choice',
        question: '哪种情况适合用条件分支？',
        options: [
          '顺序执行相同任务',
          '根据用户状态走不同处理流程',
          '所有用户走统一流程',
          '不需要任何决策',
        ],
        answer: '根据用户状态走不同处理流程',
        explanation: '当不同输入需要不同处理路径时，需要条件分支来分流。',
      },
    ],
  },

  'workflow-error-handling': {
    id: 'workflow-error-handling',
    title: '错误处理与重试',
    subtitle: '让工作流在异常时优雅处理',
    duration: 35,
    difficulty: 'intermediate',
    tags: ['Workflow', '错误处理'],
    objectives: [
      '理解工作流中错误处理的必要性',
      '掌握不同类型错误的处理策略',
      '学会实现自动重试与降级机制'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：工作流不是一次性成功',
        content: `API超时、工具失败、数据异常是常态。错误处理不周全会让整个工作流中断或进入未知状态。这节课教你如何设计健壮的错误处理机制。`,
      },
      {
        type: 'concept',
        title: '错误类型与处理策略',
        content: `**类型一：可重试错误**
- 网络超时、服务繁忙、限流
**策略**：退避重试，最多3次，间隔递增（如1s、2s、4s）

**类型二：降级错误**
- 服务A不可用
**策略**：自动切换到服务B，或返回缓存/默认值

**类型三：致命错误**
- 无效输入、权限拒绝、数据丢失
**策略**：立即终止，记录详细错误，通知用户

**类型四：部分失败**
- 部分节点失败，但其他节点可继续
**策略**：标记失败部分，继续流程（如邮件失败不影响订单记录）`,
        keyPoint: '根据错误类型选择重试、降级、终止或部分继续策略。',
      },
      {
        type: 'code',
        title: '代码示例：自动重试装饰器',
        content: '实现一个带重试机制的节点执行器：',
        code: `import time
from functools import wraps

def retryable(max_retries=3, backoff=1):
    def decorator(func):
        @wraps(func)
        def wrapper(context):
            last_error = None
            for attempt in range(max_retries):
                try:
                    return func(context)
                except Exception as e:
                    last_error = e
                    if attempt < max_retries - 1:
                        wait_time = backoff * (2 ** attempt)
                        time.sleep(wait_time)
            raise Exception(f"Failed after {max_retries} attempts: {last_error}")
        return wrapper

@retryable(max_retries=3, backoff=1)
def api_call_node(context):
    return {"data": "成功"}

# 调用时会自动重试`,
        language: 'python',
      },
      {
        type: 'note',
        title: '错误记录与监控',
        content: '每次错误都应该被记录：错误类型、上下文、重试次数、最终处理。这便于后续优化和排障。',
      },
    ],
    summary: '工作流错误处理需要根据不同错误类型采用不同策略。可重试错误退避重试，降级错误切换备用，致命错误终止通知。完善的日志记录是故障分析和优化的基础。',
    keyPoints: [
      '错误类型：可重试、降级、致命、部分失败',
      '可重试错误使用退避重试策略',
      '降级错误自动切换备用服务',
      '致命错误立即终止并通知',
    ],
    exercises: [
      {
        type: 'choice',
        question: '网络超时属于哪种错误类型？',
        options: [
          '致命错误',
          '可重试错误',
          '部分失败',
          '不需要处理',
        ],
        answer: '可重试错误',
        explanation: '网络超时通常是暂时的，可以通过重试机制恢复。',
      },
      {
        type: 'choice',
        question: '退避重试策略中，重试间隔应该？',
        options: [
          '每次间隔相同',
          '逐次递增，如1s、2s、4s',
          '每次间隔减小',
          '完全随机',
        ],
        answer: '逐次递增，如1s、2s、4s',
        explanation: '退避重试避免瞬间重试造成压力，逐步增加间隔给服务恢复时间。',
      },
    ],
  },

  'workflow-orchestration': {
    id: 'workflow-orchestration',
    title: '复杂任务编排实战',
    subtitle: '用工作流编排解决实际业务问题',
    duration: 50,
    difficulty: 'intermediate',
    tags: ['Workflow', '编排'],
    objectives: [
      '理解编排与调度的差异',
      '掌握复杂工作流的设计方法',
      '学会监控和调试工作流执行'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：编排是工作流的高级形式',
        content: `编排涉及多个工作流的组合、并行执行和依赖管理。它能让多个自动化流程协同完成一个复杂业务目标。本节课我们将设计一个完整的编排场景。`,
      },
      {
        type: 'concept',
        title: '编排核心要素',
        content: `1. **依赖管理**：明确任务的前后依赖，确保执行顺序正确
2. **并行执行**：互不依赖的任务可同时执行，提升效率
3. **事件驱动**：通过事件触发下一阶段，而不是硬编码顺序
4. **状态同步**：多个流程需要共享状态，如用户信息、上下文`,
        keyPoint: '编排通过依赖、并行和事件协调多个流程。',
      },
      {
        type: 'example',
        title: '实战：新用户入职编排',
        content: `业务场景：新员工入职，涉及多个部门协作
1. HR流程：创建账号、发放设备、录入系统
2. IT流程：开通权限、配置邮箱、安装软件
3. 培训流程：安排培训、发送资料、设定导师

编排设计：
- HR流程完成后 → 触发IT流程
- IT配置完成 → 并行触发培训流程
- 所有流程完成 → 发送入职欢迎邮件
- 任一环节失败 → 通知HR经理

关键点：
- 用事件触发下一环节（"账号创建完成" → 触发IT配置）
- 使用共享上下文（员工信息在HR、IT、培训间共享）
- 超时处理（任一流程超过3小时自动提醒）`,
      },
      {
        type: 'code',
        title: '代码示例：简单的编排器',
        content: '一个事件驱动的编排示例：',
        code: `class WorkflowOrchestrator:
    def __init__(self):
        self.workflows = {}  # name -> workflow
        self.event_handlers = {}  # event -> handler
        self.context = {}

    def register_workflow(self, name, workflow):
        self.workflows[name] = workflow

    def on_event(self, event_type, payload):
        if event_type in self.event_handlers:
            self.event_handlers[event_type](self.context, payload)

    def emit_event(self, event_type, payload):
        self.on_event(event_type, payload)

# 定义事件
orchestrator = WorkflowOrchestrator()

def handle_account_created(ctx, payload):
    orchestrator.context["user"] = payload["user"]
    orchestrator.emit_event("start_it_setup", payload)

def handle_it_completed(ctx, payload):
    orchestrator.emit_event("start_training", payload)

orchestrator.event_handlers["account_created"] = handle_account_created
orchestrator.event_handlers["it_completed"] = handle_it_completed`,
        language: 'python',
      },
      {
        type: 'note',
        title: '编排的监控与调试',
        content: '编排场景复杂，必须有完整的监控：每个流程的执行时间、事件流转图、失败告警。',
      },
    ],
    summary: '编排通过依赖管理、并行执行和事件驱动，协调多个工作流完成复杂业务。新用户入职等跨部门场景特别适合编排。',
    keyPoints: [
      '编排涉及多个工作流的组合和依赖',
      '依赖管理确保执行顺序正确',
      '并行执行提升效率',
      '事件驱动让编排更灵活',
    ],
    exercises: [
      {
        type: 'choice',
        question: '编排中最适合并行执行的节点是？',
        options: [
          '有严格先后依赖的节点',
          '相互独立、无依赖的节点',
          '所有节点都强制串行',
          '涉及外部API调用的节点',
        ],
        answer: '相互独立、无依赖的节点',
        explanation: '无依赖的节点可以并行执行，提高整体效率。',
      },
      {
        type: 'choice',
        question: '事件驱动编排的主要好处是？',
        options: [
          '减少代码行数',
          '让编排更灵活、易于维护',
          '避免使用数据库',
          '加快网络传输',
        ],
        answer: '让编排更灵活、易于维护',
        explanation: '事件驱动让流程解耦，新增/修改流程只需处理事件，而不影响其他部分。',
      },
    ],
  },
};
