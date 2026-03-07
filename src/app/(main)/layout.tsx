import Sidebar from "./sidebar";
import Header from "./header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航 - 固定 */}
      <Header />
      
      {/* 主体区域 */}
      <div className="flex">
        {/* 左侧边栏 - 固定 */}
        <Sidebar />
        
        {/* 内容区域 - 留出侧边栏宽度 */}
        <main className="flex-1 ml-72">{children}</main>
      </div>
    </div>
  );
}
