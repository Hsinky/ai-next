// AI 博士学院课程数据总入口

// 导出类型定义
export type {
  Lesson,
  Section,
  Exercise,
  Reference,
  Module,
  Stage,
  LearningProgress,
  UserLearningData,
  KnowledgePoint,
} from './types';

export type {
  DifficultyLevel,
  CourseType,
  SectionType,
  ExerciseType,
  ReferenceType,
} from './types';

// 导出配置
export { difficultyConfig, stageConfig, moduleConfig } from './types';

// 导出Foundation模块
export { aiEssentialsLessons, apiBasicsLessons } from './modules/foundation';

// 导出工具函数

/**
 * 获取所有课程（按模块）
 */
export function getAllLessons(): Record<string, Lesson> {
  const lessons: Record<string, Lesson> = {};

  // Foundation模块
  Object.assign(lessons, aiEssentialsLessons);
  Object.assign(lessons, apiBasicsLessons);

  // TODO: 添加其他模块
  // Object.assign(lessons, promptBasicsLessons);
  // Object.assign(lessons, agentCoreLessons);
  // ...

  return lessons;
}

/**
 * 根据ID获取课程
 */
export function getLessonById(lessonId: string): Lesson | undefined {
  const allLessons = getAllLessons();
  return allLessons[lessonId];
}

/**
 * 获取模块的所有课程
 */
export function getModuleLessons(moduleId: string): Lesson[] {
  const allLessons = getAllLessons();
  const lessons: Lesson[] = [];

  for (const lesson of Object.values(allLessons)) {
    if (lesson.id.startsWith(moduleId)) {
      lessons.push(lesson);
    }
  }

  return lessons.sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * 获取阶段的所有课程
 */
export function getStageLessons(stageId: string): Lesson[] {
  const stage = stageConfig[stageId];
  if (!stage) return [];

  const lessons: Lesson[] = [];
  for (const moduleId of stage.modules) {
    lessons.push(...getModuleLessons(moduleId));
  }

  return lessons;
}

/**
 * 获取学习路径（按难度排序）
 */
export function getLearningPath(): {
  stage: Stage;
  modules: Lesson[][];
}[] {
  const path: { stage: Stage; modules: Lesson[][] }[] = [];

  for (const stageId of Object.keys(stageConfig)) {
    const stage = stageConfig[stageId];
    const moduleLessons: Lesson[][] = [];

    for (const moduleId of stage.modules) {
      moduleLessons.push(getModuleLessons(moduleId));
    }

    path.push({ stage, modules: moduleLessons });
  }

  return path;
}

// 导入类型（避免循环引用）
import type {
  Lesson,
  Section,
  Exercise,
  Reference,
  Module,
  Stage,
  LearningProgress,
  UserLearningData,
  KnowledgePoint,
  DifficultyLevel,
  CourseType,
  SectionType,
  ExerciseType,
  ReferenceType,
} from './types';

// 动态导入（避免循环）
import { aiEssentialsLessons } from './modules/foundation';
import { stageConfig, moduleConfig } from './types';
