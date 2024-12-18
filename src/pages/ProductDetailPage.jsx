import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CardMedia,
  Container,
  Button,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";
import useProducts from "../hooks/useProducts";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(id);
      setProduct(fetchedProduct);
    };
    fetchProduct();
  }, [id, getProductById]);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  if (!product) {
    return (
      <Box sx={{ textAlign: "center", padding: 4 }}>
        <Typography variant="h4">Produit introuvable</Typography>
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      {/* Informations principales */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 4 }}>
        {/* Image */}
        <CardMedia
          component="img"
          image={product.image || "placeholder.jpg"}
          alt={product.name}
          sx={{ width: 300, height: "auto", borderRadius: 2, boxShadow: 3 }}
        />

        {/* Partie droite : Notation, Prix et Description courte */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Notation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {[...Array(5)].map((_, index) => (
              <Star key={index} sx={{ color: "#8C6A5D" }} /> // Étoiles remplies
            ))}
            <Typography variant="body2" sx={{ color: "gray" }}>
              Valoración media: 10/10 - Nº valoraciones: 2
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
            {product.name || "Prix non disponible"}
          </Typography>
          {/* Prix */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
            {product.price || "Prix non disponible"}
          </Typography>

          {/* Description courte */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong style={{ color: "#4A2E2A", textDecoration: "underline" }}>
              Geekvape
            </strong>{" "}
            Aegis Legend 2 Kit. Se trata de un mod un poco más ligero que el
            anterior, alcanza una potencia máxima de 200W y funciona con
            baterías 18650 duales. Estamos hablando de la segunda generación de
            la tecnología Geekvape Tri-proof, fabricada a prueba de polvo,
            golpes y es impermeable gracias a IP67 y IP68.
          </Typography>
        </Box>
      </Box>

      {/* Onglets stylisés */}
      <Box sx={{ marginTop: 6 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => setTabIndex(0)}
            sx={{
              backgroundColor: tabIndex === 0 ? "#4A2E2A" : "#d9d4d2",
              color: tabIndex === 0 ? "#fff" : "#000",
              borderRadius: "10px",
              marginRight: 1,
              "&:hover": { backgroundColor: "#c9c4c2" },
            }}
          >
            descripción
          </Button>
          <Button
            onClick={() => setTabIndex(1)}
            sx={{
              backgroundColor: tabIndex === 1 ? "#4A2E2A" : "#d9d4d2",
              color: tabIndex === 1 ? "#fff" : "#000",
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#c9c4c2" },
            }}
          >
            características
          </Button>
        </Box>

        {/* Contenu des onglets */}
        <Box sx={{ padding: 2, marginTop: 2 }}>
          {tabIndex === 0 && (
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          )}
          {tabIndex === 1 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Características
              </Typography>
              <Divider />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Ref Interna
                </Typography>
                <Typography variant="body1">
                  {product.name}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Ean13
                </Typography>
                <Typography variant="body1">6970313649712</Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
