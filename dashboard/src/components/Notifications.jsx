import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

export default function Notifications({ path, onClose }) {
  return (
    <ListItemButton
      component={Link}
      to={path}
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
        <NotificationsIcon />
      </ListItemIcon>
      <ListItemText primary="Notifications" sx={{ ml: -1 }} />
    </ListItemButton>
  );
}
