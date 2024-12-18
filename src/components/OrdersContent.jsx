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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import useOrders from "../hooks/useOrders";

const OrdersContent = () => {
  const {orders} = useOrders();
  const { t } = useTranslation();
  

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: "#fff" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        {t("ordersPage.title")}
      </Typography>

      <Paper sx={{ p: 3, borderRadius: "10px", backgroundColor: "#f9f9f9" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          {t("ordersPage.recentPurchases")}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {t("ordersPage.product")}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {t("ordersPage.orderId")}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {t("ordersPage.date")}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {t("ordersPage.customerName")}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {t("ordersPage.status")}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                {t("ordersPage.amount")}
              </TableCell>
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
                          order.status === "delivered"
                            ? "blue"
                            : order.status === "pending"
                            ? "orange"
                            : "red",
                        mr: 1,
                      }}
                    />
                    {t(`ordersPage.statusOptions.${order.status.toLowerCase()}`)}
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