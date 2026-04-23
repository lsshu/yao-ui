/**
 * 日期：2026/4/20 17:19:45
 * author：Administrator Lsshu
 * 文件 types.ts | types
 **/
// 引入表单类型
export * from "@/components/forms/types";
// 引入表格类型
export * from "@/components/tables/types";
import type { TYTable } from "@/components/tables/types";
// 页面模板类型
export type TYPagesTemplate = "YPageDefault";
// 页面配置
export interface TYPage {
  template?: TYPagesTemplate;
  search?: TYSearch;
  table?: TYTable;
}
// 搜索配置
export interface TYSearch {
  show?: boolean; // 默认显示搜索框
}
