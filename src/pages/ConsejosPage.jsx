import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Modal,
} from "@mui/material";

const consejos = [
  {
    id: 1,
    title: "Guía para Principiantes: Cómo Elegir tu Primer Cigarrillo Electrónico",
    description:
      "En este artículo, explicamos los diferentes tipos de cigarrillos electrónicos, sus características, y cómo elegir el modelo adecuado según tus necesidades...",
    fullText:
      "Aquí encontrarás una guía detallada sobre los mejores kits para principiantes, incluyendo pros y contras de cada uno, recomendaciones de marcas y consejos para comenzar tu experiencia de vapeo.",
      image: "images/consejo1.png",
  },
  {
    id: 2,
    title: "Cómo Mantener y Limpiar tu Cigarrillo Electrónico Correctamente",
    description:
      "Este artículo ofrece una guía paso a paso para el mantenimiento y la limpieza de tu dispositivo, garantizando su durabilidad y un rendimiento óptimo.",
    fullText:
      "El mantenimiento adecuado incluye la limpieza regular de las boquillas, el cambio de resistencias y la revisión de las baterías para evitar problemas a largo plazo. Aquí te enseñamos cómo hacerlo de forma sencilla y práctica.",
      image: "images/consejo2.png",
  },
];

const ConsejosPage = () => {
  const [open, setOpen] = useState(false); // Contrôle la modale
  const [selectedConsejo, setSelectedConsejo] = useState(null); // Contient l'article sélectionné

  const handleOpen = (consejo) => {
    setSelectedConsejo(consejo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedConsejo(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* En-tête */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Consejos
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        Encuentra los mejores consejos y guías para mejorar tu experiencia de vapeo y cuidar tus cigarrillos electrónicos.
      </Typography>

      <Grid container spacing={6}>
        {consejos.map((consejo) => (
          <Grid item xs={12} md={6} key={consejo.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                alt={consejo.title}
                height="200"
                image={consejo.image}
                sx={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }} gutterBottom>
                  {consejo.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#000" }} gutterBottom>
                  {consejo.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#5c3a21",
                    ":hover": { backgroundColor: "#8b5e34" },
                  }}
                  onClick={() => handleOpen(consejo)}
                >
                  Leer más
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modale pour afficher les détails */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 24,
            padding: 4,
            maxWidth: "600px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {selectedConsejo && (
            <>
              <Typography
                id="modal-title"
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {selectedConsejo.title}
              </Typography>
              <Typography
                id="modal-description"
                variant="body1"
                sx={{ color: "#000", marginBottom: 2 }}
              >
                {selectedConsejo.fullText}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#5c3a21",
                  ":hover": { backgroundColor: "#8b5e34" },
                }}
                onClick={handleClose}
              >
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ConsejosPage;
