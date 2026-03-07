'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';

// 不同资源类型的主题配置
export const resourceThemes = {
  skill: {
    accentColor: 'blue',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    labelColor: 'bg-blue-100 text-blue-700',
  },
  mcp: {
    accentColor: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    borderColor: 'border-purple-200',
    labelColor: 'bg-purple-100 text-purple-700',
  },
  agent: {
    accentColor: 'orange',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    borderColor: 'border-orange-200',
    labelColor: 'bg-orange-100 text-orange-700',
  },
  prompt: {
    accentColor: 'emerald',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    labelColor: 'bg-emerald-100 text-emerald-700',
  },
  workflow: {
    accentColor: 'cyan',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-600',
    borderColor: 'border-cyan-200',
    labelColor: 'bg-cyan-100 text-cyan-700',
  },
  knowledge: {
    accentColor: 'rose',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    labelColor: 'bg-rose-100 text-rose-700',
  },
} as const;

export type ResourceType = keyof typeof resourceThemes;

interface StatItem {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

interface LinkItem {
  label: string;
  description: string;
  href: string;
  icon: 'home' | 'doc' | 'github' | 'external';
}

interface Tab {
  key: string;
  label: string;
  content: ReactNode;
}

interface DetailPageLayoutProps {
  resourceType: ResourceType;
  backHref: string;
  backLabel: string;
  icon: string;
  name: string;
  description: string;
  status?: string;
  tags?: string[];
  metaItems?: ReactNode;
  stats: StatItem[];
  links?: LinkItem[];
  tabs?: Tab[];
  defaultTab?: string;
  children?: ReactNode;
  actions?: ReactNode;
}

const iconMap = {
  home: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  doc: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  ),
  external: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
};

export default function DetailPageLayout({
  resourceType,
  backHref,
  backLabel,
  icon,
  name,
  description,
  status,
  tags,
  metaItems,
  stats,
  links,
  tabs,
  defaultTab,
  children,
  actions,
}: DetailPageLayoutProps) {
  const theme = resourceThemes[resourceType];
  const [activeTab, setActiveTab] = useState(defaultTab || tabs?.[0]?.key || '');

  const getStatusStyle = (statusText: string) => {
    if (statusText === '运行中' || statusText === '已启用') {
      return 'bg-green-100 text-green-700 border-green-200';
    }
    if (statusText === '维护中' || statusText === '已禁用') {
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="p-8">
      {/* 返回链接 */}
      <Link
        href={backHref}
        className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        {backLabel}
      </Link>

      {/* 头部区域 - 简约设计 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
        <div className="flex items-start justify-between gap-8">
          {/* 左侧：图标和信息 */}
          <div className="flex items-start gap-6 flex-1 min-w-0">
            <div className="text-5xl flex-shrink-0">{icon}</div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{name}</h1>
              <p className="text-gray-500 mb-4">{description}</p>
              
              {/* 元信息 */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                {metaItems}
              </div>

              {/* 标签 */}
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-lg text-sm ${theme.labelColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 右侧：状态和操作 */}
          <div className="flex flex-col items-end gap-4 flex-shrink-0">
            {status && (
              <span className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${getStatusStyle(status)}`}>
                {status}
              </span>
            )}
            {actions && (
              <div className="flex gap-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-5 text-center"
          >
            {stat.icon && <div className={`inline-block mb-1 ${theme.textColor}`}>{stat.icon}</div>}
            <div className="text-xl font-semibold text-gray-900">
              {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tab 导航 */}
      {tabs && tabs.length > 0 && (
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-3 border-b-2 text-sm font-medium transition-colors cursor-pointer select-none ${
                  activeTab === tab.key
                    ? `${theme.textColor} border-current`
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* 内容区域 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 主内容 - 占 2 列 */}
        <div className="col-span-2 space-y-6">
          {/* Tab 内容 */}
          {tabs && tabs.map((tab) => (
            activeTab === tab.key && (
              <div key={tab.key}>{tab.content}</div>
            )
          ))}
          {/* 自定义内容 */}
          {children}
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 相关链接 */}
          {links && links.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">相关链接</h3>
              <div className="space-y-2">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="text-gray-400">{iconMap[link.icon]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{link.label}</div>
                      <div className="text-xs text-gray-500">{link.description}</div>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 代码块组件
export function CodeBlock({ title, code, language = 'bash' }: { title?: string; code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-xs font-medium text-gray-400">{title}</span>
          <button
            onClick={handleCopy}
            className="text-gray-500 hover:text-white transition-colors"
          >
            {copied ? (
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-gray-300 text-sm whitespace-pre font-mono">{code}</pre>
      </div>
    </div>
  );
}

// 信息卡片组件
export function InfoCard({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}>
      <h2 className="text-lg font-medium text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

// 特性列表组件
export function FeatureList({ features, theme }: { features: string[]; theme: ResourceType }) {
  const colorConfig = resourceThemes[theme];
  
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start gap-3">
          <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colorConfig.textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
  );
}
