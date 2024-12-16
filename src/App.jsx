import AppRoutes from "./AppRoutes";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Container,
  Grid,
  Badge,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

const App = () => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const [cart, setCart] = useState([]); // Gestion du panier

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.main", zIndex: 1300, position: 'relative', }}>
        <Toolbar>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "text.secondary" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              La Cartouche
            </Link>
          </Typography>

          {/* Conteneur parent pour le bouton et le menu */}
          <Box
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <Button
              ref={buttonRef}
              color="inherit"
              endIcon={<KeyboardArrowDownIcon />}
            >
              Productos
            </Button>
            <Menu
              anchorEl={buttonRef.current}
              open={open}
              onClose={() => setOpen(false)}
              disablePortal
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 1,
                  backgroundColor: "primary.main",
                  color: "text.secondary",
                },
              }}
            >
              <MenuItem
                component={Link}
                to="/productos/pods"
                onClick={() => setOpen(false)}
              >
                Pods
              </MenuItem>
              <MenuItem
                component={Link}
                to="/productos/puff"
                onClick={() => setOpen(false)}
              >
                Puff
              </MenuItem>
              <MenuItem
                component={Link}
                to="/productos/kits"
                onClick={() => setOpen(false)}
              >
                Kits
              </MenuItem>
            </Menu>
          </Box>

          <Button color="inherit" component={Link} to="/blog">
            Blog
          </Button>
          <Button color="inherit" component={Link} to="/consejos">
            Consejos
          </Button>
          <Button color="inherit" component={Link} to="/atencion-al-cliente">
            Atención al cliente
          </Button>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search for products..."
            sx={{ ml: 2, backgroundColor: "#fff", borderRadius: 15 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <IconButton color="inherit" sx={{ ml: 2 }} component={Link} to="/shoppingcart">
            <Badge badgeContent={cart.reduce((acc, item) => acc + item.quantity, 0)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Contenu des pages (routes) */}
      <AppRoutes cart={cart} setCart={setCart} />

      {/* Pied de page */}
      <Box component="footer" sx={{ backgroundColor: "#f5f5f5", py: 4, mt: 4, zIndex: 1300, position: 'relative' }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                La Cartouche
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                En La Cartouche, su entorno de confianza, descubre nuestros
                cigarrillos electrónicos y accesorios, para una transición fácil
                al vapeo.
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {/* Icônes de réseaux sociaux si besoin */}
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: "#ccc",
                    borderRadius: "50%",
                  }}
                ></Box>
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: "#ccc",
                    borderRadius: "50%",
                  }}
                ></Box>
                <Box
                  component="span"
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: "#ccc",
                    borderRadius: "50%",
                  }}
                ></Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Otras Páginas
              </Typography>
              <Typography variant="body2">
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Blog
                </a>
              </Typography>
              <Typography variant="body2">
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Consejos
                </a>
              </Typography>
              <Typography variant="body2">
                <a
                  href="#"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Atención al cliente
                </a>
              </Typography>
            </Grid>
          </Grid>

          <Box
            mt={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography variant="body2" color="text.secondary">
              La Cartouche © 2024, All Rights Reserved
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              {/* Icônes de paiement (placeholder) */}
              <Box
                component="img"
                src="https://via.placeholder.com/40x20?text=Visa"
                alt="Visa"
              />
              <Box
                component="img"
                src="https://via.placeholder.com/40x20?text=PayPal"
                alt="PayPal"
              />
              <Box
                component="img"
                src="https://via.placeholder.com/40x20?text=Apple+Pay"
                alt="Apple Pay"
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default App;