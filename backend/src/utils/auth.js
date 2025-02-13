import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Хеширует пароль
 * @param {string} password - Пароль для хеширования
 * @returns {Promise<string>} Хешированный пароль
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

/**
 * Сравнивает пароль с хешем
 * @param {string} password - Пароль для проверки
 * @param {string} hash - Хеш для сравнения
 * @returns {Promise<boolean>} Результат сравнения
 */
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};

/**
 * Middleware для проверки JWT токена
 */
export const verifyToken = async (request, reply) => {
  try {
    // Проверяем наличие токена в заголовке
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new Error('No token provided');
    }

    // Извлекаем токен из заголовка
    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new Error('Invalid token format');
    }

    // Проверяем токен
    const decoded = await request.jwtVerify();
    request.user = decoded;
  } catch (error) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
};