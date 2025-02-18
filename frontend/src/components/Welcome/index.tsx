import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Stack
} from '@mui/material';

export default function Welcome() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem('userData', JSON.stringify({ firstName, lastName }));
    navigate('/quiz');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Добро пожаловать!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Пожалуйста, представьтесь перед началом тестирования.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Stack spacing={2}>
            <TextField
              required
              fullWidth
              label="Имя"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              fullWidth
              label="Фамилия"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!firstName || !lastName}
            >
              Начать тестирование
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}