import {
  Typography,
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Paper,
} from "@mui/material";

import useProducts from "../hooks/useProducts";
import { useTranslation } from "react-i18next";

const heroImage =
  "https://lh5.googleusercontent.com/p/AF1QipOn0vA-0UxwrIXozRHPmTjv0asOfn6MBf7km1T6=w424-h500-k-no";

const brandLogos = [
  { name: "Vaporesso", img: "images/vaporessoIcon.png" },
  { name: "Voopoo", img: "images/voopooIcon.png" },
  { name: "Kiwi", img: "images/kiwiIcon.png" },
  {
    name: "Geek Vape",
    img: "images/geekVapeIcon.png",
  },
  { name: "Aspire", img: "images/aspireIcon.png" },
];

const HomePage = () => {
  const {products} = useProducts(); // Récupère tous les produits
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
              {t("homepage.title")}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t("homepage.subtitle")}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              {t("homepage.buyNow")}
            </Button>
          </Grid>
          <Grid item xs={12} md={6} textAlign="center">
            <Box
              component="img"
              src={heroImage}
              alt={t("homepage.heroAlt")}
              sx={{
                width: "100%",
                maxWidth: 400,
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Bande de logos */}
      <Box sx={{ backgroundColor: "#6a4f4b", py: 2 }}>
        <Container>
          <Grid container spacing={6} justifyContent="center" alignItems="center">
            {brandLogos.map((brand, index) => (
              <Grid item key={index}>
                <Box
                  component="img"
                  src={brand.img}
                  alt={brand.name}
                  sx={{ height: 40, objectFit: "contain", mx: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Section "Más Vendido" */}
      <Container sx={{ py: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
        >
          {t("homepage.bestSellers")}
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {products.slice(0, 4).map((product, index) => (
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
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ my: 1, fontWeight: "bold" }}
                  >
                    {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    {product.category ? product.category : t("homepage.defaultCategory")}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                >
                  <TextField
                    select
                    label={t("homepage.quantity")}
                    size="small"
                    SelectProps={{ native: true }}
                    sx={{ width: 80 }}
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </TextField>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ textTransform: "none" }}
                  >
                    {t("homepage.addToCart")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            sx={{ borderRadius: "20px", textTransform: "none" }}
          >
            {t("homepage.viewAll")}
          </Button>
        </Box>
      </Container>

      {/* Différents types de produits */}
      <Container sx={{ py: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
        >
          {t("homepage.productTypes")}
        </Typography>

        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            borderRadius: "20px",
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            {/* Ligne 1 : Puff & Pods */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={1}
                sx={{
                  borderRadius: "20px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    alignSelf: "flex-start",
                  }}
                >
                  {t("homepage.puff")}
                </Typography>
                <Box
                  component="img"
                  src="images/puffImage.png"
                  alt={t("homepage.puffAlt")}
                  sx={{
                    width: "85%",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} md={7}>
              <Paper
                elevation={1}
                sx={{
                  borderRadius: "20px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    mb: 2,
                    alignSelf: "flex-start",
                  }}
                >
                  {t("homepage.pods")}
                </Typography>
                <Box
                  component="img"
                  src="images/podsImage.png"
                  alt={t("homepage.podsAlt")}
                  sx={{
                    width: "78%",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </Paper>
            </Grid>

            {/* Ligne 2 : Kits en pleine largeur */}
            <Grid item xs={12}>
              <Paper
                elevation={1}
                sx={{
                  borderRadius: "20px",
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 2, alignSelf: "flex-start" }}
                >
                  {t("homepage.kits")}
                </Typography>
                <Box
                  component="img"
                  src="images/kitsImage.png"
                  alt={t("homepage.kitsAlt")}
                  sx={{
                    width: "70%",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;