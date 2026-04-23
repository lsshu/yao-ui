# Yao UI

一个基于 Vue 3 的企业级 UI 组件库，提供高质量的组件和开发工具。

## 特性

- 🚀 **现代化**：基于 Vue 3 和 TypeScript 构建
- 📦 **组件丰富**：提供表格、表单、页面等常用组件
- 🔧 **可配置**：支持全局配置和自定义配置
- 🌐 **国际化**：内置中英文多语言支持
- ⚡ **高效构建**：使用 Vite 进行快速开发和构建

## 安装

### 使用 npm

```bash
npm install @lsshu/yao-ui
```

### 使用 yarn

```bash
yarn add @lsshu/yao-ui
```

### 使用 pnpm

```bash
pnpm add @lsshu/yao-ui
```

## 快速开始

### 完整引入

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import YaoUI from "@lsshu/yao-ui";

const app = createApp(App);
app.use(YaoUI);
app.mount("#app");
```

### 按需引入

```javascript
import { setupYaoUi, YTable } from "@lsshu/yao-ui";

const app = createApp(App);
setupYaoUi(app, {
  // 全局配置
  axiosBaseUrl: "/api",
  axiosTimeout: 5000,
  cryptoKey: "your-secret-key",
  cryptoAble: true
});

app.component("YTable", YTable);
app.mount("#app");
```

## 全局配置

```javascript
import { setupYaoUi, setGlobalConfig } from "@lsshu/yao-ui";

// 初始化时配置
setupYaoUi(app, {
  axiosBaseUrl: process.env.VITE_API_BASE,
  axiosTimeout: 5000,
  cryptoKey: "your-secret-key",
  cryptoAble: true
});

// 运行时修改配置
setGlobalConfig({
  axiosBaseUrl: "/api",
  axiosTimeout: 5000,
  cryptoKey: "your-secret-key",
  cryptoAble: true
});
```

## 组件列表

### 表格组件 (Tables)

- 支持自定义查询参数
- 集成排序功能
- 日期组件选择支持
- 高度可配置的列定义

### 表单组件 (Forms)

- 动态表单生成
- 验证规则集成
- 多种表单控件支持

### 页面组件 (Pages)

- 标准布局组件
- 面包屑导航
- 分页组件

### API 组件

- 统一的接口管理
- 请求加密支持
- 错误处理机制

## 使用示例

### 表格组件使用

```vue
<template>
  <y-table
    :columns="columns"
    :data-source="data"
    :pagination="pagination"
    @change="handleTableChange"
  />
</template>

<script setup>
import { ref } from "vue";
import { YTable } from "@lsshu/yao-ui";

const columns = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "日期",
    dataIndex: "date",
    key: "date",
    type: "date"
  }
];

const data = ref([]);
const pagination = {
  current: 1,
  pageSize: 10,
  total: 0
};

const handleTableChange = params => {
  console.log("表格变化:", params);
};
</script>
```

### 多语言配置

```javascript
import { yaoLocale, zhCN, en } from "@lsshu/yao-ui";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  locale: "zh-CN",
  messages: {
    "zh-CN": zhCN,
    en: en
  }
});

app.use(i18n);
```

## 开发

### 本地开发

```bash
# 克隆项目
git clone https://github.com/lsshu/yao-ui.git
cd yao-ui

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

### 项目结构

```
yao-ui/
├── src/
│   ├── components/          # 组件源码
│   │   ├── api/            # API 相关组件
│   │   ├── forms/          # 表单组件
│   │   ├── pages/          # 页面组件
│   │   └── tables/         # 表格组件
│   ├── config/             # 配置相关
│   ├── locales/            # 国际化文件
│   ├── utils/              # 工具函数
│   ├── index.ts            # 入口文件
│   └── types.ts            # 类型定义
├── package.json
├── vite.config.ts
└── README.md
```

## API 文档

### 工具函数

- `encryptData(data: any, key?: string): string` - 数据加密
- `decryptData(encrypted: string, key?: string): any` - 数据解密
- `formatDate(date: Date, format?: string): string` - 日期格式化

### 配置类型

```typescript
interface TYGlobalConfig {
  axiosBaseUrl?: string;
  axiosTimeout?: number;
  cryptoKey?: string; // 加密密钥
  cryptoAble?: boolean; // 是否加密
}
```

## 更新日志

### v1.0.0

- 初始版本发布
- 支持表格、表单、页面等核心组件
- 内置国际化支持
- 请求加密功能

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

- 作者：Lsshu
- 邮箱：admin@lsshu.cn
- GitHub: [https://github.com/lsshu/yao-ui](https://github.com/lsshu/yao-ui)
