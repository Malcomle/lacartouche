import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const SearchResults = ({ cart, setCart }) => {
  const { products } = useProducts(); // Liste complète des produits
  const { t } = useTranslation();
  const location = useLocation(); // Pour accéder à la query dans l'URL
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Extraire la requête de recherche de l'URL
  const getQuery = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query") || ""; // Renvoie la query ou une chaîne vide
  };

  useEffect(() => {
    const searchQuery = getQuery().toLowerCase();

    // Filtrer les produits par nom ou catégorie correspondant à la recherche
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery) ||
        (product.category &&
          product.category.toLowerCase().includes(searchQuery))
    );

    setFilteredProducts(results);
  }, [location, products]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
        >
          {t("searchPage.title", "Résultats de recherche")}
        </Typography>

        {filteredProducts.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: "10px",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link
                    to={`/product/${product.id || 1}`}
                    style={{ textDecoration: "none" }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.image}
                      alt={product.name}
                    />
                  </Link>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" sx={{ my: 1, fontWeight: "bold" }}>
                      €{product.price}
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                      {t("productsPage.categoryLabel")}:{" "}
                      {product.category || t("productsPage.unknownCategory")}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {t("productsPage.addToCart")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" textAlign="center" sx={{ mt: 4 }}>
            {t("searchPage.noResults", "Aucun produit ne correspond à votre recherche.")}
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default SearchResults;
