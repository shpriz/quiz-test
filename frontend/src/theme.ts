import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3', // Современный синий
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057', // Яркий розовый для акцентов
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Более современный вид кнопок
    },
  },
  shape: {
    borderRadius: 8, // Скругленные углы
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '24px', // Pill-shaped кнопки
          padding: '8px 24px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          borderRadius: '16px',
        },
      },
    },
  },
});

export default theme;