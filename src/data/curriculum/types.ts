// AI 博士学院课程系统 - 数据类型定义

// 难度等级
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

// 课程类型
export type CourseType =
  | 'foundation'    // 基础认知
  | 'prompt'        // Prompt工程
  | 'agent'         // Agent开发
  | 'mcp'           // MCP协议
  | 'workflow'      // Workflow编排
  | 'rag'           // RAG知识库
  | 'production'    // 生产实践
  | 'frontier';     // 前沿探索

// 章节类型
export type SectionType =
  | 'introduction'  // 开篇引言
  | 'concept'       // 概念讲解
  | 'example'       // 示例演示
  | 'code'          // 代码示例
  | 'practice'      // 实战练习
  | 'note'          // 提示/备注
  | 'warning'       // 警告/注意
  | 'summary';      // 小结

// 练习题类型
export type ExerciseType = 'choice' | 'fill' | 'code' | 'discussion';

// 参考资料类型
export type ReferenceType = 'paper' | 'article' | 'documentation' | 'video' | 'book';

// 章节内容
export interface Section {
  type: SectionType;
  title?: string;
  content: string;
  code?: string;
  language?: string;
  keyPoint?: string;
}

// 练习题
export interface Exercise {
  type: ExerciseType;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

// 参考资料
export interface Reference {
  type: ReferenceType;
  title: string;
  url: string;
  note?: string;
}

// 课程数据
export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  duration: number; // 分钟
  difficulty: DifficultyLevel;
  tags: string[];
  objectives: string[];
  sections: Section[];
  summary: string;
  keyPoints: string[];
  exercises: Exercise[];
  references?: Reference[];
}

// 模块数据
export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: DifficultyLevel;
  lessons: Lesson[];
}

// 阶段数据
export interface Stage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  gradient: string;
  target: string;
  prerequisites: string[];
  modules: string[]; // 模块ID列表
}

// 学习进度
export interface LearningProgress {
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  lastPosition?: number; // 最后阅读位置
  notes?: string;
  bookmarks?: number[]; // 书签位置
}

// 用户学习数据
export interface UserLearningData {
  userId: string;
  progress: Record<string, LearningProgress>;
  totalTime: number; // 总学习时长（分钟）
  streak: number; // 连续学习天数
  lastStudyDate: string;
}

// 知识点
export interface KnowledgePoint {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  tags: string[];
  relatedPoints: string[];
}

// 难度配置
export const difficultyConfig: Record<DifficultyLevel, {
  label: string;
  color: string;
  bgColor: string;
  description: string;
}> = {
  beginner: {
    label: '入门',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    description: '零基础可上手',
  },
  intermediate: {
    label: '进阶',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: '需要一定基础',
  },
  advanced: {
    label: '高级',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: '需要技术背景',
  },
};

// 阶段配置
export const stageConfig: Record<string, Stage> = {
  foundation: {
    id: 'foundation',
    title: '基础认知',
    subtitle: 'Foundation',
    description: '建立正确的AI认知，消除误区，掌握基础使用',
    icon: '🌱',
    gradient: 'from-emerald-500 to-teal-600',
    target: '产品经理、运营、初次接触 AI 的学习者',
    prerequisites: ['无需编程基础', '对 AI 有基本好奇心'],
    modules: ['ai-essentials', 'api-basics'],
  },
  prompt: {
    id: 'prompt',
    title: '能力提升',
    subtitle: 'Prompt Engineering',
    description: '掌握Prompt工程，与AI高效沟通',
    icon: '✍️',
    gradient: 'from-orange-500 to-yellow-600',
    target: '希望提升AI使用效率的职场人士',
    prerequisites: ['掌握AI基础概念', '有使用ChatGPT等工具的经验'],
    modules: ['prompt-basics', 'prompt-advanced'],
  },
  agent: {
    id: 'agent',
    title: '能力扩展',
    subtitle: 'Agent & Tools',
    description: '让AI连接外部世界，完成复杂任务',
    icon: '🤖',
    gradient: 'from-blue-500 to-indigo-600',
    target: '开发者、技术实施人员',
    prerequisites: ['掌握Prompt工程', '具备编程基础'],
    modules: ['agent-core', 'mcp-protocol', 'workflow-design'],
  },
  rag: {
    id: 'rag',
    title: '知识增强',
    subtitle: 'RAG',
    description: '让AI掌握私有数据，构建专属知识库',
    icon: '📚',
    gradient: 'from-rose-500 to-pink-600',
    target: '希望构建企业知识库的开发者',
    prerequisites: ['了解Agent和工具调用', '了解向量数据库基础'],
    modules: ['rag-architecture', 'rag-optimization'],
  },
  production: {
    id: 'production',
    title: '生产实践',
    subtitle: 'Production',
    description: '从Demo到生产，企业级落地',
    icon: '🏭',
    gradient: 'from-slate-500 to-gray-600',
    target: '技术负责人、企业架构师',
    prerequisites: ['掌握完整的AI应用开发', '了解企业级系统设计'],
    modules: ['deployment', 'optimization', 'security'],
  },
  frontier: {
    id: 'frontier',
    title: '前沿探索',
    subtitle: 'Frontier',
    description: '了解技术趋势，把握未来方向',
    icon: '🚀',
    gradient: 'from-violet-500 to-purple-600',
    target: '对AI前沿技术感兴趣的高级学习者',
    prerequisites: ['掌握企业级AI应用开发', '对研究和创新感兴趣'],
    modules: ['multimodal', 'swarm', 'ethics'],
  },
};

// 模块配置
export const moduleConfig: Record<string, Omit<Module, 'lessons'>> = {
  // Foundation 阶段
  'ai-essentials': {
    id: 'ai-essentials',
    title: 'AI 本质与原理',
    description: '从零开始建立正确的AI认知',
    icon: '🧠',
    color: 'from-emerald-500 to-teal-600',
    difficulty: 'beginner',
  },
  'api-basics': {
    id: 'api-basics',
    title: '参数控制与API调用',
    description: '掌握核心参数和API调用最佳实践',
    icon: '🔧',
    color: 'from-teal-500 to-cyan-600',
    difficulty: 'beginner',
  },
  // Prompt 阶段
  'prompt-basics': {
    id: 'prompt-basics',
    title: 'Prompt工程入门',
    description: '掌握与AI高效沟通的基础方法',
    icon: '📝',
    color: 'from-orange-500 to-yellow-500',
    difficulty: 'beginner',
  },
  'prompt-advanced': {
    id: 'prompt-advanced',
    title: 'Prompt高级技巧',
    description: '深入掌握高级Prompt工程技术',
    icon: '💡',
    color: 'from-yellow-500 to-amber-500',
    difficulty: 'intermediate',
  },
  // Agent 阶段
  'agent-core': {
    id: 'agent-core',
    title: 'Agent智能助手',
    description: '理解Agent架构和工具调用机制',
    icon: '🤖',
    color: 'from-blue-500 to-indigo-600',
    difficulty: 'intermediate',
  },
  'mcp-protocol': {
    id: 'mcp-protocol',
    title: 'MCP协议与应用',
    description: '掌握MCP协议开发和企业级部署',
    icon: '🔌',
    color: 'from-indigo-500 to-purple-600',
    difficulty: 'intermediate',
  },
  'workflow-design': {
    id: 'workflow-design',
    title: 'Workflow工作流',
    description: '学习工作流设计原则和复杂任务编排',
    icon: '🔄',
    color: 'from-cyan-500 to-blue-600',
    difficulty: 'intermediate',
  },
  // RAG 阶段
  'rag-architecture': {
    id: 'rag-architecture',
    title: 'RAG知识库',
    description: '掌握RAG架构和向量检索技术',
    icon: '📚',
    color: 'from-rose-500 to-pink-600',
    difficulty: 'intermediate',
  },
  'rag-optimization': {
    id: 'rag-optimization',
    title: 'RAG优化与实战',
    description: '深入优化RAG系统性能和企业级部署',
    icon: '⚡',
    color: 'from-pink-500 to-rose-600',
    difficulty: 'advanced',
  },
  // Production 阶段
  'deployment': {
    id: 'deployment',
    title: '生产环境部署',
    description: '学习成本优化、性能监控和多租户架构',
    icon: '🚀',
    color: 'from-slate-500 to-gray-600',
    difficulty: 'advanced',
  },
  'optimization': {
    id: 'optimization',
    title: '性能优化与监控',
    description: '掌握AI系统的性能调优和持续优化方法',
    icon: '📊',
    color: 'from-gray-500 to-zinc-600',
    difficulty: 'advanced',
  },
  'security': {
    id: 'security',
    title: '安全与合规',
    description: '建立完善的AI安全合规体系',
    icon: '🔒',
    color: 'from-zinc-500 to-neutral-600',
    difficulty: 'advanced',
  },
  // Frontier 阶段
  'multimodal': {
    id: 'multimodal',
    title: '多模态AI',
    description: '了解视觉、音频等多模态AI技术',
    icon: '🎨',
    color: 'from-violet-500 to-purple-600',
    difficulty: 'advanced',
  },
  'swarm': {
    id: 'swarm',
    title: 'Agent协作与Swarm',
    description: '探索多Agent协作和Swarm智能',
    icon: '🐝',
    color: 'from-purple-500 to-fuchsia-600',
    difficulty: 'advanced',
  },
  'ethics': {
    id: 'ethics',
    title: 'AI伦理与风险控制',
    description: '理解AI伦理问题和风险管理',
    icon: '⚖️',
    color: 'from-fuchsia-500 to-pink-600',
    difficulty: 'advanced',
  },
};
