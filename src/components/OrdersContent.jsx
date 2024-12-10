// src/pages/OrdersContent.jsx
import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  IconButton,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useOrders from "../hooks/useOrders";

const OrdersContent = () => {
  const orders = useOrders();

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#fff" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Lista de pedidos
      </Typography>

      <Paper sx={{ p: 3, borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Compras recientes
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Número ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Fecha</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Nombre del cliente
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Importe</TableCell>
              <TableCell padding="checkbox"></TableCell>
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor:
                          order.status === "Delivered" ? "blue" : "orange",
                        mr: 1,
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
    </Box>
  );
};

export default OrdersContent;