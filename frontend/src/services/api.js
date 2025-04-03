import axios from 'axios';

const api = axios.create({
  baseURL: 'https://127.0.0.1:7100/api' //  backend URL 
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

export function parseJwt(token) { //user idsini almak içi localstorage ekleyeceğiz .
  try {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(
      atob(base64Url)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(base64);
  } catch (error) {
    console.log(error);
    return null;
  }
}
