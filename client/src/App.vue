<template>
  <div class="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
    <NavBar :contact="contact" />
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from './api.js';
import NavBar from './components/NavBar.vue';

const contact = ref({});

onMounted(async () => {
  const { data } = await api.getContact();
  contact.value = data.data || {};
});
</script>
