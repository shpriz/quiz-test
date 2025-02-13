import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Section, Question } from '../models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function importQuizData() {
  try {
    // Читаем JSON файл с данными теста
    const quizDataPath = path.join(__dirname, '../data/quiz-data.json');
    const fileContent = fs.readFileSync(quizDataPath, 'utf8');
    const quizData = JSON.parse(fileContent);

    // Импортируем каждую секцию и её вопросы
    for (const sectionData of quizData) {
      // Создаем секцию
      const section = await Section.create({
        title: sectionData.title
      });

      // Создаем вопросы для этой секции
      if (sectionData.questions?.length) {
        await Question.bulkCreate(
          sectionData.questions.map(q => ({
            sectionId: section.id,
            text: q.text,
            answers: q.answers,
            scores: q.scores
          }))
        );
      }
    }

    console.log('Quiz data imported successfully');
  } catch (error) {
    console.error('Error importing quiz data:', error);
    throw error;
  }
}

export { importQuizData };