import { verifyToken } from '../utils/auth.js';
import * as authController from '../controllers/authController.js';
import * as resultController from '../controllers/resultController.js';
import * as quizController from '../controllers/quizController.js';

export default async function routes(fastify) {
  // Публичные маршруты (для студентов)
  fastify.get('/quiz/sections', quizController.getSections);  // Получение вопросов теста
  fastify.post('/results', resultController.saveResult);      // Сохранение результатов
  
  // Маршруты для админа (защищенные)
  fastify.post('/auth/login', authController.login);          // Вход для админа
  
  // Регистрируем защищенные маршруты
  fastify.register(async function (fastify) {
    fastify.addHook('preHandler', verifyToken);
    
    // Проверка авторизации
    fastify.get('/auth/check', authController.checkAuth);
    
    // Маршруты для работы с результатами (только для админа)
    fastify.get('/results', resultController.getResults);           // Список всех результатов
    fastify.get('/quiz/statistics', quizController.getStatistics); // Статистика
    fastify.get('/results/export/excel', resultController.exportToExcel); // Экспорт в Excel
    fastify.get('/results/export/csv', resultController.exportToCSV);     // Экспорт в CSV
  });
}