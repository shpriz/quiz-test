import { Section, Question } from '../models/index.js';

// Получение всех секций с вопросами
export const getSections = async (request, reply) => {
  try {
    const sections = await Section.findAll({
      include: [{
        model: Question,
        as: 'questions',
        attributes: ['id', 'text', 'answers', 'scores']
      }],
      order: [
        ['id', 'ASC'],
        [{ model: Question, as: 'questions' }, 'id', 'ASC']
      ]
    });

    return sections;
  } catch (error) {
    request.log.error('Error in getSections:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};

// Получение статистики по тесту
export const getStatistics = async (request, reply) => {
  try {
    const stats = await Result.findAll({
      attributes: [
        [sequelize.fn('COUNT', sequelize.col('id')), 'totalTests'],
        [sequelize.fn('AVG', sequelize.col('totalScore')), 'averageScore'],
        [sequelize.fn('MAX', sequelize.col('totalScore')), 'maxScore'],
        [sequelize.fn('MIN', sequelize.col('totalScore')), 'minScore']
      ]
    });

    const sectionStats = await SectionScore.findAll({
      attributes: [
        'sectionTitle',
        [sequelize.fn('AVG', sequelize.col('score')), 'averageScore'],
        [sequelize.fn('MAX', sequelize.col('score')), 'maxScore'],
        [sequelize.fn('MIN', sequelize.col('score')), 'minScore']
      ],
      group: ['sectionTitle']
    });

    return {
      overall: stats[0],
      sections: sectionStats
    };
  } catch (error) {
    request.log.error('Error in getStatistics:', error);
    return reply.code(500).send({ error: 'Internal server error' });
  }
};