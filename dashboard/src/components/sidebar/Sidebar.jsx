import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { Link } from "react-router-dom";
import Reports from "../Reports";
import Messages from "../Messages";
import Notifications from "../Notifications";
import Help from "../Help";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";

// Custom menu item components

export default function Sidebar({ open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerContent = (
    <Box
      sx={{
        width: 240,
        p: 2,
        backgroundColor: "#1e1e1e",
        height: "100%",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ mb: 3 }}>
        Fitwi Dashboard
      </Typography>

      <List>
        {/* OVERVIEW */}
        <ListItemButton
          component={Link}
          to="/"
          onClick={onClose}
          sx={{
            mb: 0.5,
            borderRadius: 2,
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#2c2c2c",
              transform: "translateX(5px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Overview" sx={{ ml: -1 }} />
        </ListItemButton>

        {/* ANALYTICS */}
        <ListItemButton
          component={Link}
          to="/analytics"
          onClick={onClose}
          sx={{
            mb: 0.5,
            borderRadius: 2,
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#2c2c2c",
              transform: "translateX(5px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" sx={{ ml: -1 }} />
        </ListItemButton>

        {/* USERS */}
        <ListItemButton
          component={Link}
          to="/users"
          onClick={onClose}
          sx={{
            mb: 0.5,
            borderRadius: 2,
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#2c2c2c",
              transform: "translateX(5px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" sx={{ ml: -1 }} />
        </ListItemButton>

        {/* SETTINGS */}
        <ListItemButton
          component={Link}
          to="/settings"
          onClick={onClose}
          sx={{
            mb: 0.5,
            borderRadius: 2,
            transition: "all 0.2s",
            "&:hover": {
              backgroundColor: "#2c2c2c",
              transform: "translateX(5px)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" sx={{ ml: -1 }} />
        </ListItemButton>

        {/* MODERN CUSTOM ITEMS */}
        <Reports path="/reports" onClose={onClose} />
        <Messages path="/messages" onClose={onClose} />
        <Notifications path="/notifications" onClose={onClose} />
        <Help path="/help" onClose={onClose} />
      </List>
    </Box>
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant={isMobile ? "temporary" : "persistent"}
      sx={{
        "& .MuiDrawer-paper": {
          width: 240,
          backgroundColor: "#1e1e1e",
          color: "white",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
