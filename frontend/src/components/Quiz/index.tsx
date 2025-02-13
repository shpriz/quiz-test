import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  LinearProgress,
  Alert
} from '@mui/material';
import { QuizState } from '../../types/quiz';
import { fetchSections, saveResult } from '../../api';

const Quiz = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [quizState, setQuizState] = useState<QuizState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: {},
    sections: []
  });

  // Проверяем, есть ли данные пользователя
  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      navigate('/');
      return;
    }
  }, [navigate]);

  // Загружаем вопросы теста
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const sections = await fetchSections();
        setQuizState(prev => ({ ...prev, sections }));
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке вопросов');
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const currentSection = quizState.sections[quizState.currentSection];
  const currentQuestion = currentSection?.questions[quizState.currentQuestion];

  const handleAnswer = (value: string) => {
    setQuizState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: parseInt(value)
      }
    }));
  };

  const handleNext = () => {
    if (quizState.currentQuestion < currentSection.questions.length - 1) {
      // Следующий вопрос в текущей секции
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else if (quizState.currentSection < quizState.sections.length - 1) {
      // Следующая секция
      setQuizState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0
      }));
    } else {
      // Тест завершен
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
      
      // Подсчитываем общий балл и баллы по секциям
      let totalScore = 0;
      const sectionScores = quizState.sections.map(section => {
        let sectionScore = 0;
        section.questions.forEach(question => {
          const answerIndex = quizState.answers[question.id];
          if (typeof answerIndex !== 'undefined') {
            sectionScore += question.scores[answerIndex];
            totalScore += question.scores[answerIndex];
          }
        });
        return {
          sectionTitle: section.title,
          score: sectionScore,
          maxScore: section.questions.length * Math.max(...section.questions[0].scores)
        };
      });

      // Формируем детальные ответы
      const detailedAnswers = Object.entries(quizState.answers).map(([questionId, answerIndex]) => {
        const question = quizState.sections
          .flatMap(s => s.questions)
          .find(q => q.id === parseInt(questionId));
        
        return {
          questionId: parseInt(questionId),
          questionText: question?.text || '',
          answerText: question?.answers[answerIndex].text || '',
          score: question?.scores[answerIndex] || 0,
          sectionTitle: quizState.sections.find(s => 
            s.questions.some(q => q.id === parseInt(questionId))
          )?.title || ''
        };
      });

      // Отправляем результаты
      await saveResult({
        firstName: userData.firstName,
        lastName: userData.lastName,
        totalScore,
        sectionScores,
        detailedAnswers
      });

      // Очищаем данные пользователя
      sessionStorage.removeItem('userData');
      
      // Перенаправляем на страницу с результатами
      navigate('/results', { 
        state: { 
          totalScore,
          sectionScores,
          detailedAnswers
        }
      });
    } catch (err) {
      setError('Ошибка при сохранении результатов');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <LinearProgress />
      </Container>
    );
  }

  if (!currentSection || !currentQuestion) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="error">
          Ошибка при загрузке вопросов
        </Alert>
      </Container>
    );
  }

  const progress = (
    (quizState.currentSection * currentSection.questions.length + quizState.currentQuestion + 1) /
    (quizState.sections.length * currentSection.questions.length)
  ) * 100;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4 }}>
        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ mb: 4 }} 
        />

        <Typography variant="h5" gutterBottom>
          {currentSection.title}
        </Typography>

        <Typography variant="h6" sx={{ mb: 3 }}>
          Вопрос {quizState.currentQuestion + 1} из {currentSection.questions.length}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          {currentQuestion.text}
        </Typography>

        <RadioGroup
          value={quizState.answers[currentQuestion.id] || ''}
          onChange={(e) => handleAnswer(e.target.value)}
        >
          {currentQuestion.answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio />}
              label={answer.text}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={typeof quizState.answers[currentQuestion.id] === 'undefined'}
          >
            {quizState.currentSection === quizState.sections.length - 1 &&
             quizState.currentQuestion === currentSection.questions.length - 1
              ? 'Завершить тест'
              : 'Следующий вопрос'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Quiz;