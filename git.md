# Git 命令行指引

您还可以按照以下说明从计算机中上传现有文件。

## Git 全局设置

```bash
git config --global user.name "Lsshu"
git config --global user.email "admin@lsshu.cn"
```

## 创建一个新仓库

```bash
git clone https://github.com/lsshu/yao-ui.git
cd lsshu-test
git switch --create main
touch README.md
git add README.md
git commit -m "add README"
git push --set-upstream origin main
```

## 推送现有文件夹

```bash
cd existing_folder
git init --initial-branch=main
git remote add origin https://github.com/lsshu/yao-ui.git
git add .
git commit -m "Initial commit"
git push --set-upstream origin main
```

## 推送现有的 Git 仓库

```bash
cd existing_repo
git remote rename origin old-origin
git remote add origin https://github.com/lsshu/yao-ui.git
git push --set-upstream origin --all
git push --set-upstream origin --tags
```
