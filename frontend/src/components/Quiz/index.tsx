import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  LinearProgress
} from '@mui/material';
import { fetchSections, saveResult } from '../../api';
import { Section, QuizState, QuizResult, DetailedAnswer, SectionScore } from '../../types/quiz';

export default function Quiz() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    sections: []  // Initialize sections as an empty array
  });
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = sessionStorage.getItem('userData');
    if (!userData) {
      navigate('/');
      return;
    }

    loadSections();
  }, [navigate]);

  const loadSections = async () => {
    try {
      const data = await fetchSections();
      setSections(data);  // Update sections state
      setQuizState(prevState => ({
        ...prevState,
        sections: data  // Update sections in quizState after loading data
      }));
      setLoading(false);
    } catch (err) {
      setError('Ошибка загрузки вопросов');
      setLoading(false);
    }
  };

  const currentSection = sections[quizState.currentSection];
  const currentQuestion = currentSection?.questions[quizState.currentQuestion];
  const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0);
  const answeredQuestions = quizState.answers.length;

  const handleAnswer = async () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...quizState.answers, {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answerText: currentQuestion.answers[selectedAnswer].text,
      score: currentQuestion.scores[selectedAnswer],
      sectionTitle: currentSection.title
    }];

    if (quizState.currentQuestion < currentSection.questions.length - 1) {
      // Следующий вопрос в текущей секции
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        answers: newAnswers
      }));
    } else if (quizState.currentSection < sections.length - 1) {
      // Следующая секция
      setQuizState(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0,
        answers: newAnswers
      }));
    } else {
      // Тест завершен
      const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
      const result: QuizResult = calculateResult(newAnswers);
      
      try {
        await saveResult({
          ...result,
          firstName: userData.firstName,
          lastName: userData.lastName
        });
        navigate('/results', { state: { result } });
      } catch (err) {
        setError('Ошибка сохранения результатов');
      }
    }

    setSelectedAnswer(null);
  };

  const calculateResult = (answers: DetailedAnswer[]): QuizResult => {
    const sectionScores: SectionScore[] = sections.map(section => {
      const sectionAnswers = answers.filter(a => a.sectionTitle === section.title);
      const score = sectionAnswers.reduce((sum, a) => sum + a.score, 0);
      const maxScore = section.questions.reduce((sum, q) => sum + Math.max(...q.scores), 0);
      return { sectionTitle: section.title, score, maxScore };
    });

    const totalScore = sectionScores.reduce((sum, s) => sum + s.score, 0);

    return {
      totalScore,
      sectionScores,
      detailedAnswers: answers
    };
  };

  if (loading) return <LinearProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!currentSection || !currentQuestion) return null;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box sx={{ mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={(answeredQuestions / totalQuestions) * 100} 
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Вопрос {answeredQuestions + 1} из {totalQuestions}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom>
          {currentSection.title}
        </Typography>

        <Typography variant="body1" sx={{ mb: 3 }}>
          {currentQuestion.text}
        </Typography>

        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => setSelectedAnswer(Number(e.target.value))}
        >
          {currentQuestion.answers.map((answer, index) => (
            <FormControlLabel
              key={index}
              value={index}
              control={<Radio />}
              label={answer.text}
            />
          ))}
        </RadioGroup>

        <Button
          variant="contained"
          onClick={handleAnswer}
          disabled={selectedAnswer === null}
          sx={{ mt: 3 }}
        >
          {quizState.currentSection === sections.length - 1 &&
           quizState.currentQuestion === currentSection.questions.length - 1
            ? 'Завершить тест'
            : 'Следующий вопрос'}
        </Button>
      </Paper>
    </Container>
  );
}
