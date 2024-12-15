import React from 'react';
import { Typography, Container } from '@mui/material';

const RestrictedAccess = () => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
        variant="h5"
        color="error"
        gutterBottom
        style={{ fontWeight: 'bold', marginBottom: '25px', fontSize: '1.5rem' }}
      >
        ¡Lo sentimos!
      </Typography>
      <Typography
        variant="body1"
        paragraph
        style={{ fontSize: '1rem', lineHeight: '1.5', marginBottom: '40px', color: '#555' }}
      >
        Esta web está dirigida únicamente a usuarios de productos de nicotina mayores de 18 años.
      </Typography>
      <Typography
        variant="body2"
        style={{ fontSize: '0.9rem', lineHeight: '1.5', color: '#555' }}
      >
        Esta página web contiene información sobre nuestros productos libres de humo y necesitamos tu edad para
        asegurarnos que eres un adulto en Guatemala que fuma o usa productos con nicotina. Nuestros productos de
        nicotina no están diseñados para ayudar a dejar de fumar. No son libres de riesgo. Contienen nicotina, la
        cual es adictiva. Sólo para uso de adultos. Por favor visita la sección de información importante de esta
        página web para más información sobre los riesgos.
      </Typography>
      <img
        src="/images/RestrictionIcon.png"
        alt="Restriction Icon"
        style={{ position: 'fixed', bottom: '10px', left: '1px', width: 600, height: 200, opacity: '0.7' }}
      />
    </Container>
  );
};

export default RestrictedAccess;