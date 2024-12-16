import React from "react";
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
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { styled } from "@mui/system";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  width: "100%",
  display: "flex",
  alignItems: "center",
});

const AdminPage = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const getButtonStyles = (path) => {
    return location.pathname === path
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

  const getIconStyles = (path) => {
    return location.pathname === path
      ? { color: "#fff" }
      : { color: "#000" };
  };

  const getTextStyles = (path) => {
    return location.pathname === path ? { color: "#fff" } : { color: "#000" };
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
            <ListItemButton
              component={StyledLink}
              to="/admin/dashboard"
              sx={{
                ...getButtonStyles("/admin/dashboard"),
                borderRadius: "10px",
                px: 2,
                py: 1,
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ ...getIconStyles("/admin/dashboard"), minWidth: "unset", mr: 1 }}>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("adminPage.dashboard")}
                sx={{ ...getTextStyles("/admin/dashboard") }}
              />
            </ListItemButton>

            <ListItemButton
              component={StyledLink}
              to="/admin/products"
              sx={{
                ...getButtonStyles("/admin/products"),
                borderRadius: "10px",
                px: 2,
                py: 1,
                mb: 1,
              }}
            >
              <ListItemIcon sx={{ ...getIconStyles("/admin/products"), minWidth: "unset", mr: 1 }}>
                <Inventory2Icon />
              </ListItemIcon>
              <ListItemText
                primary={t("adminPage.products")}
                sx={{ ...getTextStyles("/admin/products") }}
              />
            </ListItemButton>

            <ListItemButton
              component={StyledLink}
              to="/admin/orders"
              sx={{
                ...getButtonStyles("/admin/orders"),
                borderRadius: "10px",
                px: 2,
                py: 1,
              }}
            >
              <ListItemIcon sx={{ ...getIconStyles("/admin/orders"), minWidth: "unset", mr: 1 }}>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText
                primary={t("adminPage.orders")}
                sx={{ ...getTextStyles("/admin/orders") }}
              />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          {/* Ici, le contenu dépendra de la route enfant */}
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default AdminPage;