import React, { useState, useRef, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useTranslation } from "react-i18next";
import { DesktopMacRounded } from "@mui/icons-material";
import { useAuth } from "./contexts/AuthContext";
import useProducts from "./hooks/useProducts";

const App = () => {
  const [open, setOpen] = useState(false);
  const [languageMenuAnchor, setLanguageMenuAnchor] = useState(null);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const buttonRef = useRef(null);
  const { t, i18n } = useTranslation();
  const location = useLocation(); // Obtenez l'URL actuelle
  const [cart, setCart] = useState([]);

  const { initDocument } = useProducts();

  /*const firstRender = useRef(true);

  useEffect(() => {
    console.log("First render");

    if (firstRender.current) {
      console.log("First render");

      firstRender.current = false;
      initDocument();
    }
  }, []);*/

  const { signIn, currentUser, logOut } = useAuth();

  const navigate = useNavigate();

  // Liste des chemins où la navbar et le footer ne doivent pas apparaître
  const noLayoutPaths = ["/login", "/", "/restricted"];

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = (event) => {
    setProfileMenuAnchor(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchor(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng); // Sauvegarde la langue dans localStorage
    handleLanguageMenuClose();
  };

  const handleProfileClick = () => {
    navigate("/connexion"); // Redirige vers la page de connexion
  };

  // Vérifiez si la page actuelle est dans la liste noLayoutPaths
  const hideLayout = noLayoutPaths.includes(location.pathname);

  return (
    <Box sx={{ backgroundColor: "#fff", minHeight: "100vh" }}>
      {/* Afficher la navbar uniquement si la page n'est pas dans noLayoutPaths */}
      {!hideLayout && (
        <AppBar
          position="static"
          sx={{
            backgroundColor: "primary.main",
            zIndex: 1300,
            position: "relative",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, fontWeight: "bold", color: "text.secondary" }}
            >
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                {t("title")}
              </Link>
            </Typography>

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
                {t("products")}
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
                  {t("pods")}
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/productos/puff"
                  onClick={() => setOpen(false)}
                >
                  {t("puff")}
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/productos/kits"
                  onClick={() => setOpen(false)}
                >
                  {t("kits")}
                </MenuItem>
              </Menu>
            </Box>

            <Button color="inherit" component={Link} to="/blog">
              {t("blog")}
            </Button>
            <Button color="inherit" component={Link} to="/consejos">
              {t("tips")}
            </Button>
            <Button color="inherit" component={Link} to="/atencion-al-cliente">
              {t("customerSupport")}
            </Button>

            <TextField
              variant="outlined"
              size="small"
              placeholder={t("searchPlaceholder")}
              sx={{ ml: 2, backgroundColor: "#fff", borderRadius: 15 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <IconButton
              color="inherit"
              sx={{ ml: 2 }}
              component={Link}
              to="/shoppingcart"
            >
              <Badge
                badgeContent={cart.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                )}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {!currentUser ? (
              <IconButton color="inherit">
                <AccountCircleIcon onClick={handleProfileClick} />
              </IconButton>
            ) : (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                  aria-controls="profile"
                  aria-haspopup="true"
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  id="profile"
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClick={handleProfileMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      borderRadius: 1,
                      backgroundColor: "primary.main",
                      color: "text.secondary",
                    },
                  }}
                >
                  <MenuItem>{currentUser.email}</MenuItem>
                  <MenuItem onClick={() => {
                    logOut();
                    navigate("/connexion");
                    }}>LogOut</MenuItem>
                </Menu>
              </>
            )}

            {/* Sélecteur de langue */}
            <IconButton
              color="inherit"
              onClick={handleLanguageMenuOpen}
              aria-controls="language-menu"
              aria-haspopup="true"
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              id="language-menu"
              anchorEl={languageMenuAnchor}
              open={Boolean(languageMenuAnchor)}
              onClose={handleLanguageMenuClose}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 1,
                  backgroundColor: "primary.main",
                  color: "text.secondary",
                },
              }}
            >
              <MenuItem onClick={() => changeLanguage("fr")}>Français</MenuItem>
              <MenuItem onClick={() => changeLanguage("en")}>English</MenuItem>
              <MenuItem onClick={() => changeLanguage("es")}>Español</MenuItem>
            </Menu>

            {currentUser ? (
              <IconButton
                color="inherit"
                component={Link}
                to="/admin/dashboard"
              >
                <DesktopMacRounded />
              </IconButton>
            ) : (
              // nothing
              <></>
            )}
          </Toolbar>
        </AppBar>
      )}

      {/* Contenu principal */}
      <AppRoutes cart={cart} setCart={setCart} />
      {/* Afficher le footer uniquement si la page n'est pas dans noLayoutPaths */}
      {!hideLayout && (
        <Box
          component="footer"
          sx={{ backgroundColor: "#f5f5f5", py: 4, mt: 4, zIndex: 1300 }}
        >
          <Container>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  {t("footerTitle")}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  {t("footerDescription")}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  {t("otherPages")}
                </Typography>
                <Typography variant="body2">
                  <Link
                    to="/blog"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("blog")}
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <Link
                    to="/consejos"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("tips")}
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <Link
                    to="/atencion-al-cliente"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {t("customerSupport")}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}
    </Box>
  );
};

export default App;
