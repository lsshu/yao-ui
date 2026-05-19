# Yao UI

一个基于 Vue 3 + Element Plus 的企业级 UI 组件库，提供高质量的组件和开发工具。

## 特性

- 🚀 **现代化**：基于 Vue 3.5.0、TypeScript 6.0.3 和 Element Plus 2.14.0 构建
- 📦 **组件丰富**：提供表格、表单、页面、搜索等企业级组件
- 🔧 **可配置**：支持全局配置和配置驱动的组件渲染
- 🔐 **安全加密**：内置请求参数和请求体自动加密/解密功能
- 🌐 **国际化**：内置中英文多语言支持，支持自定义扩展
- ⚡ **高效构建**：使用 Vite 8.0.9 进行快速开发和构建
- 🎯 **类型安全**：完整的 TypeScript 类型定义
- 📦 **按需加载**：支持组件自动导入和按需加载

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

## 快速参考

### 核心概念

1. **配置驱动**: 所有组件基于配置对象渲染，减少模板代码
2. **类型安全**: 完整的 TypeScript 类型支持
3. **加密通信**: 内置的请求加密机制，确保数据安全
4. **国际化**: 内置中英文支持，易于扩展

### 快速命令

```bash
# 安装依赖
npm install @lsshu/yao-ui

# 开发（项目根目录）
pnpm dev

# 构建
pnpm build

# 发布到 NPM
npm publish --access public
```

## 快速开始

### 完整引入

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { setupYaoUi } from "@lsshu/yao-ui";
import "element-plus/dist/index.css";

const app = createApp(App);

// 配置并安装 Yao-UI
setupYaoUi(app, {
  axiosBaseUrl: process.env.VITE_API_BASE || "/api",
  axiosTimeout: 5000,
  cryptoKey: "your-secret-key",
  cryptoAble: true
});

app.mount("#app");
```

### 按需引入

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { setupYaoUi, YTable, YForm } from "@lsshu/yao-ui";
import "element-plus/dist/index.css";

const app = createApp(App);

// 配置 Yao-UI
setupYaoUi(app, {
  axiosBaseUrl: "/api",
  axiosTimeout: 10000,
  cryptoKey: "your-secret-key",
  cryptoAble: true
});

// 注册需要的组件
app.component("YTable", YTable);
app.component("YForm", YForm);

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

### 表格组件 (YTable)

- 📊 配置驱动的表格渲染
- 🔍 支持自定义查询参数和筛选条件
- 📅 集成日期组件，支持日期格式化
- 🔄 支持列排序功能（前端/后端排序）
- ✅ 支持行选择功能
- 🎨 高度可配置的列定义和样式
- 🔗 集成 API 请求，自动处理分页

### 表单组件 (YForm)

- 🎯 配置驱动的动态表单生成
- 📝 支持 YInput、YSelect、YImage 等多种表单项类型
- ✅ 集成 Element Plus 表单验证规则
- 🎨 支持自定义插槽和样式配置
- 📦 支持分区标题和布局控制

### 页面组件 (YPage)

- 📄 标准页面布局模板
- 🔍 集成搜索表单组件
- 📊 集成表格组件
- 🎨 支持自定义页面模板

### 搜索组件 (YSearch)

- 🔍 基于表单配置的快速搜索
- ⚡ 支持防抖优化
- 🎨 支持自定义按钮插槽

### API 组件

- 🌐 统一的 Axios 请求封装
- 🔐 支持请求参数和请求体自动加密/解密
- ⚙️ 支持自定义参数序列化
- 🔄 内置请求/响应拦截器
- ⚙️ 全局配置支持

### 组件使用示例

### 表格组件使用

```vue
<template>
  <y-table
    :title="用户列表"
    :select-able="true"
    :columns="columns"
    :api="apiConfig"
    :height="500"
    @sort-change="handleSortChange"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TYTableColumns, TYModelApi } from "@lsshu/yao-ui";

const apiConfig: TYModelApi = {
  index: "/api/users", // 列表接口
  show: "/api/users/:id", // 详情接口
  store: "/api/users", // 新增接口
  update: "/api/users/:id", // 更新接口
  destroy: "/api/users/:id" // 删除接口
};

const columns: TYTableColumns[] = [
  {
    label: "用户名",
    field: "username",
    sortable: "custom",
    width: 120
  },
  {
    label: "邮箱",
    field: "email",
    type: "text"
  },
  {
    label: "创建时间",
    field: "created_at",
    type: "date",
    format: "YYYY-MM-DD HH:mm:ss",
    sortable: "custom"
  }
];

const handleSortChange = sort => {
  console.log("排序变化:", sort);
};
</script>
```

### 表单组件使用

```vue
<template>
  <y-form
    :rows="formRows"
    :rules="formRules"
    :model-data="formData"
    @submit="handleSubmit"
  />
</template>

<script setup lang="ts">
import { reactive } from "vue";
import type { TYFormRow } from "@lsshu/yao-ui";

const formData = reactive({
  username: "",
  email: "",
  avatar: "",
  role: ""
});

const formRows: TYFormRow[] = [
  {
    cols: [
      {
        item: {
          type: "YInput",
          field: "username",
          label: "用户名",
          attr: {
            placeholder: "请输入用户名"
          }
        }
      },
      {
        item: {
          type: "YInput",
          field: "email",
          label: "邮箱",
          attr: {
            placeholder: "请输入邮箱"
          }
        }
      }
    ]
  },
  {
    cols: [
      {
        item: {
          type: "YSelect",
          field: "role",
          label: "角色",
          attr: {
            placeholder: "请选择角色"
          },
          service: {
            url: "/api/roles",
            labelField: "name",
            valueField: "id"
          }
        }
      },
      {
        item: {
          type: "YImage",
          field: "avatar",
          label: "头像",
          attr: {
            width: "150px",
            height: "150px"
          }
        }
      }
    ]
  }
];

const formRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
  ]
};

const handleSubmit = (data: any) => {
  console.log("表单提交:", data);
};
</script>
```

### 页面组件使用

```vue
<template>
  <y-page :config="pageConfig" />
</template>

<script setup lang="ts">
import type { TYPage } from "@lsshu/yao-ui";

const pageConfig: TYPage = {
  template: "YPageDefault",
  search: {
    show: true,
    rows: [
      {
        cols: [
          {
            item: {
              type: "YInput",
              field: "keyword",
              label: "关键词",
              attr: {
                placeholder: "请输入关键词"
              }
            }
          }
        ]
      }
    ]
  },
  table: {
    title: "数据列表",
    selectAble: true,
    api: {
      index: "/api/data",
      show: "/api/data/:id",
      store: "/api/data",
      update: "/api/data/:id",
      destroy: "/api/data/:id"
    },
    columns: [
      {
        label: "名称",
        field: "name"
      },
      {
        label: "日期",
        field: "date",
        type: "date",
        format: "YYYY-MM-DD"
      }
    ]
  }
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

## 使用示例

### 表格组件使用

```vue
<template>
  <y-table
    :title="表格标题"
    :columns="columns"
    :api="tableApi"
    :params="searchParams"
    :select-able="true"
    @sort-change="handleSort"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TYTableColumns } from "@lsshu/yao-ui";

// 表格列配置
const columns = ref<TYTableColumns[]>([
  {
    label: "姓名",
    field: "name",
    type: "text",
    width: "120px"
  },
  {
    label: "创建日期",
    field: "created_at",
    type: "date",
    format: "YYYY-MM-DD HH:mm:ss",
    sortable: "custom"
  }
]);

// API 配置
const tableApi = {
  index: "/api/users",
  store: "/api/users",
  show: "/api/users/:id",
  update: "/api/users/:id",
  destroy: "/api/users/:id"
};

// 搜索参数
const searchParams = ref({
  status: "active"
});

const handleSort = ({ sort, order }: { sort: string; order: string }) => {
  console.log("排序:", sort, order);
};
</script>
```

### 表单组件使用

```vue
<template>
  <y-form :rows="formRows" :model-data="formData" @submit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { TYFormRow } from "@lsshu/yao-ui";

// 表单配置
const formRows = ref<TYFormRow[]>([
  {
    cols: [
      {
        item: {
          type: "YInput",
          field: "name",
          label: "姓名",
          attr: { placeholder: "请输入姓名" }
        }
      },
      {
        item: {
          type: "YSelect",
          field: "status",
          label: "状态",
          attr: { multiple: true },
          service: {
            options: [
              { label: "激活", value: "active" },
              { label: "禁用", value: "inactive" }
            ]
          }
        }
      }
    ]
  },
  {
    cols: [
      {
        item: {
          type: "YImage",
          field: "avatar",
          label: "头像"
        }
      }
    ]
  }
]);

// 表单数据
const formData = ref({
  name: "",
  status: [],
  avatar: ""
});

const handleSubmit = (data: any) => {
  console.log("提交表单:", data);
};
</script>
```

### 页面组件使用

```vue
<template>
  <y-page :template="pageConfig" />
</template>

<script setup lang="ts">
import type { TYPage } from "@lsshu/yao-ui";

const pageConfig = ref<TYPage>({
  template: "YPageDefault",
  search: {
    show: true,
    rows: searchRows
  },
  table: {
    title: "用户列表",
    columns: tableColumns,
    api: "/api/users"
  }
});
</script>
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
│   │   ├── api/            # API 请求组件
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── forms/          # 表单组件
│   │   │   ├── components/ # 表单项组件
│   │   │   │   └── items/  # 具体表单项 (YInput, YSelect, YImage)
│   │   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   ├── pages/          # 页面组件
│   │   │   ├── components/
│   │   │   ├── src/
│   │   │   └── index.ts
│   │   ├── search/         # 搜索组件
│   │   │   ├── src/
│   │   │   └── index.ts
│   │   ├── tables/         # 表格组件
│   │   │   ├── components/ # 表格子组件
│   │   │   ├── src/
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   └── index.ts        # 组件总入口
│   ├── config/             # 全局配置
│   │   ├── global.ts       # 全局配置管理
│   │   ├── types.ts        # 配置类型定义
│   │   └── constant.ts     # 常量定义
│   ├── locales/            # 国际化
│   │   ├── lang/           # 语言包
│   │   │   ├── zh-CN.ts
│   │   │   └── en.ts
│   │   └── index.ts
│   ├── utils/              # 工具函数
│   │   ├── request.ts      # Axios 封装
│   │   ├── CryptoAES.ts    # 加密工具
│   │   ├── date.ts         # 日期工具
│   │   ├── debounce.ts     # 防抖工具
│   │   ├── helper.ts       # 辅助函数
│   │   ├── queryParams.ts  # 查询参数处理
│   │   └── index.ts
│   ├── index.ts            # 库入口文件
│   └── types.ts            # 全局类型定义
├── package.json
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── README.md
├── publish.md              # 发布指南
└── git.md                  # Git 指南
```

## API 文档

### 工具函数

#### 加密工具 (CryptoAES)

```typescript
import { CryptoAES } from "@lsshu/yao-ui";

// 数据加密
const encrypted = CryptoAES.encrypt(data, secretKey);

// 数据解密
const decrypted = CryptoAES.decrypt(encryptedData, secretKey);
```

#### 日期工具

```typescript
import { formatDate } from "@lsshu/yao-ui";

// 日期格式化
const formatted = formatDate(new Date(), "YYYY-MM-DD HH:mm:ss");
```

#### 辅助函数

```typescript
import { encodeBase64, decodeBase64 } from "@lsshu/yao-ui";

// Base64 编码
const encoded = encodeBase64("hello");

// Base64 解码
const decoded = decodeBase64(encoded);
```

#### 请求工具

```typescript
import { service } from "@lsshu/yao-ui";

// 发起请求
service
  .get("/api/users", { params: { page: 1 } })
  .then(response => console.log(response));
```

### 类型定义

#### 全局配置类型

```typescript
interface TYGlobalConfig {
  axiosBaseUrl?: string; // API 基础地址
  axiosTimeout?: number; // 请求超时时间
  cryptoKey?: string; // 加密密钥
  cryptoAble?: boolean; // 是否启用加密
}
```

#### 表格配置类型

```typescript
interface TYTable {
  title?: string; // 表格标题
  show?: boolean; // 是否显示表格
  selectAble?: boolean; // 是否可选择行
  columns?: TYTableColumns[]; // 列配置
  api?: string | TYModelApi; // API 配置
  height?: string | number; // 表格高度
  width?: string | number; // 表格宽度
  params?: any; // 请求参数
  service?: any; // 自定义服务
}
```

#### 表单配置类型

```typescript
type TYFormItemType = "YInput" | "YSelect" | "YImage";

interface TYFormRow {
  props?: TYProps; // 行属性
  cols?: TYFormCol[]; // 列配置
  slotPrependName?: string; // 前置插槽名
  slotAppendName?: string; // 追加插槽名
  rowTitle?: string; // 分区标题
}

interface TYFormItem {
  type: TYFormItemType; // 表单项类型
  field: string; // 字段名
  label: string; // 字段标签
  props?: TYProps; // 表单项属性
  attr?: TYProps; // 控件属性
  slotName?: string; // 插槽名
  valueType?: "string" | "array"; // 值类型
  service?: any; // 服务配置
}
```

## 注意事项

### Element Plus 样式引入

在 Electron 项目或需要手动引入样式的情况下，请确保在入口文件中引入 Element Plus 的样式文件：

```typescript
import "element-plus/dist/index.css";
```

### 加密配置

当启用加密功能时，请确保：

- 加密密钥 (`cryptoKey`) 安全存储
- 前端和后端使用相同的加密算法
- 测试加密解密功能的正确性

### 组件按需加载

项目支持组件自动导入和按需加载，可以通过以下方式优化打包体积：

- 使用 `unplugin-vue-components` 自动导入
- 只导入需要的组件和工具函数

## 更新日志

### v1.0.2

- 优化组件模板和依赖配置
- 为插槽模板添加 key 属性以优化渲染性能
- 修复请求数据加密逻辑
- 添加图像表单项类型并优化搜索组件显示逻辑

### v1.0.1

- 初始版本发布
- 支持表格、表单、页面等核心组件
- 内置国际化支持 (中文、英文)
- 请求参数和请求体自动加密/解密功能
- 基于 Element Plus 的二次封装组件

## 许可证

MIT License

## 贡献

欢迎提交 Issue 和 Pull Request！

在提交 PR 之前，请确保：

1. 代码符合项目的 ESLint 规范
2. 添加必要的类型定义
3. 更新相关文档
4. 确保所有测试通过

## 技术支持

### 依赖要求

- Node.js: >= 18.0.0
- Vue: >= 3.5.0
- Element Plus: >= 2.14.0
- TypeScript: >= 6.0.0

### 浏览器支持

- 现代浏览器（Chrome、Firefox、Safari、Edge 最新版本）
- 不支持 IE 浏览器

## 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- **作者**: Lsshu
- **邮箱**: admin@lsshu.cn
- **GitHub**: [https://github.com/lsshu/yao-ui](https://github.com/lsshu/yao-ui)
- **NPM**: [@lsshu/yao-ui](https://www.npmjs.com/package/@lsshu/yao-ui)

---

**Yao-UI** - 让企业级 UI 开发更简单、更高效！
