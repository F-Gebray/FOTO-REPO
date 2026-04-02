import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Button,
  Tabs,
  Tab,
  Badge,
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import UpdateIcon from "@mui/icons-material/Update";
import { useState } from "react";

export default function NotificationsPage() {
  const [tabValue, setTabValue] = useState(0);

  const notifications = {
    unread: [
      {
        id: 1,
        title: "Monthly Goal Achieved",
        message: "You've reached 100% of your user engagement target!",
        time: "2 hours ago",
        type: "success",
        icon: <CheckCircleIcon />,
      },
      {
        id: 2,
        title: "Revenue Milestone",
        message: "$100K revenue milestone reached! Congratulations!",
        time: "5 hours ago",
        type: "info",
        icon: <TrendingUpIcon />,
      },
      {
        id: 3,
        title: "Unusual Activity Detected",
        message: "Anomaly detected in traffic patterns. Review analytics.",
        time: "1 day ago",
        type: "warning",
        icon: <WarningIcon />,
      },
    ],
    read: [
      {
        id: 4,
        title: "System Update",
        message: "Dashboard has been updated with new features",
        time: "2 days ago",
        type: "info",
        icon: <UpdateIcon />,
      },
      {
        id: 5,
        title: "Top Performer",
        message: "Your dashboard is in top 5% for engagement",
        time: "3 days ago",
        type: "success",
        icon: <EmojiEventsIcon />,
      },
    ],
  };

  const stats = [
    {
      title: "Total Notifications",
      value: "24",
      icon: <NotificationsActiveIcon />,
      color: "#667eea",
    },
    { title: "Unread", value: "12", icon: <BadgeIcon />, color: "#ff9800" },
    {
      title: "Achievements",
      value: "8",
      icon: <EmojiEventsIcon />,
      color: "#4caf50",
    },
    {
      title: "Actions Required",
      value: "3",
      icon: <WarningIcon />,
      color: "#f44336",
    },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header */}
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
        Notifications
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                textAlign: "center",
                bgcolor: stat.color,
                color: "white",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-5px)" },
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
                {stat.icon}
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                  {stat.value}
                </Typography>
              </Box>
              <Typography variant="body2">{stat.title}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, v) => setTabValue(v)}
          sx={{ borderBottom: 1, borderColor: "#e0e0e0" }}
        >
          <Tab label={`Unread (${notifications.unread.length})`} />
          <Tab label={`Read (${notifications.read.length})`} />
          <Tab label="All Notifications" />
        </Tabs>

        {/* Unread Tab */}
        {tabValue === 0 && (
          <List sx={{ p: 0 }}>
            {notifications.unread.map((notif) => (
              <ListItem
                key={notif.id}
                sx={{
                  borderBottom: 1,
                  borderColor: "#f0f0f0",
                  "&:hover": { bgcolor: "#f5f5f5" },
                }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      color:
                        notif.type === "success"
                          ? "#4caf50"
                          : notif.type === "warning"
                            ? "#ff9800"
                            : "#667eea",
                    }}
                  >
                    {notif.icon}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold" }}
                      >
                        {notif.title}
                      </Typography>
                      <Chip label="New" size="small" color="error" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {notif.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notif.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}

        {/* Read Tab */}
        {tabValue === 1 && (
          <List sx={{ p: 0 }}>
            {notifications.read.map((notif) => (
              <ListItem
                key={notif.id}
                sx={{
                  borderBottom: 1,
                  borderColor: "#f0f0f0",
                  "&:hover": { bgcolor: "#f5f5f5" },
                  opacity: 0.8,
                }}
              >
                <ListItemIcon>
                  <Box
                    sx={{
                      color: notif.type === "success" ? "#4caf50" : "#667eea",
                    }}
                  >
                    {notif.icon}
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={notif.title}
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {notif.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notif.time}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      {/* Mark All Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          sx={{ color: "#667eea", borderColor: "#667eea" }}
        >
          Mark All as Read
        </Button>
      </Box>
    </Box>
  );
}

// Badge Icon component
function BadgeIcon() {
  return (
    <Box component="span" sx={{ fontSize: 24 }}>
      🔔
    </Box>
  );
}
