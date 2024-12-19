import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const ConnexionPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);

      setPopupMessage("");
      setPopupOpen(false);
      navigate("/home");
    } catch (error) {
      console.log("Erreur de connexion :", error);

      setPopupMessage(t("connexionPage.loginError"));
      setPopupOpen(true);
    }
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fff",
      }}
    >
      {/* Titre */}
      <Typography variant="h4" component="h1" sx={{ marginBottom: 3 }}>
        {t("connexionPage.title")}
      </Typography>

      {/* Conteneur de l'image */}
      <Box
        sx={{
          width: 150,
          height: 150,
          marginBottom: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/images/Panier.svg"
          alt="Panier"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Box>

      {/* Formulaire */}
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Champ Email */}
        <TextField
          placeholder={t("connexionPage.usernamePlaceholder")}
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon />
              </InputAdornment>
            ),
            style: { fontWeight: "bold", textTransform: "uppercase" },
          }}
          required
          label={t("connexionPage.usernameLabel")}
        />

        {/* Champ Password */}
        <TextField
          placeholder={t("connexionPage.passwordPlaceholder")}
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
            style: { fontWeight: "bold", textTransform: "uppercase" },
          }}
          required
          label={t("connexionPage.passwordLabel")}
        />

        {/* Bouton Login */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          {t("connexionPage.loginButton")}
        </Button>

        {/* Lien vers Inscription */}
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            textAlign: "center",
            color: "#000",
            fontWeight: "normal",
          }}
        >
          {t("connexionPage.noAccount")}{" "}
          <a
            href="/register"
            style={{
              textDecoration: "none",
              color: "#000",
            }}
          >
            {t("connexionPage.signUpLink")}
          </a>
        </Typography>
      </Box>

      {/* Lien Forgot Password */}
      <Typography
        variant="body2"
        sx={{
          marginTop: 2,
          textAlign: "center",
          color: "#000",
          fontWeight: "normal",
        }}
      >
        <a
          href="/forgot-password"
          style={{
            textDecoration: "none",
            color: "#000",
          }}
        >
          {t("connexionPage.forgotPassword")}
        </a>
      </Typography>

      {/* Pop-up de notification */}
      <Dialog open={popupOpen} onClose={handleClosePopup}>
        <DialogTitle>{t("connexionPage.errorTitle")}</DialogTitle>
        <DialogContent>
          <Typography>{popupMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            {t("connexionPage.okButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConnexionPage;