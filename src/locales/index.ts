/**
 * 日期：2026/4/21 22:18:26
 * author：Administrator Lsshu
 * 文件 index.ts | index
 **/
import zhCN from "./lang/zh-CN";
import en from "./lang/en";

// 只导出语言包
export const yaoLocale = {
  "zh-CN": zhCN,
  en: en
};

// 导出给用户手动合并
export { zhCN, en };
