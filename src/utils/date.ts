/**
 * 日期：2026/4/22 22:27:02
 * author：Administrator Lsshu
 * 文件 date.ts | date
 **/
import dayjs from "dayjs";
const default_format = "YYYY-MM-DD";

// 自动转本地时间
export function formatDateTime(dateStr: string, format = default_format) {
  return dayjs(dateStr).format(format);
}
