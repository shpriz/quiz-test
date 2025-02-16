import bcrypt from 'bcryptjs';
import { Result } from '../models/Result.js';
import ExcelJS from 'exceljs';

export const login = async (request, reply) => {
  const { username, password } = request.body;

  // В реальном приложении эти данные должны быть в базе данных
  const adminPassword = await bcrypt.hash('admin123', 10);
  if (username === 'admin' && await bcrypt.compare(password, adminPassword)) {
    const token = fastify.jwt.sign({ username });
    return { token };
  }

  return reply.code(401).send({ error: 'Invalid credentials' });
};

export const getResults = async (request, reply) => {
  try {
    const results = await Result.findAll({
      order: [['createdAt', 'DESC']]
    });
    return results;
  } catch (error) {
    request.log.error('Error in getResults:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

export const downloadResults = async (request, reply) => {
  try {
    const results = await Result.findAll({
      order: [['createdAt', 'DESC']]
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Results');

    // Добавляем заголовки
    worksheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Имя', key: 'firstName' },
      { header: 'Фамилия', key: 'lastName' },
      { header: 'Общий балл', key: 'totalScore' },
      { header: 'Дата', key: 'createdAt' }
    ];

    // Добавляем данные
    results.forEach(result => {
      worksheet.addRow({
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        totalScore: result.totalScore,
        createdAt: result.createdAt
      });
    });

    // Отправляем файл
    reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    reply.header('Content-Disposition', 'attachment; filename=results.xlsx');
    
    return workbook.xlsx.write(reply.raw);
  } catch (error) {
    request.log.error('Error in downloadResults:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};