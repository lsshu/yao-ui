import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import libCss from "vite-plugin-lib-css-injection";

export default defineConfig({
  plugins: [vue(), dts({ outDir: "dist" }), libCss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src") // 👈 把 @ 指向 src
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "index.js"
    },
    rollupOptions: {
      external: ["vue"], // 👈 不打包 Vue，外部使用
      output: {
        // 自动注入 CSS ✅ 关键！
        assetFileNames: "index.[ext]",
        exports: "named"
      }
    },
    // 把组件里的 style 打包成单独 CSS 文件 ✅
    cssCodeSplit: false
  }
});
