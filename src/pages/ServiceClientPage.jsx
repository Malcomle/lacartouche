import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";

const ServiceClientPage = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* En-tête de la page */}
      <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        Atención al Cliente - La Cartouche
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: 4 }}>
        En La Cartouche, estamos aquí para ayudarte con cualquier duda sobre
        productos, pedidos o envíos. No dudes en contactarnos o visitarnos.
      </Typography>

      {/* Contenu principal */}
      <Grid container spacing={4}>
        {/* Informations de contact */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Dirección
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                9 Rue Saint-Étienne, 49100 Angers, Francia
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Contacto
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Teléfono: 08 50 50 29 32 (Servicio de pago)
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Horarios de Apertura
              </Typography>
              <ul style={{ marginTop: "8px", paddingLeft: "16px" }}>
                <li>Lunes a Jueves: 7:30 - 20:00</li>
                <li>Viernes: 7:30 - 21:00</li>
                <li>Sábado: 8:00 - 22:00</li>
                <li>Domingo: 11:00 - 20:00</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Carte interactive */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2 }}>
                Ubicación
              </Typography>
              <iframe
                title="Ubicación de La Cartouche"
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
                Ver en mapa completo
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceClientPage;
