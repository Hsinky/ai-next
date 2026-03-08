// MCP协议与应用 - 课程数据

import type { Lesson } from '../../types';

export const mcpProtocolLessons: Record<string, Lesson> = {
  'mcp-intro': {
    id: 'mcp-intro',
    title: 'MCP是什么？解决什么问题',
    subtitle: '理解模型上下文协议的核心价值',
    duration: 35,
    difficulty: 'intermediate',
    tags: ['MCP', '协议'],
    objectives: [
      '解释MCP的基本概念',
      '理解MCP如何连接AI与工具',
      '了解常见的MCP应用场景'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：为什么需要MCP？',
        content: `即使你有一个强大的Agent，仍然需要机制来处理工具调用、错误、权限、重试等。这就是MCP（Model Context Protocol）的价值：定义AI与工具之间的通信标准。`,
      },
      {
        type: 'concept',
        title: 'MCP的四个核心要素',
        content: `1. **上下文传递**：明确哪些信息属于系统提示、用户输入、工具响应
2. **工具契约**：标准化参数与返回结构
3. **错误处理**：定义Retry/Abort策略
4. **安全边界**：限制工具调用权限`,
        keyPoint: 'MCP通过标准化上下文、契约、错误处理和安全保证Agent可控执行。',
      },
      {
        type: 'example',
        title: '示例：MCP中任务的生命周期',
        content: `任务：AI负责整理会议纪要。
1. 系统提示定义角色：你是会议助理
2. 用户输入会议音频链接
3. Agent调用转写工具（契约）
4. Tool返回文本，写入上下文
5. Agent调用摘要工具，生成纪要
6. 记录日志
7. 如失败，MCP定义了重试策略`,
      },
      {
        type: 'note',
        title: '要点总结',
        content: 'MCP不是具体实现，而是一套实践提供的协议，保证所有工具按统一方式交互。',
      },
    ],
    summary: 'MCP通过标准化上下文传递、工具契约、错误处理和安全边界，让AI与工具之间的通信可控、安全。理解MCP，是构建复杂Agent系统的关键。',
    keyPoints: [
      'MCP定义AI与工具的通信协议',
      '包含上下文、契约、错误处理、安全边界',
      '确保复杂任务在多工具环境下稳定运行'
    ],
    exercises: [
      {
        type: 'choice',
        question: 'MCP的核心作用是？',
        options: [
          '提高AI的输出长度',
          '定义AI与工具之间的通信协议',
          '训练模型的新参数',
          '加速API请求',
        ],
        answer: '定义AI与工具之间的通信协议',
        explanation: 'MCP（Model Context Protocol）通过标准化上下文和契约，确保AI与工具按统一方式交互。',
      },
      {
        type: 'choice',
        question: '下列选项不属于MCP核心要素的是？',
        options: [
          '上下文传递',
          '工具契约',
          '错误处理',
          '增大上下文窗口',
        ],
        answer: '增大上下文窗口',
        explanation: 'MCP聚焦协议与流程控制，不直接控制模型上下文窗口大小。',
      },
    ],
  },

  'mcp-server-dev': {
    id: 'mcp-server-dev',
    title: 'MCP Server开发入门',
    subtitle: '搭建一个能与Agent通信的MCP Server',
    duration: 40,
    difficulty: 'intermediate',
    tags: ['MCP', 'Server'],
    objectives: [
      '理解MCP Server需要提供的接口',
      '掌握请求/响应的标准结构',
      '知道如何处理权限与日志'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：MCP Server的角色',
        content: `MCP Server是工具的管理者：接收Agent请求、调用外部服务、包装响应，确保契约一致。`,
      },
      {
        type: 'concept',
        title: '标准请求/响应结构',
        content: `**请求结构**：
{
  "tool": "search_web",
  "input": {
    "query": "AI课程",
    "locale": "zh-CN"
  }
}

**响应结构**：
{
  "success": true,
  "result": [...],
  "executionTime": 120
}

所有工具都应遵循类似结构并附带metadata。`,
        keyPoint: '统一的请求/响应结构是MCP Server的基础，便于Agent复用工具。',
      },
      {
        type: 'code',
        title: '代码示例：简易MCP Server',
        content: '一个Python FastAPI实现的工具接口：',
        code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class ToolRequest(BaseModel):
    tool: str
    input: dict

class ToolResponse(BaseModel):
    success: bool
    result: dict

@app.post("/mcp/tool")
def call_tool(payload: ToolRequest):
    if payload.tool == "search_web":
        return ToolResponse(success=True, result={"items": []})
    raise HTTPException(status_code=404, detail="Tool not found")
`,
        language: 'python',
      },
      {
        type: 'note',
        title: '权限与日志',
        content: 'MCP Server还必须记录调用日志、验证权限、限制频率，避免滥用工具。',
      },
    ],
    summary: 'MCP Server接收Agent请求、调用工具并返回统一结构的响应，是Agent与外部服务的桥梁。实现稳定的请求/响应结构和完善的权限日志，是Server成功的关键。',
    keyPoints: [
      'MCP Server管理工具调用，用统一结构通信',
      '请求/响应结构示例：tool + input / success + result',
      '需要记录日志并控制权限',
    ],
    exercises: [
      {
        type: 'choice',
        question: '一个健壮的MCP Server应该做什么？',
        options: [
          '只关注工具响应速度',
          '提供统一的请求/响应结构，并记录日志、验证权限',
          '只处理简短文本',
          '连接尽可能多的模型接口',
        ],
        answer: '提供统一的请求/响应结构，并记录日志、验证权限',
        explanation: 'MCP Server的职责包括统一通信格式、控制权限、记录日志、限制滥用。',
      },
      {
        type: 'choice',
        question: 'MCP Server的日常运维指标不包括？',
        options: [
          '工具响应成功率',
          '调用日志数量',
          '模型训练loss',
          '权限校验失败次数',
        ],
        answer: '模型训练loss',
        explanation: 'MCP Server不直接参与模型训练，所以训练loss不是Server关注的指标。',
      },
    ],
  },

  'mcp-tools': {
    id: 'mcp-tools',
    title: '常用MCP工具库',
    subtitle: '掌握Agent常用的工具类型',
    duration: 35,
    difficulty: 'intermediate',
    tags: ['MCP', '工具'],
    objectives: [
      '了解搜索、数据库、浏览器等工具的特点',
      '掌握设计工具契约的技巧',
      '学会选择合适工具组合'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：工具就是Agent的手脚',
        content: `工具让Agent做事，从搜索到执行命令。选择合适的工具组合，决定Agent能完成什么任务。`,
      },
      {
        type: 'concept',
        title: '常见工具类型',
        content: `1. **搜索工具**：web_search、knowledge_search
2. **数据工具**：database_query、vector_search
3. **执行工具**：code_execution、browser_automation
4. **辅助工具**：calculator、translation

不同工具关注点：
- 搜索：返回摘要和链接
- 数据：返回结构化数据
- 执行：返回结果或错误
- 辅助：返回操作建议`,
        keyPoint: 'Agent通常使用搜索、数据、执行、辅助四类工具。',
      },
      {
        type: 'code',
        title: '代码示例：组合工具链',
        content: '让Agent先搜索、再执行的链式调用：',
        code: `def research_and_execute(agent, topic):
    search_result = agent.call_tool("search_web", {"query": topic, "max_results": 3})
    top_link = search_result["results"][0]["url"]
    browser = agent.call_tool("browser", {"url": top_link, "action": "summarize"})
    return agent.call_tool("code_execution", {"code": browser["summary"]})`,
        language: 'python',
      },
      {
        type: 'note',
        title: '工具组合策略',
        content: '设计工具链时：1)明确定义输入/输出契约 2)考虑异常传播 3)避免循环调用 4)控制调用频率',
      },
    ],
    summary: '常用MCP工具包括搜索、数据、执行和辅助工具。通过组合工具链，Agent能完成复杂任务。设计时要控制契约、异常、调用频率。',
    keyPoints: [
      '四类工具：搜索、数据、执行、辅助',
      '工具契约是通信基础',
      '工具链需要控制异常和频率',
    ],
    exercises: [
      {
        type: 'choice',
        question: '以下哪个不是常见的MCP工具类型？',
        options: [
          '搜索',
          '数据库',
          '浏览器自动化',
          '模型训练',
        ],
        answer: '模型训练',
        explanation: 'MCP工具以执行任务为主，不涉及模型训练。',
      },
      {
        type: 'choice',
        question: '组合工具链时应注意？',
        options: [
          '让工具无限调用',
          '忽略异常',
          '明确契约并控制调用频率',
          '只用一个工具',
        ],
        answer: '明确契约并控制调用频率',
        explanation: '契约保证工具可以协作，频率限制避免滥用。',
      },
    ],
  },

  'mcp-deployment': {
    id: 'mcp-deployment',
    title: '企业级MCP部署',
    subtitle: '将MCP系统推向生产环境的关键步骤',
    duration: 45,
    difficulty: 'intermediate',
    tags: ['MCP', '部署'],
    objectives: [
      '理解部署MCP系统的挑战',
      '掌握高可用性、监控与审计策略',
      '了解安全控制与成本管理'
    ],
    sections: [
      {
        type: 'introduction',
        title: '开篇：MCP在企业环境的作用',
        content: `企业部署MCP不仅要考虑功能，还要考虑安全、审计、合规和成本。这节课聚焦于生产级别的架构。`,
      },
      {
        type: 'concept',
        title: '高可用架构',
        content: `**关键点**：
- 工具实现冗余部署
- 使用负载均衡分发请求
- 实时健康检查与自动故障切换

**示例**：
多个MCP Server实例，使用API Gateway汇聚请求，失败时自动切换备用实例`,
      },
      {
        type: 'concept',
        title: '监控与审计',
        content: `**监控内容**：
- 工具响应时间、成功率
- API调用次数
- 异常日志与追踪ID

**审计需求**：
- 记录每次工具调用的参数与结果
- 保存用户请求和系统响应，用于追责
- 保留日志至少30天`,
      },
      {
        type: 'note',
        title: '成本与安全',
        content: '控制调用频率、设置权限、加密传输，以及按需扩缩容，是部署MCP时的常见策略。',
      },
    ],
    summary: '企业级MCP部署需要关注高可用、监控、审计、安全和成本。通过冗余架构、日志审计和权限控制，才能在生产环境稳健运行。',
    keyPoints: [
      '高可用架构包含冗余、负载均衡与故障切换',
      '监控指标：响应时间、成功率、异常日志',
      '审计记录请求/响应并保存30天以上',
    ],
    exercises: [
      {
        type: 'choice',
        question: '企业级MCP部署时，哪个要素最重要？',
        options: [
          '颜色主题',
          '高可用架构、监控与审计',
          '更大的模型',
          '把所有逻辑写在前端',
        ],
        answer: '高可用架构、监控与审计',
        explanation: '部署MCP时，确保高可用和能够监控/审计是根本。',
      },
      {
        type: 'choice',
        question: 'MCP审计日志至少保留多久？',
        options: [
          '1天',
          '7天',
          '30天',
          '永远不删除',
        ],
        answer: '30天',
        explanation: '审计日志需要保留下至少30天，便于追踪和合规。',
      },
    ],
  },
};
