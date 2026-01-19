import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Box } from '@mui/material';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="sticky" sx={{ background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(15px)', boxShadow: 'none', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>PT <span style={{ color: '#6366f1' }}>PRO</span></Typography>
          <Button sx={{ color: '#fff' }} component={Link} to="/customers">Customers</Button>
          <Button sx={{ color: '#fff' }} component={Link} to="/trainings">Trainings</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Box sx={{ background: 'rgba(255, 255, 255, 0.02)', borderRadius: '24px', p: 3, backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
};

export default App;