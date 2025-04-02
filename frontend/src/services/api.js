import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7100/api' //  backend URL 
});

// Tüm isteklerde token'ı otomatik eklemek için interceptor kullanıyoruz
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;
