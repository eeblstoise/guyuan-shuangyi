/**
 * 双益农业官网后端 API
 * 技术栈: Express + lowdb (JSON 文件数据库)
 * 功能: 提供新闻、联系方式、产品、统计数据等 CRUD API
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// 中间件
// ============================================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（上传的图片等）
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 前端静态文件（生产环境）
app.use(express.static(path.join(__dirname, 'public')));

// ============================================
// 数据库初始化
// ============================================
const dbPath = path.join(__dirname, 'data', 'db.json');

// 确保 data 目录存在
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
}

// 初始化默认数据
const defaultData = {
  contact: {
    company: "沽源县双益农业发展有限公司",
    address: "河北省张家口市沽源县经济开发区北区",
    phone: "13722309335",
    email: "shuangyi@shuangyiny.com",
    workHours: "周一至周六 8:00-17:30"
  },
  stats: [
    { id: 1, target: 50000, suffix: "m²+", label: "生产基地", icon: "fa-industry" },
    { id: 2, target: 20, suffix: "+", label: "合作客户", icon: "fa-handshake" },
    { id: 3, target: 150000, suffix: "吨", label: "年加工马铃薯", icon: "fa-cogs" },
    { id: 4, target: 10, suffix: "+", label: "行业经验", icon: "fa-award" }
  ],
  products: [
    {
      id: 1,
      name: "马铃薯精淀粉",
      icon: "fa-wheat-awn",
      description: "采用荷兰全封闭全旋流工艺精制而成，白度高、粘度高、糊化温度低，广泛应用于食品加工、粉条、速冻食品、调味品等领域。",
      image: "images/products/product-starch.jpg",
      link: "#contact"
    },
    {
      id: 2,
      name: "马铃薯蛋白",
      icon: "fa-flask",
      description: "从马铃薯加工过程中提取的高纯度植物蛋白，营养价值高，可作为食品添加剂广泛应用于肉制品、面制品、乳制品等行业。",
      image: "images/products/product-industrial.jpg",
      link: "#contact"
    },
    {
      id: 3,
      name: "马铃薯膳食纤维",
      icon: "fa-leaf",
      description: "以马铃薯加工副产物为原料提取的天然膳食纤维，富含多种营养成分，可用于功能性食品、保健品及饲料添加剂。",
      image: "images/products/product-custom.jpg",
      link: "#contact"
    }
  ],
  news: {
    company: [
      { id: 1, title: "双益农业新生产线正式投产", date: "2026-05-20", url: "#" },
      { id: 2, title: "公司参加农产品加工行业交流会", date: "2026-04-15", url: "#" },
      { id: 3, title: "双益农业荣获\"诚信企业\"称号", date: "2026-03-28", url: "#" }
    ],
    industry: [
      { id: 1, title: "马铃薯淀粉行业市场分析报告", date: "2026-05-18", url: "#" },
      { id: 2, title: "淀粉加工技术发展趋势", date: "2026-04-10", url: "#" },
      { id: 3, title: "国家政策支持农业产业化发展", date: "2026-03-22", url: "#" }
    ],
    knowledge: [
      { id: 1, title: "马铃薯的营养价值与功效", date: "2026-05-12", url: "#" },
      { id: 2, title: "如何挑选优质马铃薯", date: "2026-04-05", url: "#" },
      { id: 3, title: "马铃薯种植技术要点", date: "2026-03-18", url: "#" }
    ]
  },
  about: {
    sectionTitle: "About Us",
    sectionTitleCN: "关于双益农业",
    images: {
      main: "images/about/about-1.jpg",
      mainAlt: "公司生产基地",
      secondary: "images/about/about-2.jpg",
      secondaryAlt: "现代化生产车间"
    },
    paragraphs: [
      "沽源县双益农业发展有限公司创建于2013年10月，位于河北省张家口市沽源县经济开发区北区，是一家投资5000万元，年加工马铃薯15万吨的现代化农业企业。",
      "公司以当地丰富的马铃薯资源为依托，以淀粉加工为先导，综合开发利用马铃薯资源，变资源优势为经济优势。采用荷兰全封闭全旋流工艺，设备运行稳定，为产品质量提供了可靠的保证。",
      "公司主要产品包括马铃薯精淀粉、马铃薯蛋白、马铃薯膳食纤维等，广泛应用于食品、纺织、造纸、化工、医药等行业。投产以来产品全部达到国家优级品指标，受到国内多家大型食品加工企业认可。"
    ],
    features: [
      { icon: "fa-check-circle", text: "ISO9001质量管理体系认证" },
      { icon: "fa-check-circle", text: "科技型中小企业认定" },
      { icon: "fa-check-circle", text: "荷兰全封闭全旋流工艺" },
      { icon: "fa-check-circle", text: "国家优级品标准" }
    ],
    moreLink: { text: "了解更多", href: "#strength" }
  },
  hero: [
    {
      id: 1,
      image: "images/hero/hero-1.jpg",
      alt: "双益农业基地",
      title: "双益农业",
      subtitle: "中国高寒地区马铃薯淀粉供应商",
      description: "集种植、收储、加工、销售于一体的现代农业产业化企业",
      buttons: [
        { text: "了解我们", href: "#about", style: "primary" },
        { text: "产品中心", href: "#products", style: "outline" }
      ]
    },
    {
      id: 2,
      image: "images/hero/hero-2.jpg",
      alt: "现代化生产线",
      title: "现代化生产线",
      subtitle: "年加工能力150000吨",
      description: "采用荷兰全封闭全旋流工艺，实现全程自动化控制，确保产品品质稳定",
      buttons: [
        { text: "生产实力", href: "#strength", style: "primary" },
        { text: "品质保障", href: "#quality", style: "outline" }
      ]
    },
    {
      id: 3,
      image: "images/hero/hero-3.jpg",
      alt: "绿色种植基地",
      title: "50000㎡生产基地",
      subtitle: "优质原料，源头把控",
      description: "自有高标准种植示范基地，从源头确保每一滴淀粉的纯净品质",
      buttons: [
        { text: "联系我们", href: "#contact", style: "primary" },
        { text: "了解产品", href: "#products", style: "outline" }
      ]
    }
  ],
  steps: [
    { id: 1, icon: "fa-seedling", title: "原料种植", desc: "优质马铃薯种植基地\n源头把控品质" },
    { id: 2, icon: "fa-truck", title: "收储运输", desc: "科学仓储保鲜\n确保原料新鲜" },
    { id: 3, icon: "fa-tint", title: "清洗加工", desc: "先进生产线\n清洗破碎提取淀粉" },
    { id: 4, icon: "fa-flask", title: "精制检测", desc: "精制提纯工艺\n严格质量检测" },
    { id: 5, icon: "fa-box", title: "包装入库", desc: "自动化包装\n规范入库管理" },
    { id: 6, icon: "fa-shipping-fast", title: "物流配送", desc: "快速响应订单\n安全高效送达" }
  ],
  factory: [
    { id: 1, image: "images/factory/factory-1.jpg", alt: "生产设备" },
    { id: 2, image: "images/factory/factory-2.jpg", alt: "加工车间" },
    { id: 3, image: "images/factory/factory-3.jpg", alt: "质量检测" },
    { id: 4, image: "images/factory/factory-4.jpg", alt: "仓储物流" }
  ],
  certificates: [
    { id: 1, image: "images/certificates/cert-food.jpg", title: "食品生产许可证", description: "SC认证，安全合规" },
    { id: 2, image: "images/certificates/cert-iso9001.jpg", title: "质量管理体系认证", description: "ISO 9001:2015" },
    { id: 3, image: "images/certificates/cert-iso14001.jpg", title: "环境管理体系认证", description: "ISO 14001:2015" },
    { id: 4, image: "images/certificates/cert-iso45001.jpg", title: "职业健康安全管理体系认证", description: "ISO 45001:2018" },
    { id: 5, image: "images/certificates/cert-honor.jpg", title: "企业荣誉证书", description: "农业产业化龙头企业" }
  ],
  messages: []
};

// 如果数据库文件不存在，创建它
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify(defaultData, null, 2), 'utf8');
}

const adapter = new JSONFile(dbPath);
const db = new Low(adapter, defaultData);

async function initDb() {
  await db.read();
  // 如果某些字段缺失，补充默认值
  if (!db.data) db.data = defaultData;
  for (const key of Object.keys(defaultData)) {
    if (db.data[key] === undefined) {
      db.data[key] = defaultData[key];
    }
  }
  await db.write();
}

// ============================================
// 简单的内存 session（生产环境建议用 Redis/JWT）
// ============================================
const adminPassword = '$2a$10$YourHashedPasswordHere'; // 默认: admin123
// 实际使用时 bcrypt hash: admin123
const sessions = new Map();

// ============================================
// 辅助函数
// ============================================
function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token || !sessions.has(token)) {
    return res.status(401).json({ success: false, message: '未登录' });
  }
  req.user = sessions.get(token);
  next();
}

// ============================================
// API 路由
// ============================================

// --- 联系方式 ---
app.get('/api/contact', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.contact });
});

app.put('/api/contact', requireAuth, async (req, res) => {
  await db.read();
  db.data.contact = { ...db.data.contact, ...req.body };
  await db.write();
  res.json({ success: true, data: db.data.contact });
});

// --- 统计数据 ---
app.get('/api/stats', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.stats });
});

app.put('/api/stats', requireAuth, async (req, res) => {
  await db.read();
  db.data.stats = req.body;
  await db.write();
  res.json({ success: true, data: db.data.stats });
});

// --- 产品 ---
app.get('/api/products', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.products });
});

app.post('/api/products', requireAuth, async (req, res) => {
  await db.read();
  const newProduct = { id: Date.now(), ...req.body };
  db.data.products.push(newProduct);
  await db.write();
  res.json({ success: true, data: newProduct });
});

app.put('/api/products/:id', requireAuth, async (req, res) => {
  await db.read();
  const idx = db.data.products.findIndex(p => p.id == req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, message: '产品不存在' });
  db.data.products[idx] = { ...db.data.products[idx], ...req.body };
  await db.write();
  res.json({ success: true, data: db.data.products[idx] });
});

app.delete('/api/products/:id', requireAuth, async (req, res) => {
  await db.read();
  db.data.products = db.data.products.filter(p => p.id != req.params.id);
  await db.write();
  res.json({ success: true });
});

// --- 新闻 ---
app.get('/api/news', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.news });
});

app.post('/api/news/:category', requireAuth, async (req, res) => {
  await db.read();
  const category = req.params.category; // company, industry, knowledge
  if (!db.data.news[category]) db.data.news[category] = [];
  const newItem = { id: Date.now(), ...req.body };
  db.data.news[category].unshift(newItem); // 新新闻放前面
  await db.write();
  res.json({ success: true, data: newItem });
});

app.put('/api/news/:category/:id', requireAuth, async (req, res) => {
  await db.read();
  const category = req.params.category;
  const idx = db.data.news[category]?.findIndex(n => n.id == req.params.id);
  if (idx === -1 || idx === undefined) return res.status(404).json({ success: false, message: '新闻不存在' });
  db.data.news[category][idx] = { ...db.data.news[category][idx], ...req.body };
  await db.write();
  res.json({ success: true, data: db.data.news[category][idx] });
});

app.delete('/api/news/:category/:id', requireAuth, async (req, res) => {
  await db.read();
  const category = req.params.category;
  db.data.news[category] = db.data.news[category]?.filter(n => n.id != req.params.id) || [];
  await db.write();
  res.json({ success: true });
});

// --- 关于我们 ---
app.get('/api/about', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.about });
});

app.put('/api/about', requireAuth, async (req, res) => {
  await db.read();
  db.data.about = { ...db.data.about, ...req.body };
  await db.write();
  res.json({ success: true, data: db.data.about });
});

// --- Hero 轮播 ---
app.get('/api/hero', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.hero });
});

app.put('/api/hero', requireAuth, async (req, res) => {
  await db.read();
  db.data.hero = req.body;
  await db.write();
  res.json({ success: true, data: db.data.hero });
});

// --- 生产流程 ---
app.get('/api/steps', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.steps });
});

app.put('/api/steps', requireAuth, async (req, res) => {
  await db.read();
  db.data.steps = req.body;
  await db.write();
  res.json({ success: true, data: db.data.steps });
});

// --- 工厂照片 ---
app.get('/api/factory', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.factory });
});

app.put('/api/factory', requireAuth, async (req, res) => {
  await db.read();
  db.data.factory = req.body;
  await db.write();
  res.json({ success: true, data: db.data.factory });
});

// --- 证书 ---
app.get('/api/certificates', async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.certificates });
});

app.put('/api/certificates', requireAuth, async (req, res) => {
  await db.read();
  db.data.certificates = req.body;
  await db.write();
  res.json({ success: true, data: db.data.certificates });
});

// --- 留言 ---
app.get('/api/messages', requireAuth, async (req, res) => {
  await db.read();
  res.json({ success: true, data: db.data.messages || [] });
});

app.post('/api/messages', async (req, res) => {
  await db.read();
  const newMsg = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  if (!db.data.messages) db.data.messages = [];
  db.data.messages.push(newMsg);
  await db.write();
  res.json({ success: true, data: newMsg });
});

app.delete('/api/messages/:id', requireAuth, async (req, res) => {
  await db.read();
  db.data.messages = db.data.messages.filter(m => m.id != req.params.id);
  await db.write();
  res.json({ success: true });
});

// --- 登录 ---
app.post('/api/login', async (req, res) => {
  const { password } = req.body;
  // 简单密码验证：admin123
  const bcrypt = require('bcryptjs');
  const isMatch = await bcrypt.compare(password, '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'); // admin123
  if (isMatch) {
    const token = require('crypto').randomBytes(32).toString('hex');
    sessions.set(token, { loginAt: Date.now() });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: '密码错误' });
  }
});

app.post('/api/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  sessions.delete(token);
  res.json({ success: true });
});

// --- 健康检查 ---
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

// 前端路由回退（SPA 支持）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================
// 启动
// ============================================
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ 双益农业后端 API 已启动: http://localhost:${PORT}`);
    console.log(`📊 API 文档:`);
    console.log(`   GET    /api/contact     - 获取联系方式`);
    console.log(`   PUT    /api/contact     - 更新联系方式 (需登录)`);
    console.log(`   GET    /api/news        - 获取新闻`);
    console.log(`   POST   /api/news/:cat   - 添加新闻 (需登录)`);
    console.log(`   DELETE /api/news/:cat/:id - 删除新闻 (需登录)`);
    console.log(`   GET    /api/products    - 获取产品`);
    console.log(`   POST   /api/products    - 添加产品 (需登录)`);
    console.log(`   POST   /api/login       - 登录 (密码: admin123)`);
    console.log(`   POST   /api/messages    - 提交留言 (公开)`);
  });
});
