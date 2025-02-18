import axios from 'axios';

// Создаем инстанс axios с базовыми настройками
const api = axios.create({
  baseURL: '/api',  // Nginx проксирует /api на бэкенд
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

// API endpoints
export const fetchSections = () => api.get('/sections');
export const saveResult = (data) => api.post('/results', data);

export const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const quiz = {
  getQuestions: () => api.get('/questions'),
  submitAnswers: (answers) => api.post('/answers', answers),
  getResults: (id) => api.get(`/results/${id}`),
};

export const admin = {
  getUsers: () => api.get('/admin/users'),
  getResults: () => api.get('/admin/results'),
  updateQuestion: (id, data) => api.put(`/admin/questions/${id}`, data),
  deleteQuestion: (id) => api.delete(`/admin/questions/${id}`),
  addQuestion: (data) => api.post('/admin/questions', data),
};
