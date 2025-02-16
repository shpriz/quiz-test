import bcrypt from 'bcryptjs';
import { QuizResult } from '../models/QuizResult.js';
import { User } from '../models/User.js';
import ExcelJS from 'exceljs';

export const login = async (request, reply) => {
  const { username, password } = request.body;

  // В реальном приложении эти данные должны быть в базе данных
  const adminPassword = await bcrypt.hash('admin123', 10);
  if (username === 'admin' && await bcrypt.compare(password, adminPassword)) {
    const token = await reply.jwtSign({ 
      username, 
      role: 'admin' 
    });
    return { token, user: { username, role: 'admin' } };
  }

  reply.code(401).send({ error: 'Invalid credentials' });
};

export const getResults = async (request, reply) => {
  try {
    const results = await QuizResult.findAll({
      include: [User],
      order: [['createdAt', 'DESC']]
    });
    return results;
  } catch (error) {
    reply.code(500).send({ error: 'Failed to fetch results' });
  }
};

export const downloadResults = async (request, reply) => {
  try {
    const results = await QuizResult.findAll({
      include: [User],
      order: [['createdAt', 'DESC']]
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Quiz Results');

    // Заголовки
    worksheet.columns = [
      { header: 'Дата', key: 'date' },
      { header: 'Имя', key: 'firstName' },
      { header: 'Фамилия', key: 'lastName' },
      { header: 'Общий балл', key: 'totalScore' },
      { header: 'Процент', key: 'percentage' }
    ];

    // Данные
    results.forEach(result => {
      const totalMaxScore = result.sectionScores.reduce((sum, s) => sum + s.maxScore, 0);
      worksheet.addRow({
        date: result.createdAt,
        firstName: result.User.firstName,
        lastName: result.User.lastName,
        totalScore: result.totalScore,
        percentage: ((result.totalScore / totalMaxScore) * 100).toFixed(1) + '%'
      });
    });

    reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    reply.header('Content-Disposition', 'attachment; filename=quiz-results.xlsx');
    
    return workbook.xlsx.write(reply.raw);
  } catch (error) {
    reply.code(500).send({ error: 'Failed to generate Excel file' });
  }
};