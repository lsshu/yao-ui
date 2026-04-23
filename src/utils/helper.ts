/**
 * Base64 编码解码工具集
 * 提供字符串与二进制数据(Base64/ArrayBuffer)之间的转换功能
 */

type BinaryData = ArrayBuffer | Uint8Array;

/**
 * 将UTF-8字符串编码为Base64
 * @param str 要编码的字符串
 * @returns Base64编码后的字符串
 */
const encodeBase64 = (str: string): string => {
  try {
    return btoa(String.fromCharCode(...new TextEncoder().encode(str)));
  } catch (error) {
    console.error("Base64编码失败:", error);
    return "";
  }
};

/**
 * 将Base64字符串解码为UTF-8字符串
 * @param b64Str Base64编码的字符串
 * @returns 解码后的原始字符串
 */
const decodeBase64 = (b64Str: string): string => {
  try {
    return new TextDecoder().decode(
      Uint8Array.from(atob(b64Str), c => c.charCodeAt(0))
    );
  } catch (error) {
    // @ts-ignore
    console.log("Base64解码失败:", error.message);
    throw new Error("Base64解码失败");
  }
};

/**
 * 将二进制数据(ArrayBuffer/Uint8Array)转换为Base64字符串
 * @param buffer 二进制数据
 * @returns Base64编码的字符串
 */
const arrayBufferToBase64 = (buffer: BinaryData): string => {
  try {
    const bytes =
      buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    return btoa(String.fromCharCode(...bytes));
  } catch (error) {
    // @ts-ignore
    console.log("二进制转Base64失败:", error.message);
    throw new Error("二进制转Base64失败");
  }
};

/**
 * 将Base64字符串转换为ArrayBuffer
 * @param b64Str Base64编码的字符串
 * @returns ArrayBuffer二进制数据
 */
const base64ToArrayBuffer = (b64Str: string): ArrayBuffer => {
  try {
    const binStr = atob(b64Str);
    const bytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bytes[i] = binStr.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("Base64转二进制失败:", error);
    return new ArrayBuffer(0);
  }
};

export { encodeBase64, decodeBase64, arrayBufferToBase64, base64ToArrayBuffer };

export type { BinaryData };
