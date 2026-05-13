import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  // Capacitor / 本地 WebView 需相对资源路径；Xcode 打包前请执行 build
  base: "./",
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 请确保此路径指向您存放 SVG 图标的真实目录
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
  },
});
