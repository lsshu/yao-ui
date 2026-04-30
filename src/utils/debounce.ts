/**
 * 增强版防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @param immediate 是否立即执行（true: 先执行一次，后防抖；false: 只防抖）
 * @returns 防抖处理后的函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate: boolean = false
): (...args: Parameters<T>) => void {
  // @ts-ignore
  let timer: NodeJS.Timeout | null = null;
  let isInvoked = false;

  return function (this: any, ...args: Parameters<T>) {
    // 清除之前的定时器
    if (timer) {
      clearTimeout(timer);
    }

    // 立即执行模式
    if (immediate && !isInvoked) {
      fn.apply(this, args);
      isInvoked = true;
    }

    // 设置新的定时器
    timer = setTimeout(() => {
      // 如果不是立即执行模式，则执行函数
      if (!immediate) {
        fn.apply(this, args);
      }
      timer = null;
      isInvoked = false;
    }, delay);
  };
}
