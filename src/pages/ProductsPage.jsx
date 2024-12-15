import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useProducts from '../hooks/useProducts';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  TextField,
  Button
} from '@mui/material';
import { useEffect, useRef } from 'react';

const ProductsPage = () => {
  const { category } = useParams(); // Récupère le paramètre dans l'URL (ex: "pods", "kits", "puff")
  const { t } = useTranslation();
  const {products} = useProducts(); // Tous les produits
  console.log(products);



  

  // Filtre des produits par catégorie
  const filteredProducts = products.filter(p => 
    p.category && p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}>
          {t(`productsPage.categories.${category.toLowerCase()}`, category)}
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {filteredProducts.map(product => (
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
                    {t('productsPage.categoryLabel')}: {product.category || t('productsPage.unknownCategory')}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between", px: 2, pb: 2 }}
                >
                  <TextField
                    select
                    label={t('productsPage.quantity')}
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
                    {t('productsPage.addToCart')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            {t('productsPage.pagination', { current: 1, total: 10 })}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsPage;