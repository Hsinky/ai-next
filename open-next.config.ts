import { defineConfig } from "@opennextjs/cloudflare";

export default defineConfig({
  cloudflare: {
    // 禁用自引用服务绑定
    worker: {
      bindings: [],
      routes: [],
    },
  },
});
