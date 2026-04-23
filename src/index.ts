/**
 * 日期：2026/4/20 16:25:32
 * author：Administrator Lsshu
 * 文件 index.ts | index
 **/
import type { App } from "vue";
import { YAO_CONFIG_KEY } from "./config/constant";
// 导出工具函数
export * from "@/utils";

// 导出类型定义
export * from "@/types";

// 导出组件
export * from "@/components";
// 多语言
export { yaoLocale, zhCN, en } from "./locales";

// 导出类型
import type { TYGlobalConfig } from "./config/types";
export type { TYGlobalConfig };

// 给用户调用的安装函数
export function setupYaoUi(app: App, config: TYGlobalConfig) {
  app.provide(YAO_CONFIG_KEY, config);
}
export { setGlobalConfig, getGlobalConfig } from "./config/global";

export * from "@/utils";
