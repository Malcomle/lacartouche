import React from 'react';
import { Box, Typography, Container, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, IconButton, Grid, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useOrders from '../hooks/useOrders';
import { useTranslation } from 'react-i18next';

const OrdersPage = () => {
  const orders = useOrders();
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: '#fff', minHeight: '100vh', ml: '240px', p: 3 }}>
      {/* Titre principal */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
        {t('ordersPage.title')}
      </Typography>

      <Paper sx={{ p: 3, borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          {t('ordersPage.recentPurchases')}
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('ordersPage.product')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('ordersPage.orderId')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('ordersPage.date')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('ordersPage.customerName')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('ordersPage.status')}</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>{t('ordersPage.amount')}</TableCell>
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

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Box>
            <Button variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>1</Button>
            <Button variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>2</Button>
            <Button variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>3</Button>
            <Typography component="span" variant="body2" sx={{ mx: 1 }}>...</Typography>
            <Button variant="outlined" sx={{ borderRadius: '20px', mr: 1 }}>10</Button>
          </Box>
          <Button variant="outlined" sx={{ borderRadius: '20px', textTransform: 'none' }}>
            {t('ordersPage.next')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OrdersPage;