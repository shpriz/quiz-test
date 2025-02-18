import { 
  login, 
  createAdmin, 
  getAdmins, 
  changePassword,
  getResults, 
  downloadResults 
} from '../controllers/adminController.js';

export default async function adminRoutes(fastify) {
  // Middleware для проверки админского токена
  const verifyAdmin = async (request, reply) => {
    try {
      await request.jwtVerify();
      if (!request.user || request.user.role !== 'admin') {
        throw new Error('Not authorized');
      }
    } catch (err) {
      reply.code(401).send({ error: 'Not authorized' });
    }
  };

  // Публичные маршруты для админов
  fastify.post('/admin/login', login);
  
  // Создание первого админа (доступно только если нет других админов)
  fastify.post('/admin/initial-setup', async (request, reply) => {
    const adminCount = await Admin.count();
    if (adminCount > 0) {
      return reply.code(403).send({ error: 'Admin already exists' });
    }
    return createAdmin(request, reply);
  });

  // Защищенные маршруты для админов
  fastify.register(async function (fastify) {
    fastify.addHook('preHandler', verifyAdmin);

    // Управление админами
    fastify.post('/admin/create', createAdmin);          // Создание нового админа
    fastify.get('/admin/list', getAdmins);              // Список админов
    fastify.post('/admin/change-password', changePassword); // Изменение пароля
    
    // Управление результатами
    fastify.get('/admin/results', getResults);           // Получение результатов
    fastify.get('/admin/results/download', downloadResults); // Скачивание результатов
  });
}