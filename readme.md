# Тестирование вариант 2. использование mariadb



Edit:
vite.config.ts


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://stomtest.nsmu.ru',
        changeOrigin: true,
        secure: false
      },
    },
  },
});




Edit:
index.ts
file:///h:/docs/NSMU/Projects/%D0%9E%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BD%20%D0%90%D0%A1/ZykovaAS/Test_react_mariadb_v1/frontend/src/api/index.ts


import axios from 'axios';
import { Section, QuizResult } from '../types/quiz';

const BASE_URL = 'http://stomtest.nsmu.ru/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSections = () => 
  api.get<Section[]>('/quiz/sections').then(res => res.data);

export const saveResult = (data: QuizResult & { 
  firstName: string; 
  lastName: string; 
}) => 
  api.post('/results', data).then(res => res.data);