<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
    <!-- 登录页 -->
    <div v-if="!isLoggedIn" class="flex items-center justify-center min-h-screen">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 w-full max-w-md">
        <div class="text-center mb-6">
          <div class="w-12 h-12 bg-primary-700 rounded-lg flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-leaf text-white text-xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white">后台管理</h2>
          <p class="text-sm text-gray-500 dark:text-gray-400">双益农业官网内容管理</p>
        </div>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">管理密码</label>
            <input v-model="password" type="password" required class="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all" placeholder="请输入密码">
            <p class="text-xs text-gray-400 mt-1">默认密码: admin123</p>
          </div>
          <button type="submit" :disabled="loggingIn" class="w-full py-2.5 bg-primary-700 hover:bg-primary-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
            {{ loggingIn ? '登录中...' : '登录' }}
          </button>
        </form>
        <p v-if="loginError" class="text-red-500 text-sm mt-3 text-center">{{ loginError }}</p>
      </div>
    </div>

    <!-- 管理后台 -->
    <div v-else class="flex min-h-screen">
      <!-- 侧边栏 -->
      <aside class="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0">
        <div class="p-4 border-b border-gray-100 dark:border-gray-700">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary-700 rounded-lg flex items-center justify-center">
              <i class="fas fa-leaf text-white text-sm"></i>
            </div>
            <span class="font-bold text-gray-900 dark:text-white">双益管理后台</span>
          </div>
        </div>
        <nav class="p-2 space-y-1">
          <button v-for="tab in tabs" :key="tab.key" @click="currentTab = tab.key" class="w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" :class="currentTab === tab.key ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'">
            <i :class="'fas ' + tab.icon + ' w-5'"></i> {{ tab.label }}
          </button>
          <div class="pt-2 mt-2 border-t border-gray-100 dark:border-gray-700">
            <button @click="goHome" class="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <i class="fas fa-home w-5"></i> 返回首页
            </button>
            <button @click="logout" class="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <i class="fas fa-sign-out-alt w-5"></i> 退出登录
            </button>
          </div>
        </nav>
      </aside>

      <!-- 主内容 -->
      <main class="flex-1 p-6 overflow-auto">
        <!-- 联系方式 -->
        <div v-if="currentTab === 'contact'">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">联系方式管理</h2>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div class="grid md:grid-cols-2 gap-4">
              <div v-for="field in contactFields" :key="field.key">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{{ field.label }}</label>
                <input v-model="contact[field.key]" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:border-primary-500 outline-none transition-all">
              </div>
            </div>
            <button @click="saveContact" :disabled="saving" class="mt-4 px-6 py-2 bg-primary-700 hover:bg-primary-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
              {{ saving ? '保存中...' : '保存' }}
            </button>
            <p v-if="saveSuccess" class="text-green-600 text-sm mt-2">✅ 保存成功</p>
          </div>
        </div>

        <!-- 图片管理 -->
        <div v-if="currentTab === 'images'">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">图片管理</h2>
          <div class="space-y-6">
            <div v-for="cat in imageCategories" :key="cat.key" class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <h3 class="font-bold text-lg mb-4">{{ cat.label }}</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="img in images[cat.key]" :key="img.key" class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div class="aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-gray-200 dark:bg-gray-600">
                    <img :src="img.path" :alt="img.label" class="w-full h-full object-cover">
                  </div>
                  <p class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 truncate">{{ img.label }}</p>
                  <p class="text-xs text-gray-400 truncate mb-2">{{ img.path }}</p>
                  <label class="block">
                    <input type="file" accept="image/*" class="hidden" @change="uploadImage(cat.key === 'qrCodes' ? 'qr-codes' : cat.key, img.key, $event)">
                    <span class="block text-center py-1.5 bg-primary-700 hover:bg-primary-800 text-white text-sm rounded-lg cursor-pointer transition-colors">
                      <i v-if="uploading[`${cat.key}-${img.key}`]" class="fas fa-spinner fa-spin mr-1"></i>
                      <i v-else class="fas fa-upload mr-1"></i>
                      {{ uploading[`${cat.key === 'qrCodes' ? 'qr-codes' : cat.key}-${img.key}`] ? '上传中...' : '替换图片' }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 新闻管理 -->
        <div v-if="currentTab === 'news'">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">新闻管理</h2>
          <div class="space-y-6">
            <div v-for="cat in newsCategories" :key="cat.key" class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg">{{ cat.label }}</h3>
                <button @click="addNews(cat.key)" class="px-4 py-1.5 bg-primary-700 hover:bg-primary-800 text-white text-sm rounded-lg transition-colors">+ 添加新闻</button>
              </div>
              <div class="space-y-2">
                <div v-for="item in news[cat.key]" :key="item.id" class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div class="flex-1">
                    <input v-model="item.title" type="text" class="w-full px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm mb-1" placeholder="标题">
                    <input v-model="item.date" type="text" class="w-32 px-3 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm" placeholder="日期">
                  </div>
                  <button @click="saveNews(cat.key, item)" class="text-primary-600 hover:text-primary-800 text-sm"><i class="fas fa-save"></i></button>
                  <button @click="deleteNews(cat.key, item.id)" class="text-red-500 hover:text-red-700 text-sm"><i class="fas fa-trash"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 产品管理 -->
        <div v-if="currentTab === 'products'">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">产品管理</h2>
          <div class="space-y-4">
            <div v-for="p in products" :key="p.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div class="grid md:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">产品名称</label><input v-model="p.name" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"></div>
                <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">图标</label><input v-model="p.icon" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"></div>
                <div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">描述</label><textarea v-model="p.description" rows="2" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"></textarea></div>
                <div class="md:col-span-2"><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">图片路径</label><input v-model="p.image" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"></div>
              </div>
              <div class="flex gap-2 mt-4">
                <button @click="saveProduct(p)" class="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white text-sm rounded-lg">保存</button>
                <button @click="deleteProduct(p.id)" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg">删除</button>
              </div>
            </div>
            <button @click="addProduct" class="w-full py-3 border-2 border-dashed border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-400 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">+ 添加新产品</button>
          </div>
        </div>

        <!-- 关于我们 -->
        <div v-if="currentTab === 'about'">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">关于我们</h2>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-4">
            <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">标题</label><input v-model="about.sectionTitleCN" type="text" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"></div>
            <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">段落1</label><textarea v-model="about.paragraphs[0]" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"></textarea></div>
            <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">段落2</label><textarea v-model="about.paragraphs[1]" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"></textarea></div>
            <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">段落3</label><textarea v-model="about.paragraphs[2]" rows="3" class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm"></textarea></div>
            <button @click="saveAbout" :disabled="saving" class="px-6 py-2 bg-primary-700 hover:bg-primary-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50">
              {{ saving ? '保存中...' : '保存' }}
            </button>
          </div>
        </div>

        <!-- 留言管理 -->
        <div v-if="currentTab === 'messages'">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">留言管理</h2>
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-gray-50 dark:bg-gray-700"><tr><th class="px-4 py-3 text-left">姓名</th><th class="px-4 py-3 text-left">电话</th><th class="px-4 py-3 text-left">留言</th><th class="px-4 py-3 text-left">时间</th><th class="px-4 py-3 text-left">操作</th></tr></thead>
              <tbody>
                <tr v-for="msg in messages" :key="msg.id" class="border-t border-gray-100 dark:border-gray-700">
                  <td class="px-4 py-3">{{ msg.name }}</td>
                  <td class="px-4 py-3">{{ msg.phone }}</td>
                  <td class="px-4 py-3 max-w-xs truncate">{{ msg.message }}</td>
                  <td class="px-4 py-3 text-gray-500">{{ new Date(msg.createdAt).toLocaleString() }}</td>
                  <td class="px-4 py-3"><button @click="deleteMessage(msg.id)" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button></td>
                </tr>
                <tr v-if="messages.length === 0"><td colspan="5" class="px-4 py-8 text-center text-gray-500">暂无留言</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../api.js';

const router = useRouter();

// ============================================
// 登录
// ============================================
const isLoggedIn = ref(false);
const password = ref('');
const loggingIn = ref(false);
const loginError = ref('');

async function login() {
  loggingIn.value = true;
  loginError.value = '';
  try {
    const res = await api.login(password.value);
    localStorage.setItem('admin_token', res.data.token);
    isLoggedIn.value = true;
    loadAll();
  } catch (e) {
    loginError.value = e.response?.data?.message || '登录失败';
  }
  loggingIn.value = false;
}

function logout() {
  localStorage.removeItem('admin_token');
  isLoggedIn.value = false;
}

function goHome() { router.push('/'); }

// ============================================
// 数据
// ============================================
const currentTab = ref('contact');
const tabs = [
  { key: 'contact', label: '联系方式', icon: 'fa-address-card' },
  { key: 'images', label: '图片管理', icon: 'fa-image' },
  { key: 'news', label: '新闻管理', icon: 'fa-newspaper' },
  { key: 'products', label: '产品管理', icon: 'fa-box' },
  { key: 'about', label: '关于我们', icon: 'fa-building' },
  { key: 'messages', label: '留言管理', icon: 'fa-envelope' }
];

const contact = ref({});
const contactFields = [
  { key: 'company', label: '公司名称' },
  { key: 'address', label: '公司地址' },
  { key: 'phone', label: '联系电话' },
  { key: 'email', label: '电子邮箱' },
  { key: 'workHours', label: '工作时间' }
];

const news = ref({ company: [], industry: [], knowledge: [] });
const newsCategories = [
  { key: 'company', label: '企业动态' },
  { key: 'industry', label: '行业资讯' },
  { key: 'knowledge', label: '马铃薯知识' }
];

const products = ref([]);
const about = ref({ paragraphs: [] });
const messages = ref([]);
const saving = ref(false);
const saveSuccess = ref(false);

// 图片管理
const images = ref({});
const imageCategories = [
  { key: 'hero', label: '首页轮播图' },
  { key: 'about', label: '关于我们' },
  { key: 'products', label: '产品图片' },
  { key: 'factory', label: '工厂照片' },
  { key: 'certificates', label: '资质证书' },
  { key: 'qrCodes', label: '二维码' }
];
const uploading = ref({});

// ============================================
// 加载数据
// ============================================
async function loadAll() {
  const [cRes, nRes, pRes, aRes, mRes, iRes] = await Promise.all([
    api.getContact(), api.getNews(), api.getProducts(), api.getAbout(), api.getMessages(), api.getImages()
  ]);
  contact.value = cRes.data.data || {};
  news.value = nRes.data.data || { company: [], industry: [], knowledge: [] };
  products.value = pRes.data.data || [];
  about.value = aRes.data.data || { paragraphs: [] };
  messages.value = mRes.data.data || [];
  images.value = iRes.data.data || {};
}

// ============================================
// 保存操作
// ============================================
async function saveContact() {
  saving.value = true;
  try { await api.updateContact(contact.value); saveSuccess.value = true; setTimeout(() => saveSuccess.value = false, 3000); }
  catch (e) { alert('保存失败'); }
  saving.value = false;
}

async function addNews(category) {
  const title = prompt('请输入新闻标题');
  if (!title) return;
  const date = new Date().toISOString().split('T')[0];
  await api.addNews(category, { title, date, url: '#' });
  loadAll();
}

async function saveNews(category, item) {
  await api.updateNews(category, item.id, item);
  alert('已保存');
}

async function deleteNews(category, id) {
  if (!confirm('确定删除？')) return;
  await api.deleteNews(category, id);
  loadAll();
}

async function addProduct() {
  const name = prompt('请输入产品名称');
  if (!name) return;
  await api.addProduct({ name, icon: 'fa-cube', description: '请填写描述', image: 'images/products/product-starch.jpg', link: '#contact' });
  loadAll();
}

async function saveProduct(p) {
  await api.updateProduct(p.id, p);
  alert('已保存');
}

async function deleteProduct(id) {
  if (!confirm('确定删除？')) return;
  await api.deleteProduct(id);
  loadAll();
}

async function saveAbout() {
  saving.value = true;
  try { await api.updateAbout(about.value); saveSuccess.value = true; setTimeout(() => saveSuccess.value = false, 3000); }
  catch (e) { alert('保存失败'); }
  saving.value = false;
}

async function uploadImage(type, key, event) {
  const file = event.target.files[0];
  if (!file) return;
  uploading.value[`${type}-${key}`] = true;
  try {
    const formData = new FormData();
    formData.append('file', file);
    await api.uploadImage(type, key, formData);
    alert('图片上传成功');
    loadAll();
  } catch (e) {
    alert('上传失败：' + (e.response?.data?.message || e.message));
  }
  uploading.value[`${type}-${key}`] = false;
  event.target.value = '';
}

async function deleteMessage(id) {
  if (!confirm('确定删除？')) return;
  await api.deleteMessage(id);
  loadAll();
}

// ============================================
// 初始化
// ============================================
onMounted(() => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    isLoggedIn.value = true;
    loadAll();
  }
});
</script>
