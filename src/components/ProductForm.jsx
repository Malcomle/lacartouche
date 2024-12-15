import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  IconButton,
  Chip,
  Divider,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const ProductForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
    price: "",
    tags: [],
    images: [],
  });

  const [currentTag, setCurrentTag] = useState("");

  // Gestion des champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Ajouter des tags
  const handleAddTag = () => {
    if (currentTag) {
      setFormData({ ...formData, tags: [...formData.tags, currentTag] });
      setCurrentTag("");
    }
  };

  // Gestion des images
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        backgroundColor: "#fff",
        borderRadius: 2,
        p: 3,
        boxShadow: 1,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        Détails du produit
      </Typography>
      {/* Formulaire */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Nom du produit"
            fullWidth
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Catégorie"
            fullWidth
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Marque"
            fullWidth
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Quantité en stock"
            fullWidth
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Prix de vente"
            fullWidth
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </Grid>
        {/* Gestion des tags */}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <TextField
              label="Étiquette"
              fullWidth
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
            />
            <Button variant="contained" onClick={handleAddTag}>
              Ajouter
            </Button>
          </Box>
          <Box sx={{ mt: 1 }}>
            {formData.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                sx={{ m: 0.5 }}
                onDelete={() =>
                  setFormData({
                    ...formData,
                    tags: formData.tags.filter((t, i) => i !== index),
                  })
                }
              />
            ))}
          </Box>
        </Grid>
        {/* Image Upload */}
        <Grid item xs={12}>
          <Box
            sx={{
              border: "1px dashed grey",
              borderRadius: 2,
              p: 2,
              textAlign: "center",
            }}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              id="upload-images"
              onChange={handleImageUpload}
            />
            <label htmlFor="upload-images">
              <IconButton component="span">
                <AddPhotoAlternateIcon fontSize="large" color="primary" />
              </IconButton>
            </label>
            <Typography variant="body2" color="text.secondary">
              Glissez vos images ici ou parcourez
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            {formData.images.map((img, index) => (
              <Chip
                key={index}
                label={img.name}
                onDelete={() =>
                  setFormData({
                    ...formData,
                    images: formData.images.filter((_, i) => i !== index),
                  })
                }
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
      <Divider />
      {/* Boutons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
        <Button variant="outlined" onClick={onCancel}>
          Annuler
        </Button>
        <Button variant="contained" color="primary" onClick={() => onSave(formData)}>
          Ajouter
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;