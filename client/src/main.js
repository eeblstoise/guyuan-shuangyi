import { createApp } from 'vue';
console.log('✅ Vue imported');
import App from './App.vue';
console.log('✅ App imported');
import router from './router.js';
console.log('✅ Router imported');
import './style.css';
console.log('✅ Style imported');

const app = createApp(App);
console.log('✅ App created');
app.use(router);
console.log('✅ Router used');
app.mount('#app');
console.log('✅ App mounted to #app');
