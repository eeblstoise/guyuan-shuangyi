# 沽源县双益农业发展有限公司官网

> 一个基于 HTML5 + Tailwind CSS v3 + 原生 JavaScript 构建的响应式企业官网，为沽源县双益农业发展有限公司定制开发。

---

## 📌 项目简介

本项目是**沽源县双益农业发展有限公司**的官方网站，公司位于河北省张家口市沽源县，是中国高寒地区专业的马铃薯淀粉生产供应商。网站集品牌展示、产品介绍、生产实力展示、新闻资讯、在线留言于一体，采用绿色农业主题设计，体现企业专业与自然融合的品牌形象。

### 网站模块

| 模块 | 说明 |
|------|------|
| 🏠 首页轮播 | 全屏 Hero 轮播图，3 张幻灯片自动切换 |
| 📊 数据统计 | 生产基地、合作客户、年加工能力、行业经验 4 大核心指标 |
| 🏢 关于我们 | 公司简介、资质认证展示 |
| 🌾 产品中心 | 马铃薯淀粉、工业淀粉、定制加工 3 大产品线 |
| ⚙️ 生产实力 | 6 步生产流程 + 4 张工厂实景图 |
| ✅ 品质保障 | 5 项资质证书横向滚动展示 |
| 📰 新闻中心 | 企业动态、行业资讯、马铃薯知识 3 栏新闻 |
| 📬 联系我们 | 联系方式、地图、在线留言表单、公众号二维码 |

### 额外功能

- 🌙 **深色/浅色模式切换** — 一键切换主题，偏好自动保存
- 📝 **在线留言表单** — 完整表单验证与提交反馈
- 🎠 **自动轮播图** — 5 秒自动切换，支持手动控制与指示器
- ⬆️ **返回顶部按钮** — 滚动超过 300px 时显示
- 📱 **响应式布局** — 完美适配电脑、平板、手机
- 📊 **动态数据加载** — 电话、统计、产品、新闻数据可从 JSON 文件热更新

---

## 🚀 本地运行方法

### 方式一：直接打开（推荐）

```bash
# 下载项目后，双击文件即可在浏览器中打开
index.html
```

### 方式二：使用本地服务器（开发调试）

```bash
# 进入项目目录
cd guyuan-shuangyi

# 使用 Python 简易 HTTP 服务器
python -m http.server 8080

# 或使用 Node.js 的 http-server
npx http-server -p 8080

# 打开浏览器访问
http://localhost:8080
```

> 注意：本项目所有依赖（Tailwind CSS、Font Awesome）均通过 CDN 引入，无需安装任何 npm 包，下载即可运行。
> 如需动态数据加载（JSON 文件），请使用本地服务器方式打开，因为浏览器安全策略会阻止 `file://` 协议加载本地 JSON。

---

## 🛠 技术栈

| 技术 | 说明 |
|------|------|
| **HTML5** | 语义化标签，SEO 友好 |
| **Tailwind CSS v3** | 实用类优先 CSS 框架，CDN 引入 |
| **原生 JavaScript** | 无框架依赖，纯手写交互逻辑 |
| **Font Awesome 6** | 图标库，CDN 引入 |
| **GitHub Pages** | 静态网站托管，免费部署 |

---

## 📁 项目结构

```
guyuan-shuangyi/
├── index.html              # 完整网站（HTML + CSS + JS 内联）
├── README.md               # 项目说明文档
├── .gitignore              # Git 忽略配置
├── data/                   # 动态数据（JSON 文件）
│   ├── contact.json        # 联系方式（电话、地址、邮箱等）
│   ├── stats.json          # 统计数据（基地面积、客户数等）
│   ├── products.json       # 产品数据（名称、描述、图片）
│   └── news.json           # 新闻数据（企业动态、行业资讯等）
└── images/                 # 图片资源
    ├── hero/               # 首页轮播大图（hero-1.jpg ~ hero-3.jpg）
    ├── about/              # 关于我们页面图片
    ├── products/           # 产品图片（product-starch.jpg 等）
    ├── factory/            # 工厂/生产车间照片（factory-1.jpg ~ factory-4.jpg）
    ├── certificates/       # 资质证书扫描件
    ├── news/               # 新闻配图
    └── qr-codes/           # 公众号、视频号二维码
```

---

## 🌐 在线预览

通过 GitHub Pages 部署：

```
https://eeblstoise.github.io/guyuan-shuangyi/
```

---

## 📝 日常使用：如何更新内容

### 更新图片

把新图片放到对应目录，替换同名文件，然后 push：

```bash
# 例如：替换首页轮播图
cp "D:\你的图片\hero-1.jpg" "images\hero\hero-1.jpg"

git add .
git commit -m "update: 替换首页轮播图"
git push origin main
```

### 更新数据（电话、新闻、产品等）

直接编辑 `data/` 目录下的 JSON 文件：

```bash
# 修改电话
notepad data/contact.json

# 修改新闻
notepad data/news.json

git add .
git commit -m "update: 修改联系方式和新闻"
git push origin main
```

> 💡 网页中的数据会自动从 JSON 文件加载，无需修改 HTML 代码。

---

## 📋 占位信息替换清单

| 占位项 | 文件位置 | 替换说明 |
|--------|----------|----------|
| `0313-XXXXXXX` | `data/contact.json` + `index.html` | 企业真实电话号码 |
| `shuangyi@shuangyiny.com` | `data/contact.json` | 企业真实邮箱 |
| `冀ICP备XXXXXXXX号-1` | `index.html` 页脚 | 真实备案号 |
| 地图区域 | `index.html` 联系我们 | 可替换为高德/百度地图 iframe |
| 二维码 | `images/qr-codes/` | 替换为真实公众号/视频号二维码 |
| 图片 | `images/` 各目录 | 替换为企业真实图片 |

---

## 📄 开源协议

本项目为**沽源县双益农业发展有限公司**定制开发，版权归企业所有。

---

<p align="center">Made with 💚 for 双益农业</p>
