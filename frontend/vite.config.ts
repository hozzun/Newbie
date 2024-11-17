import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  define: {
    global: "window",
  },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto", // false에서 auto로 변경

      manifest: {
        name: "newbie",
        short_name: "NewBie",
        description: "초보자를 위한 야구 앱",
        theme_color: "#ffffff",
        background_color: "#ffffff", // 추가
        display: "standalone",
        orientation: "portrait", // 추가
        scope: "/",
        start_url: "/",
        icons: [
          // 아이콘 설정 추가
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico,jpg,jpeg}"], // 이미지 포맷 추가
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true, // 추가
        runtimeCaching: [
          // 추가
          {
            urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif)/,
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
            },
          },
        ],
      },

      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  assetsInclude: ["**/*.svg"],
});
