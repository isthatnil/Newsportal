import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const fetchArticles = () => api.get('/news');
export const fetchAndStoreArticles = () => api.get('/news/fetch');