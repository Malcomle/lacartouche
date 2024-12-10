import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import useProducts from "../hooks/useProducts";

const ProductsContent = () => {
  const products = useProducts();

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Titre principal */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Todos los productos
      </Typography>

      {/* Bouton Ajouter un produit */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          Añadir un nuevo producto
        </Button>
      </Box>

      {/* Grille des produits */}
      <Container>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card
                sx={{
                  borderRadius: "15px",
                  backgroundColor: "#f9f9f9",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: 360,
                }}
              >
                {/* Image du produit */}

                {/* Contenu principal */}
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        height: 125,
                        width: 100,
                        objectFit: "contain",
                        backgroundColor: "#fff",
                        mr: 2,
                      }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          lineHeight: "1.2",
                          mb: 0.5,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          mb: 1,
                        }}
                      >
                        {product.category}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          mt: 1,
                          mb: 1,
                          display: "block",
                        }}
                      >
                        {product.price}
                      </Typography>
                    </Box>
                    {/* Actions */}
                    <Box>
                      <IconButton
                        size="small"
                        sx={{ backgroundColor: "#f5f5f5", m: 0.5 }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ backgroundColor: "#f5f5f5", m: 0.5 }}
                      >
                        <DeleteIcon fontSize="small" color="error" />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography variant="body2" color="text.primary">
                    Resumen
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.primary"
                    sx={{ display: "block", mt: 0.5 }}
                  >
                    Lorem ipsum is placeholder text commonly used in the
                    graphic.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Box>
          <Button variant="outlined" sx={{ borderRadius: "20px", mr: 1 }}>
            1
          </Button>
          <Button variant="outlined" sx={{ borderRadius: "20px", mr: 1 }}>
            2
          </Button>
          <Button variant="outlined" sx={{ borderRadius: "20px", mr: 1 }}>
            3
          </Button>
          <Typography component="span" variant="body2" sx={{ mx: 1 }}>
            ...
          </Typography>
          <Button variant="outlined" sx={{ borderRadius: "20px", mr: 1 }}>
            10
          </Button>
        </Box>
        <Button
          variant="outlined"
          sx={{ borderRadius: "20px", textTransform: "none" }}
        >
          Siguiente &gt;
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsContent;
