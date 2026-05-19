export type TYFormItemType = "YInput" | "YSelect" | "YImage";

export interface TYFormRow {
  props?: TYProps;
  cols?: TYFormCol[]; // 行表单
  slotPrependName?: string; // 前置插槽名
  slotAppendName?: string; // 追加插槽名
  rowTitle?: string; // 分区用 标题
}

export interface TYFormCol {
  props?: TYProps;
  item?: TYFormItem; // 默认显示搜索框
  slotName?: string; // 插槽名
}

export interface TYFormItem {
  props?: TYProps; // el-form-item 属性
  attr?: TYProps; // 例如 el-input 属性
  type: TYFormItemType;
  field: string; // 字段键名
  label: string; // 字段别名
  slotName?: string; // 插槽名
  slotPrependName?: string; // 前置插槽名
  slotAppendName?: string; // 追加插槽名
  valueType?: "string" | "array"; // 值类型
  service?: any; // 表格数据接口 模型 | 接口配置
  value?: any; // 组件默认值
}

export interface TYProps {
  multiple?: boolean; // 是否多选
  width?: string; // 宽度
  height?: string; // 高度
  action?: string; // 上传组件 上传接口地址
  upLoadSuccessCallback?: (response: any) => string; // 上传成功回调处理结果到表单
  showImagePath?: (path: string) => string; // 显示图片路径方法 例如添加cdn前缀
  [key: string]: any; // 允许其他 el-input-number 属性
}
