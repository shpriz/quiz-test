import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import App from './App';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Сброс стилей и применение базовых стилей Material-UI */}
      <BrowserRouter future={{ 
        v7_startTransition: true,
        v7_relativeSplatPath: true 
      }}>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);