import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import libCss from "vite-plugin-lib-css-injection";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: "dist",
      copyDtsFiles: false, // 减少不必要的文件复制
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue'], // 只扫描需要的文件
    }),
    libCss(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dirs: ['src/components'], // 只扫自己的组件
      deep: false, // 关闭递归扫描，大幅提速
      dts: false, // 关闭自带类型生成
    })
  ],
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
      },
      onLog: (level, log, handler) => {
        if (log.message.includes('[PLUGIN_TIMINGS]')) return
        handler(level, log)
      }
    },
    // 把组件里的 style 打包成单独 CSS 文件 ✅
    cssCodeSplit: false
  }
});
