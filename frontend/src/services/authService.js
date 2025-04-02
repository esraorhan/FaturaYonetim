import api from './api';

export const loginUser = async (userName, password) => {
  try {
    const response = await api.post('/Auth/login', {
        userName: userName,
        password: password
      });

    const token = response.data.token;

    if (token) {
      localStorage.setItem('token', token);
    }

    return response.data;
  } catch (error) {
    console.error('API login hatası:', error);
    throw error;
  }
};
