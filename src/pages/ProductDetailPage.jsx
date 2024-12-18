import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CardMedia, Container, Button, Tabs, Tab, Divider } from "@mui/material";
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
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          {/* Notation */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {[...Array(5)].map((_, index) => (
              <Star key={index} sx={{ color: "#8C6A5D" }} /> // Étoiles remplies
            ))}
            <Typography variant="body2" sx={{ color: "gray" }}>
              Valoración media: 10/10 - Nº valoraciones: 2
            </Typography>
          </Box>

          {/* Prix */}
          <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
            {product.price || "Prix non disponible"}
          </Typography>

          {/* Description courte */}
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong style={{ color: "#4A2E2A", textDecoration: "underline" }}>Geekvape</strong>{" "}
            Aegis Legend 2 Kit. Se trata de un mod un poco más ligero que el anterior, alcanza una
            potencia máxima de 200W y funciona con baterías 18650 duales. Estamos hablando de la
            segunda generación de la tecnología Geekvape Tri-proof, fabricada a prueba de polvo,
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
              backgroundColor: tabIndex === 0 ? "#d9d4d2" : "#4A2E2A",
              color: tabIndex === 0 ? "#000" : "#fff",
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
              backgroundColor: tabIndex === 1 ? "#d9d4d2" : "#4A2E2A",
              color: tabIndex === 1 ? "#000" : "#fff",
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
            <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
            <strong>Comprar Kit Aegis Legend 2 (L200) By GeekVape</strong>{"\n\n"}
            Geekvape Aegis Legend 2 Kit. Se trata de un mod un poco más ligero que el anterior, alcanza una potencia máxima de 200W y funciona con baterías 18650 duales. Estamos hablando de la segunda generación de la tecnología Geekvape Tri-proof, fabricada a prueba de polvo, golpes y es impermeable gracias a IP67 y IP68.{"\n\n"}
            Tiene una nueva pantalla completa de 1.08 pulgadas y es pequeño, ligero, compacto y cómodo. No importa si está expuesto a temperaturas frías o calientes, desde -20ºC o hasta 50ºC. Su sistema A-Lock hace que sea más seguro de llevar. La cerradura lo protege de la resistencia de que se sobre queme o del sobrecalentamiento por presión accidental.{"\n\n"}
            Con el logotipo bien grabado en las decoraciones de metal cepillado, el cuero refinado en el lateral y la parte superior el modelo de la caja se ve cómodo y representa un espíritu de libertad y valentía. Tiene un puerto de carga con tapa abatible. Su Tanque Geekvape Z Subohm 2021 tiene mayor entrada de aire y mejor rendimiento compatible con resistencias de la serie Geekvape Z.{"\n\n"}

            <strong>CARACTERÍSTICAS TÉCNICAS DEL KIT AEGIS LEGEND 2 :</strong>{"\n\n"}
            - **Tamaño**: 140.12 x 54.12 x 29mm{"\n"}
            - **Capacidad**: 2ml{"\n"}
            - **Resistencias**: Mesh Z2 0.2ohm y Mesh Z1 0.4ohm{"\n"}
            - **Batería**: 2 x 18650 (no incluida){"\n"}
            - **Voltaje de salida**: 12V{"\n"}
            - **Potencia máxima de salida**: 200W{"\n"}
            - **Material**: Aluminio, Zinc, Silicona{"\n"}
            - **Pantalla**: OLED{"\n"}
            - **Aegis IP67 Resistente al agua y al polvo**{"\n"}
            - **Chip AS mejorado, rápido y preciso**{"\n"}
            - **Compatible con las resistencias Super Mesh**{"\n\n"}

            <strong>CONTENIDO DE LA CAJA DEL GEEKVAPE AEGIS LEGEND 2 KIT :</strong>{"\n\n"}
            - 1x Aegis Legend 2 Mod{"\n"}
            - 1x Atomizador Geekvape Z Sub Ohm 2021 (2ml){"\n"}
            - 1x Resistencia Geekvape Z 0.2ohm 70-80W (preinstalada){"\n"}
            - 1x Resistencia Geekvape Z 0.25ohm 45-57W{"\n"}
            - 1x Depósito de repuesto (2ml){"\n"}
            - 1x Llave para resistencia{"\n"}
            - 1x Cable USB-C{"\n"}
            - 1x Bolsa de repuestos{"\n"}
            - 1x Manual del usuario
          </Typography>
          )}
          {tabIndex === 1 && (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Características
              </Typography>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  Ref Interna
                </Typography>
                <Typography variant="body1">Geekvape Kit Aegis Leg 2</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
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
