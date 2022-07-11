import axios from 'axios';
import { API_CONFIG } from './utils/utils';

const instance = axios.create({
  baseURL: API_CONFIG.URL_API,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');

  return config;
});

export default instance;
