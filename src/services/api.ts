import axios from 'axios';

const api = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token') ?? sessionStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const isForm = config.data instanceof FormData;
  if (config.headers) {
    if (!isForm) config.headers['Content-Type'] = 'application/json';
    else delete config.headers['Content-Type'];
  }

  return config;
});

export default api;
