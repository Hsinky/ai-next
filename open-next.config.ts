import { defineConfig } from "@opennextjs/cloudflare";

export default defineConfig({
  cloudflare: {
    // 禁用自引用服务绑定，避免循环依赖
    worker: {
      // 不设置自引用
    },
  },
});
