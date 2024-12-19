import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import useProducts from "../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { EditAttributesRounded, EditRounded } from "@mui/icons-material";

const ProductsContent = () => {
  const { products, deleteProduct } = useProducts();
  const [open, setOpen] = useState(false); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  

  const navigate = useNavigate();

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id); 
    }
    handleClose();
  };

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        Todos los productos
      </Typography>

      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/product/new")}
            sx={{ borderRadius: "20px" }}
          >
            Add new product
          </Button>
        </Box>
      </Box>

      <Container>
        {products && products.length > 0 ? (
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
                  {console.log(product)}

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
                      <Box>
                      <IconButton
                          size="small"
                          sx={{ backgroundColor: "#f5f5f5", m: 0.5 }}
                          onClick={() => navigate(`/admin/product/edit/${product.id}`)}
                        >
                          <EditRounded fontSize="small" color="primary" />
                        </IconButton>
                        <IconButton
                          size="small"
                          sx={{ backgroundColor: "#f5f5f5", m: 0.5 }}
                          onClick={() => handleOpen(product)}
                        >
                          <DeleteIcon fontSize="small" color="error" />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            align="center"
            sx={{ mt: 5, color: "text.secondary" }}
          >
            Aucun produit disponible pour le moment.
          </Typography>
        )}
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer{" "}
            <strong>{selectedProduct?.name}</strong> ?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Annuler
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductsContent;