import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000
});

// 自动携带 token
API.interceptors.request.use(config => {
  const token = localStorage.getItem('admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const api = {
  // 联系方式
  getContact: () => API.get('/contact'),
  updateContact: (data) => API.put('/contact', data),

  // 统计数据
  getStats: () => API.get('/stats'),
  updateStats: (data) => API.put('/stats', data),

  // 产品
  getProducts: () => API.get('/products'),
  addProduct: (data) => API.post('/products', data),
  updateProduct: (id, data) => API.put(`/products/${id}`, data),
  deleteProduct: (id) => API.delete(`/products/${id}`),

  // 新闻
  getNews: () => API.get('/news'),
  addNews: (category, data) => API.post(`/news/${category}`, data),
  updateNews: (category, id, data) => API.put(`/news/${category}/${id}`, data),
  deleteNews: (category, id) => API.delete(`/news/${category}/${id}`),

  // 关于我们
  getAbout: () => API.get('/about'),
  updateAbout: (data) => API.put('/about', data),

  // Hero 轮播
  getHero: () => API.get('/hero'),
  updateHero: (data) => API.put('/hero', data),

  // 生产流程
  getSteps: () => API.get('/steps'),
  updateSteps: (data) => API.put('/steps', data),

  // 工厂照片
  getFactory: () => API.get('/factory'),
  updateFactory: (data) => API.put('/factory', data),

  // 证书
  getCertificates: () => API.get('/certificates'),
  updateCertificates: (data) => API.put('/certificates', data),

  // 留言
  getMessages: () => API.get('/messages'),
  submitMessage: (data) => API.post('/messages', data),
  deleteMessage: (id) => API.delete(`/messages/${id}`),

  // 图片管理
  getImages: () => API.get('/images'),
  uploadImage: (type, key, formData) => API.post(`/upload/${type}/${key}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateImages: (type, data) => API.put(`/images/${type}`, data),
  logout: () => API.post('/logout')
};
