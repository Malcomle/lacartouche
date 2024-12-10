// src/pages/OrdersPage.jsx
import React from 'react';
import { Box, Typography, Container, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, IconButton, Grid, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useOrders from '../hooks/useOrders';

const OrdersPage = () => {
  const orders = useOrders();

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', ml: '240px', p: 3 }}>
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
      {/* Titre principal */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        Lista de pedidos
      </Typography>

      <Paper sx={{ p: 3, borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Compras recientes
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Producto</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Número ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre del cliente</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Importe</TableCell>
                <TableCell padding="checkbox" />
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={index} hover>
                  <TableCell padding="checkbox">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{order.productName}</TableCell>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    {/* On peut customiser le status avec un petit point de couleur */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: order.status === 'Delivered' ? 'blue' : 'orange',
                          mr: 1
                        }}
                      />
                      {order.status}
                    </Box>
                  </TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell padding="checkbox">
                    <IconButton size="small">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        {/* Pagination (exemple simplifié) */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box>
            <Button variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>1</Button>
            <Button variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>2</Button>
            <Button variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>3</Button>
            <Typography component="span" variant="body2" sx={{ mx: 1 }}>...</Typography>
            <Button variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>10</Button>
          </Box>
          <Button variant="outlined" sx={{ borderRadius: '20px', textTransform: 'none' }}>
            SIGUIENTE &gt;
          </Button>
        </Box>

      </Paper>
    </Box>
  );
};

export default OrdersPage;