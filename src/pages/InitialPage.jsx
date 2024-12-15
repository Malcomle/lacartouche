import React from 'react';
import { Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const InitialPage = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate('/home'); // Redirige vers la page principale
  };

  const handleNo = () => {
    navigate('/restricted'); // Redirige vers la page restreinte
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        textAlign: 'center',
        marginTop: '10vh',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold', marginBottom: '40px' }}>
        La Cartouche
      </Typography>
      <Typography
        variant="h4"
        gutterBottom
        style={{ fontWeight: 'bold', marginBottom: '25px', fontSize: '1.8rem' }}
      >
        ¿Eres Mayor de +18 años?
      </Typography>
      <Typography
        variant="body2"
        paragraph
        style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '40px', color: '#555' }}
      >
        Esta página web contiene información sobre nuestros productos libres de humo y necesitamos tu edad para
        asegurarnos que eres un adulto en Guatemala que fuma o usa productos con nicotina.
      </Typography>
      <Box display="flex" justifyContent="center" gap={3}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#5A3A29', color: '#FFF', padding: '10px 30px', fontSize: '1rem' }}
          onClick={handleYes}
        >
          Sí
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: '#333', color: '#FFF', padding: '10px 30px', fontSize: '1rem' }}
          onClick={handleNo}
        >
          No
        </Button>
      </Box>
    </Container>
  );
};

export default InitialPage;