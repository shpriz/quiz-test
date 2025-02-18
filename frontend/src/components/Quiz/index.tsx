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
import { quiz } from '../../api';
import { Section, QuizState, QuizResult, DetailedAnswer } from '../../types/quiz';

export default function Quiz() {
  const navigate = useNavigate();
  const [sections, setSections] = useState<Section[]>([]);
  const [quizState, setQuizState] = useState<QuizState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    sections: []
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

    quiz.getQuestions()
      .then((data) => {
        setSections(data);
        setQuizState(prev => ({
          ...prev,
          sections: data
        }));
        setLoading(false);
      })
      .catch(() => {
        setError('Ошибка загрузки вопросов');
        setLoading(false);
      });
  }, [navigate]);

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(Number(value));
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const currentSection = quizState.sections[quizState.currentSection];
    const currentQuestion = currentSection.questions[quizState.currentQuestion];
    
    const answer: DetailedAnswer = {
      questionId: currentQuestion.id,
      selectedAnswer,
      score: currentQuestion.scores[selectedAnswer],
      sectionId: currentSection.id
    };

    setQuizState(prev => {
      const nextQuestion = prev.currentQuestion + 1;
      const questionsInSection = prev.sections[prev.currentSection].questions.length;

      if (nextQuestion >= questionsInSection) {
        const nextSection = prev.currentSection + 1;
        if (nextSection >= prev.sections.length) {
          // Тест завершен
          const finalAnswers = [...prev.answers, answer];
          const result: QuizResult = calculateResult(finalAnswers, prev.sections);
          
          const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
          quiz.submitAnswers({
            ...result,
            ...userData
          });
          
          navigate('/results', { state: { result } });
          return prev;
        }
        return {
          ...prev,
          currentSection: nextSection,
          currentQuestion: 0,
          answers: [...prev.answers, answer]
        };
      }

      return {
        ...prev,
        currentQuestion: nextQuestion,
        answers: [...prev.answers, answer]
      };
    });

    setSelectedAnswer(null);
  };

  const calculateResult = (answers: DetailedAnswer[], sections: Section[]): QuizResult => {
    let totalScore = 0;
    const sectionScores = sections.map(section => {
      const sectionAnswers = answers.filter(a => a.sectionId === section.id);
      const score = sectionAnswers.reduce((sum, a) => sum + a.score, 0);
      const maxScore = section.questions.reduce((sum, q) => 
        sum + Math.max(...q.scores), 0);
      
      totalScore += score;
      return {
        sectionTitle: section.title,
        score,
        maxScore
      };
    });

    return {
      totalScore,
      sectionScores,
      detailedAnswers: answers
    };
  };

  if (loading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  const currentSection = quizState.sections[quizState.currentSection];
  const currentQuestion = currentSection?.questions[quizState.currentQuestion];

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          {currentSection.title}
        </Typography>
        
        <LinearProgress 
          variant="determinate" 
          value={(quizState.currentQuestion / currentSection.questions.length) * 100} 
          sx={{ mb: 4 }}
        />

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            {currentQuestion.text}
          </Typography>

          <RadioGroup value={selectedAnswer} onChange={(e) => handleAnswerSelect(e.target.value)}>
            {currentQuestion.answers.map((answer, index) => (
              <FormControlLabel
                key={index}
                value={index}
                control={<Radio />}
                label={answer.text}
              />
            ))}
          </RadioGroup>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
            >
              {quizState.currentSection === sections.length - 1 &&
               quizState.currentQuestion === currentSection.questions.length - 1
                ? 'Завершить'
                : 'Следующий вопрос'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
