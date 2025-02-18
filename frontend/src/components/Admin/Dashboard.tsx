import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
  Alert
} from '@mui/material';
import { admin } from '../../api';
import { UserResult } from '../../types/quiz';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [results, setResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    loadResults();
  }, [navigate]);

  const loadResults = async () => {
    try {
      const data = await admin.getResults();
      setResults(data);
    } catch (err) {
      setError('Ошибка загрузки результатов');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleDownload = async () => {
    try {
      await admin.downloadReport();
    } catch (err) {
      setError('Ошибка скачивания файла');
    }
  };

  const calculatePercentage = (result: UserResult): string => {
    const totalMaxScore = result.result.sectionScores.reduce(
      (sum, section) => sum + section.maxScore, 
      0
    );
    return ((result.result.totalScore / totalMaxScore) * 100).toFixed(1);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">
          Результаты тестирования
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            onClick={handleDownload}
            sx={{ mr: 2 }}
          >
            Скачать Excel
          </Button>
          <Button 
            variant="outlined" 
            onClick={handleLogout}
          >
            Выйти
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Дата</TableCell>
              <TableCell>Результат</TableCell>
              <TableCell>Процент</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>{result.firstName}</TableCell>
                <TableCell>{result.lastName}</TableCell>
                <TableCell>
                  {new Date(result.createdAt).toLocaleString('ru-RU')}
                </TableCell>
                <TableCell>
                  {result.result.totalScore} / 
                  {result.result.sectionScores.reduce(
                    (sum, section) => sum + section.maxScore, 
                    0
                  )}
                </TableCell>
                <TableCell>{calculatePercentage(result)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}