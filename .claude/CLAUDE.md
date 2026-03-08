# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供该仓库的开发指导。

## 项目：AI 工具市场

一个 AI 能力市场平台，用户可以在此发现、使用和分享 AI 工具、技能、提示词、工作流等。

### 技术栈

- **框架**: Next.js 16.1.6 (App Router)
- **UI**: React 19.2.3, Tailwind CSS v4 (通过 @tailwindcss/postcss)
- **语言**: TypeScript
- **特性**: 在 `next.config.ts` 中启用了 React Compiler

### 常用命令

```bash
pnpm run dev          # 启动开发服务器 (http://localhost:3000)
pnpm run build        # 构建生产版本
pnpm run start        # 启动生产服务器
pnpm run lint         # 运行 ESLint
```

### 架构概述

#### 路由组结构

应用使用 Next.js 路由组（括号命名 `(name)`）进行逻辑分组，不影响 URL:

- **`(auth)`** - 认证页面（登录、注册）。拥有独立的布局，采用分屏设计（品牌展示 + 表单）。
- **`(main)`** - 主应用页面。包含固定的 Header 组件（56px 高度）和 72px 宽度的 Sidebar 组件。内容区域通过 `ml-72` 进行偏移。

#### 核心功能（六大 AI 能力）

每个能力都包含：

1. 列表页: `/skill`, `/mcp`, `/agent`, `/prompt`, `/workflow`, `/knowledge`
2. 详情页: `/skill/[id]`, `/mcp/[id]` 等
3. 创建页: `/skill/new`, `/mcp/new`
4. API 路由: `/api/skills`, `/api/mcp` 等
5. 客户端列表组件: 如 `src/app/(main)/skill/components/` 中的 `SkillList` 组件

六大能力分别是：

- **Skill** - 可复用的 AI 能力模块
- **MCP** - 通过模型上下文协议集成外部工具/服务
- **Agent** - 具有自主决策能力的 AI 助手
- **Prompt** - 高效的沟通模板
- **Workflow** - 多步骤任务编排
- **Knowledge** - 企业知识检索系统

#### 认证系统

演示版认证系统，实现在 `src/components/auth/AuthContext.tsx`:

- 使用 localStorage 的 `demo_user` 键持久化用户状态
- 导出 `useAuth()` hook 用于访问登录/登出状态
- 暂无后端集成（仅演示）

#### 类型定义

集中定义在 `src/types/index.ts`:

- 资源接口: `Skill`, `MCPServer`, `Agent`, `Prompt`, `Workflow`, `KnowledgeBase`
- 用户类型: `User`, `LoginCredentials`, `RegisterCredentials`
- `ResourceDetail` 联合类型包含所有资源
- `difficultyConfig` 定义难度等级（入门/进阶/高级）
- `MenuItem` 用于侧边栏导航

#### 导航与布局

- **侧边栏** - 定义在 `src/app/(main)/sidebar.tsx`，固定菜单项。激活状态使用 `startsWith` 匹配子路由。
- **布局组合**: MainLayout 包裹 Header + Sidebar + 主内容区域

#### 学院/学习模块

位于 `/learn`，采用六阶段进阶体系：

| 阶段 | ID | 目标用户 |
|------|------|----------|
| 基础认知 | foundation | 产品经理、运营、AI 初学者 |
| Prompt 工程 | prompt | 职场人士 |
| Agent & Tools | agent | 开发者、技术人员 |
| RAG 知识库 | rag | 企业知识库开发者 |
| 生产实践 | production | 技术负责人、架构师 |
| 前沿探索 | frontier | 高级学习者 |

**课程数据模型** (`src/data/curriculum/`):

- `types.ts` - 定义 `Lesson`, `Module`, `Stage`, `Section`, `Exercise` 等类型及配置
- `index.ts` - 导出工具函数：`getAllLessons()`, `getLessonById()`, `getModuleLessons()`, `getStageLessons()`, `getLearningPath()`
- `modules/{stage}/` - 各阶段模块数据，每个模块导出 `{moduleId}Lessons` 对象

**核心路由**:

- `/learn` - 学院首页（展示六阶段卡片）
- `/learn/path/[level]` - 阶段详情页，展示该阶段所有模块和课程
- `/learn/module/[moduleId]` - 模块详情页
- `/learn/lesson/[lessonId]` - 课程详情页

**课程渲染组件** (`src/components/learn/`):

- `SectionRenderer.tsx` - 根据章节类型渲染对应组件
- `sections/*.tsx` - 各类型章节组件：`ConceptSection`, `CodeSection`, `ExampleSection`, `NoteSection`, `WarningSection`, `SummarySection`
- `PracticeSection.tsx` - 实战练习组件

### 路径别名

`@/*` 映射到 `src/*`，定义在 `tsconfig.json`
