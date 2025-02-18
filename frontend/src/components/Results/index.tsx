// src/components/Results/index.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { QuizResult } from '../../types/quiz';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result as QuizResult;

  if (!result) {
    return (
      <Container>
        <Typography>Результаты не найдены</Typography>
        <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
      </Container>
    );
  }

  const totalMaxScore = result.sectionScores.reduce((sum, s) => sum + s.maxScore, 0);
  const percentage = (result.totalScore / totalMaxScore) * 100;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Результаты теста
        </Typography>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Общий результат: {result.totalScore} из {totalMaxScore} ({percentage.toFixed(1)}%)
        </Typography>

        <Typography variant="h6" gutterBottom>
          Результаты по разделам:
        </Typography>

        <List>
          {result.sectionScores.map((section, index) => (
            <div key={index}>
              <ListItem>
                <ListItemText
                  primary={section.sectionTitle}
                  secondary={`${section.score} из ${section.maxScore} баллов (${((section.score / section.maxScore) * 100).toFixed(1)}%)`}
                />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>

        <Button
          variant="contained"
          onClick={() => navigate('/')}
          sx={{ mt: 3 }}
        >
          Завершить
        </Button>
      </Paper>
    </Container>
  );
}