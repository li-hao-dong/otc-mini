import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  server: {
    proxy: {
      "/apiAgent": {
        target: "https://option.sunsmicro.com/api/v1", // 跨域目标
        ws: true, // 允许WebSocket
        changeOrigin: true, // 将主机标头的来源更改为目标 URL
        https: true,
        rewrite: (path) => path.replace(/^\/apiAgent/, ""),
      }
    }
  }
});
