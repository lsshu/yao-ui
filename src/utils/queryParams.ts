/**
 * 解析 URL 参数为嵌套对象
 * 支持以下格式：
 * - 简单参数：?name=张三&age=20
 * - 数组参数：?tags=js&tags=css
 * - 索引数组：?items[0]=a&items[1]=b
 * - 嵌套对象：?filter[name]=张三&filter[age]=20
 * - 混合嵌套：?data[user][name]=张三&data[items][0]=a
 */
import CryptoAES from "@/utils/CryptoAES";
import { decodeBase64 } from "@/utils/helper";

// type QueryParamValue = string | number | boolean | null | undefined;
type QueryParamObject = Record<string, any>;

interface ParseOptions {
  /**
   * 是否自动解码 URL 编码的参数
   * @default true
   */
  decode?: boolean;

  /**
   * 是否将数字字符串转为数字
   * @default true
   */
  parseNumbers?: boolean;

  /**
   * 是否将 "true"/"false" 字符串转为布尔值
   * @default true
   */
  parseBooleans?: boolean;

  /**
   * 是否将 "null" 字符串转为 null
   * @default true
   */
  parseNulls?: boolean;

  /**
   * 是否将 "undefined" 字符串转为 undefined
   * @default true
   */
  parseUndefined?: boolean;

  /**
   * 是否将空字符串转为 null/undefined
   * @default 'null'
   */
  emptyString?: "null" | "undefined" | "keep";

  /**
   * 解析数组时的最大索引
   * @default 1000
   */
  maxArrayIndex?: number;
}

interface ParseResult {
  [key: string]: any;
}

/**
 * 解析查询字符串为嵌套对象
 */
export function parseQueryString<T = ParseResult>(
  queryString: string,
  options: ParseOptions = {}
): T {
  const {
    decode = true,
    parseNumbers = true,
    parseBooleans = true,
    parseNulls = true,
    parseUndefined = true,
    emptyString = "null",
    maxArrayIndex = 1000
  } = options;

  // 移除开头的 ? 或 #
  const cleanQuery = queryString.replace(/^[?#]/, "");
  if (!cleanQuery) return {} as T;

  const result: QueryParamObject = {};
  const pairs = cleanQuery.split("&");

  for (const pair of pairs) {
    if (!pair) continue;

    const [rawKey, rawValue] = pair.split("=");
    if (!rawKey) continue;

    // 解码键和值
    const key = decode ? decodeURIComponent(rawKey) : rawKey;
    let value: any =
      decode && rawValue ? decodeURIComponent(rawValue) : rawValue;

    // 处理空值
    if (value === undefined) {
      if (emptyString === "null") {
        value = null;
      } else if (emptyString === "undefined") {
        value = undefined;
      } else {
        value = "";
      }
    }

    // 类型转换
    if (
      parseNumbers &&
      typeof value === "string" &&
      /^-?\d+(\.\d+)?$/.test(value)
    ) {
      const numValue = Number(value);
      if (!isNaN(numValue) && isFinite(numValue)) {
        value = numValue;
      }
    } else if (parseBooleans && typeof value === "string") {
      const lowerValue = value.toLowerCase();
      if (lowerValue === "true") value = true;
      else if (lowerValue === "false") value = false;
    } else if (parseNulls && value === "null") {
      value = null;
    } else if (parseUndefined && value === "undefined") {
      value = undefined;
    }

    // 解析嵌套路径
    setNestedValue(result, key, value, maxArrayIndex);
  }

  return result as T;
}

/**
 * 设置嵌套值
 */
function setNestedValue(
  obj: QueryParamObject,
  path: string,
  value: any,
  maxArrayIndex: number
): void {
  // 解析路径，支持 [] 和 . 两种语法
  const keys: Array<string | number> = [];
  const regex = /[^.\[\]]+|\[([^\[\]]*)]/g;

  let match;
  while ((match = regex.exec(path)) !== null) {
    const key = match[1] ? match[1] : match[0];

    // 处理数组索引
    if (/^\d+$/.test(key)) {
      const index = parseInt(key, 10);
      if (index <= maxArrayIndex) {
        keys.push(index);
      } else {
        keys.push(key);
      }
    } else {
      keys.push(key);
    }
  }

  if (keys.length === 0) return;

  // 遍历路径设置值
  let current: any = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    const nextKey = keys[i + 1];

    // 如果当前键不存在，根据下一个键的类型决定创建对象还是数组
    if (current[key] === undefined) {
      if (typeof nextKey === "number") {
        current[key] = [];
      } else {
        current[key] = {};
      }
    } else if (typeof nextKey === "number" && !Array.isArray(current[key])) {
      // 如果需要数组但当前是对象，转换为数组
      const newArray: any[] = [];
      Object.keys(current[key]).forEach(k => {
        const numKey = parseInt(k, 10);
        if (!isNaN(numKey)) {
          newArray[numKey] = current[key][k];
        }
      });
      current[key] = newArray;
    }

    current = current[key];
  }

  const lastKey = keys[keys.length - 1];
  const existingValue = current[lastKey];

  // 处理多个同名参数（转换为数组）
  if (existingValue !== undefined) {
    if (Array.isArray(existingValue)) {
      existingValue.push(value);
    } else {
      current[lastKey] = [existingValue, value];
    }
  } else {
    current[lastKey] = value;
  }
}

/**
 * 从当前 URL 获取参数
 */
export function getQueryParams<T = ParseResult>(options: ParseOptions = {}): T {
  if (typeof window === "undefined") {
    return {} as T;
  }
  return parseQueryString<T>(window.location.search, options);
}

/**
 * 从指定 URL 获取参数
 */
export function getQueryParamsFromUrl<T = ParseResult>(
  url: string | URL,
  options: ParseOptions = {}
): T {
  const urlString = typeof url === "string" ? url : url.toString();
  const queryStart = urlString.indexOf("?");
  const queryString = queryStart >= 0 ? urlString.substring(queryStart) : "";
  return parseQueryString<T>(queryString, options);
}

/**
 * 从 window.location.search 获取参数
 */
export function getQueryParamsFromSearch<T = ParseResult>(
  search: string = window.location.search,
  options: ParseOptions = {}
): T {
  return parseQueryString<T>(search, options);
}

/**
 * 类型安全的参数获取
 */
export class QueryParamsParser<T extends Record<string, any> = ParseResult> {
  constructor(private options: ParseOptions = {}) {}

  parse(queryString: string): T {
    return parseQueryString<T>(queryString, this.options);
  }

  parseFromUrl(url: string | URL): T {
    return getQueryParamsFromUrl<T>(url, this.options);
  }

  getFromCurrent(): T {
    return getQueryParams<T>(this.options);
  }
}

// 使用示例
export const exampleUsage = () => {
  // 示例 URL
  const testUrl =
    "https://example.com/path?" +
    "name=张三&" +
    "age=25&" +
    "active=true&" +
    "tags=js&tags=css&" +
    "items[0]=a&items[1]=b&" +
    "filter[name]=李四&filter[age]=30&" +
    "data[user][id]=123&data[user][name]=王五&" +
    "data[items][]=x&data[items][]=y&" +
    "mixed[a][0][b]=value&" +
    "empty=&" +
    "nullValue=null&" +
    "undefinedValue=undefined";

  // 基本用法
  const params1 = parseQueryString(testUrl.split("?")[1]);
  console.log("基本用法:", params1);

  // 从当前 URL
  const params2 = getQueryParams();
  console.log("当前 URL 参数:", params2);

  // 从完整 URL
  const params3 = getQueryParamsFromUrl(testUrl);
  console.log("从 URL 解析:", params3);

  // 使用解析器类
  const parser = new QueryParamsParser({
    decode: true,
    parseNumbers: true,
    parseBooleans: true
  });

  const params4 = parser.parseFromUrl(testUrl);
  console.log("使用解析器类:", params4);

  // 类型安全的用法
  interface UserParams {
    name: string;
    age: number;
    active: boolean;
    tags: string[];
    items: string[];
    filter: {
      name: string;
      age: number;
    };
    data: {
      user: {
        id: number;
        name: string;
      };
      items: string[];
    };
    mixed: {
      a: Array<{ b: string }>;
    };
    empty: null;
    nullValue: null;
    undefinedValue?: string;
  }

  const typedParams = parseQueryString<UserParams>(testUrl.split("?")[1]);
  console.log("类型安全参数:", typedParams);
  console.log("用户名:", typedParams.name); // 张三
  console.log("年龄:", typedParams.age); // 25
  console.log("标签:", typedParams.tags); // ['js', 'css']
  console.log("过滤条件:", typedParams.filter.name); // 李四
};

// 高级功能：查询参数构建器
export class QueryParamsBuilder<T extends Record<string, any> = ParseResult> {
  private params: Record<string, any> = {};

  constructor(initialParams?: T) {
    if (initialParams) {
      this.params = { ...initialParams };
    }
  }

  set<K extends keyof T>(key: K, value: T[K]): this {
    this.params[key as string] = value;
    return this;
  }

  delete(key: keyof T): this {
    delete this.params[key as string];
    return this;
  }

  clear(): this {
    this.params = {};
    return this;
  }

  toString(options: { encode?: boolean } = {}): string {
    const { encode = true } = options;
    return this.buildQueryString(this.params, encode);
  }

  toObject(): T {
    return this.params as T;
  }

  toUrlString(baseUrl: string = ""): string {
    const query = this.toString();
    if (!query) return baseUrl;
    return `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}${query}`;
  }

  private buildQueryString(
    obj: any,
    encode: boolean,
    prefix: string = ""
  ): string {
    const parts: string[] = [];

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        const fullKey = prefix ? `${prefix}[${key}]` : key;

        if (value === null || value === undefined) {
          // 忽略 null 和 undefined 值
          // continue;
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (item === null || item === undefined) return;
            const encodedKey = encode
              ? encodeURIComponent(`${fullKey}[${index}]`)
              : `${fullKey}[${index}]`;
            const encodedValue =
              encode && typeof item === "string"
                ? encodeURIComponent(item)
                : String(item);
            parts.push(`${encodedKey}=${encodedValue}`);
          });
        } else if (typeof value === "object") {
          parts.push(this.buildQueryString(value, encode, fullKey));
        } else {
          const encodedKey = encode ? encodeURIComponent(fullKey) : fullKey;
          const encodedValue =
            encode && typeof value === "string"
              ? encodeURIComponent(value)
              : String(value);
          parts.push(`${encodedKey}=${encodedValue}`);
        }
      }
    }

    return parts.join("&");
  }
}

// 工具函数
export const queryStringUtils = {
  /**
   * 获取单个参数值
   */
  getParam<T = any>(name: string, defaultValue?: T): T | undefined {
    const params = getQueryParams<Record<string, T>>();
    return params[name] !== undefined ? params[name] : defaultValue;
  },

  /**
   * 检查是否存在参数
   */
  hasParam(name: string): boolean {
    const params = getQueryParams<Record<string, any>>();
    return params[name] !== undefined;
  },

  /**
   * 获取所有参数名
   */
  getParamNames(): string[] {
    const params = getQueryParams<Record<string, any>>();
    return Object.keys(params);
  },

  /**
   * 合并参数
   */
  mergeParams<T = ParseResult>(...paramsObjects: T[]): T {
    const merged: any = {};

    paramsObjects.forEach(params => {
      if (params && typeof params === "object") {
        Object.assign(merged, params);
      }
    });

    return merged as T;
  },

  /**
   * 更新当前 URL 参数（不刷新页面）
   */
  updateUrlParams(
    params: Record<string, any>,
    replace: boolean = false
  ): string {
    if (typeof window === "undefined") return "";

    const currentParams = getQueryParams<Record<string, any>>();
    const newParams = { ...currentParams, ...params };

    // 移除 undefined 和 null
    Object.keys(newParams).forEach(key => {
      if (newParams[key] === undefined || newParams[key] === null) {
        delete newParams[key];
      }
    });

    const builder = new QueryParamsBuilder(newParams);
    const newQuery = builder.toString();
    const newUrl = `${window.location.pathname}${newQuery ? "?" + newQuery : ""}${window.location.hash}`;

    if (replace) {
      window.history.replaceState({}, "", newUrl);
    } else {
      window.history.pushState({}, "", newUrl);
    }

    return newUrl;
  }
};

/**
 * 获取当前 URL 参数 (不包含 hash)
 * */
export const currentUrlDeCryptoParams = () => {
  const params_string = location.href.split("?")[1];
  if (params_string === undefined) {
    return {};
  }
  const { params } = parseQueryString(params_string);
  // console.log(params);
  try {
    return CryptoAES.decrypt(decodeBase64(params));
  } catch (e: any) {
    console.log(e.message);
    return { params };
  }
};

/**************************************************

 // 基本使用
 const url = 'https://example.com/?name=张三&age=25&tags=js&tags=ts&filter[category]=books&filter[price]=100';

 // 解析参数
 const params = parseQueryString(url.split('?')[1]);

 console.log(params);
 // 输出：
 // {
 //   name: "张三",
 //   age: 25,
 //   tags: ["js", "ts"],
 //   filter: {
 //     category: "books",
 //     price: 100
 //   }
 // }

 // 获取当前页面参数
 const currentParams = getQueryParams();
 console.log(currentParams);

 // 使用构建器
 const builder = new QueryParamsBuilder({
 name: '张三',
 age: 25,
 filters: { category: 'books', price: 100 }
 });

 console.log(builder.toString());
 // 输出: name=%E5%BC%A0%E4%B8%89&age=25&filters[category]=books&filters[price]=100

 // 类型安全
 interface SearchParams {
 query: string;
 page: number;
 filters: {
 category: string;
 minPrice?: number;
 maxPrice?: number;
 };
 tags: string[];
 }

 const typedParams = parseQueryString<SearchParams>('query=电脑&page=1&filters[category]=electronics&tags=laptop&tags=gaming');
 console.log(typedParams.query); // "电脑"
 console.log(typedParams.page); // 1
 console.log(typedParams.filters.category); // "electronics"
 console.log(typedParams.tags); // ["laptop", "gaming"]

 ********************************************************************/
