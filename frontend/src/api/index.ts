import axios from 'axios';
import { Section, QuizResult, AdminCredentials, AdminAuthResponse, UserResult } from '../types/quiz';

// Используем относительный путь
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к запросам, если он есть
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API для теста
export const fetchSections = () => 
  api.get<Section[]>('/quiz/sections').then(res => res.data);

export const saveResult = (data: QuizResult & { 
  firstName: string; 
  lastName: string; 
}) => 
  api.post('/results', data).then(res => res.data);

// API для админки
export const adminLogin = (credentials: AdminCredentials) =>
  api.post<AdminAuthResponse>('/admin/login', credentials).then(res => res.data);

export const fetchResults = () =>
  api.get<UserResult[]>('/admin/results').then(res => res.data);

export const downloadResultsExcel = () =>
  api.get('/admin/results/download', { 
    responseType: 'blob' 
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'quiz-results.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  });