import axios from 'axios';
import { Section, QuizResult } from '../types/quiz';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
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