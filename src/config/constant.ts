/**
 * 日期：2026/4/22 17:21:32
 * author：Administrator Lsshu
 * 文件 constant.ts | constant
 **/
import type { InjectionKey } from "vue";
import type { TYGlobalConfig } from "@/config/types";
// 唯一注入 key
export const YAO_CONFIG_KEY: InjectionKey<TYGlobalConfig> =
  Symbol("TYGlobalConfig");
