// 资源类型定义

export interface Skill {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  version: string;
  status: string;
  users: string;
  rating: number;
  tags: string[];
  lastUsed: string;
  apiCalls: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  scenarios?: string[];
  // 详情页扩展字段
  author?: string;
  homepage?: string;
  documentation?: string;
  repository?: string;
  installCommand?: string;
  configExample?: string;
  usageExample?: string;
  requirements?: string[];
  features?: string[];
}

export interface MCPServer {
  id: number;
  name: string;
  version: string;
  status: string;
  icon: string;
  category: string;
  uptime: string;
  connections: number;
  lastUpdate: string;
  latency: string;
  tags: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  scenarios?: string[];
  // 详情页扩展字段
  description?: string;
  author?: string;
  homepage?: string;
  documentation?: string;
  repository?: string;
  installCommand?: string;
  configExample?: string;
  tools?: string[];
  resources?: string[];
}

export interface Agent {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  model: string;
  status: string;
  tasks: number;
  successRate: string;
  avgTime: string;
  tags: string[];
  lastRun: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  scenarios?: string[];
  // 详情页扩展字段
  author?: string;
  homepage?: string;
  documentation?: string;
  repository?: string;
  capabilities?: string[];
  configExample?: string;
  usageExample?: string;
}

export interface Prompt {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  uses: number;
  rating: number;
  variables: string[];
  tags: string[];
  author: string;
  updatedAt: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  scenarios?: string[];
  // 详情页扩展字段
  template?: string;
  exampleInput?: Record<string, string>;
  exampleOutput?: string;
  documentation?: string;
  bestPractices?: string[];
}

export interface Workflow {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  steps: number;
  status: string;
  runs: number;
  successRate: string;
  avgDuration: string;
  tags: string[];
  lastRun: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  scenarios?: string[];
  // 详情页扩展字段
  author?: string;
  homepage?: string;
  documentation?: string;
  repository?: string;
  stepDetails?: WorkflowStep[];
  configExample?: string;
  triggers?: string[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  type: string;
}

export interface KnowledgeBase {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  documents: number;
  chunks: number;
  queries: number;
  accuracy: string;
  tags: string[];
  updatedAt: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  scenarios?: string[];
  // 详情页扩展字段
  author?: string;
  documentation?: string;
  embeddingModel?: string;
  chunkSize?: number;
  sources?: string[];
  accessControl?: string;
}

// 用户相关类型
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 资源类型枚举
export type ResourceType = 'skill' | 'mcp' | 'agent' | 'prompt' | 'workflow' | 'knowledge';

// 通用资源详情
export type ResourceDetail = Skill | MCPServer | Agent | Prompt | Workflow | KnowledgeBase;

// 难度等级配置
export const difficultyConfig = {
  beginner: { label: '入门', color: 'bg-green-100 text-green-700', description: '零基础可上手' },
  intermediate: { label: '进阶', color: 'bg-yellow-100 text-yellow-700', description: '需要一定基础' },
  advanced: { label: '专业', color: 'bg-red-100 text-red-700', description: '需要技术背景' },
};

// 菜单项类型
export interface MenuItem {
  id: number;
  name: string;
  nameEn: string;
  path: string;
  icon: string;
  description: string;
}
