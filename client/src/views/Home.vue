<template>
  <div>
    <!-- Hero 轮播 -->
    <section id="home" class="relative h-[600px] md:h-[700px] lg:h-[800px] overflow-hidden pt-16 md:pt-20">
      <div id="carousel" class="relative w-full h-full">
        <div v-if="heroSlides.length" class="relative w-full h-full">
          <div v-for="(slide, i) in heroSlides" :key="slide.id" class="carousel-slide absolute inset-0 w-full h-full" :class="{ active: i === currentSlide, prev: i < currentSlide, next: i > currentSlide }">
            <img :src="slide.image" :alt="slide.alt" class="w-full h-full object-cover">
            <div class="hero-overlay absolute inset-0 light"></div>
            <div class="absolute inset-0 flex items-center">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div class="max-w-2xl" :class="{ 'animate-fade-in-up': i === currentSlide }">
                  <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">{{ slide.title }}</h2>
                  <p class="text-xl md:text-2xl lg:text-3xl text-white mb-4 font-light drop-shadow-md">{{ slide.subtitle }}</p>
                  <p class="text-base md:text-lg text-white/90 mb-8 drop-shadow">{{ slide.description }}</p>
                  <div class="flex flex-wrap gap-4">
                    <a v-for="btn in slide.buttons" :key="btn.text" href="#" @click.prevent="scrollToAnchor(btn.href)" class="px-6 py-3 font-medium rounded-lg transition-all hover:scale-105" :class="btn.style === 'primary' ? 'bg-primary-700 hover:bg-primary-800 text-white shadow-lg' : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/40'">{{ btn.text }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:scale-110 z-10" aria-label="上一张"><i class="fas fa-chevron-left"></i></button>
        <button @click="nextSlide" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white flex items-center justify-center transition-all hover:scale-110 z-10" aria-label="下一张"><i class="fas fa-chevron-right"></i></button>
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <button v-for="(s, i) in heroSlides" :key="i" @click="goToSlide(i)" class="w-3 h-3 rounded-full transition-all" :class="i === currentSlide ? 'bg-white scale-125' : 'bg-white/50'"></button>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section id="stats-container" class="py-12 md:py-16 bg-white dark:bg-gray-900 relative z-10 -mt-2">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div v-for="item in stats" :key="item.id" class="text-center group stat-item" :data-target="item.target" :data-suffix="item.suffix">
            <div class="w-14 h-14 md:w-16 md:h-16 mx-auto mb-3 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
              <i :class="'fas ' + item.icon + ' text-primary-700 dark:text-primary-400 text-xl md:text-2xl'"></i>
            </div>
            <div class="text-2xl md:text-3xl font-bold text-primary-700 dark:text-primary-400 mb-1">
              <span class="stat-number">{{ item.animated }}</span><span class="stat-suffix">{{ item.suffix }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section id="about" class="py-16 md:py-24 bg-primary-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <div class="img-zoom rounded-2xl overflow-hidden shadow-xl">
              <img :src="about.images?.main || '/images/about/about-1.jpg'" :alt="about.images?.mainAlt" class="w-full h-64 md:h-80 object-cover">
            </div>
            <div class="absolute -bottom-6 -right-6 md:right-8 w-48 h-32 rounded-xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 hidden sm:block">
              <img :src="about.images?.secondary || '/images/about/about-2.jpg'" :alt="about.images?.secondaryAlt" class="w-full h-full object-cover">
            </div>
          </div>
          <div>
            <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">{{ about.sectionTitle || 'About Us' }}</span>
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">{{ about.sectionTitleCN || '关于双益农业' }}</h2>
            <p v-for="(p, i) in about.paragraphs" :key="i" class="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{{ p }}</p>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div v-for="f in about.features" :key="f.text" class="flex items-center gap-2"><i :class="'fas ' + f.icon + ' text-primary-600 dark:text-primary-400'"></i><span class="text-sm text-gray-700 dark:text-gray-300">{{ f.text }}</span></div>
            </div>
            <a v-if="about.moreLink" href="#" @click.prevent="scrollToAnchor(about.moreLink.href)" class="inline-flex items-center gap-2 text-primary-700 dark:text-primary-400 font-medium hover:gap-3 transition-all">{{ about.moreLink.text }} <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品中心 -->
    <section id="products" class="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
          <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Product Center</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">产品中心</h2>
          <div class="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div v-for="p in products" :key="p.id" class="product-card bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
            <div class="img-zoom h-52 md:h-56"><img :src="p.image" :alt="p.name" class="w-full h-full object-cover"></div>
            <div class="p-6">
              <div class="w-12 h-12 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-4"><i :class="'fas ' + p.icon + ' text-primary-700 dark:text-primary-400 text-xl'"></i></div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ p.name }}</h3>
              <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{{ p.description }}</p>
              <a href="#" @click.prevent="scrollToAnchor(p.link)" class="inline-flex items-center gap-1 text-primary-700 dark:text-primary-400 text-sm font-medium hover:gap-2 transition-all">了解更多 <i class="fas fa-arrow-right text-xs"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 生产实力 -->
    <section id="strength" class="py-16 md:py-24 bg-primary-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
          <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Production Strength</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">生产实力</h2>
          <div class="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 mb-12 md:mb-16">
          <div v-for="step in steps" :key="step.id" class="step-item text-center group">
            <div class="relative inline-block mb-3">
              <span class="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary-700 text-white text-xs flex items-center justify-center font-bold">{{ String(step.id).padStart(2, '0') }}</span>
              <div class="step-icon w-16 h-16 md:w-20 md:h-20 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center mx-auto border-2 border-primary-100 dark:border-primary-900/50">
                <i :class="'fas ' + step.icon + ' text-primary-700 dark:text-primary-400 text-xl md:text-2xl'"></i>
              </div>
            </div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-1">{{ step.title }}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400" v-html="step.desc.replace(/\\n/g, '<br>')"></p>
          </div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="f in factory" :key="f.id" class="img-zoom rounded-xl overflow-hidden shadow-md aspect-[4/3]">
            <img :src="f.image" :alt="f.alt" class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <!-- 品质保障 -->
    <section id="quality" class="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
          <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Quality Assurance</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">品质保障</h2>
          <div class="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div class="cert-carousel flex gap-6 overflow-x-auto no-scrollbar pb-4 px-2 md:px-0">
          <div v-for="cert in certificates" :key="cert.id" class="flex-shrink-0 w-60 md:w-72 text-center group">
            <div class="img-zoom rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 mb-4 aspect-[3/4] bg-gray-50 dark:bg-gray-800">
              <img :src="cert.image" :alt="cert.title" class="w-full h-full object-cover">
            </div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-1">{{ cert.title }}</h4>
            <p class="text-xs text-gray-500 dark:text-gray-400">{{ cert.description }}</p>
          </div>
        </div>
        <p class="text-center text-xs text-gray-400 mt-2 md:hidden"><i class="fas fa-arrows-left-right mr-1"></i>左右滑动查看更多</p>
      </div>
    </section>

    <!-- 新闻中心 -->
    <section id="news" class="py-16 md:py-24 bg-primary-50 dark:bg-gray-800/50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
          <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">News Center</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">新闻中心</h2>
          <div class="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
          <div v-for="section in newsSections" :key="section.key" class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
              <h3 class="font-bold text-gray-900 dark:text-white flex items-center gap-2"><i :class="'fas ' + section.icon + ' text-primary-600 dark:text-primary-400'"></i> {{ section.title }}</h3>
            </div>
            <ul class="space-y-3">
              <li v-for="item in news[section.key]" :key="item.id" class="group">
                <a :href="item.url" class="flex items-start justify-between gap-2 hover:bg-primary-50 dark:hover:bg-gray-700/50 p-2 rounded-lg transition-colors">
                  <span class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">{{ item.title }}</span>
                  <span class="text-xs text-gray-400 flex-shrink-0 mt-0.5">{{ item.date }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section id="contact" class="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 md:mb-16">
          <span class="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">联系我们</h2>
          <div class="w-16 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div class="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div class="space-y-6">
            <div v-for="item in contactItems" :key="item.label" class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0"><i :class="'fas ' + item.icon + ' text-primary-700 dark:text-primary-400'"></i></div>
              <div><h4 class="font-medium text-gray-900 dark:text-white mb-1">{{ item.label }}</h4><p class="text-sm text-gray-600 dark:text-gray-400">{{ item.value }}</p></div>
            </div>
            <div class="pt-4 border-t border-gray-100 dark:border-gray-700">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center"><div class="w-24 h-24 mx-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-2 mb-2"><img :src="'/images/qr-codes/qrcode-wechat.jpg'" alt="关注公众号" class="w-full h-full object-cover rounded"></div><p class="text-xs text-gray-500 dark:text-gray-400">关注公众号</p></div>
                <div class="text-center"><div class="w-24 h-24 mx-auto rounded-lg bg-gray-100 dark:bg-gray-800 p-2 mb-2"><img :src="'/images/qr-codes/qrcode-video.jpg'" alt="关注视频号" class="w-full h-full object-cover rounded"></div><p class="text-xs text-gray-500 dark:text-gray-400">关注视频号</p></div>
              </div>
            </div>
          </div>
          <div class="lg:col-span-1">
            <div id="amap-container" class="rounded-xl h-64 lg:h-full min-h-[300px] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
              <!-- 高德地图加载中占位 -->
              <div v-if="!mapLoaded" class="absolute inset-0 flex items-center justify-center z-10">
                <div class="text-center">
                  <div class="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-3"><i class="fas fa-map-marker-alt text-white text-xl"></i></div>
                  <h4 class="font-bold text-primary-800 dark:text-primary-300 mb-1">{{ contactData.company || '沽源县双益农业发展有限公司' }}</h4>
                  <p class="text-sm text-primary-700 dark:text-primary-400">{{ contactData.address || '河北省张家口市沽源县' }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-primary-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 border border-primary-100 dark:border-gray-700">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">在线留言</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">填写下方信息，我们会尽快与您联系</p>
            <form @submit.prevent="submitMessage" class="space-y-4">
              <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">您的姓名 <span class="text-red-500">*</span></label><input v-model="form.name" type="text" required class="form-input w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all" placeholder="请输入您的姓名"></div>
              <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">联系电话 <span class="text-red-500">*</span></label><input v-model="form.phone" type="tel" required class="form-input w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all" placeholder="请输入您的电话"></div>
              <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">电子邮箱</label><input v-model="form.email" type="email" class="form-input w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all" placeholder="请输入您的邮箱（选填）"></div>
              <div><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">留言内容 <span class="text-red-500">*</span></label><textarea v-model="form.message" rows="4" required class="form-input w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm transition-all resize-none" placeholder="请输入您想咨询的内容"></textarea></div>
              <button type="submit" :disabled="formSubmitting" class="w-full py-3 bg-primary-700 hover:bg-primary-800 text-white font-medium rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2">
                <i v-if="formSubmitting" class="fas fa-spinner fa-spin"></i><i v-else class="fas fa-paper-plane"></i> {{ formSubmitting ? '提交中...' : '提交留言' }}
              </button>
            </form>
            <div v-if="formSuccess" class="mt-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
              <div class="flex items-center gap-2"><i class="fas fa-check-circle text-green-600 dark:text-green-400"></i><p class="text-sm text-green-700 dark:text-green-300">提交成功！我们会尽快与您联系。</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="bg-gray-900 text-gray-300 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div class="text-center md:text-left">
            <p>&copy; 2024 {{ contactData.company || '沽源县双益农业发展有限公司' }} 版权所有</p>
            <p class="text-gray-500 mt-1">冀ICP备XXXXXXXX号-1</p>
          </div>
          <div class="text-center md:text-right"><p>技术支持：XXXXXX</p></div>
        </div>
      </div>
    </footer>

    <!-- 返回顶部 -->
    <button @click="scrollToTop" class="back-to-top fixed bottom-6 right-6 w-12 h-12 bg-primary-700 hover:bg-primary-800 text-white rounded-full shadow-lg flex items-center justify-center z-50 transition-all hover:scale-110" :class="showBackToTop ? 'visible-btn' : 'hidden-btn'" aria-label="返回顶部"><i class="fas fa-arrow-up"></i></button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { api } from '../api.js';

// ============================================
// 数据加载
// ============================================
const heroSlides = ref([]);
const stats = ref([]);
const about = ref({});
const products = ref([]);
const steps = ref([]);
const factory = ref([]);
const certificates = ref([]);
const news = ref({ company: [], industry: [], knowledge: [] });
const contactData = ref({});
const mapLoaded = ref(false);

const newsSections = [
  { key: 'company', icon: 'fa-building', title: '企业动态' },
  { key: 'industry', icon: 'fa-newspaper', title: '行业资讯' },
  { key: 'knowledge', icon: 'fa-book-open', title: '马铃薯知识' }
];

const contactItems = computed(() => [
  { icon: 'fa-map-marker-alt', label: '公司地址', value: contactData.value.address || '河北省张家口市沽源县经济开发区北区' },
  { icon: 'fa-phone', label: '联系电话', value: contactData.value.phone || '0313-XXXXXXX' },
  { icon: 'fa-envelope', label: '电子邮箱', value: contactData.value.email || 'shuangyi@shuangyiny.com' },
  { icon: 'fa-clock', label: '工作时间', value: contactData.value.workHours || '周一至周六 8:00-17:30' }
]);

async function loadAll() {
  try {
    const [heroRes, statsRes, aboutRes, productsRes, stepsRes, factoryRes, certRes, newsRes, contactRes, imagesRes] = await Promise.all([
      api.getHero(), api.getStats(), api.getAbout(), api.getProducts(),
      api.getSteps(), api.getFactory(), api.getCertificates(), api.getNews(), api.getContact(), api.getImages()
    ]);
    const images = imagesRes.data.data || {};
    
    // Hero 轮播：用后端 images 覆盖图片路径
    heroSlides.value = (heroRes.data.data || []).map((slide, i) => {
      const img = images.hero?.find(img => img.id === i + 1);
      return img ? { ...slide, image: img.path, alt: img.alt || slide.alt } : slide;
    });
    
    stats.value = (statsRes.data.data || []).map(s => ({ ...s, animated: 0 }));
    about.value = aboutRes.data.data || {};
    // 关于我们：用后端 images 覆盖图片路径
    if (about.value.images && images.about) {
      const mainImg = images.about.find(img => img.key === 'about-1');
      const secImg = images.about.find(img => img.key === 'about-2');
      if (mainImg) about.value.images.main = mainImg.path;
      if (secImg) about.value.images.secondary = secImg.path;
    }
    
    products.value = (productsRes.data.data || []).map((p, i) => {
      const img = images.products?.find(img => img.id === i + 1);
      return img ? { ...p, image: img.path } : p;
    });
    
    steps.value = stepsRes.data.data || [];
    factory.value = (factoryRes.data.data || []).map((f, i) => {
      const img = images.factory?.find(img => img.id === i + 1);
      return img ? { ...f, image: img.path } : f;
    });
    certificates.value = (certRes.data.data || []).map((c, i) => {
      const img = images.certificates?.find(img => img.id === i + 1);
      return img ? { ...c, image: img.path } : c;
    });
    news.value = newsRes.data.data || { company: [], industry: [], knowledge: [] };
    contactData.value = contactRes.data.data || {};
  } catch (e) {
    console.warn('API 加载失败，使用空数据', e);
  }
}

// ============================================
// 轮播图
// ============================================
const currentSlide = ref(0);
let slideInterval;

function nextSlide() { if (heroSlides.value.length) currentSlide.value = (currentSlide.value + 1) % heroSlides.value.length; }
function prevSlide() { if (heroSlides.value.length) currentSlide.value = (currentSlide.value - 1 + heroSlides.value.length) % heroSlides.value.length; }
function goToSlide(i) { currentSlide.value = i; }

function startCarousel() { if (heroSlides.value.length) slideInterval = setInterval(nextSlide, 5000); }
function stopCarousel() { clearInterval(slideInterval); }

// 锚点平滑滚动
function scrollToAnchor(href) {
  const anchor = href.replace('#', '');
  const el = document.getElementById(anchor);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 高德地图初始化
function initMap() {
  if (typeof AMap === 'undefined') {
    console.warn('高德地图未加载，请替换 index.html 中的 YOUR_AMAP_KEY 为实际 Key');
    return;
  }
  const lat = parseFloat(contactData.value.lat) || 41.66959;
  const lng = parseFloat(contactData.value.lng) || 115.68859;
  const map = new AMap.Map('amap-container', {
    zoom: 16,
    center: [lng, lat],
    resizeEnable: true
  });
  new AMap.Marker({
    position: [lng, lat],
    title: contactData.value.company || '沽源县双益农业发展有限公司'
  }).add(map);
  mapLoaded.value = true;
}

// ============================================
// 统计数字动画
// ============================================
function animateStats() {
  const items = document.querySelectorAll('.stat-item');
  items.forEach((item, idx) => {
    const target = parseInt(item.dataset.target) || 0;
    const start = performance.now();
    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / 2000, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      if (stats.value[idx]) stats.value[idx].animated = Math.floor(ease * target);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) { animateStats(); statsObserver.disconnect(); } });
}, { threshold: 0.1 });

// ============================================
// 返回顶部
// ============================================
const showBackToTop = ref(false);
function onScroll() {
  showBackToTop.value = window.scrollY > 300;
}
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ============================================
// 留言表单
// ============================================
const form = ref({ name: '', phone: '', email: '', message: '' });
const formSubmitting = ref(false);
const formSuccess = ref(false);

const formSuccessTimer = ref(null);

async function submitMessage() {
  const phoneRegex = /^1[3-9]\d{9}$|^0\d{2,3}-?\d{7,8}$/;
  if (!phoneRegex.test(form.value.phone)) { alert('请输入有效的电话号码'); return; }
  formSubmitting.value = true;
  try {
    await api.submitMessage(form.value);
    form.value = { name: '', phone: '', email: '', message: '' };
    formSuccess.value = true;
    if (formSuccessTimer.value) clearTimeout(formSuccessTimer.value);
    formSuccessTimer.value = setTimeout(() => formSuccess.value = false, 5000);
  } catch (e) { alert('提交失败'); }
  formSubmitting.value = false;
}

// ============================================
// 生命周期
// ============================================
onMounted(async () => {
  await loadAll();
  await nextTick();
  startCarousel();
  window.addEventListener('scroll', onScroll, { passive: true });
  const statsContainer = document.getElementById('stats-container');
  if (statsContainer) statsObserver.observe(statsContainer);
  initMap();
});

onUnmounted(() => {
  stopCarousel();
  statsObserver.disconnect();
  window.removeEventListener('scroll', onScroll);
  if (formSuccessTimer.value) clearTimeout(formSuccessTimer.value);
});
</script>
