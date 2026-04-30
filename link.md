# Pnpm Link 方法

## 第一步：组件库项目

在你的组件库项目里执行：

```bash
pnpm link --global
```

## 第二步：业务项目

在你的业务项目里执行：

```bash
pnpm link --global @lsshu/yao-ui
```

## 关键配置：Vue 别名

打开你业务项目的 `vite.config.ts`，加上以下配置：

```typescript
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      // 强制让所有地方用同一个 Vue！！！
      vue: path.resolve(__dirname, "./node_modules/vue")
    }
  }
});
```

## 取消 Link

### 业务项目里执行：

```bash
pnpm unlink @lsshu/yao-ui
```

### 组件库项目执行：

```bash
pnpm unlink --global
```
