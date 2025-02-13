import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from '@mui/material';

const Welcome = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Пожалуйста, введите имя и фамилию');
      return;
    }

    // Сохраняем данные пользователя в sessionStorage
    sessionStorage.setItem('userData', JSON.stringify({ firstName, lastName }));
    navigate('/quiz');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h1" align="center" gutterBottom>
          Добро пожаловать!
        </Typography>
        
        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 4 }}>
          Тест по стоматологии
        </Typography>

        <Typography variant="body1" paragraph>
          Этот тест поможет оценить уровень осуществления гигиены полости рта, 
          оказания стоматологической помощи и поддержания здорового образа жизни людей, 
          проживающих в психоневрологических интернатах, в рамках сестринского ухода.
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
            size="large"
            onClick={handleStart}
            sx={{ mt: 4 }}
          >
            Начать тест
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Welcome;