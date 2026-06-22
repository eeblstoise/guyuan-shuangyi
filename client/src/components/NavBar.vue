<template>
  <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 md:h-20">
        <a href="#" @click.prevent="scrollToAnchor('#home')" class="flex items-center gap-2 flex-shrink-0 group">
          <div class="w-10 h-10 md:w-12 md:h-12 bg-primary-700 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
            <i class="fas fa-leaf text-white text-lg md:text-xl"></i>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-sm md:text-base font-bold text-gray-900 dark:text-white leading-tight">{{ contact.company || '沽源县双益农业发展有限公司' }}</h1>
            <p class="text-xs text-gray-500 dark:text-gray-400">GUYUAN SHUANGYI AGRICULTURAL</p>
          </div>
        </a>

        <div class="hidden lg:flex items-center gap-1">
          <a v-for="item in navItems" :key="item.href" href="#" @click.prevent="scrollToAnchor(item.href)" class="nav-link px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-700 dark:hover:text-primary-400 transition-colors">{{ item.label }}</a>
        </div>

        <div class="flex items-center gap-3">
          <a :href="'tel:' + (contact.phone || '0313-XXXXXXX')" class="hidden md:flex items-center gap-1.5 text-sm text-primary-700 dark:text-primary-400 font-medium hover:text-primary-800 transition-colors">
            <i class="fas fa-phone-alt"></i><span>{{ contact.phone || '0313-XXXXXXX' }}</span>
          </a>
          <button @click="toggleTheme" class="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="切换主题">
            <i class="fas fa-moon text-gray-600 dark:text-yellow-400 dark:hidden"></i>
            <i class="fas fa-sun text-yellow-400 hidden dark:block"></i>
          </button>
          <button @click="menuOpen = !menuOpen" class="lg:hidden w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors" aria-label="打开菜单">
            <i class="fas text-gray-700 dark:text-gray-200" :class="menuOpen ? 'fa-times' : 'fa-bars'"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-show="menuOpen" class="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
      <div class="px-4 py-3 space-y-1">
        <a v-for="item in navItems" :key="item.href" href="#" @click.prevent="scrollToAnchor(item.href)" class="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-gray-800 hover:text-primary-700 transition-colors">{{ item.label }}</a>
        <a :href="'tel:' + (contact.phone || '0313-XXXXXXX')" class="flex items-center gap-2 px-3 py-2 text-primary-700 dark:text-primary-400 font-medium"><i class="fas fa-phone-alt"></i>{{ contact.phone || '0313-XXXXXXX' }}</a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps({ contact: { type: Object, default: () => ({}) } });
const menuOpen = ref(false);

const route = useRoute();
const router = useRouter();

const navItems = [
  { label: '首页', href: '#home' },
  { label: '关于我们', href: '#about' },
  { label: '产品中心', href: '#products' },
  { label: '生产实力', href: '#strength' },
  { label: '质量保障', href: '#quality' },
  { label: '新闻中心', href: '#news' },
  { label: '联系我们', href: '#contact' }
];

function scrollToAnchor(href) {
  menuOpen.value = false;
  const anchor = href.replace('#', '');

  // 如果不在首页，先跳转到首页再滚动
  if (route.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    });
    return;
  }

  // 已经在首页，直接滚动
  const el = document.getElementById(anchor);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}

onMounted(() => {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
});
</script>
