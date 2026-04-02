import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";

export default function Messages({ path, onClose }) {
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
        <ChatIcon />
      </ListItemIcon>
      <ListItemText primary="Messages" sx={{ ml: -1 }} />
    </ListItemButton>
  );
}
