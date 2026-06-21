# 沽源县双益农业发展有限公司官网

> Vue 3 + Vite + Tailwind CSS 前端 + Node.js + Express + lowdb 后端全栈项目

---

## 📌 项目简介

本项目是**沽源县双益农业发展有限公司**的官方网站全栈项目。

- **前端**：Vue 3 + Vite + Tailwind CSS + Vue Router（单页应用）
- **后端**：Node.js + Express + lowdb（JSON 文件数据库）
- **管理后台**：`/admin` 路径，支持在线编辑所有内容

---

## 📁 项目结构

```
guyuan-shuangyi/
├── client/                    # Vue 前端
│   ├── src/
│   │   ├── views/
│   │   │   ├── Home.vue       # 官网首页
│   │   │   └── Admin.vue      # 管理后台
│   │   ├── components/
│   │   │   └── NavBar.vue     # 导航栏组件
│   │   ├── api.js             # API 封装
│   │   ├── router.js          # 路由配置
│   │   ├── App.vue            # 根组件
│   │   ├── main.js            # 入口
│   │   └── style.css          # 全局样式
│   ├── public/                # 静态资源（图片等）
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                    # Node.js 后端
│   ├── app.js                 # 服务器入口
│   ├── data/
│   │   └── db.json            # 数据库（JSON 文件）
│   ├── uploads/               # 上传文件目录
│   ├── public/                # 前端构建输出（vite build 生成）
│   └── package.json
├── images/                    # 图片资源（根目录，供服务器使用）
│   ├── hero/                  # 首页轮播大图
│   ├── products/              # 产品图片
│   ├── factory/               # 工厂/车间照片
│   ├── certificates/          # 资质证书
│   ├── news/                  # 新闻配图
│   └── qr-codes/              # 二维码
├── README.md                  # 项目说明
├── DEPLOY.md                  # 部署指南（服务器/域名/数据库）
└── .gitignore
```

---

## 🚀 本地启动

### 方式1：VS Code 终端（推荐）

打开 VS Code → `终端` → `新建终端`：

**终端1：启动后端**
```bash
cd server
npm install
npm start
# 后端运行在 http://localhost:3001
```

**终端2：启动前端**
```bash
cd client
npm install
npm run dev
# 前端运行在 http://localhost:3000
```

浏览器访问 `http://localhost:3000`

### 方式2：CMD 命令行

按 `Win + R` → 输入 `cmd` → 回车：

```bash
# 先安装 Node.js（https://nodejs.org）

# 启动后端
cd /d D:\guyuan-website\guyuan-shuangyi\server
npm install
npm start

# 再开一个 CMD 窗口启动前端
cd /d D:\guyuan-website\guyuan-shuangyi\client
npm install
npm run dev
```

---

## 📝 管理后台使用

访问：`http://localhost:3000/admin`（或 `http://localhost:3001/admin`）

- **密码**：`admin123`
- 登录后可管理：
  - ✅ 联系方式（电话、地址、邮箱等）
  - ✅ 新闻（增删改查）
  - ✅ 产品（增删改查）
  - ✅ 关于我们文案
  - ✅ 查看用户留言

---

## 📊 API 接口

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | `/api/contact` | 获取联系方式 | 公开 |
| PUT | `/api/contact` | 更新联系方式 | 需登录 |
| GET | `/api/news` | 获取新闻 | 公开 |
| POST | `/api/news/:category` | 添加新闻 | 需登录 |
| GET | `/api/products` | 获取产品 | 公开 |
| POST | `/api/products` | 添加产品 | 需登录 |
| POST | `/api/messages` | 提交留言 | 公开 |
| GET | `/api/messages` | 查看留言 | 需登录 |
| POST | `/api/login` | 登录 | 公开 |

---

## 📋 占位信息替换

| 占位项 | 位置 | 替换说明 |
|--------|------|----------|
| `冀ICP备XXXXXXXX号-1` | 页脚 | 真实备案号 |
| 图片 | `images/` 各目录 | 替换为企业真实图片 |
| 二维码 | `images/qr-codes/` | 替换为真实公众号/视频号二维码 |

---

## 🚀 部署上线

详见 `DEPLOY.md`：
- 购买云服务器 + 域名
- 数据库迁移（MongoDB / MySQL）
- Nginx 配置 + HTTPS
- 服务器部署完整步骤

---

<p align="center">Made with 💚 for 双益农业</p>
