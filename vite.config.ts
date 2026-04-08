import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

// https://vitejs.dev/config/
export default defineConfig(async(envConfig) => {
  const { webUpdateNotice } = await import('@plugin-web-update-notification/vite');
  const env = loadEnv(envConfig.mode, process.cwd(), "")

  return {
    plugins: [
      uni(),
      webUpdateNotice({
        checkOnWindowFocus: true, // 当窗口获得焦点（进入页面）时立即检查
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
      host: '0.0.0.0',
      proxy: {
        [env.BASE_URL_KEY]: {
          target: env.BASE_URL, // 跨域目标
          ws: true, // 允许WebSocket
          changeOrigin: true, // 将主机标头的来源更改为目标 URL
          rewrite: (path: any) => path.replace(new RegExp(`^${env.BASE_URL_KEY}`), ''),
        },
        [env.BOARD_URL_KEY]: {
          target: env.BOARD_URL, // 跨域目标
          ws: true, // 允许WebSocket
          changeOrigin: true, // 将主机标头的来源更改为目标 URL
          rewrite: (path: any) => path.replace(new RegExp(`^${env.BOARD_URL_KEY}`), ''),
        },
      }
    }
  }
});
