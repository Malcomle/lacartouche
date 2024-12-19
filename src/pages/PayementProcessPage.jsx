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
import { useTranslation } from "react-i18next";

const PaymentProcessPage = () => {
  const { t } = useTranslation();
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const successGif = "/images/success.gif";
  const errorGif = "/images/error.gif";

  const isCardValid = (number) => {
    const cardRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
    return cardRegex.test(number.replace(/\s/g, ""));
  };

  const isExpirationValid = (date) => {
    const expirationRegex = /^(0[1-9]|1[0-2])\/[0-9]{2}$/;
    return expirationRegex.test(date);
  };

  const isCvvValid = (cvv) => {
    const cvvRegex = /^[0-9]{3}$/;
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
        productName: t("paymentPage.orderName"),
        orderId: "#" + Math.floor(Math.random() * 1000),
        date: new Date().toLocaleDateString(),
        customerName: "Julien",
        status: "En attente",
        amount: "19.99",
      });
      setTimeout(() => navigate("/home"), 5000);
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
        {t("paymentPage.title")}
      </Typography>

      {showSuccess ? (
        <>
          <img src={successGif} alt="Validation" width={200} />
          <Dialog open={openPopup} onClose={handleClosePopup}>
            <DialogTitle>{t("paymentPage.successTitle")}</DialogTitle>
            <DialogContent>
              <Typography>
                {t("paymentPage.successMessage")}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePopup} color="primary">
                {t("paymentPage.successConfirm")}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : showError ? (
        <>
          <img src={errorGif} alt="Erreur" width={200} />
          <Typography color="error" sx={{ marginTop: 2 }}>
            {t("paymentPage.errorMessage")}
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
            {t("paymentPage.errorReturn")}
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
            placeholder={t("paymentPage.cardNumber")}
            variant="outlined"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
          />
          <TextField
            placeholder={t("paymentPage.expirationDate")}
            variant="outlined"
            fullWidth
            value={expiration}
            onChange={(e) => setExpiration(e.target.value)}
            required
          />
          <TextField
            placeholder={t("paymentPage.cvv")}
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
            {t("paymentPage.validatePayment")}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default PaymentProcessPage;