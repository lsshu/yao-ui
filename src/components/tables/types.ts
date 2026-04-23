/**
 * 日期：2026/4/21 15:15:52
 * author：Administrator Lsshu
 * 文件 types.ts | types
 **/
type IDataType = "text" | "date";
// 表格配置
export interface TYTable {
  show?: boolean; // 默认显示表格
  selectAble?: boolean; // 是否可选择
  columns?: TYTableColumns[];
  api?: string | TYModelApi; // 表格数据接口 模型 | 接口配置
}
export interface TYModelApi {
  index?: string; // 列表接口
  store?: string; // 新增接口
  show?: string; // 详情接口
  update?: string; // 修改接口
  destroy?: string; // 删除接口
}
// 表格列配置类型
export interface TYTableColumns {
  label?: string;
  field?: string;
  type?: IDataType;
  attr?: TYTProps;
  sortable?: "custom"; // 是否可排序
  format?: string; // 如果type=date 格式化
  width?: string | number; // 宽度
  [key: string]: any; // 允许其他 el-table-column 属性
}

// 分页配置类型
export interface TYTablePagination {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  pageSizes?: number[];
  sortable?: "custom"; // 是否可排序
  format?: string; // 如果type=date 格式化
  width?: string | number; // 宽度
  [key: string]: any; // 允许其他 el-table-column 属性
}

export interface TYTProps {
  // multiple?: boolean; // 是否多选
  // width?: string; // 宽度
  // height?: string; // 高度
  [key: string]: any; // 允许其他 el-input-number 属性
}
