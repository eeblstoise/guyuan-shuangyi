# 双益农业官网部署指南

> 从本地开发到云服务器上线的完整步骤

---

## 一、数据库迁移（从 JSON 到正式数据库）

当前用的是 `lowdb`（JSON 文件数据库），上线后建议迁移到以下数据库之一：

### 方案 A：MongoDB（推荐，最简单）

MongoDB 是文档型数据库，和 JSON 结构完全兼容，迁移几乎零成本。

**1. 注册免费 MongoDB Atlas**
- 打开 https://www.mongodb.com/cloud/atlas
- 注册账号 → 创建免费集群（Free Tier）
- 获取连接字符串：`mongodb+srv://用户名:密码@cluster0.xxx.mongodb.net/双益农业`

**2. 修改后端连接代码**

安装依赖：
```bash
cd server
npm install mongoose
```

在 `server/app.js` 顶部添加：
```javascript
const mongoose = require('mongoose');

// 连接 MongoDB（把下面的 URI 换成你的）
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shuangyi';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB 连接成功'))
  .catch(err => console.error('❌ MongoDB 连接失败:', err));
```

**3. 定义数据模型（MongoDB Schema）**

创建 `server/models/Contact.js`：
```javascript
const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  company: String,
  address: String,
  phone: String,
  email: String,
  workHours: String
}, { timestamps: true });

module.exports = mongoose.model('Contact', ContactSchema);
```

类似的模型文件：`News.js`、`Product.js`、`About.js`、`Message.js`

**4. 修改 API 路由**

原来用 `db.data.contact` 读取，改成：
```javascript
const Contact = require('./models/Contact');

app.get('/api/contact', async (req, res) => {
  const contact = await Contact.findOne() || {};
  res.json({ success: true, data: contact });
});

app.put('/api/contact', requireAuth, async (req, res) => {
  await Contact.findOneAndUpdate({}, req.body, { upsert: true });
  res.json({ success: true });
});
```

### 方案 B：MySQL（如果习惯关系型数据库）

```bash
npm install mysql2 sequelize
```

创建 `server/models/index.js`：
```javascript
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('shuangyi', '用户名', '密码', {
  host: 'localhost',
  dialect: 'mysql'
});

const Contact = sequelize.define('Contact', {
  company: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: Sequelize.STRING,
  email: Sequelize.STRING,
  workHours: Sequelize.STRING
});

module.exports = { sequelize, Contact };
```

---

## 二、购买云服务器 + 域名

### 推荐配置（轻量够用）

| 项目 | 推荐 | 价格参考 |
|------|------|----------|
| **服务器** | 阿里云轻量应用服务器 / 腾讯云轻量 | 约 ¥99/年（2核2G） |
| **域名** | 阿里云万网 / 腾讯云 DNSPod | 约 ¥30-80/年（.com/.cn） |
| **系统** | Ubuntu 22.04 LTS / CentOS 8 | 免费 |

### 1. 购买服务器后需要做的事情

**1.1 开放端口**

在阿里云/腾讯云控制台 → 安全组 → 入方向规则，添加：
- `80`（HTTP）
- `443`（HTTPS）
- `3001`（Node.js 后端，可选）
- `22`（SSH，默认已有）

**1.2 获取服务器 IP**

比如：`123.45.67.89`

---

## 三、服务器部署步骤

### 1. 连接服务器（Git Bash）

```bash
ssh root@123.45.67.89
# 输入密码（控制台会显示）
```

### 2. 安装环境

```bash
# 更新系统
apt update && apt upgrade -y

# 安装 Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# 验证
node -v  # 显示 v20.x.x
npm -v   # 显示 10.x.x

# 安装 PM2（进程管理器）
npm install -g pm2

# 安装 Nginx
apt install -y nginx

# 安装 Git
apt install -y git
```

### 3. 上传代码到服务器

**方式 A：Git 拉取（推荐）**

```bash
# 在服务器上执行
cd /var/www
git clone https://github.com/eeblstoise/guyuan-shuangyi.git
```

**方式 B：本地打包上传**

```bash
# 在本地 Git Bash 执行
scp -r D:/guyuan-website/guyuan-shuangyi root@123.45.67.89:/var/www/
```

### 4. 部署后端

```bash
cd /var/www/guyuan-shuangyi/server
npm install

# 如果是 MongoDB，设置环境变量
export MONGO_URI="mongodb+srv://你的连接字符串"

# 用 PM2 启动后端
pm2 start app.js --name "shuangyi-server"

# 保存 PM2 配置，开机自动启动
pm2 save
pm2 startup
```

验证：浏览器访问 `http://123.45.67.89:3001/api/health`
看到 `{"success":true}` 就是成功了。

### 5. 构建前端

```bash
cd /var/www/guyuan-shuangyi/client
npm install
npm run build

# 构建后的文件在 server/public/ 目录
# 检查是否存在
ls /var/www/guyuan-shuangyi/server/public/
```

### 6. 配置 Nginx（反向代理）

编辑配置文件：

```bash
nano /etc/nginx/sites-available/guyuan-shuangyi
```

粘贴以下内容：

```nginx
server {
    listen 80;
    server_name 你的域名.com;  # 或直接用 IP：123.45.67.89

    # 前端静态文件
    location / {
        root /var/www/guyuan-shuangyi/server/public;
        try_files $uri $uri/ /index.html;
    }

    # 后端 API 反向代理
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # 图片静态资源
    location /images/ {
        root /var/www/guyuan-shuangyi;
    }
}
```

启用配置：

```bash
ln -s /etc/nginx/sites-available/guyuan-shuangyi /etc/nginx/sites-enabled/
nginx -t  # 测试配置
systemctl restart nginx  # 重启 Nginx
```

### 7. 绑定域名

**7.1 域名解析**

登录域名购买平台（阿里云/腾讯云）→ 域名解析 → 添加记录：

| 记录类型 | 主机记录 | 记录值 |
|----------|----------|--------|
| A | @ | 123.45.67.89 |
| A | www | 123.45.67.89 |

等 10-30 分钟生效后，访问 `http://你的域名.com` 就能看到网站了。

---

## 四、配置 HTTPS（SSL 证书）

### 使用 Certbot（免费自动续期）

```bash
# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 申请证书（自动配置 Nginx）
certbot --nginx -d 你的域名.com -d www.你的域名.com

# 按提示输入邮箱，选择 agree
# 自动配置 HTTPS
```

完成后访问 `https://你的域名.com`，带锁标志就是成功了。

证书自动续期，不用管。

---

## 五、日常维护命令

```bash
# 查看后端运行状态
pm2 status
pm2 logs shuangyi-server

# 重启后端
pm2 restart shuangyi-server

# 更新代码（修改后推送 GitHub，服务器拉取）
cd /var/www/guyuan-shuangyi
git pull origin main
cd client && npm run build  # 重新构建前端
pm2 restart shuangyi-server  # 重启后端

# 查看 Nginx 日志
tail -f /var/log/nginx/access.log
```

---

## 六、部署流程图

```
你的电脑
    │
    ├─ 修改代码 → git push → GitHub
    │
    ├─ 购买域名 → 解析到服务器 IP
    │
    └─ 购买云服务器 → 安装 Node.js + Nginx
                          │
                          └─ git clone → 拉取代码
                                │
                                ├─ cd server → npm install → pm2 start app.js
                                │
                                └─ cd client → npm run build → 输出到 public/
                                      │
                                      └─ Nginx 配置 → 80/443 → 指向 public/
                                            │
                                            └─ 用户访问 https://你的域名.com
```

---

## 七、费用预估（年度）

| 项目 | 费用 | 备注 |
|------|------|------|
| 云服务器（轻量） | ¥99-200/年 | 阿里云/腾讯云首年优惠 |
| 域名（.com） | ¥60-80/年 | 续费可能稍贵 |
| MongoDB Atlas（免费版） | ¥0 | 512MB 足够用 |
| SSL 证书（Certbot） | ¥0 | 免费自动续期 |
| **合计** | **约 ¥160-280/年** | |

---

## 八、如果你不想自己部署

**替代方案：**

1. **Vercel + 云数据库**（前端免费，后端部署简单）
2. **阿里云函数计算 FC**（按量计费，几乎免费）
3. **腾讯云云开发**（前后端一体化，有免费额度）

需要我帮你写这些平台的部署方案吗？

---

<p align="center">Made with 💚 for 双益农业</p>
