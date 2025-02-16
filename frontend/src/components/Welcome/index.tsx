import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const Welcome = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

  const handleStart = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Пожалуйста, введите имя и фамилию');
      return;
    }

    // Сохраняем данные пользователя в sessionStorage
    sessionStorage.setItem('userData', JSON.stringify({ firstName, lastName }));
    navigate('/quiz');
  };

  const handleWelcomeClose = () => {
    setIsWelcomeOpen(false);
  };

  return (
    <>
      <Dialog 
        open={isWelcomeOpen} 
        maxWidth="sm" 
        fullWidth
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleWelcomeClose();
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h4" align="center">
            Добро пожаловать в тест по стоматологии!
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            Этот тест поможет оценить уровень осуществления гигиены полости рта, 
            оказания стоматологической помощи и поддержания здорового образа жизни людей, 
            проживающих в психоневрологических интернатах, в рамках сестринского ухода.
          </Typography>
          <Typography variant="body1" paragraph>
            Инструкции:
          </Typography>
          <Typography component="div">
            <ul>
              <li>Тест состоит из нескольких разделов</li>
              <li>В каждом разделе несколько вопросов</li>
              <li>Выберите наиболее подходящий ответ для каждого вопроса</li>
              <li>После завершения теста вы получите результаты</li>
            </ul>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleWelcomeClose}
            fullWidth
          >
            Начать тест
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Регистрация
          </Typography>

          <Box component="form" sx={{ mt: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Фамилия"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              margin="normal"
              required
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleStart}
              sx={{ mt: 3 }}
            >
              Начать тест
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Welcome;