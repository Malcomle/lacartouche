import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const users = [
  { email: "admin@example.com", password: "admin123", role: "admin" },
  { email: "user@example.com", password: "user123", role: "user" },
];

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si l'email est associé à un compte
    const user = users.find((u) => u.email === email);

    if (user) {
      // Simuler l'envoi d'un email
      console.log("Correo de restablecimiento enviado a:", email);
      setError("");
      setSubmitted(true);
    } else {
      setSubmitted(false);
      setError("El correo electrónico no está asociado a ninguna cuenta.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/connexion"); // Redirection vers la page de connexion
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* Titre principal */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          marginBottom: 3,
          color: "#4E342E",
        }}
      >
        Restablecer contraseña
      </Typography>
      {/* Texte d'introduction */}
      <Typography
        variant="body1"
        sx={{
          marginBottom: 2,
          fontSize: "1rem",
          color: "#4E342E",
        }}
      >
        ¿Has olvidado tu contraseña? No te preocupes. Introduce tu correo
        electrónico y te enviaremos un enlace para restablecerla.
      </Typography>

      {/* Affichage du message de confirmation ou d'erreur */}
      {submitted ? (
        <Alert
          severity="success"
          sx={{
            marginBottom: 2,
            backgroundColor: "#e0c097",
            color: "#4E342E",
            fontWeight: "bold",
          }}
        >
          Enlace de restablecimiento enviado a tu correo electrónico.
        </Alert>
      ) : error ? (
        <Alert
          severity="error"
          sx={{
            marginBottom: 2,
            backgroundColor: "#f8d7da",
            color: "#721c24",
            fontWeight: "bold",
          }}
        >
          {error}
        </Alert>
      ) : null}

      {/* Formulaire */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Champ email */}
        <TextField
          placeholder="Correo electrónico *"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            style: {
              backgroundColor: "#FAFAFA",
              border: "1px solid #4E342E",
              color: "#4E342E",
            },
          }}
          required
        />

        {/* Bouton envoyer */}
        <Button
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#5A3A29",
            color: "#FFF",
            padding: "10px",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#4E342E",
            },
          }}
        >
          ENVIAR ENLACE
        </Button>
      </Box>

      {/* Retour à la connexion */}
      <Typography
        onClick={handleBackToLogin}
        sx={{
          marginTop: 3,
          fontSize: "0.9rem",
          cursor: "pointer",
          color: "#4E342E",
          textDecoration: "underline",
        }}
      >
        Volver a la <span style={{ fontWeight: "bold" }}>página de inicio de sesión</span>
      </Typography>
    </Container>
  );
};

export default ForgotPasswordPage;
