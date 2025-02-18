import { Admin } from '../models/Admin.js';
import { Result } from '../models/Result.js';
import ExcelJS from 'exceljs';

// Создание нового админа
export const createAdmin = async (request, reply) => {
  try {
    const { username, password, email } = request.body;

    // Проверяем, существует ли уже админ с таким username
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return reply.code(400).send({ error: 'Username already exists' });
    }

    // Создаем нового админа
    const admin = await Admin.create({
      username,
      password, // пароль будет захеширован автоматически через хуки модели
      email
    });

    // Не возвращаем пароль в ответе
    const { password: _, ...adminData } = admin.toJSON();
    return reply.code(201).send(adminData);
  } catch (error) {
    request.log.error('Error in createAdmin:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

// Вход админа
export const login = async (request, reply) => {
  try {
    const { username, password } = request.body;

    // Ищем админа
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    // Проверяем пароль
    const isValid = await admin.checkPassword(password);
    if (!isValid) {
      return reply.code(401).send({ error: 'Invalid credentials' });
    }

    // Обновляем время последнего входа
    await admin.update({ lastLogin: new Date() });

    // Создаем JWT токен
    const token = await reply.jwtSign({ 
      id: admin.id,
      username: admin.username,
      role: admin.role
    });

    return { 
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    };
  } catch (error) {
    request.log.error('Error in login:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

// Получение списка всех админов (только для суперадмина)
export const getAdmins = async (request, reply) => {
  try {
    const admins = await Admin.findAll({
      attributes: { exclude: ['password'] }
    });
    return admins;
  } catch (error) {
    request.log.error('Error in getAdmins:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

// Изменение пароля админа
export const changePassword = async (request, reply) => {
  try {
    const { currentPassword, newPassword } = request.body;
    const adminId = request.user.id;

    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return reply.code(404).send({ error: 'Admin not found' });
    }

    // Проверяем текущий пароль
    const isValid = await admin.checkPassword(currentPassword);
    if (!isValid) {
      return reply.code(401).send({ error: 'Current password is incorrect' });
    }

    // Обновляем пароль
    await admin.update({ password: newPassword });
    return { message: 'Password updated successfully' };
  } catch (error) {
    request.log.error('Error in changePassword:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
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

    // Настройка заголовков
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Имя', key: 'firstName', width: 20 },
      { header: 'Фамилия', key: 'lastName', width: 20 },
      { header: 'Результаты', key: 'results', width: 50 },
      { header: 'Дата', key: 'createdAt', width: 20 }
    ];

    // Добавление данных
    results.forEach(result => {
      worksheet.addRow({
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        results: JSON.stringify(result.results),
        createdAt: result.createdAt
      });
    });

    // Отправка файла
    reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    reply.header('Content-Disposition', 'attachment; filename=results.xlsx');
    
    return workbook.xlsx.write(reply.raw);
  } catch (error) {
    request.log.error('Error in downloadResults:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};