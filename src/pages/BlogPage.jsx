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

const blogPosts = [
  {
    id: 1,
    title: "¿Es Seguro Vapear? Desmintiendo Mitos y Comprendiendo los Riesgos",
    description:
      "Este artículo aborda los mitos más comunes sobre el vapeo y ofrece información basada en estudios...",
    fullText:
      "El vapeo ha sido objeto de debates y malentendidos. En este artículo, exploramos estudios recientes sobre los riesgos y beneficios del vapeo comparado con los cigarrillos tradicionales. Analizamos los mitos más comunes y te ofrecemos información objetiva para tomar decisiones informadas.",
      image: "images/blog1.png",
  },
  {
    id: 2,
    title: "Los Mejores Sabores de E-líquidos para Probar este Año",
    description:
      "Una reseña de los sabores de e-líquidos más populares y en tendencia, ideal para quienes quieren descubrir nuevos sabores...",
    fullText:
      "Este año, los sabores frutales y postres lideran las tendencias de e-líquidos. Analizamos las mejores marcas y sabores como sandía, mango, fresa, y combinaciones innovadoras como pastel de limón y vainilla. Descubre cuáles son los más recomendados por los expertos y los usuarios.",
      image: "images/blog2.png",
  },
];

const BlogPage = () => {
  const [open, setOpen] = useState(false); // Contrôle la modale
  const [selectedPost, setSelectedPost] = useState(null); // Article sélectionné

  const handleOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* En-tête de la page */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Blog
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        Descubre las últimas tendencias y consejos sobre cigarrillos electrónicos para mejorar tu experiencia de vapeo.
      </Typography>

      {/* Liste des articles */}
      <Grid container spacing={6}>
        {blogPosts.map((post) => (
          <Grid item xs={12} md={6} key={post.id}>
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
                alt={post.title}
                height="200"
                image={post.image}
                sx={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }} gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "#000" }} gutterBottom>
                  {post.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#5c3a21",
                    ":hover": {
                      backgroundColor: "#8b5e34",
                    },
                  }}
                  onClick={() => handleOpen(post)}
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
          {selectedPost && (
            <>
              <Typography
                id="modal-title"
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {selectedPost.title}
              </Typography>
              <Typography
                id="modal-description"
                variant="body1"
                sx={{ color: "#000", marginBottom: 2 }}
              >
                {selectedPost.fullText}
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

export default BlogPage;
