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
├── images/                    # 静态图片资源
│   ├── hero/
│   ├── products/
│   ├── factory/
│   ├── certificates/
│   └── qr-codes/
├── data/                      # 旧数据目录（已迁移到 server/data/db.json）
├── README.md
├── .gitignore
└── index.html                 # 旧版静态 HTML（保留备用）
```

---

## 🚀 快速启动

### 1. 安装后端依赖

```bash
cd server
npm install
npm start
```

后端运行在 `http://localhost:3001`

### 2. 安装前端依赖（开发模式）

另开一个终端：

```bash
cd client
npm install
npm run dev
```

前端运行在 `http://localhost:3000`，自动代理 API 到 `localhost:3001`

### 3. 生产构建

```bash
cd client
npm run build
```

构建后的文件自动输出到 `server/public/`，然后访问 `http://localhost:3001` 即可。

---

## 📝 管理后台使用

1. 打开 `http://localhost:3001/admin`（或 `http://localhost:3000/#/admin`）
2. 输入密码：**admin123**
3. 登录后可管理：
   - ✅ 联系方式（电话、地址、邮箱等）
   - ✅ 新闻（增删改查）
   - ✅ 产品（增删改查）
   - ✅ 关于我们（修改文案）
   - ✅ 留言（查看用户提交的留言）

---

## 📊 API 接口

| 方法 | 路径 | 说明 | 权限 |
|------|------|------|------|
| GET | `/api/contact` | 获取联系方式 | 公开 |
| PUT | `/api/contact` | 更新联系方式 | 需登录 |
| GET | `/api/news` | 获取新闻 | 公开 |
| POST | `/api/news/:category` | 添加新闻 | 需登录 |
| PUT | `/api/news/:category/:id` | 修改新闻 | 需登录 |
| DELETE | `/api/news/:category/:id` | 删除新闻 | 需登录 |
| GET | `/api/products` | 获取产品 | 公开 |
| POST | `/api/products` | 添加产品 | 需登录 |
| PUT | `/api/products/:id` | 修改产品 | 需登录 |
| DELETE | `/api/products/:id` | 删除产品 | 需登录 |
| GET | `/api/about` | 获取关于我们 | 公开 |
| PUT | `/api/about` | 更新关于我们 | 需登录 |
| GET | `/api/stats` | 获取统计数据 | 公开 |
| GET | `/api/hero` | 获取轮播图 | 公开 |
| GET | `/api/steps` | 获取生产流程 | 公开 |
| GET | `/api/factory` | 获取工厂照片 | 公开 |
| GET | `/api/certificates` | 获取证书 | 公开 |
| POST | `/api/messages` | 提交留言 | 公开 |
| GET | `/api/messages` | 查看留言 | 需登录 |
| POST | `/api/login` | 登录 | 公开 |

---

## 📝 修改内容（日常使用）

### 方式1：管理后台（推荐）

访问 `/admin`，登录后直接编辑，无需改代码。

### 方式2：直接编辑数据库文件

```bash
# 打开 JSON 数据库文件
notepad server/data/db.json
```

修改后刷新网页即可生效（无需重启服务器）。

---

## 📝 占位信息替换清单

| 占位项 | 位置 | 替换说明 |
|--------|------|----------|
| `冀ICP备XXXXXXXX号-1` | 页脚 | 真实备案号 |
| 图片 | `images/` 各目录 | 替换为企业真实图片 |

---

<p align="center">Made with 💚 for 双益农业</p>
