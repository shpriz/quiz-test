import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DentistryIcon from '@mui/icons-material/MedicalServices';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  margin: '0 auto',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  '&:hover': {
    transform: 'translateX(4px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

const Welcome = () => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sessionStorage.setItem('userData', JSON.stringify({ firstName, lastName }));
    navigate('/quiz');
  };

  return (
    <Container>
      <StyledCard>
        <CardContent>
          <Typography variant="h1" align="center" gutterBottom sx={{ 
            fontSize: '2.5rem', 
            color: 'primary.main',
            mb: 4 
          }}>
            Добро пожаловать!
          </Typography>
          
          {!showForm ? (
            <Fade in={!showForm}>
              <Box>
                <Typography variant="body1" paragraph>
                  Тест состоит из пяти блоков. В каждом блоке необходимо выбрать один или несколько вариантов ответов на вопрос.
                </Typography>

                <List>
                  <StyledListItem>
                    <ListItemIcon>
                      <DentistryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Блок 1: Информация об анкетируемом"
                      secondary="Возрастная группа, пол, опыт работы и наличие пройденных курсов по повышению квалификации. Данная часть анкеты не подлежит оцениванию."
                    />
                  </StyledListItem>

                  <StyledListItem>
                    <ListItemIcon>
                      <DentistryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Блок 2: Уровень гигиены полости рта"
                      secondary="Оценка уровня гигиены полости рта и возможности его улучшения у пациентов психоневрологического интерната."
                    />
                  </StyledListItem>

                  <StyledListItem>
                    <ListItemIcon>
                      <DentistryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Блок 3: Гигиена в отделении милосердия"
                      secondary="Сбор информации о гигиене полости рта и помощи при ее проведении у лиц, находящихся в отделении милосердия."
                    />
                  </StyledListItem>

                  <StyledListItem>
                    <ListItemIcon>
                      <DentistryIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Блок 4: Профессиональные навыки"
                      secondary="Оценка профессиональных навыков и знаний в области стоматологии."
                    />
                  </StyledListItem>
                </List>

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button 
                    variant="contained" 
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => setShowForm(true)}
                    sx={{ 
                      minWidth: 200,
                      py: 1.5
                    }}
                  >
                    Начать тест
                  </Button>
                </Box>
              </Box>
            </Fade>
          ) : (
            <Fade in={showForm}>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Имя"
                  variant="outlined"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Фамилия"
                  variant="outlined"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => setShowForm(false)}
                  >
                    Назад
                  </Button>
                  <Button 
                    type="submit" 
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                  >
                    Продолжить
                  </Button>
                </Box>
              </Box>
            </Fade>
          )}
        </CardContent>
      </StyledCard>
    </Container>
  );
};

export default Welcome;