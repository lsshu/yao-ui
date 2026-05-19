/**
 * 日期：2026/5/19 11:14:36
 * author：Administrator Lsshu
 * 文件 types.ts | types
 **/
import type { TYFormRow } from "@/components/forms/types";
import type { FormRules } from "element-plus";

type TYModelType = "YModelDialog" | "YModelDrawer";
export interface TYModel {
  title?: string;
  type?: TYModelType;
  modelProps?: TYProps;
  rows: TYFormRow[];
  rules?: FormRules;
}

interface TYProps {
  [key: string]: any; // 允许其他 el-input-number 属性
}
