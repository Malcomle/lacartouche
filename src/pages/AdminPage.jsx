import React, { useState } from "react";
import {
  Box,
  Toolbar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
} from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardContent from "../components/DashboardContent";
import OrdersContent from "../components/OrdersContent";
import ProductsContent from "../components/ProductsContent";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const AdminPage = () => {
  const [selectedView, setSelectedView] = useState("dashboard");
  const { t } = useTranslation();

  const getButtonStyles = (view) => {
    return selectedView === view
      ? {
          backgroundColor: "primary.main",
          color: "#fff",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "#fff",
          },
        }
      : {
          backgroundColor: "transparent",
          color: "#000",
          "&:hover": {
            backgroundColor: "grey.300",
            color: "#000",
          },
        };
  };

  const getIconStyles = (view) => {
    return selectedView === view
      ? {
          color: "#fff",
        }
      : {
          color: "#000",
        };
  };

  const getTextStyles = (view) => {
    return selectedView === view ? { color: "#fff" } : { color: "#000" };
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#fff" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "grey.main",
            color: "#fff",
            position: "fixed",
            height: "100vh",
            top: 0,
            left: 0,
          },
        }}
      >
        <Toolbar /> {/* Espace sous l'AppBar */}
        <Box sx={{ overflow: "auto", padding: 2 }}>
          <List>
            {/* Dashboard */}
            <ListItemButton
              onClick={() => setSelectedView("dashboard")}
              sx={{
                ...getButtonStyles("dashboard"),
                borderRadius: "10px",
                width: "auto",
                px: 2,
                py: 1,
                mb: 1,
              }}
            >
              <ListItemIcon
                sx={{ ...getIconStyles("dashboard"), minWidth: "unset", mr: 1 }}
              >
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("adminPage.dashboard")}
                sx={{ ...getTextStyles("dashboard") }}
              />
            </ListItemButton>

            {/* Products */}
            <ListItemButton
              onClick={() => setSelectedView("products")}
              sx={{
                ...getButtonStyles("products"),
                borderRadius: "10px",
                width: "auto",
                px: 2,
                py: 1,
                mb: 1,
              }}
            >
              <ListItemIcon
                sx={{ ...getIconStyles("products"), minWidth: "unset", mr: 1 }}
              >
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText
                primary={t("adminPage.products")}
                sx={{ ...getTextStyles("products") }}
              />
            </ListItemButton>

            {/* Orders */}
            <ListItemButton
              onClick={() => setSelectedView("orders")}
              sx={{
                ...getButtonStyles("orders"),
                borderRadius: "10px",
                width: "auto",
                px: 2,
                py: 1,
              }}
            >
              <ListItemIcon
                sx={{ ...getIconStyles("orders"), minWidth: "unset", mr: 1 }}
              >
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("adminPage.orders")}
                sx={{ ...getTextStyles("orders") }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          {selectedView === "dashboard" && <DashboardContent />}
          {selectedView === "products" && <ProductsContent />}
          {selectedView === "orders" && <OrdersContent />}
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPage;