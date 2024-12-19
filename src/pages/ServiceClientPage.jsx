import React from "react";
import { Box, Typography, Card, CardContent, Grid, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const ServiceClientPage = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ padding: 4 }}>
      {/* En-tête de la page */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        {t("customerSupportPage.title")}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        {t("customerSupportPage.subtitle")}
      </Typography>

      <Grid container spacing={4}>
        {/* Informations de contact */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {t("customerSupportPage.addressTitle")}
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                {t("customerSupportPage.address")}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {t("customerSupportPage.contactTitle")}
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                {t("customerSupportPage.phone")}
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {t("customerSupportPage.hoursTitle")}
              </Typography>
              <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                <li>{t("customerSupportPage.hours.mondayThursday")}</li>
                <li>{t("customerSupportPage.hours.friday")}</li>
                <li>{t("customerSupportPage.hours.saturday")}</li>
                <li>{t("customerSupportPage.hours.sunday")}</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte interactive */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                {t("customerSupportPage.locationTitle")}
              </Typography>
              <iframe
                title={t("customerSupportPage.locationIframeTitle")}
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.555513%2C47.468655%2C-0.551513%2C47.472655&amp;layer=mapnik&amp;marker=47.470655%2C-0.553513"
                width="100%"
                height="250"
                style={{ border: "1px solid #ccc", borderRadius: "8px" }}
                loading="lazy"
              ></iframe>
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: "#5c3a21",
                  ":hover": { backgroundColor: "#8b5e34" },
                }}
                onClick={() =>
                  window.open(
                    "https://www.openstreetmap.org/?mlat=47.470655&mlon=-0.553513#map=17/47.4707/-0.5535",
                    "_blank"
                  )
                }
              >
                {t("customerSupportPage.viewFullMap")}
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceClientPage;