import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Modal,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const consejos = [
  {
    id: 1,
    image: "images/consejo1.png",
  },
  {
    id: 2,
    image: "images/consejo2.png",
  },
];

const ConsejosPage = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedConsejo, setSelectedConsejo] = useState(null);

  const handleOpen = (consejo) => {
    setSelectedConsejo(consejo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedConsejo(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        {t("consejosPage.title")}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        {t("consejosPage.subtitle")}
      </Typography>

      <Grid container spacing={6}>
        {consejos.map((consejo) => (
          <Grid item xs={12} md={6} key={consejo.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: 3,
              }}
            >
              <CardMedia
                component="img"
                alt={t(`consejosPage.posts.${consejo.id}.title`)}
                height="200"
                image={consejo.image}
                sx={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#000" }} gutterBottom>
                  {t(`consejosPage.posts.${consejo.id}.title`)}
                </Typography>
                <Typography variant="body2" sx={{ color: "#000" }} gutterBottom>
                  {t(`consejosPage.posts.${consejo.id}.description`)}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    marginTop: 2,
                    backgroundColor: "#5c3a21",
                    ":hover": { backgroundColor: "#8b5e34" },
                  }}
                  onClick={() => handleOpen(consejo)}
                >
                  {t("consejosPage.readMore")}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 24,
            padding: 4,
            maxWidth: "600px",
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          {selectedConsejo && (
            <>
              <Typography
                id="modal-title"
                variant="h5"
                sx={{ fontWeight: "bold", marginBottom: 2 }}
              >
                {t(`consejosPage.posts.${selectedConsejo.id.toString()}.title`)}
              </Typography>
              <Typography
                id="modal-description"
                variant="body1"
                sx={{ color: "#000", marginBottom: 2 }}
              >
                {t(`consejosPage.posts.${selectedConsejo.id.toString()}.fullText`)}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#5c3a21",
                  ":hover": { backgroundColor: "#8b5e34" },
                }}
                onClick={handleClose}
              >
                {t("consejosPage.close")}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ConsejosPage;