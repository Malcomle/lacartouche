import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  Chip,
  Paper,
  IconButton,
  LinearProgress,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useDropzone } from "react-dropzone";
import useProducts from "../hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from "react-i18next";

const categories = ["Puff", "Kits", "Pods"];

const ProductForm = () => {
  const { t } = useTranslation();
  const { createProduct, updateProduct, getProductById } = useProducts();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [tags, setTags] = useState(["XXXX", "XXXX", "XXXX"]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [mainImage, setMainImage] = useState(null);

  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    stock: "",
    price: "",
  });

  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const loadProduct = async () => {
        const existingProduct = await getProductById(id);
        if (existingProduct) {
          setValues({
            name: existingProduct.name || "",
            description: existingProduct.description || "",
            category: existingProduct.category || "",
            brand: existingProduct.brand || "",
            stock: existingProduct.stock ? existingProduct.stock.toString() : "",
            price: existingProduct.price ? existingProduct.price.toString() : "",
          });
          setMainImage(existingProduct.image || null);
          if (existingProduct.tags) setTags(existingProduct.tags);
        }
      };
      loadProduct();
    }
  }, [isEditMode, id, getProductById]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryFiles((prev) =>
        prev.map((f) =>
          f.progress < 100 ? { ...f, progress: f.progress + 5 } : f
        )
      );
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      progress: 0,
    }));
    setGalleryFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "name":
        if (!value.trim()) error = t("productForm.errors.nameRequired");
        break;
      case "category":
        if (!categories.includes(value)) error = t("productForm.errors.categoryRequired");
        break;
      case "brand":
        if (!value.trim()) error = t("productForm.errors.brandRequired");
        break;
      case "stock":
        if (!/^\d+$/.test(value) || parseInt(value, 10) <= 0) {
          error = t("productForm.errors.stockPositiveInteger");
        }
        break;
      case "price":
        if (!/^\d+(\.\d+)?$/.test(value) || parseFloat(value) <= 0) {
          error = t("productForm.errors.pricePositiveNumber");
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, values[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const getHelperTextColor = (field) => {
    if (!touched[field]) return "";
    return errors[field] ? "error.main" : "success.main";
  };

  const getHelperText = (field) => {
    if (!touched[field]) return "";
    return errors[field] ? errors[field] : t("productForm.valid");
  };

  const isError = (field) => {
    return touched[field] && !!errors[field];
  };

  const handleSubmit = async () => {
    const requiredFields = ["name", "category", "brand", "stock", "price"];
    const newTouched = { ...touched };
    let hasError = false;

    requiredFields.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, values[field]);
      if (error) {
        hasError = true;
      }
      setErrors((prev) => ({ ...prev, [field]: error }));
    });

    setTouched(newTouched);

    if (hasError) return;

    const productData = {
      name: values.name,
      description: values.description,
      category: values.category,
      brand: values.brand,
      stock: parseInt(values.stock, 10),
      price: parseFloat(values.price),
      tags: tags,
      image: mainImage || "",
      gallery: galleryFiles.map((f) => f.name),
    };

    if (isEditMode) {
      await updateProduct(id, productData);
    } else {
      await createProduct(productData);
    }

    navigate("/admin/products");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        {isEditMode ? t("productForm.editTitle") : t("productForm.createTitle")}
      </Typography>

      <Grid container spacing={4}>
        {/* Colonne gauche */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("productForm.name")}
            </Typography>
            <TextField
              fullWidth
              placeholder={t("productForm.namePlaceholder")}
              variant="outlined"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              error={isError("name")}
              helperText={getHelperText("name")}
              FormHelperTextProps={{
                sx: { color: getHelperTextColor("name") },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("productForm.description")}
            </Typography>
            <ReactQuill
              value={values.description}
              onChange={(content) => handleChange("description", content)}
              onBlur={() => handleBlur("description")}
              theme="snow"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("productForm.category")}
            </Typography>
            <FormControl fullWidth>
              <Select
                displayEmpty
                value={values.category}
                onChange={(e) => handleChange("category", e.target.value)}
                onBlur={() => handleBlur("category")}
                error={isError("category")}
              >
                <MenuItem value="" disabled>
                  {t("productForm.selectCategory")}
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              {touched.category && (
                <Typography
                  variant="body2"
                  sx={{ color: getHelperTextColor("category"), mt: 0.5 }}
                >
                  {getHelperText("category")}
                </Typography>
              )}
            </FormControl>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("productForm.brand")}
            </Typography>
            <TextField
              fullWidth
              placeholder={t("productForm.brandPlaceholder")}
              variant="outlined"
              value={values.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              onBlur={() => handleBlur("brand")}
              error={isError("brand")}
              helperText={getHelperText("brand")}
              FormHelperTextProps={{
                sx: { color: getHelperTextColor("brand") },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("productForm.stock")}
            </Typography>
            <TextField
              fullWidth
              placeholder="XXX"
              variant="outlined"
              value={values.stock}
              onChange={(e) => handleChange("stock", e.target.value)}
              onBlur={() => handleBlur("stock")}
              error={isError("stock")}
              helperText={getHelperText("stock")}
              FormHelperTextProps={{
                sx: { color: getHelperTextColor("stock") },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("productForm.price")}
            </Typography>
            <TextField
              fullWidth
              placeholder="XX.XX€"
              variant="outlined"
              value={values.price}
              onChange={(e) => handleChange("price", e.target.value)}
              onBlur={() => handleBlur("price")}
              error={isError("price")}
              helperText={getHelperText("price")}
              FormHelperTextProps={{
                sx: { color: getHelperTextColor("price") },
              }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {t("productForm.tags")}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {tags.map((tag, index) => (
                <Chip key={index} label={tag} />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Colonne droite */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: 200,
              border: "1px solid #ccc",
              borderRadius: 1,
              mb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f5f5f5",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {mainImage ? (
              <Box
                component="img"
                src={mainImage}
                alt="Main"
                sx={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <ImageIcon sx={{ fontSize: 50, color: "#ccc" }} />
            )}
          </Box>
          <Button variant="outlined" component="label" sx={{ mb: 3 }}>
            {t("productForm.selectMainImage")}
            <input hidden accept="image/*" type="file" onChange={handleMainImageChange} />
          </Button>

          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            {t("productForm.productGallery")}
          </Typography>

          <Box
            {...getRootProps()}
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 1,
              p: 2,
              textAlign: "center",
              mb: 2,
              color: "#999",
              cursor: "pointer",
              backgroundColor: isDragActive ? "#eee" : "transparent",
            }}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <Typography variant="body2" sx={{ color: "#333" }}>
                {t("productForm.dropImageHere")}
              </Typography>
            ) : (
              <>
                <Typography variant="body2">{t("productForm.dropOrBrowse")}</Typography>
                <Typography variant="body2">{t("productForm.allowedFormats")}</Typography>
              </>
            )}
          </Box>

          {galleryFiles.map((f, i) => (
            <Paper
              key={i}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                mb: 1,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#ddd",
                  borderRadius: 1,
                  mr: 2,
                }}
              />
              <Typography variant="body2" sx={{ flexGrow: 1 }}>
                {f.name}
              </Typography>
              <Box sx={{ width: 100, mr: 2 }}>
                <LinearProgress variant="determinate" value={f.progress} />
              </Box>
              {f.progress === 100 && (
                <IconButton size="small">
                  <CheckCircleIcon color="success" />
                </IconButton>
              )}
            </Paper>
          ))}
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {isEditMode ? t("productForm.editButton") : t("productForm.addButton")}
        </Button>
        <Button variant="outlined" color="inherit" onClick={() => navigate("/admin/products")}>
          {t("productForm.cancelButton")}
        </Button>
      </Box>
    </Container>
  );
};

export default ProductForm;