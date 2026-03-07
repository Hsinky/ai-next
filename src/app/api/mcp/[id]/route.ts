import { NextResponse } from "next/server";
import { MCPServer } from "@/types";

const mcpDetails: Record<number, MCPServer> = {
  1: {
    id: 1,
    name: "Database MCP Server",
    description: "提供数据库连接和查询能力的MCP服务器，支持PostgreSQL、MySQL、SQLite等多种数据库。通过标准化接口实现数据库操作，让AI助手能够安全地执行SQL查询。",
    version: "1.0.0",
    status: "运行中",
    icon: "🗄️",
    category: "数据库",
    uptime: "99.9%",
    connections: 24,
    lastUpdate: "2分钟前",
    latency: "12ms",
    tags: ["推荐"],
    author: "MCP Database Team",
    homepage: "https://github.com/modelcontextprotocol/servers/tree/main/src/postgres",
    documentation: "https://modelcontextprotocol.io/docs/servers/database",
    repository: "https://github.com/modelcontextprotocol/servers",
    installCommand: `# Claude Desktop 配置
# 在 Claude Desktop 配置文件中添加：

# macOS: ~/Library/Application Support/Claude/claude_desktop_config.json
# Windows: %APPDATA%\\Claude\\claude_desktop_config.json

{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://user:password@localhost:5432/mydb"
      ]
    }
  }
}`,
    configExample: `# 环境变量配置
DATABASE_URL=postgresql://user:password@localhost:5432/mydb

# 可选配置
MCP_DB_POOL_SIZE=10
MCP_DB_TIMEOUT=30000
MCP_DB_SSL=true`,
    tools: [
      "query - 执行SQL查询语句",
      "list_tables - 列出所有数据表",
      "describe_table - 获取表结构信息",
      "insert - 插入数据",
      "update - 更新数据",
      "delete - 删除数据"
    ],
    resources: [
      "数据库连接池",
      "查询结果缓存",
      "事务管理器"
    ]
  },
  2: {
    id: 2,
    name: "File System MCP",
    description: "文件系统操作MCP服务器，提供安全的文件读写、目录管理等能力。支持路径白名单配置，确保AI只能在授权目录内操作。",
    version: "0.9.2",
    status: "运行中",
    icon: "📁",
    category: "文件系统",
    uptime: "98.5%",
    connections: 12,
    lastUpdate: "5分钟前",
    latency: "8ms",
    tags: [],
    author: "MCP Core Team",
    homepage: "https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem",
    documentation: "https://modelcontextprotocol.io/docs/servers/filesystem",
    repository: "https://github.com/modelcontextprotocol/servers",
    installCommand: `# Claude Desktop 配置
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/directory"
      ]
    }
  }
}

# 支持多个允许目录
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/username/projects",
        "/Users/username/documents"
      ]
    }
  }
}`,
    configExample: `# 安全配置
ALLOWED_PATHS=/home/user/projects,/home/user/documents
MAX_FILE_SIZE=10485760  # 10MB
READ_ONLY=false

# 高级选项
ENABLE_WATCHER=true
IGNORE_PATTERNS=node_modules,.git,*.log`,
    tools: [
      "read_file - 读取文件内容",
      "write_file - 写入文件",
      "list_directory - 列出目录内容",
      "create_directory - 创建目录",
      "move_file - 移动/重命名文件",
      "search_files - 搜索文件",
      "get_file_info - 获取文件元信息"
    ],
    resources: [
      "文件系统访问",
      "目录监视器",
      "安全路径验证"
    ]
  },
  3: {
    id: 3,
    name: "API Gateway MCP",
    description: "API网关MCP服务器，提供HTTP请求代理能力。支持REST API调用、认证管理、请求重试等功能，让AI能够与外部API服务交互。",
    version: "2.1.0",
    status: "运行中",
    icon: "🌐",
    category: "网络",
    uptime: "99.5%",
    connections: 48,
    lastUpdate: "1分钟前",
    latency: "25ms",
    tags: ["热门"],
    author: "API Tools Inc.",
    homepage: "https://github.com/modelcontextprotocol/servers/tree/main/src/fetch",
    documentation: "https://modelcontextprotocol.io/docs/servers/fetch",
    repository: "https://github.com/modelcontextprotocol/servers",
    installCommand: `# Claude Desktop 配置
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-fetch"]
    }
  }
}

# 带认证配置
{
  "mcpServers": {
    "fetch": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-fetch",
        "--header",
        "Authorization: Bearer YOUR_TOKEN"
      ]
    }
  }
}`,
    configExample: `# API 网关配置
DEFAULT_TIMEOUT=30000
MAX_RETRIES=3
RETRY_DELAY=1000

# 代理设置（可选）
HTTP_PROXY=http://proxy.example.com:8080
HTTPS_PROXY=http://proxy.example.com:8080

# 请求头
DEFAULT_HEADERS={
  "User-Agent": "MCP-Fetch/2.1",
  "Accept": "application/json"
}`,
    tools: [
      "fetch - 发起HTTP请求",
      "get - GET请求快捷方法",
      "post - POST请求快捷方法",
      "put - PUT请求快捷方法",
      "delete - DELETE请求快捷方法",
      "set_header - 设置默认请求头"
    ],
    resources: [
      "HTTP客户端",
      "认证管理器",
      "响应缓存"
    ]
  },
  5: {
    id: 5,
    name: "Search Engine MCP",
    description: "搜索引擎MCP服务器，集成多个搜索引擎API，提供网页搜索、图片搜索、新闻搜索等能力。支持Google、Bing、DuckDuckGo等搜索引擎。",
    version: "1.5.0",
    status: "运行中",
    icon: "🔍",
    category: "搜索",
    uptime: "99.8%",
    connections: 36,
    lastUpdate: "3分钟前",
    latency: "15ms",
    tags: ["推荐"],
    author: "Search MCP Team",
    homepage: "https://github.com/modelcontextprotocol/servers/tree/main/src/brave-search",
    documentation: "https://modelcontextprotocol.io/docs/servers/search",
    repository: "https://github.com/modelcontextprotocol/servers",
    installCommand: `# 需要 Brave Search API Key
# 从 https://brave.com/search/api/ 获取

# Claude Desktop 配置
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "YOUR_BRAVE_API_KEY"
      }
    }
  }
}`,
    configExample: `# API 密钥配置
BRAVE_API_KEY=your_brave_api_key
GOOGLE_API_KEY=your_google_api_key  # 可选
GOOGLE_CX=your_custom_search_engine_id  # 可选

# 搜索配置
DEFAULT_SEARCH_ENGINE=brave
MAX_RESULTS=10
SAFE_SEARCH=moderate`,
    tools: [
      "search - 执行网页搜索",
      "search_images - 搜索图片",
      "search_news - 搜索新闻",
      "search_videos - 搜索视频",
      "get_suggestions - 获取搜索建议"
    ],
    resources: [
      "搜索引擎连接",
      "结果缓存",
      "速率限制器"
    ]
  },
  6: {
    id: 6,
    name: "AI Model MCP",
    description: "AI模型服务MCP服务器，提供多模型统一调用接口。支持OpenAI、Anthropic、本地模型等，实现模型切换和负载均衡。",
    version: "3.0.0",
    status: "运行中",
    icon: "🤖",
    category: "AI",
    uptime: "99.2%",
    connections: 18,
    lastUpdate: "10分钟前",
    latency: "120ms",
    tags: ["热门", "新上线"],
    author: "AI Gateway Team",
    homepage: "https://github.com/modelcontextprotocol/servers",
    documentation: "https://modelcontextprotocol.io/docs/servers/ai",
    repository: "https://github.com/modelcontextprotocol/servers",
    installCommand: `# Claude Desktop 配置
{
  "mcpServers": {
    "ai-model": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-ai"],
      "env": {
        "OPENAI_API_KEY": "sk-...",
        "ANTHROPIC_API_KEY": "sk-ant-..."
      }
    }
  }
}`,
    configExample: `# 模型配置
DEFAULT_MODEL=gpt-4
FALLBACK_MODEL=claude-3-sonnet

# API Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...

# 高级配置
MAX_TOKENS=4096
TEMPERATURE=0.7
ENABLE_STREAMING=true`,
    tools: [
      "chat - 发送聊天消息",
      "complete - 文本补全",
      "embed - 生成文本嵌入",
      "list_models - 列出可用模型",
      "set_model - 切换默认模型"
    ],
    resources: [
      "多模型网关",
      "负载均衡器",
      "请求队列"
    ]
  }
};

const defaultMCPDetail = (id: number, baseData: Partial<MCPServer>): MCPServer => ({
  id,
  name: baseData.name || `MCP Server ${id}`,
  description: baseData.description || "MCP (Model Context Protocol) 服务器，为AI助手提供扩展能力。",
  version: baseData.version || "1.0.0",
  status: baseData.status || "可用",
  icon: baseData.icon || "🔧",
  category: baseData.category || "通用",
  uptime: baseData.uptime || "99.0%",
  connections: baseData.connections || 0,
  lastUpdate: baseData.lastUpdate || "-",
  latency: baseData.latency || "-",
  tags: baseData.tags || [],
  author: "MCP 社区",
  homepage: "https://modelcontextprotocol.io",
  documentation: "https://modelcontextprotocol.io/docs",
  installCommand: `# Claude Desktop 配置
{
  "mcpServers": {
    "custom-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-custom"]
    }
  }
}`,
  configExample: `# 环境变量
MCP_SERVER_NAME=custom-server
MCP_LOG_LEVEL=info`,
  tools: ["execute - 执行操作"],
  resources: ["服务连接"]
});

const baseMCPServers = [
  { id: 1, name: "Database MCP Server", version: "1.0.0", status: "运行中", icon: "🗄️", category: "数据库", uptime: "99.9%", connections: 24, lastUpdate: "2分钟前", latency: "12ms", tags: ["推荐"] },
  { id: 2, name: "File System MCP", version: "0.9.2", status: "运行中", icon: "📁", category: "文件系统", uptime: "98.5%", connections: 12, lastUpdate: "5分钟前", latency: "8ms", tags: [] },
  { id: 3, name: "API Gateway MCP", version: "2.1.0", status: "运行中", icon: "🌐", category: "网络", uptime: "99.5%", connections: 48, lastUpdate: "1分钟前", latency: "25ms", tags: ["热门"] },
  { id: 4, name: "Email Service MCP", version: "1.2.1", status: "已停止", icon: "📧", category: "通讯", uptime: "0%", connections: 0, lastUpdate: "1天前", latency: "-", tags: [] },
  { id: 5, name: "Search Engine MCP", version: "1.5.0", status: "运行中", icon: "🔍", category: "搜索", uptime: "99.8%", connections: 36, lastUpdate: "3分钟前", latency: "15ms", tags: ["推荐"] },
  { id: 6, name: "AI Model MCP", version: "3.0.0", status: "运行中", icon: "🤖", category: "AI", uptime: "99.2%", connections: 18, lastUpdate: "10分钟前", latency: "120ms", tags: ["热门", "新上线"] },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const mcpId = parseInt(id);

  if (isNaN(mcpId)) {
    return NextResponse.json({ error: "Invalid MCP server ID" }, { status: 400 });
  }

  if (mcpDetails[mcpId]) {
    return NextResponse.json({ mcpServer: mcpDetails[mcpId] });
  }

  const baseData = baseMCPServers.find(s => s.id === mcpId);
  if (baseData) {
    return NextResponse.json({ mcpServer: defaultMCPDetail(mcpId, baseData) });
  }

  return NextResponse.json({ error: "MCP server not found" }, { status: 404 });
}
