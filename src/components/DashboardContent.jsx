import React from 'react';
import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  CardContent,
  Typography,
  IconButton
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomLineChart from './CustomLineChart';
import { useTranslation } from 'react-i18next';

const DashboardContent = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ backgroundColor: "#fff" }}>
      <Toolbar /> {/* Laisse l'espace pour l'AppBar */}
      <Container maxWidth="xl">
        <Grid container spacing={2} mb={4}>
          {[
            { title: t('dashboard.totalEarnings'), amount: "XXX€", growth: "34.7%" },
            { title: t('dashboard.activeOrders'), amount: "XXX€", growth: "34.7%" },
            { title: t('dashboard.completedOrders'), amount: "XXX€", growth: "34.7%" },
            { title: t('dashboard.returnOrders'), amount: "XXX€", growth: "34.7%" },
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
              {t('dashboard.salesGraph')}
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
              {t('dashboard.bestSellers')}
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
                      {t('dashboard.sampleProduct')}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t('dashboard.sales', { count: i + 1 })}
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
  );
};

export default DashboardContent;