import React from "react";
import { Box, Grid, Typography, Card, CardMedia, CardContent, Button } from "@mui/material";

const consejos = [
  {
    id: 1,
    title: "Guía para Principiantes: Cómo Elegir tu Primer Cigarrillo Electrónico",
    description:
      "En este artículo, explicamos los diferentes tipos de cigarrillos electrónicos, sus características, y cómo elegir el modelo adecuado según tus necesidades, especialmente si eres nuevo en el mundo del vapeo.",
    image: "images/consejo1.png",
    link: "#",
  },
  {
    id: 2,
    title: "Cómo Mantener y Limpiar tu Cigarrillo Electrónico Correctamente",
    description:
      "Este artículo ofrece una guía paso a paso para el mantenimiento y la limpieza de tu dispositivo, garantizando su durabilidad y un rendimiento óptimo.",
    image: "images/consejo1.png",
    link: "#",
  },
];

const ConsejosPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Consejos
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        Encuentra los mejores consejos y guías para mejorar tu experiencia de vapeo y cuidar tus cigarrillos electrónicos
      </Typography>
      <Grid container spacing={4}>
        {consejos.map((consejo) => (
          <Grid item xs={12} md={6} key={consejo.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                alt={consejo.title}
                height="200"
                image={consejo.image}
                sx={{
                  objectFit: "cover",
                  width: "100%",
                }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {consejo.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#000" }} // Texte en noir
                  gutterBottom
                >
                  {consejo.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  href={consejo.link}
                  sx={{
                    marginTop: 2,
                  }}
                >
                  Leer más
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ConsejosPage;
