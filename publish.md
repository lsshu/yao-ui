# NPM 包发布指南

## 📋 预备工作

### 1. 版本号检查

在正式发布前，确保更新 package.json 中的版本号：

```bash
# 查看当前版本号
cat package.json | grep version

# 或者手动更新版本号（推荐使用以下标准命令）
npm version patch    # 修复bug时使用 (x.y.z → x.y.z+1)
npm version minor    # 新增功能时使用 (x.y.z → x.y+1.0)
npm version major    # 不兼容变更时使用 (x.y.z → x+1.0.0)
```

### 2. 构建包

确保构建输出的文件是最新的：

```bash
# 清理并重新构建
npm run clean  # 如果没有clean脚本，可以使用：rm -rf dist
npm run build

# 验证构建结果
ls -la dist/
```

## 🔑 认证配置

### 3. 生成 Automation Token

1. **打开官方网站**：[https://www.npmjs.com/settings/~/tokens](https://www.npmjs.com/settings/~/tokens)
2. **点击** "Generate New Token"
3. **选择** "Automation"（**必须选择这个**）
4. **点击** "Generate Token"
5. **复制**生成的 token（格式为：`npm_xxxx`）

### 4. 配置认证 Token

使用以下命令直接登录（最稳定可靠的方式）：

```bash
npm config set //registry.npmjs.org/:_authToken 你复制的token
```

### 示例

```bash
npm config set //registry.npmjs.org/:_authToken npm_abcdefg123456789
```

## 🚀 发布流程

### 5. 执行发布命令

```bash
npm publish --access public
```

### 6. 验证发布结果

```bash
# 查看已发布的包信息
npm info @lsshu/yao-ui

# 尝试安装测试
npm install @lsshu/yao-ui@latest --save-dev
```

## 📦 完整发布脚本示例

```bash
#!/bin/bash

# 1. 检查Git状态
echo "📝 检查Git状态..."
git status

# 2. 构建包
echo "🔨 构建包..."
npm run build

# 3. 更新版本号
echo "🔄 更新版本号..."
npm version patch

# 4. 发布
echo "🚀 发布包..."
npm publish --access public

# 5. 推送版本标签
echo "🏷️ 推送Git标签..."
git push origin HEAD --tags

echo "✅ 发布完成！"
```

## ⚠️ 重要注意事项

### 发布前检查清单

- ✅ `package.json` 中的 `name` 字段是唯一的
- ✅ 版本号已正确更新
- ✅ 构建结果验证通过
- ✅ README.md 文档完整
- ✅ 所有依赖项配置正确
- ✅ 类型定义文件已生成
- ✅ LICENSE 文件存在

### 常见问题排查

**包名已被占用：**

```bash
# 检查包名是否可用
npm search @lsshu/yao-ui

# 或者直接尝试发布，会提示包名是否可用
```

**认证失败：**

```bash
# 检查当前登录状态
npm whoami

# 重新配置token
npm config set //registry.npmjs.org/:_authToken TOKEN_HERE
```

**构建失败：**

```bash
# 清理缓存并重新构建
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 🎯 快速发布命令

```bash
# 一键式发布（包含构建、版本更新、发布）
npm run build && npm version patch && npm publish --access public
```
