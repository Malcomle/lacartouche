import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useOrders from "../hooks/useOrders";

const PaymentProcessPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const successGif = "/images/success.gif"; // Chemin correct vers success.gif dans public
  const errorGif = "/images/error.gif";

  // Vérifier si la carte est valide (Regex simple pour le format d'une carte VISA ou Mastercard)
  const isCardValid = (number) => {
    const cardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/; // VISA / MASTERCARD
    return cardRegex.test(number.replace(/\s/g, "")); // Enlever les espaces
  };

  // Vérifier si la date d'expiration est valide (format MM/YY)
  const isExpirationValid = (date) => {
    const expirationRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/; // MM/YY
    return expirationRegex.test(date);
  };

  // Vérifier si le CVV est valide (3 chiffres)
  const isCvvValid = (cvv) => {
    const cvvRegex = /^[0-9]{3}$/; // 3 chiffres
    return cvvRegex.test(cvv);
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setShowError(false);
    setShowSuccess(false);

    if (isCardValid(cardNumber) && isExpirationValid(expiration) && isCvvValid(cvv)) {
      setShowSuccess(true);
      setOpenPopup(true);
      createOrder({
        productName: "Commande de produits",
        orderId: "#" + Math.floor(Math.random() * 1000),
        date: new Date().toLocaleDateString(),
        customerName: "Julien",
        status: "En attente",
        amount: "XXX.XX€",
      })
      setTimeout(() => navigate("/home"), 5000); // Retourne à la page /home après 5 secondes
    } else {
      setShowError(true);
    }
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
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
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: 3, color: "#4E342E" }}
      >
        Paiement
      </Typography>

      {showSuccess ? (
        <>
          <img src={successGif} alt="Validation" width={200} />
          <Dialog open={openPopup} onClose={handleClosePopup}>
            <DialogTitle>Paiement Confirmé</DialogTitle>
            <DialogContent>
              <Typography>
                Votre paiement a été effectué avec succès. Vous serez redirigé vers
                la page principale dans 5 secondes.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePopup} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : showError ? (
        <>
          <img src={errorGif} alt="Erreur" width={200} />
          <Typography color="error" sx={{ marginTop: 2 }}>
            Veuillez vérifier vos informations de paiement.
          </Typography>
          <Typography
            onClick={() => setShowError(false)}
            sx={{
              marginTop: 3,
              fontSize: "0.9rem",
              cursor: "pointer",
              color: "#4E342E",
              textDecoration: "underline",
            }}
          >
            Retour à la page de paiement
          </Typography>
        </>
      ) : (
        <Box
          component="form"
          onSubmit={handlePayment}
          sx={{
            width: "100%",
            maxWidth: 400,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            placeholder="Numéro de Carte Bancaire"
            variant="outlined"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <TextField
            placeholder="Date d'Expiration (MM/AA)"
            variant="outlined"
            fullWidth
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            required
          />
          <TextField
            placeholder="CVV"
            variant="outlined"
            fullWidth
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            required
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              backgroundColor: "#5A3A29",
              color: "#FFF",
              padding: "10px",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#4E342E" },
            }}
          >
            Valider le Paiement
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PaymentProcessPage;
