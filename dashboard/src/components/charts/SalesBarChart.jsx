// import { Paper, Typography } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { name: "Mon", sales: 120 },
//   { name: "Tue", sales: 200 },
//   { name: "Wed", sales: 150 },
//   { name: "Thu", sales: 300 },
//   { name: "Fri", sales: 250 },
//   { name: "Sat", sales: 400 },
//   { name: "Sun", sales: 180 },
// ];

// export default function SalesBarChart() {
//   return (
//     <Paper sx={{ p: 3, height: 400 }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Weekly Sales
//       </Typography>

//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="sales" fill="#1976d2" />
//         </BarChart>
//       </ResponsiveContainer>
//     </Paper>
//   );
// }
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

// Sample weekly sales data
const data = [
  { name: "Mon", sales: 120 },
  { name: "Tue", sales: 200 },
  { name: "Wed", sales: 150 },
  { name: "Thu", sales: 300 },
  { name: "Fri", sales: 250 },
  { name: "Sat", sales: 400 },
  { name: "Sun", sales: 180 },
];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl bg-white p-3 shadow-lg border text-sm">
        <p className="font-semibold">{label}</p>
        <p className="text-gray-600">Sales: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function SalesBarChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ height: "100%" }}
    >
      <Card
        className="p-4 h-full rounded-2xl shadow-md"
        style={{ height: "100%" }}
      >
        <CardHeader>
          <CardTitle className="text-lg">Weekly Sales</CardTitle>
        </CardHeader>

        <CardContent className="h-full" style={{ height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="sales"
                fill="url(#gradient)"
                radius={[6, 6, 0, 0]}
              />

              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
