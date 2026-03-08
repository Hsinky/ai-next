import { headers } from "next/headers";

/**
 * 获取 API 请求的基础 URL
 * 
 * 在服务端：从请求头获取当前 host（自动适配任何域名）
 * 在客户端：使用相对路径（空字符串）
 * 
 * 注意：这是一个 async 函数，需要使用 await 调用
 */
export async function getApiUrl(): Promise<string> {
  // 服务端：从请求头获取当前 host
  const headersList = await headers();
  const host = headersList.get("host");
  
  if (host) {
    // 判断是否为本地开发环境
    const isDev = process.env.NODE_ENV === "development";
    const protocol = isDev ? "http" : "https";
    return `${protocol}://${host}`;
  }
  
  // 回退：本地开发
  return "http://localhost:3000";
}
