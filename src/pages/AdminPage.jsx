import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  CardContent,
  IconButton,
  Paper,
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CustomLineChart from "../components/CustomLineChart";

const drawerWidth = 240;

const AdminPage = () => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* AppBar déjà gérée au niveau global, donc on part du principe qu’elle est au-dessus */}

      {/* Drawer latéral (menu) */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "grey.main",
            color: "#000",
            position: "fixed", // Le Drawer reste fixe
            height: "90vh", // Prend toute la hauteur de la fenêtre
            top: 30, // Au top de la page
            left: 0, // Aligné à gauche
          },
        }}
      >
        <Toolbar /> {/* Permet de laisser l'espace sous l'AppBar */}
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItemButton
              sx={{
                backgroundColor: "primary.main",
                borderRadius: "10px",
                width: "auto", // Ne pas occuper toute la largeur
                px: 2, // Un peu de padding horizontal
                py: 1, // Un peu de padding vertical
                alignSelf: "flex-start", // Pour qu'il ne s'étire pas
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: "unset", mr: 1 }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText
                primary="CUADRO DE MANDOS"
                sx={{ whiteSpace: "nowrap", color: "#fff" }}
              />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon sx={{ color: "#000" }}>
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText primary="TODOS LOS PRODUCTOS" />
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon sx={{ color: "#000" }}>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="LISTA DE PEDIDOS" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Contenu principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: "#fff" }}>
        <Toolbar /> {/* Laisse l'espace pour l'AppBar */}
        {/* Contenu admin (exemple cartes + graphiques) */}
        <Container maxWidth="xl">
          <Grid container spacing={2} mb={4}>
            {[
              { title: "Total de olores", amount: "XXX€", growth: "34.7%" },
              { title: "Órdenes activas", amount: "XXX€", growth: "34.7%" },
              { title: "Pedidos completados", amount: "XXX€", growth: "34.7%" },
              {
                title: "Pedidos de devolución",
                amount: "XXX€",
                growth: "34.7%",
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{ borderRadius: "10px", p: 2, position: "relative" }}
                >
                  <CardContent>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", mb: 1 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {item.amount}
                    </Typography>
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ color: "success.main", mt: 1 }}
                    >
                      <ArrowUpwardIcon fontSize="small" />
                      <Typography variant="body2" sx={{ ml: 0.5 }}>
                        {item.growth}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      sx={{ position: "absolute", top: 8, right: 8 }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </CardContent>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Gráfico de ventas
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  p: 3,
                }}
              >
                <CustomLineChart />
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Los más vendidos
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#f9f9f9",
                  borderRadius: "10px",
                  p: 3,
                }}
              >
                {[...Array(5)].map((_, i) => (
                  <Box
                    key={i}
                    sx={{ display: "flex", alignItems: "center", mb: 2 }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#ccc",
                        borderRadius: "5px",
                        mr: 2,
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Lorem Ipsum
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        XX ventas
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      XXX.XX€
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPage;
