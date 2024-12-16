import React from "react";
import { Box, Typography, Paper, Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = ({ cart, setCart }) => {

  const navigate = useNavigate();

  const handleQuantityChange = (productId, delta) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        updatedCart[productIndex].quantity = Math.max(0, updatedCart[productIndex].quantity + delta);
        if (updatedCart[productIndex].quantity === 0) {
          updatedCart.splice(productIndex, 1); // Supprime le produit si la quantité est 0
        }
      }
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart
      .reduce((acc, product) => {
        const price = parseFloat(product.price) || 0; // Convertir en nombre ou utiliser 0 par défaut
        const quantity = product.quantity || 0; // Utiliser 0 si quantity est indéfini
        return acc + price * quantity;
      }, 0)
      .toFixed(2);
  };

  const handleProceedToPayment = () => {
    navigate("/payement"); // Redirection vers la page de paiement
  };

  return (
    <Box sx={{ fontFamily: "Arial, sans-serif", color: "#333", padding: "20px", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {cart.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: "20px" }}>
          Your cart is empty
        </Typography>
      ) : (
        <Box component="main" sx={{ display: "flex", gap: "50px", marginTop: "20px", padding: "20px" }}>
          {/* Product List */}
          <Box sx={{ flex: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, textAlign: "left" }}>
              Lista de Productos
            </Typography>

            {cart.map((product, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px",
                  borderRadius: "10px",
                  backgroundColor: "#fff",
                  mb: 3,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: "20px", flex: 1 }}>
                  <img src={product.image} alt={product.name} style={{ width: "100px", height: "100px", borderRadius: "10px" }} />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>{product.name}</Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>Color: {product.color || "N/A"}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Button variant="outlined" size="small" onClick={() => handleQuantityChange(product.id, -1)}>-</Button>
                  <Typography>{product.quantity}</Typography>
                  <Button variant="outlined" size="small" onClick={() => handleQuantityChange(product.id, 1)}>+</Button>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", flex: 0.5, textAlign: "right" }}>€{(parseFloat(product.price || 0) * (product.quantity || 0)).toFixed(2)}</Typography>
                <IconButton size="small">
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Paper>
            ))}
          </Box>

          {/* Cart Summary */}
          <Box
            component="aside"
            sx={{ flex: 1, padding: "30px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#fff" }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", textAlign: "center", mb: 3 }}>
              Resumen del Pedido
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>Subtotal: €{calculateTotal()}</Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>Descuento: €0.00</Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 3 }}>Total: €{calculateTotal()}</Typography>
            <input
              type="text"
              placeholder="Añadir código promocional"
              style={{ width: "93%", padding: "15px", marginBottom: "20px", border: "1px solid #ddd", borderRadius: "5px" }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleProceedToPayment}
              sx={{ padding: "15px", textTransform: "none", fontWeight: "bold", backgroundColor: "#4C2A17" }}
            >
              Ir a la caja →
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ShoppingCartPage;