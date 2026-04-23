/**
 * JavaScript AES 加密解密模块 - 与 PHP 版本完全兼容
 */

import * as CryptoJS from "crypto-js";

interface EncryptedData {
  ciphertext: string;
  salt: string;
  iv: string;
  algorithm: string;
  iterations: number;
  version: string;
}

class CryptoAES {
  static readonly DEFAULT_KEY = "afNpD!r9yW@Ct4jZ";
  static readonly ITERATIONS = 999;
  static readonly KEY_SIZE = 8; // 8 words = 32 bytes
  static readonly SALT_SIZE = 256; // 256 bytes
  static readonly IV_SIZE = 16; // 16 bytes

  /**
   * 加密数据
   * @param plaintext - 要加密的数据
   * @param secretKey - 密钥
   * @returns JSON 格式的加密结果
   */
  static encrypt(
    plaintext: string | object,
    secretKey: string = CryptoAES.DEFAULT_KEY
  ): string {
    // 处理输入数据
    const inputData =
      typeof plaintext === "object"
        ? JSON.stringify({ ...plaintext, timestamp: Date.now() })
        : String(plaintext);

    // 生成随机 salt
    const salt = CryptoJS.lib.WordArray.random(CryptoAES.SALT_SIZE);

    // 生成随机 IV
    const iv = CryptoJS.lib.WordArray.random(CryptoAES.IV_SIZE);

    // PBKDF2 派生密钥
    const key = CryptoJS.PBKDF2(secretKey, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: CryptoAES.KEY_SIZE,
      iterations: CryptoAES.ITERATIONS
    });

    // AES-CBC 加密
    const encrypted = CryptoJS.AES.encrypt(inputData, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    // 返回结果
    return JSON.stringify({
      ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
      salt: salt.toString(CryptoJS.enc.Hex),
      iv: iv.toString(CryptoJS.enc.Hex),
      algorithm: "AES-256-CBC",
      iterations: CryptoAES.ITERATIONS,
      version: "1.0"
    } as EncryptedData);
  }

  /**
   * 解密数据
   * @param encryptedData - 加密的数据
   * @param secretKey - 密钥
   * @returns 解密结果
   */
  static decrypt(
    encryptedData: string | EncryptedData,
    secretKey: string = CryptoAES.DEFAULT_KEY
  ): string | object {
    // 解析输入数据
    const data: EncryptedData =
      typeof encryptedData === "string"
        ? JSON.parse(encryptedData)
        : encryptedData;

    // 验证必需字段
    if (!data.ciphertext || !data.salt || !data.iv) {
      throw new Error("Missing required fields: ciphertext, salt, or iv");
    }

    // 解析数据
    const ciphertext = CryptoJS.enc.Base64.parse(data.ciphertext);
    const salt = CryptoJS.enc.Hex.parse(data.salt);
    const iv = CryptoJS.enc.Hex.parse(data.iv);

    // 获取迭代次数
    const iterations = data.iterations || CryptoAES.ITERATIONS;

    // PBKDF2 派生密钥
    const key = CryptoJS.PBKDF2(secretKey, salt, {
      hasher: CryptoJS.algo.SHA512,
      keySize: CryptoAES.KEY_SIZE,
      iterations: iterations
    });

    // AES-CBC 解密
    // @ts-ignore
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: ciphertext }, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);

    // 尝试解析为 JSON
    try {
      return JSON.parse(result);
    } catch {
      return result;
    }
  }

  /**
   * 验证密钥
   * @param encryptedData - 加密数据
   * @param secretKey - 密钥
   * @returns 密钥是否正确
   */
  static verifyKey(
    encryptedData: string | EncryptedData,
    secretKey: string
  ): boolean {
    try {
      CryptoAES.decrypt(encryptedData, secretKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 生成随机密钥
   * @param length - 密钥长度
   * @returns 随机密钥
   */
  static generateRandomKey(length: number = 32): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 计算哈希值
   * @param data - 数据
   * @returns 哈希值
   */
  static calculateHash(data: string | object): string {
    const inputData = typeof data === "object" ? JSON.stringify(data) : data;
    return CryptoJS.SHA256(inputData).toString(CryptoJS.enc.Hex);
  }
}

export default CryptoAES;
