import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Grid,
  Paper,
  TextField,
  Card,
  CardContent,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetBillsQuery } from "../App/Services/BillApi";
import dayjs from "dayjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Analytics = () => {
  const { data: bills = [] } = useGetBillsQuery();
  const [filterType, setFilterType] = useState("date");
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));

  const filteredBills = useMemo(() => {
    return bills
      .filter((bill) => {
        const billDate = dayjs(bill.createdAt);
        return (
          billDate.isAfter(dayjs(startDate).startOf("day")) &&
          billDate.isBefore(dayjs(endDate).endOf("day"))
        );
      })
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [bills, startDate, endDate]);

  const aggregateBy = (callback, data) => {
    const map = new Map();
    data.forEach((bill) => {
      const label = callback(new Date(bill.createdAt));
      const prev = map.get(label) || 0;
      map.set(label, prev + bill.TotalBill);
    });
    const sorted = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    return {
      labels: sorted.map(([label]) => label),
      data: sorted.map(([, value]) => value),
    };
  };

  const getLabel = (dateObj) => {
    if (filterType === "date") return dateObj.toLocaleDateString();
    if (filterType === "month")
      return dateObj.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    return dateObj.getFullYear().toString();
  };

  const revenueByDate = useMemo(
    () => aggregateBy(getLabel, filteredBills),
    [filteredBills, filterType]
  );

  const itemCountByTime = useMemo(() => {
    const map = new Map();
    filteredBills.forEach((bill) => {
      const label = getLabel(new Date(bill.createdAt));
      const count = bill.billItems.reduce((acc, item) => acc + item.quantity, 0);
      map.set(label, (map.get(label) || 0) + count);
    });
    const sorted = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    return {
      labels: sorted.map(([label]) => label),
      data: sorted.map(([, value]) => value),
    };
  }, [filteredBills, filterType]);

  const topItems = useMemo(() => {
    const itemMap = new Map();
    filteredBills.forEach((bill) => {
      bill.billItems.forEach((item) => {
        itemMap.set(item.name, (itemMap.get(item.name) || 0) + item.quantity);
      });
    });
    const sorted = [...itemMap.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
    return {
      labels: sorted.map(([label]) => label),
      data: sorted.map(([, value]) => value),
    };
  }, [filteredBills]);

  const summary = useMemo(() => {
    const totalRevenue = filteredBills.reduce((acc, bill) => acc + bill.TotalBill, 0);
    const totalItems = filteredBills.reduce(
      (acc, bill) => acc + bill.billItems.reduce((iAcc, item) => iAcc + item.quantity, 0),
      0
    );
    return { totalRevenue, totalItems };
  }, [filteredBills]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Box p={2}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Analytics Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} justifyContent="center" alignItems="center" mb={2}>
        <Grid item xs={12} sm={3}>
          <Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            fullWidth
            size="small"
          >
            <MenuItem value="date">By Date</MenuItem>
            <MenuItem value="month">By Month</MenuItem>
            <MenuItem value="year">By Year</MenuItem>
          </Select>
        </Grid>

        {filterType === "date" && (
          <>
            <Grid item xs={6} sm={3}>
              <TextField
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="small"
                fullWidth
              />
            </Grid>
          </>
        )}

        {filterType === "month" && (
          <>
            <Grid item xs={6} sm={3}>
              <TextField
                type="month"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="month"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                size="small"
                fullWidth
              />
            </Grid>
          </>
        )}

        {filterType === "year" && (
          <>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                value={dayjs(startDate).year()}
                onChange={(e) =>
                  setStartDate(dayjs(`${e.target.value}-01-01`).format("YYYY-MM-DD"))
                }
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                type="number"
                value={dayjs(endDate).year()}
                onChange={(e) =>
                  setEndDate(dayjs(`${e.target.value}-12-31`).format("YYYY-MM-DD"))
                }
                size="small"
                fullWidth
              />
            </Grid>
          </>
        )}
      </Grid>

      {/* Summary Card */}
      <Card sx={{ mb: 3, backgroundColor: "#f1f8e9", mx: "auto", maxWidth: 500 }}>
        <CardContent>
          <Typography variant="h6">Summary</Typography>
          <Typography>Total Revenue: ₹{summary.totalRevenue.toFixed(2)}</Typography>
          <Typography>Total Items Sold: {summary.totalItems}</Typography>
        </CardContent>
      </Card>

      {/* Graphs */}
      <Grid container spacing={2} justifyContent="center">
  <Grid item xs={12} md={6}>
    <Box display="flex" justifyContent="center">
      <Paper sx={{ p: 2, height: 300, width: "100%", maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>Revenue Analysis</Typography>
        <Bar
          data={{
            labels: revenueByDate.labels,
            datasets: [{
              label: "Total Revenue",
              data: revenueByDate.data,
              backgroundColor: "#1976d2",
            }],
          }}
          options={chartOptions}
        />
      </Paper>
    </Box>
  </Grid>

  <Grid item xs={12} md={6}>
    <Box display="flex" justifyContent="center">
      <Paper sx={{ p: 2, height: 300, width: "100%", maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>Items Sold Over Time</Typography>
        <Bar
          data={{
            labels: itemCountByTime.labels,
            datasets: [{
              label: "Items Sold",
              data: itemCountByTime.data,
              backgroundColor: "#2e7d32",
            }],
          }}
          options={chartOptions}
        />
      </Paper>
    </Box>
  </Grid>

  <Grid item xs={12} md={6}>
    <Box display="flex" justifyContent="center">
      <Paper sx={{ p: 2, height: 300, width: "100%", maxWidth: 500 }}>
        <Typography variant="h6" gutterBottom>Top Selling Items</Typography>
        <Bar
          data={{
            labels: topItems.labels,
            datasets: [{
              label: "Quantity",
              data: topItems.data,
              backgroundColor: "#ff7043",
            }],
          }}
          options={{ ...chartOptions, plugins: { legend: { display: false } } }}
        />
      </Paper>
    </Box>
  </Grid>
</Grid>

    </Box>
  );
};

export default Analytics;
