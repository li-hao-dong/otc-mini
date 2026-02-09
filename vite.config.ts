import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig(async() => {
  const { webUpdateNotice } = await import('@plugin-web-update-notification/vite');
  return {
    plugins: [
      uni(),
      webUpdateNotice({
        notificationProps: {
          title: '版本提示',
          description: '检测到系统版本升级，请刷新页面!',
          buttonText: '刷新',
          dismissButtonText: '忽略'
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import', 'legacy-js-api'],
        }
      }
    },
    server: {
      proxy: {
        "/apiAgent": {
          target: "https://option.sunsmicro.com/api/v1", // 跨域目标
          ws: true, // 允许WebSocket
          changeOrigin: true, // 将主机标头的来源更改为目标 URL
          rewrite: (path) => path.replace(/^\/apiAgent/, ""),
        },
        "/boardApiAgent": {
          target: "https://option.sunsmicro.com/board-api/v1", // 跨域目标
          ws: true, // 允许WebSocket
          changeOrigin: true, // 将主机标头的来源更改为目标 URL
          rewrite: (path) => path.replace(/^\/boardApiAgent/, ""),
        },
      }
    }
  }
});
