import axios, { AxiosInstance } from 'axios';
import { 
  Section, 
  QuizResult, 
  AdminCredentials, 
  AdminAuthResponse, 
  UserResult 
} from '../types/quiz';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// Создаем инстанс axios с базовыми настройками
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,   // 10 секунд таймаут
  headers: {
    'Content-Type': 'application/json',
  }
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор для обработки ошибок
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Если токен истек или невалиден, разлогиниваем пользователя
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API для теста
export const fetchSections = (): Promise<Section[]> => api.get('/quiz/sections');

export const saveResult = (data: QuizResult & { 
  firstName: string; 
  lastName: string; 
}): Promise<void> => api.post('/results', data);

// API для админки
export const adminLogin = (credentials: AdminCredentials): Promise<AdminAuthResponse> => 
  api.post('/admin/login', credentials);

export const fetchResults = (): Promise<UserResult[]> => api.get('/admin/results');

export const downloadResultsExcel = (): Promise<void> => api.get('/admin/results/download', { 
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

export const auth = {
  login: (credentials: AdminCredentials): Promise<AdminAuthResponse> => 
    api.post('/auth/login', credentials),
  register: (userData: AdminCredentials): Promise<AdminAuthResponse> => 
    api.post('/auth/register', userData)
};

export const quiz = {
  getQuestions: (): Promise<Section[]> => api.get('/questions'),
  submitAnswers: (answers: QuizResult & { firstName: string, lastName: string }): Promise<void> => 
    api.post('/answers', answers),
  getResults: (id: number): Promise<UserResult> => api.get(`/results/${id}`)
};

export const admin = {
  getUsers: (): Promise<UserResult[]> => api.get('/admin/users'),
  getResults: (): Promise<UserResult[]> => api.get('/admin/results'),
  updateQuestion: (id: number, data: any): Promise<void> => api.put(`/admin/questions/${id}`, data),
  deleteQuestion: (id: number): Promise<void> => api.delete(`/admin/questions/${id}`),
  addQuestion: (data: any): Promise<void> => api.post('/admin/questions', data),
  downloadReport: (): Promise<void> => api.get('/admin/results/download', { 
    responseType: 'blob' 
  }).then(response => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'quiz-results.xlsx');
    document.body.appendChild(link);
    link.click();
    link.remove();
  })
};