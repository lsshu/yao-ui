/**
 * 日期：2026/4/22 17:19:54
 * author：Administrator Lsshu
 * 文件 global.ts | global.ts
 **/
import type { TYGlobalConfig } from "./types";

let GLOBAL_CONFIG: TYGlobalConfig = {
  cryptoKey: "afNpD!r9yW@Ct4jZ",
  cryptoAble: true
};

export function setGlobalConfig(config: TYGlobalConfig) {
  GLOBAL_CONFIG = { ...GLOBAL_CONFIG, ...config };
}

export function getGlobalConfig() {
  return { ...GLOBAL_CONFIG };
}
