import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import RefreshIcon from "@mui/icons-material/Refresh";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import { useState } from "react";

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("monthly");

  const reportData = {
    summary: [
      {
        title: "Total Revenue",
        value: "$98,200",
        change: "+12.5%",
        trend: "up",
        icon: <AttachMoneyIcon />,
      },
      {
        title: "Total Orders",
        value: "1,240",
        change: "+8.3%",
        trend: "up",
        icon: <ShoppingCartIcon />,
      },
      {
        title: "Active Users",
        value: "8,432",
        change: "+5.2%",
        trend: "up",
        icon: <PeopleIcon />,
      },
      {
        title: "Conversion Rate",
        value: "4.8%",
        change: "-0.3%",
        trend: "down",
        icon: <TrendingUpIcon />,
      },
    ],
    recentOrders: [
      {
        id: "#ORD-001",
        customer: "John Doe",
        amount: "$245.00",
        status: "Completed",
        date: "2024-01-15",
      },
      {
        id: "#ORD-002",
        customer: "Jane Smith",
        amount: "$189.50",
        status: "Processing",
        date: "2024-01-15",
      },
      {
        id: "#ORD-003",
        customer: "Mike Johnson",
        amount: "$567.00",
        status: "Completed",
        date: "2024-01-14",
      },
      {
        id: "#ORD-004",
        customer: "Sarah Williams",
        amount: "$123.00",
        status: "Pending",
        date: "2024-01-14",
      },
      {
        id: "#ORD-005",
        customer: "Robert Brown",
        amount: "$892.00",
        status: "Completed",
        date: "2024-01-13",
      },
    ],
    topProducts: [
      { name: "Premium Plan", sales: 245, revenue: "$24,500", growth: "+15%" },
      { name: "Pro Dashboard", sales: 189, revenue: "$18,900", growth: "+22%" },
      {
        name: "Analytics Add-on",
        sales: 156,
        revenue: "$15,600",
        growth: "+8%",
      },
      { name: "Team Package", sales: 98, revenue: "$9,800", growth: "+5%" },
    ],
  };

  return (
    <Box sx={{ mt: 4 }}>
      {" "}
      {/* Add margin-top here */}
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Analytics Reports
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>

          <Button variant="outlined" startIcon={<RefreshIcon />}>
            Refresh
          </Button>
          <Button variant="outlined" startIcon={<PrintIcon />}>
            Print
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Export Report
          </Button>
        </Box>
      </Box>
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {reportData.summary.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 3 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {item.title}
                </Typography>
                <Box
                  sx={{ color: item.trend === "up" ? "#4caf50" : "#f44336" }}
                >
                  {item.icon}
                </Box>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
                {item.value}
              </Typography>
              <Chip
                label={item.change}
                size="small"
                color={item.trend === "up" ? "success" : "error"}
                icon={
                  item.trend === "up" ? (
                    <TrendingUpIcon />
                  ) : (
                    <TrendingDownIcon />
                  )
                }
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Revenue Overview
            </Typography>
            <Box
              sx={{
                height: 300,
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Chart visualization will appear here
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: 4,
                  alignItems: "flex-end",
                  height: 200,
                }}
              >
                {[65, 75, 85, 70, 90, 80, 95].map((height, i) => (
                  <Box key={i} sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 40,
                        height: height,
                        bgcolor: "#667eea",
                        borderRadius: 1,
                        mb: 1,
                        transition: "height 0.3s",
                      }}
                    />
                    <Typography variant="caption">Week {i + 1}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
              Top Products
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Sales</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {product.name}
                        </Typography>
                        <Chip
                          label={product.growth}
                          size="small"
                          color="success"
                          sx={{ mt: 0.5, fontSize: "0.7rem" }}
                        />
                      </TableCell>
                      <TableCell align="right">{product.sales}</TableCell>
                      <TableCell align="right">{product.revenue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {/* Recent Orders Table */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Recent Orders
              </Typography>
              <Button size="small" color="primary">
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reportData.recentOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      sx={{ "&:hover": { bgcolor: "#fafafa" } }}
                    >
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {order.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.amount}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          color={
                            order.status === "Completed"
                              ? "success"
                              : order.status === "Processing"
                                ? "warning"
                                : "default"
                          }
                        />
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
