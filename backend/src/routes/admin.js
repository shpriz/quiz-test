import { login, getResults, downloadResults } from '../controllers/adminController.js';

export default async function adminRoutes(fastify) {
  // Middleware для проверки админского токена
  const verifyAdmin = async (request, reply) => {
    try {
      await request.jwtVerify();
      if (request.user.role !== 'admin') {
        throw new Error('Not authorized');
      }
    } catch (err) {
      reply.code(401).send({ error: 'Not authorized' });
    }
  };

  fastify.post('/admin/login', login);
  
  fastify.get('/admin/results', { 
    preHandler: verifyAdmin 
  }, getResults);
  
  fastify.get('/admin/results/download', { 
    preHandler: verifyAdmin 
  }, downloadResults);
}