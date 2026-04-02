import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Badge,
  Divider,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: 0,
      name: "Analytics Team",
      avatar: "AT",
      color: "#667eea",
      lastMessage: "The Q4 report looks great!",
      time: "10:30 AM",
      unread: 2,
      online: true,
      messages: [
        {
          id: 1,
          sender: "Analytics Team",
          text: "Hey team, I've uploaded the new analytics dashboard",
          time: "10:00 AM",
          isMe: false,
        },
        {
          id: 2,
          sender: "Me",
          text: "Great! Let me check it out",
          time: "10:15 AM",
          isMe: true,
        },
        {
          id: 3,
          sender: "Analytics Team",
          text: "The Q4 report looks great!",
          time: "10:30 AM",
          isMe: false,
        },
      ],
    },
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "SJ",
      color: "#4caf50",
      lastMessage: "Can you review the sales data?",
      time: "9:45 AM",
      unread: 0,
      online: true,
      messages: [
        {
          id: 1,
          sender: "Sarah Johnson",
          text: "Hi! Can you review the sales data?",
          time: "9:45 AM",
          isMe: false,
        },
        {
          id: 2,
          sender: "Me",
          text: "Sure, I'll take a look",
          time: "9:50 AM",
          isMe: true,
        },
      ],
    },
    {
      id: 2,
      name: "System Alerts",
      avatar: "SA",
      color: "#ff9800",
      lastMessage: "New user milestone achieved!",
      time: "Yesterday",
      unread: 5,
      online: false,
      messages: [
        {
          id: 1,
          sender: "System Alerts",
          text: "New user milestone achieved! 10,000 users",
          time: "Yesterday",
          isMe: false,
        },
        {
          id: 2,
          sender: "System Alerts",
          text: "Revenue target is 85% complete",
          time: "Yesterday",
          isMe: false,
        },
      ],
    },
    {
      id: 3,
      name: "Marketing Dept",
      avatar: "MD",
      color: "#9c27b0",
      lastMessage: "Campaign performance is up 25%",
      time: "Yesterday",
      unread: 0,
      online: false,
      messages: [
        {
          id: 1,
          sender: "Marketing Dept",
          text: "Campaign performance is up 25%",
          time: "Yesterday",
          isMe: false,
        },
      ],
    },
  ];

  const currentChat = conversations[selectedChat];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Team Messages
        </Typography>
        <Badge badgeContent={12} color="error">
          <NotificationsActiveIcon
            sx={{ color: "#667eea", cursor: "pointer" }}
          />
        </Badge>
      </Box>

      <Grid container spacing={3}>
        {/* Conversations List - Left Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              height: "calc(100vh - 200px)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Search Bar */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: "#e0e0e0" }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search conversations..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Conversations List */}
            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {conversations.map((conv) => (
                <ListItem
                  key={conv.id}
                  button
                  selected={selectedChat === conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  sx={{
                    mb: 0.5,
                    transition: "all 0.2s",
                    "&:hover": { bgcolor: "#f5f5f5" },
                    "&.Mui-selected": {
                      bgcolor: "#e3f2fd",
                      borderRight: 3,
                      borderColor: "#667eea",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      variant="dot"
                      color={conv.online ? "success" : "default"}
                    >
                      <Avatar sx={{ bgcolor: conv.color }}>
                        {conv.avatar}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
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
                          {conv.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conv.time}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: "0.8rem" }}
                        >
                          {conv.lastMessage}
                        </Typography>
                        {conv.unread > 0 && (
                          <Chip
                            label={conv.unread}
                            size="small"
                            color="primary"
                            sx={{ height: 20, minWidth: 20 }}
                          />
                        )}
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Chat Area - Right Side */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              height: "calc(100vh - 200px)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            {/* Chat Header */}
            <Box
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: "#e0e0e0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#fafafa",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar sx={{ bgcolor: currentChat.color }}>
                  {currentChat.avatar}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {currentChat.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {currentChat.online ? "Online" : "Offline"}
                  </Typography>
                </Box>
              </Box>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Box>

            {/* Messages Area */}
            <Box sx={{ flex: 1, overflowY: "auto", p: 3, bgcolor: "#f9f9f9" }}>
              {currentChat.messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: "flex",
                    justifyContent: message.isMe ? "flex-end" : "flex-start",
                    mb: 2,
                  }}
                >
                  {!message.isMe && (
                    <Avatar
                      sx={{
                        bgcolor: currentChat.color,
                        width: 32,
                        height: 32,
                        mr: 1,
                      }}
                    >
                      {currentChat.avatar}
                    </Avatar>
                  )}
                  <Paper
                    sx={{
                      p: 1.5,
                      maxWidth: "70%",
                      bgcolor: message.isMe ? "#667eea" : "#ffffff",
                      color: message.isMe ? "#ffffff" : "#000000",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        textAlign: "right",
                        mt: 0.5,
                        color: message.isMe ? "#rgba(255,255,255,0.7)" : "#999",
                      }}
                    >
                      {message.time}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Box
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: "#e0e0e0",
                bgcolor: "#ffffff",
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <IconButton>
                  <EmojiEmotionsIcon />
                </IconButton>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  sx={{ flex: 1 }}
                />
                <IconButton
                  onClick={handleSendMessage}
                  sx={{
                    bgcolor: "#667eea",
                    color: "white",
                    "&:hover": { bgcolor: "#764ba2" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Analytics Summary Cards */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <ChatIcon sx={{ color: "#667eea", fontSize: 40 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                24
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Messages Today
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <GroupIcon sx={{ color: "#4caf50", fontSize: 40 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                8
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Conversations
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <TrendingUpIcon sx={{ color: "#ff9800", fontSize: 40 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                +32%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Message Increase
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <CheckCircleIcon sx={{ color: "#9c27b0", fontSize: 40 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                98%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Response Rate
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
