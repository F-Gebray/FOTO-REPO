// import { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Chip,
//   Badge,
//   Divider,
//   Button,
//   ListItem,
//   ListItemButton,
//   ListItemAvatar,
//   ListItemText,
//   Container,
//   Menu,
//   MenuItem,
//   Popover,
//   Snackbar,
//   Alert,
//   Drawer,
//   List,
//   keyframes,
// } from "@mui/material";
// import { io } from "socket.io-client";

// // Icons
// import SearchIcon from "@mui/icons-material/Search";
// import SendIcon from "@mui/icons-material/Send";
// import AttachFileIcon from "@mui/icons-material/AttachFile";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
// import DeleteIcon from "@mui/icons-material/Delete";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import ChatIcon from "@mui/icons-material/Chat";
// import GroupIcon from "@mui/icons-material/Group";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import PollIcon from "@mui/icons-material/Poll";
// import ImageIcon from "@mui/icons-material/Image";
// import DescriptionIcon from "@mui/icons-material/Description";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import CloseIcon from "@mui/icons-material/Close";
// import MarkunreadIcon from "@mui/icons-material/Markunread";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import CommentIcon from "@mui/icons-material/Comment";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";

// // Animations
// const pulse = keyframes`
//   0% {
//     transform: scale(1);
//     box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4);
//   }
//   70% {
//     transform: scale(1.05);
//     box-shadow: 0 0 0 10px rgba(102, 126, 234, 0);
//   }
//   100% {
//     transform: scale(1);
//     box-shadow: 0 0 0 0 rgba(102, 126, 234, 0);
//   }
// `;

// const slideIn = keyframes`
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// `;

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//     transform: scale(0.9);
//   }
//   to {
//     opacity: 1;
//     transform: scale(1);
//   }
// `;

// const bounce = keyframes`
//   0%, 100% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-10px);
//   }
// `;

// // Animated Horizontal card component
// const AnimatedHorizontalCard = ({ title, value, icon, color, index }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <Paper
//       elevation={0}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       sx={{
//         p: 1.5,
//         borderRadius: 2,
//         background: color,
//         border: "1px solid #e5e7eb",
//         display: "flex",
//         alignItems: "center",
//         gap: 1.5,
//         flex: 1,
//         minWidth: 0,
//         transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//         animation: `${slideIn} 0.5s ease-out ${index * 0.1}s backwards`,
//         transform: isHovered
//           ? "translateY(-4px) scale(1.02)"
//           : "translateY(0) scale(1)",
//         boxShadow: isHovered ? "0 8px 25px rgba(0,0,0,0.1)" : "none",
//         cursor: "pointer",
//         position: "relative",
//         overflow: "hidden",
//         "&::before": {
//           content: '""',
//           position: "absolute",
//           top: 0,
//           left: "-100%",
//           width: "100%",
//           height: "100%",
//           background:
//             "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
//           transition: "left 0.5s",
//         },
//         "&:hover::before": {
//           left: "100%",
//         },
//       }}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           animation: isHovered ? `${bounce} 0.5s ease` : "none",
//         }}
//       >
//         {icon}
//       </Box>
//       <Box sx={{ minWidth: 0 }}>
//         <Typography
//           variant="caption"
//           color="text.secondary"
//           sx={{ display: "block", whiteSpace: "nowrap" }}
//         >
//           {title}
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{
//             fontWeight: "bold",
//             lineHeight: 1.2,
//             transition: "all 0.3s ease",
//             color: isHovered ? "#667eea" : "inherit",
//           }}
//         >
//           {value}
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// const CURRENT_USER = "Me";

// // Built-in emoji list
// const EMOJIS = [
//   "😀",
//   "😃",
//   "😄",
//   "😁",
//   "😅",
//   "😂",
//   "🤣",
//   "😊",
//   "😇",
//   "🙂",
//   "🙃",
//   "😉",
//   "😌",
//   "😍",
//   "🥰",
//   "😘",
//   "😗",
//   "😙",
//   "😚",
//   "😋",
//   "😛",
//   "😝",
//   "😜",
//   "🤪",
//   "👍",
//   "👎",
//   "👌",
//   "✌️",
//   "🤞",
//   "❤️",
//   "🧡",
//   "💛",
//   "💚",
//   "💙",
//   "💜",
//   "💯",
// ];

// const INITIAL_CONVERSATIONS = [
//   {
//     id: 0,
//     name: "Analytics Team",
//     avatar: "AT",
//     color: "#667eea",
//     lastMessage: "The Q4 report looks great!",
//     time: "10:30 AM",
//     unread: 2,
//     online: true,
//   },
//   {
//     id: 1,
//     name: "Sarah Johnson",
//     avatar: "SJ",
//     color: "#4caf50",
//     lastMessage: "Can you review the sales data?",
//     time: "9:45 AM",
//     unread: 0,
//     online: true,
//   },
//   {
//     id: 2,
//     name: "System Alerts",
//     avatar: "SA",
//     color: "#ff9800",
//     lastMessage: "New user milestone achieved!",
//     time: "Yesterday",
//     unread: 5,
//     online: false,
//   },
//   {
//     id: 3,
//     name: "Marketing Dept",
//     avatar: "MD",
//     color: "#9c27b0",
//     lastMessage: "Campaign performance is up 25%",
//     time: "Yesterday",
//     unread: 0,
//     online: false,
//   },
//   {
//     id: 4,
//     name: "John Doe",
//     avatar: "JD",
//     color: "#f44336",
//     lastMessage: "Lunch today?",
//     time: "11:15 AM",
//     unread: 0,
//     online: true,
//   },
//   {
//     id: 5,
//     name: "Product Team",
//     avatar: "PT",
//     color: "#03a9f4",
//     lastMessage: "Feature release notes ready",
//     time: "12:00 PM",
//     unread: 3,
//     online: true,
//   },
//   {
//     id: 6,
//     name: "HR Department",
//     avatar: "HR",
//     color: "#ff5722",
//     lastMessage: "Submit reports by EOD",
//     time: "1:30 PM",
//     unread: 0,
//     online: false,
//   },
//   {
//     id: 7,
//     name: "Design Team",
//     avatar: "DT",
//     color: "#8bc34a",
//     lastMessage: "Logo updates uploaded",
//     time: "3:45 PM",
//     unread: 1,
//     online: true,
//   },
// ];

// // Sample notifications data
// const SAMPLE_NOTIFICATIONS = [
//   {
//     id: 1,
//     type: "message",
//     title: "New message from Analytics Team",
//     message: "The Q4 report looks great!",
//     time: "2 minutes ago",
//     read: false,
//     icon: <CommentIcon />,
//     color: "#667eea",
//   },
//   {
//     id: 2,
//     type: "mention",
//     title: "Sarah mentioned you",
//     message: "@Me can you review the sales data?",
//     time: "15 minutes ago",
//     read: false,
//     icon: <MarkunreadIcon />,
//     color: "#4caf50",
//   },
//   {
//     id: 3,
//     type: "alert",
//     title: "System Alert",
//     message: "New user milestone achieved! 🎉",
//     time: "1 hour ago",
//     read: true,
//     icon: <NotificationsActiveIcon />,
//     color: "#ff9800",
//   },
//   {
//     id: 4,
//     type: "reaction",
//     title: "John reacted to your message",
//     message: "👍 Liked your message in Marketing Dept",
//     time: "2 hours ago",
//     read: true,
//     icon: <ThumbUpIcon />,
//     color: "#f44336",
//   },
//   {
//     id: 5,
//     type: "invite",
//     title: "Team Invitation",
//     message: "You've been added to Product Team chat",
//     time: "Yesterday",
//     read: true,
//     icon: <PersonAddIcon />,
//     color: "#03a9f4",
//   },
// ];

// export default function MessagesPage() {
//   const [selectedChat, setSelectedChat] = useState(0);
//   const [messageInput, setMessageInput] = useState("");
//   const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
//   const [messages, setMessages] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
//   const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);

//   // Animated stats values
//   const [animatedStats, setAnimatedStats] = useState({
//     messages: 0,
//     active: 0,
//     increase: 0,
//     response: 0,
//     mentions: 0,
//   });

//   // Attachment and emoji states
//   const [attachmentMenuAnchor, setAttachmentMenuAnchor] = useState(null);
//   const [emojiAnchor, setEmojiAnchor] = useState(null);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });
//   const fileInputRef = useRef(null);

//   const socketRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   const currentChat = conversations.find((c) => c.id === selectedChat);

//   const stats = [
//     {
//       title: "Messages",
//       value: "24",
//       icon: <ChatIcon sx={{ fontSize: 22, color: "#1976d2" }} />,
//       color: "#e3f2fd",
//       key: "messages",
//     },
//     {
//       title: "Active",
//       value: "8",
//       icon: <GroupIcon sx={{ fontSize: 22, color: "#667eea" }} />,
//       color: "#ede7f6",
//       key: "active",
//     },
//     {
//       title: "Increase",
//       value: "+32%",
//       icon: <TrendingUpIcon sx={{ fontSize: 22, color: "#2e7d32" }} />,
//       color: "#e8f5e9",
//       key: "increase",
//     },
//     {
//       title: "Response",
//       value: "98%",
//       icon: <CheckCircleIcon sx={{ fontSize: 22, color: "#0288d1" }} />,
//       color: "#e0f7fa",
//       key: "response",
//     },
//     {
//       title: "Mentions",
//       value: "4",
//       icon: <NotificationsActiveIcon sx={{ fontSize: 22, color: "#ed6c02" }} />,
//       color: "#fff3e0",
//       key: "mentions",
//     },
//   ];

//   // Animate stats on mount
//   useEffect(() => {
//     const targetValues = {
//       messages: 24,
//       active: 8,
//       increase: 32,
//       response: 98,
//       mentions: 4,
//     };
//     const duration = 2000;
//     const interval = 20;
//     const steps = duration / interval;
//     let currentStep = 0;

//     const timer = setInterval(() => {
//       currentStep++;
//       const progress = currentStep / steps;
//       setAnimatedStats({
//         messages: Math.floor(targetValues.messages * progress),
//         active: Math.floor(targetValues.active * progress),
//         increase: Math.floor(targetValues.increase * progress),
//         response: Math.floor(targetValues.response * progress),
//         mentions: Math.floor(targetValues.mentions * progress),
//       });
//       if (currentStep >= steps) {
//         setAnimatedStats(targetValues);
//         clearInterval(timer);
//       }
//     }, interval);
//     return () => clearInterval(timer);
//   }, []);

//   // Update unread count whenever notifications change
//   useEffect(() => {
//     const count = notifications.filter((n) => !n.read).length;
//     setUnreadCount(count);
//   }, [notifications]);

//   // Socket setup - Fixed version without process.env
//   useEffect(() => {
//     // Use localhost for development - change this URL when you deploy your backend
//     const BACKEND_URL = "http://localhost:8080";

//     const socket = io(BACKEND_URL, {
//       autoConnect: false,
//       transports: ["websocket", "polling"],
//       reconnection: true,
//       reconnectionAttempts: 5,
//       reconnectionDelay: 1000,
//     });

//     socketRef.current = socket;
//     socket.connect();

//     socket.on("connect", () => socket.emit("join_chat", selectedChat));
//     socket.on("chat_history", (history) => setMessages(history));
//     socket.on("receive_message", (msg) => {
//       setMessages((prev) => [...prev, msg]);
//       setConversations((prev) =>
//         prev.map((c) =>
//           c.id === msg.chatId
//             ? { ...c, lastMessage: msg.text, time: msg.time }
//             : c,
//         ),
//       );

//       const chatName =
//         conversations.find((c) => c.id === msg.chatId)?.name || "Unknown";
//       const newNotification = {
//         id: Date.now(),
//         type: "message",
//         title: `New message from ${chatName}`,
//         message: msg.text,
//         time: "Just now",
//         read: false,
//         icon: <CommentIcon />,
//         color: "#667eea",
//       };
//       setNotifications((prev) => [newNotification, ...prev]);

//       if (msg.sender !== CURRENT_USER) {
//         setSnackbar({
//           open: true,
//           message: `New message from ${chatName}`,
//           severity: "info",
//         });
//       }
//     });
//     socket.on("message_deleted", (messageId) =>
//       setMessages((prev) => prev.filter((msg) => msg._id !== messageId)),
//     );

//     return () => {
//       socket.disconnect();
//     };
//   }, [selectedChat, conversations]);

//   useEffect(() => {
//     if (socketRef.current && socketRef.current.connected) {
//       socketRef.current.emit("join_chat", selectedChat);
//     }
//   }, [selectedChat]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Notification handlers
//   const handleNotificationClick = () => setNotificationDrawerOpen(true);
//   const handleCloseDrawer = () => setNotificationDrawerOpen(false);

//   const handleMarkAsRead = (notificationId) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
//     );
//     setSnackbar({
//       open: true,
//       message: "Notification marked as read",
//       severity: "success",
//     });
//   };

//   const handleMarkAllAsRead = () => {
//     setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//     setSnackbar({
//       open: true,
//       message: "All notifications marked as read",
//       severity: "success",
//     });
//   };

//   const handleDeleteNotification = (notificationId) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
//     setSnackbar({
//       open: true,
//       message: "Notification deleted",
//       severity: "success",
//     });
//   };

//   const handleClearAll = () => {
//     setNotifications([]);
//     setSnackbar({
//       open: true,
//       message: "All notifications cleared",
//       severity: "success",
//     });
//   };

//   const handleSendMessage = () => {
//     if (!messageInput.trim()) return;
//     const msg = {
//       chatId: selectedChat,
//       sender: CURRENT_USER,
//       text: messageInput.trim(),
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//     };
//     socketRef.current.emit("send_message", msg);
//     setMessageInput("");
//   };

//   const handleDeleteMessage = (messageId) => {
//     socketRef.current.emit("delete_message", {
//       chatId: selectedChat,
//       messageId,
//       sender: CURRENT_USER,
//     });
//     setSnackbar({
//       open: true,
//       message: "Message deleted",
//       severity: "success",
//     });
//   };

//   // Attachment handlers
//   const handleAttachmentClick = (event) =>
//     setAttachmentMenuAnchor(event.currentTarget);
//   const handleAttachmentClose = () => setAttachmentMenuAnchor(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const fileMessage = {
//         chatId: selectedChat,
//         sender: CURRENT_USER,
//         text: `📎 ${file.name}`,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       socketRef.current.emit("send_message", fileMessage);
//       setSnackbar({
//         open: true,
//         message: `File "${file.name}" attached`,
//         severity: "success",
//       });
//     }
//     handleAttachmentClose();
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       const imageMessage = {
//         chatId: selectedChat,
//         sender: CURRENT_USER,
//         text: `🖼️ Image: ${file.name}`,
//         time: new Date().toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//       };
//       socketRef.current.emit("send_message", imageMessage);
//       setSnackbar({
//         open: true,
//         message: `Image "${file.name}" attached`,
//         severity: "success",
//       });
//     } else {
//       setSnackbar({
//         open: true,
//         message: "Please select an image file",
//         severity: "warning",
//       });
//     }
//     handleAttachmentClose();
//   };

//   // Emoji handler
//   const handleEmojiClick = (event) => setEmojiAnchor(event.currentTarget);
//   const handleEmojiClose = () => setEmojiAnchor(null);
//   const handleEmojiSelect = (emoji) => {
//     setMessageInput((prev) => prev + emoji);
//     handleEmojiClose();
//   };

//   const handleCloseSnackbar = () => setSnackbar({ ...snackbar, open: false });

//   const filteredConversations = conversations.filter(
//     (c) =>
//       c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   return (
//     <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//       {/* Header with animated notification bell */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
//           <Typography
//             variant="h4"
//             sx={{ fontWeight: "bold", animation: `${fadeIn} 0.5s ease-out` }}
//           >
//             Team Messages
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             ({conversations.length} total)
//           </Typography>
//         </Box>
//         <IconButton
//           onClick={handleNotificationClick}
//           sx={{
//             animation: unreadCount > 0 ? `${pulse} 1.5s infinite` : "none",
//             transition: "transform 0.3s ease",
//             "&:hover": { transform: "rotate(15deg) scale(1.1)" },
//           }}
//         >
//           <Badge badgeContent={unreadCount} color="error">
//             <NotificationsActiveIcon sx={{ color: "#667eea", fontSize: 30 }} />
//           </Badge>
//         </IconButton>
//       </Box>

//       {/* Notifications Drawer */}
//       <Drawer
//         anchor="right"
//         open={notificationDrawerOpen}
//         onClose={handleCloseDrawer}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 400,
//             p: 2,
//             animation: `${slideIn} 0.3s ease-out`,
//           },
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//             pb: 2,
//             borderBottom: 1,
//             borderColor: "#e0e0e0",
//           }}
//         >
//           <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//             Notifications
//             {unreadCount > 0 && (
//               <Chip
//                 label={`${unreadCount} new`}
//                 size="small"
//                 color="primary"
//                 sx={{ ml: 1, animation: `${pulse} 1s infinite` }}
//               />
//             )}
//           </Typography>
//           <Box>
//             <Button size="small" onClick={handleMarkAllAsRead} sx={{ mr: 1 }}>
//               Mark all read
//             </Button>
//             <IconButton size="small" onClick={handleCloseDrawer}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         {notifications.length === 0 ? (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               justifyContent: "center",
//               height: "80%",
//             }}
//           >
//             <NotificationsActiveIcon
//               sx={{ fontSize: 64, color: "#ccc", mb: 2 }}
//             />
//             <Typography color="text.secondary">No notifications</Typography>
//           </Box>
//         ) : (
//           <>
//             <List sx={{ flex: 1, overflowY: "auto" }}>
//               {notifications.map((notification, index) => (
//                 <Paper
//                   key={notification.id}
//                   elevation={0}
//                   sx={{
//                     p: 2,
//                     mb: 1.5,
//                     borderRadius: 2,
//                     bgcolor: notification.read ? "white" : "#f0f7ff",
//                     border: "1px solid",
//                     borderColor: notification.read ? "#e5e7eb" : "#667eea",
//                     transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
//                     animation: `${slideIn} 0.3s ease-out ${index * 0.05}s backwards`,
//                     "&:hover": {
//                       transform: "translateX(-4px)",
//                       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                     },
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleMarkAsRead(notification.id)}
//                 >
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Avatar
//                       sx={{
//                         bgcolor: notification.color,
//                         width: 40,
//                         height: 40,
//                       }}
//                     >
//                       {notification.icon}
//                     </Avatar>
//                     <Box sx={{ flex: 1 }}>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "start",
//                         }}
//                       >
//                         <Typography
//                           variant="subtitle2"
//                           sx={{ fontWeight: notification.read ? 500 : 700 }}
//                         >
//                           {notification.title}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary">
//                           {notification.time}
//                         </Typography>
//                       </Box>
//                       <Typography
//                         variant="body2"
//                         color="text.secondary"
//                         sx={{ mt: 0.5 }}
//                       >
//                         {notification.message}
//                       </Typography>
//                       <Box sx={{ display: "flex", gap: 1, mt: 1.5 }}>
//                         {!notification.read && (
//                           <Button
//                             size="small"
//                             variant="outlined"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleMarkAsRead(notification.id);
//                             }}
//                             sx={{ textTransform: "none" }}
//                           >
//                             Mark as read
//                           </Button>
//                         )}
//                         <Button
//                           size="small"
//                           color="error"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDeleteNotification(notification.id);
//                           }}
//                           sx={{ textTransform: "none" }}
//                         >
//                           Delete
//                         </Button>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Paper>
//               ))}
//             </List>
//             {notifications.length > 0 && (
//               <Button
//                 fullWidth
//                 variant="outlined"
//                 color="error"
//                 onClick={handleClearAll}
//                 sx={{ mt: 2, textTransform: "none" }}
//               >
//                 Clear All Notifications
//               </Button>
//             )}
//           </>
//         )}
//       </Drawer>

//       <Grid container spacing={2}>
//         {/* LEFT: Conversations List */}
//         <Grid item xs={12} md={3}>
//           <Paper
//             sx={{
//               height: "650px",
//               display: "flex",
//               flexDirection: "column",
//               overflow: "hidden",
//               borderRadius: 3,
//             }}
//           >
//             <Box sx={{ p: 2, borderBottom: 1, borderColor: "#e0e0e0" }}>
//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Search..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Box>
//             <Box sx={{ flex: 1, overflowY: "auto" }}>
//               {filteredConversations.map((conv) => (
//                 <ListItem key={conv.id} disablePadding>
//                   <ListItemButton
//                     selected={selectedChat === conv.id}
//                     onClick={() => setSelectedChat(conv.id)}
//                     sx={{
//                       "&.Mui-selected": {
//                         bgcolor: "#e3f2fd",
//                         borderRight: 4,
//                         borderColor: "#667eea",
//                       },
//                       transition: "all 0.2s ease",
//                       "&:hover": { transform: "translateX(4px)" },
//                     }}
//                   >
//                     <ListItemAvatar>
//                       <Badge
//                         overlap="circular"
//                         variant="dot"
//                         color={conv.online ? "success" : "default"}
//                       >
//                         <Avatar
//                           sx={{ bgcolor: conv.color, width: 40, height: 40 }}
//                         >
//                           {conv.avatar}
//                         </Avatar>
//                       </Badge>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Typography
//                             variant="subtitle2"
//                             sx={{ fontWeight: "bold" }}
//                           >
//                             {conv.name}
//                           </Typography>
//                           <Typography variant="caption" color="text.secondary">
//                             {conv.time}
//                           </Typography>
//                         </Box>
//                       }
//                       secondary={
//                         <Box
//                           sx={{
//                             display: "flex",
//                             justifyContent: "space-between",
//                           }}
//                         >
//                           <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             noWrap
//                             sx={{ maxWidth: "120px" }}
//                           >
//                             {conv.lastMessage}
//                           </Typography>
//                           {conv.unread > 0 && (
//                             <Chip
//                               label={conv.unread}
//                               size="small"
//                               color="primary"
//                             />
//                           )}
//                         </Box>
//                       }
//                     />
//                   </ListItemButton>
//                 </ListItem>
//               ))}
//             </Box>
//           </Paper>
//         </Grid>

//         {/* CENTER: Chat Box */}
//         <Grid item xs={12} md={5}>
//           <Paper
//             sx={{
//               height: "650px",
//               display: "flex",
//               flexDirection: "column",
//               overflow: "hidden",
//               borderRadius: 3,
//             }}
//           >
//             {/* Chat header */}
//             <Box
//               sx={{
//                 p: 2,
//                 borderBottom: 1,
//                 borderColor: "#e0e0e0",
//                 display: "flex",
//                 justifyContent: "space-between",
//                 bgcolor: "#fafafa",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Avatar
//                   sx={{ bgcolor: currentChat?.color, width: 40, height: 40 }}
//                 >
//                   {currentChat?.avatar}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
//                     {currentChat?.name}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color={
//                       currentChat?.online ? "success.main" : "text.secondary"
//                     }
//                   >
//                     {currentChat?.online ? "● Online" : "Offline"}
//                   </Typography>
//                 </Box>
//               </Box>
//               <IconButton>
//                 <MoreVertIcon />
//               </IconButton>
//             </Box>

//             {/* Messages */}
//             <Box
//               sx={{
//                 flex: 1,
//                 overflowY: "auto",
//                 p: 2,
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 1.5,
//                 bgcolor: "#f8f9fa",
//               }}
//             >
//               {messages.map((msg, idx) => {
//                 const isMe = msg.sender === CURRENT_USER;
//                 return (
//                   <Box
//                     key={msg._id || idx}
//                     sx={{
//                       alignSelf: isMe ? "flex-end" : "flex-start",
//                       maxWidth: "75%",
//                       "&:hover .del-btn": { opacity: 1 },
//                       animation: `${fadeIn} 0.3s ease-out`,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 0.5,
//                         flexDirection: isMe ? "row-reverse" : "row",
//                       }}
//                     >
//                       <Paper
//                         elevation={1}
//                         sx={{
//                           p: 1.5,
//                           bgcolor: isMe ? "#667eea" : "white",
//                           color: isMe ? "white" : "text.primary",
//                           borderRadius: isMe
//                             ? "15px 15px 2px 15px"
//                             : "15px 15px 15px 2px",
//                           transition: "transform 0.2s ease",
//                           "&:hover": { transform: "scale(1.02)" },
//                         }}
//                       >
//                         <Typography variant="body2">{msg.text}</Typography>
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             display: "block",
//                             mt: 0.5,
//                             textAlign: "right",
//                             opacity: 0.7,
//                           }}
//                         >
//                           {msg.time}
//                         </Typography>
//                       </Paper>
//                       {isMe && (
//                         <IconButton
//                           className="del-btn"
//                           size="small"
//                           onClick={() => handleDeleteMessage(msg._id)}
//                           sx={{
//                             opacity: 0,
//                             transition: "0.2s",
//                             color: "error.main",
//                           }}
//                         >
//                           <DeleteIcon fontSize="inherit" />
//                         </IconButton>
//                       )}
//                     </Box>
//                   </Box>
//                 );
//               })}
//               <div ref={messagesEndRef} />
//             </Box>

//             {/* Input with functional icons */}
//             <Divider />
//             <Box
//               sx={{
//                 p: 1.5,
//                 bgcolor: "white",
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <IconButton size="small" onClick={handleAttachmentClick}>
//                 <AttachFileIcon />
//               </IconButton>

//               <Menu
//                 anchorEl={attachmentMenuAnchor}
//                 open={Boolean(attachmentMenuAnchor)}
//                 onClose={handleAttachmentClose}
//               >
//                 <MenuItem onClick={() => fileInputRef.current?.click()}>
//                   <InsertDriveFileIcon sx={{ mr: 1, fontSize: 20 }} /> Upload
//                   File
//                 </MenuItem>
//                 <MenuItem
//                   onClick={() => {
//                     const imageInput = document.createElement("input");
//                     imageInput.type = "file";
//                     imageInput.accept = "image/*";
//                     imageInput.onchange = (e) => handleImageUpload(e);
//                     imageInput.click();
//                   }}
//                 >
//                   <ImageIcon sx={{ mr: 1, fontSize: 20 }} /> Upload Image
//                 </MenuItem>
//               </Menu>

//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 style={{ display: "none" }}
//                 onChange={handleFileUpload}
//               />

//               <IconButton size="small" onClick={handleEmojiClick}>
//                 <EmojiEmotionsIcon />
//               </IconButton>

//               <Popover
//                 anchorEl={emojiAnchor}
//                 open={Boolean(emojiAnchor)}
//                 onClose={handleEmojiClose}
//                 anchorOrigin={{ vertical: "top", horizontal: "left" }}
//                 transformOrigin={{ vertical: "bottom", horizontal: "left" }}
//                 sx={{
//                   "& .MuiPopover-paper": {
//                     p: 1.5,
//                     maxWidth: 350,
//                     maxHeight: 300,
//                     overflow: "auto",
//                     borderRadius: 2,
//                   },
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: "grid",
//                     gridTemplateColumns: "repeat(8, 1fr)",
//                     gap: 0.5,
//                   }}
//                 >
//                   {EMOJIS.map((emoji, index) => (
//                     <IconButton
//                       key={index}
//                       onClick={() => handleEmojiSelect(emoji)}
//                       size="small"
//                     >
//                       <Typography variant="h6">{emoji}</Typography>
//                     </IconButton>
//                   ))}
//                 </Box>
//               </Popover>

//               <TextField
//                 fullWidth
//                 size="small"
//                 placeholder="Type a message..."
//                 value={messageInput}
//                 onChange={(e) => setMessageInput(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 4,
//                     bgcolor: "#f1f3f4",
//                   },
//                 }}
//               />
//               <Button
//                 variant="contained"
//                 onClick={handleSendMessage}
//                 sx={{
//                   borderRadius: 2,
//                   bgcolor: "#667eea",
//                   minWidth: "unset",
//                   px: 2,
//                 }}
//               >
//                 <SendIcon />
//               </Button>
//             </Box>
//           </Paper>
//         </Grid>

//         {/* RIGHT: Animated Quick Stats + Recent Activity + Quick Poll */}
//         <Grid item xs={12} md={4}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               height: "650px",
//               overflowY: "auto",
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 fontWeight: 600,
//                 color: "text.secondary",
//                 px: 0.5,
//                 animation: `${fadeIn} 0.5s ease-out`,
//               }}
//             >
//               Quick Stats
//             </Typography>

//             {/* Animated Stats Cards */}
//             <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//               <AnimatedHorizontalCard
//                 title="Messages"
//                 value={animatedStats.messages}
//                 icon={<ChatIcon sx={{ fontSize: 22, color: "#1976d2" }} />}
//                 color="#e3f2fd"
//                 index={0}
//               />
//               <AnimatedHorizontalCard
//                 title="Active"
//                 value={animatedStats.active}
//                 icon={<GroupIcon sx={{ fontSize: 22, color: "#667eea" }} />}
//                 color="#ede7f6"
//                 index={1}
//               />
//               <AnimatedHorizontalCard
//                 title="Increase"
//                 value={`+${animatedStats.increase}%`}
//                 icon={
//                   <TrendingUpIcon sx={{ fontSize: 22, color: "#2e7d32" }} />
//                 }
//                 color="#e8f5e9"
//                 index={2}
//               />
//               <AnimatedHorizontalCard
//                 title="Response"
//                 value={`${animatedStats.response}%`}
//                 icon={
//                   <CheckCircleIcon sx={{ fontSize: 22, color: "#0288d1" }} />
//                 }
//                 color="#e0f7fa"
//                 index={3}
//               />
//               <AnimatedHorizontalCard
//                 title="Mentions"
//                 value={animatedStats.mentions}
//                 icon={
//                   <NotificationsActiveIcon
//                     sx={{ fontSize: 22, color: "#ed6c02" }}
//                   />
//                 }
//                 color="#fff3e0"
//                 index={4}
//               />
//             </Box>

//             {/* Recent Activity Card */}
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 3,
//                 border: "1px solid #e5e7eb",
//                 animation: `${slideIn} 0.5s ease-out 0.5s backwards`,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-4px)",
//                   boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//                 },
//               }}
//             >
//               <Box
//                 sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
//               >
//                 <AssignmentIcon sx={{ fontSize: 20, color: "#667eea" }} />
//                 <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                   Recent Activity
//                 </Typography>
//               </Box>
//               <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
//                 {[
//                   {
//                     text: "John uploaded a file",
//                     color: "#4caf50",
//                     delay: 0.6,
//                   },
//                   {
//                     text: "Marketing posted an update",
//                     color: "#ff9800",
//                     delay: 0.7,
//                   },
//                   {
//                     text: 'Task "Review Q4" pending',
//                     color: "#f44336",
//                     delay: 0.8,
//                   },
//                   {
//                     text: "Team meeting today at 4PM",
//                     color: "#2196f3",
//                     delay: 0.9,
//                   },
//                 ].map((item, idx) => (
//                   <Box
//                     key={idx}
//                     sx={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: 1,
//                       animation: `${slideIn} 0.3s ease-out ${item.delay}s backwards`,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: 6,
//                         height: 6,
//                         borderRadius: "50%",
//                         bgcolor: item.color,
//                         animation: `${pulse} 2s infinite`,
//                       }}
//                     />
//                     <Typography variant="body2">{item.text}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             </Paper>

//             {/* Quick Poll Card */}
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 2,
//                 borderRadius: 3,
//                 border: "1px solid #e5e7eb",
//                 animation: `${slideIn} 0.5s ease-out 1s backwards`,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   transform: "translateY(-4px)",
//                   boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
//                 },
//               }}
//             >
//               <Box
//                 sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}
//               >
//                 <PollIcon sx={{ fontSize: 20, color: "#9c27b0" }} />
//                 <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
//                   Quick Poll
//                 </Typography>
//               </Box>
//               <Typography variant="body2" sx={{ mb: 1.5, fontWeight: 500 }}>
//                 Which design should we use?
//               </Typography>
//               <Box sx={{ display: "flex", gap: 1.5 }}>
//                 <Chip
//                   label="Design A (3)"
//                   size="small"
//                   sx={{
//                     bgcolor: "#e3f2fd",
//                     fontWeight: 500,
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     "&:hover": { transform: "scale(1.05)", bgcolor: "#bbdef5" },
//                   }}
//                   onClick={() =>
//                     setSnackbar({
//                       open: true,
//                       message: "Voted for Design A",
//                       severity: "success",
//                     })
//                   }
//                 />
//                 <Chip
//                   label="Design B (5)"
//                   size="small"
//                   sx={{
//                     bgcolor: "#f3e5f5",
//                     fontWeight: 500,
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     "&:hover": { transform: "scale(1.05)", bgcolor: "#e1bee7" },
//                   }}
//                   onClick={() =>
//                     setSnackbar({
//                       open: true,
//                       message: "Voted for Design B",
//                       severity: "success",
//                     })
//                   }
//                 />
//               </Box>
//               <Typography
//                 variant="caption"
//                 color="text.secondary"
//                 sx={{ display: "block", mt: 1.5 }}
//               >
//                 Total votes: 8
//               </Typography>
//             </Paper>
//           </Box>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%", animation: `${slideIn} 0.3s ease-out` }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// }
import { useState, useEffect, useRef } from "react";
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
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Container,
  Menu,
  MenuItem,
  Popover,
  Snackbar,
  Alert,
  Drawer,
  List,
  keyframes,
  Tooltip,
  Switch,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import { io } from "socket.io-client";

// Icons
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import DeleteIcon from "@mui/icons-material/Delete";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PollIcon from "@mui/icons-material/Poll";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import ReplyIcon from "@mui/icons-material/Reply";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

// Animations
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(102, 126, 234, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(102, 126, 234, 0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const typingAnimation = keyframes`
  0% { opacity: 0.3; transform: translateY(0px); }
  50% { opacity: 1; transform: translateY(-5px); }
  100% { opacity: 0.3; transform: translateY(0px); }
`;

// Animated Horizontal card component
const AnimatedHorizontalCard = ({ title, value, icon, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      elevation={0}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        p: 1.5,
        borderRadius: 2,
        background: color,
        border: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        flex: 1,
        minWidth: 0,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        animation: `${slideIn} 0.5s ease-out ${index * 0.1}s backwards`,
        transform: isHovered
          ? "translateY(-4px) scale(1.02)"
          : "translateY(0) scale(1)",
        boxShadow: isHovered ? "0 8px 25px rgba(0,0,0,0.1)" : "none",
        cursor: "pointer",
        "&:hover": { "&::before": { left: "100%" } },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "-100%",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          transition: "left 0.5s",
        },
      }}
    >
      <Box sx={{ animation: isHovered ? `${bounce} 0.5s ease` : "none" }}>
        {icon}
      </Box>
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ whiteSpace: "nowrap" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: isHovered ? "#667eea" : "inherit" }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

// Typing Indicator Component
const TypingIndicator = ({ typingUsers }) => {
  if (typingUsers.length === 0) return null;

  const text =
    typingUsers.length === 1
      ? `${typingUsers[0]} is typing...`
      : `${typingUsers.length} people are typing...`;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        p: 1,
        bgcolor: "#f0f0f0",
        borderRadius: 2,
        width: "fit-content",
        mb: 1,
      }}
    >
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Box
          sx={{
            width: 6,
            height: 6,
            bgcolor: "#667eea",
            borderRadius: "50%",
            animation: `${typingAnimation} 1.4s infinite`,
          }}
        />
        <Box
          sx={{
            width: 6,
            height: 6,
            bgcolor: "#667eea",
            borderRadius: "50%",
            animation: `${typingAnimation} 1.4s 0.2s infinite`,
          }}
        />
        <Box
          sx={{
            width: 6,
            height: 6,
            bgcolor: "#667eea",
            borderRadius: "50%",
            animation: `${typingAnimation} 1.4s 0.4s infinite`,
          }}
        />
      </Box>
      <Typography variant="caption" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
};

// Message Component with Reactions and Read Receipts
const MessageBubble = ({
  message,
  isMe,
  onReact,
  onEdit,
  onReply,
  onDelete,
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showReactions, setShowReactions] = useState(false);

  const reactions = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

  return (
    <Box
      sx={{
        alignSelf: isMe ? "flex-end" : "flex-start",
        maxWidth: "75%",
        mb: 1,
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowReactions(false);
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 1.5,
          bgcolor: isMe ? "#667eea" : "white",
          color: isMe ? "white" : "text.primary",
          borderRadius: isMe ? "15px 15px 2px 15px" : "15px 15px 15px 2px",
          position: "relative",
        }}
      >
        {/* Reply indicator */}
        {message.replyTo && (
          <Box
            sx={{
              mb: 0.5,
              p: 0.5,
              bgcolor: "rgba(0,0,0,0.05)",
              borderRadius: 1,
              fontSize: "0.7rem",
            }}
          >
            <Typography variant="caption">
              ↩️ Replying to: {message.replyTo.text.substring(0, 50)}
            </Typography>
          </Box>
        )}

        {/* Edited indicator */}
        {message.edited && (
          <Typography
            variant="caption"
            sx={{ opacity: 0.6, display: "block", fontSize: "0.6rem" }}
          >
            (edited)
          </Typography>
        )}

        <Typography variant="body2">{message.text}</Typography>

        {/* Message reactions */}
        {message.reactions && Object.keys(message.reactions).length > 0 && (
          <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap" }}>
            {Object.entries(message.reactions).map(([emoji, users]) => (
              <Chip
                key={emoji}
                label={`${emoji} ${users.length}`}
                size="small"
                sx={{ height: 20, fontSize: "0.7rem" }}
              />
            ))}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 0.5,
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            {message.time}
          </Typography>
          {isMe && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {message.read ? (
                <DoneAllIcon sx={{ fontSize: 14, opacity: 0.7 }} />
              ) : (
                <DoneIcon sx={{ fontSize: 14, opacity: 0.7 }} />
              )}
            </Box>
          )}
        </Box>

        {/* Action buttons */}
        {showActions && (
          <Box
            sx={{
              position: "absolute",
              top: -20,
              right: isMe ? 0 : "auto",
              left: isMe ? "auto" : 0,
              display: "flex",
              gap: 0.5,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 1,
              p: 0.5,
            }}
          >
            <Tooltip title="React">
              <IconButton
                size="small"
                onClick={() => setShowReactions(!showReactions)}
                sx={{ p: 0.5 }}
              >
                <EmojiEmotionsOutlinedIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reply">
              <IconButton
                size="small"
                onClick={() => onReply(message)}
                sx={{ p: 0.5 }}
              >
                <ReplyIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            {isMe && (
              <>
                <Tooltip title="Edit">
                  <IconButton
                    size="small"
                    onClick={() => onEdit(message)}
                    sx={{ p: 0.5 }}
                  >
                    <EditIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={() => onDelete(message._id)}
                    sx={{ p: 0.5, color: "error.main" }}
                  >
                    <DeleteIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        )}

        {/* Reaction picker */}
        {showReactions && (
          <Paper
            sx={{
              position: "absolute",
              bottom: "100%",
              left: 0,
              display: "flex",
              gap: 0.5,
              p: 0.5,
              bgcolor: "white",
              borderRadius: 2,
              boxShadow: 2,
              zIndex: 10,
            }}
          >
            {reactions.map((emoji) => (
              <IconButton
                key={emoji}
                size="small"
                onClick={() => {
                  onReact(message._id, emoji);
                  setShowReactions(false);
                }}
                sx={{ p: 0.5 }}
              >
                <Typography variant="body1">{emoji}</Typography>
              </IconButton>
            ))}
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

const CURRENT_USER = "Me";
const EMOJIS = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "👍",
  "👎",
  "👌",
  "❤️",
  "💯",
];

const INITIAL_CONVERSATIONS = [
  {
    id: 0,
    name: "Analytics Team",
    avatar: "AT",
    color: "#667eea",
    lastMessage: "The Q4 report looks great!",
    time: "10:30 AM",
    unread: 2,
    online: true,
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
  },
  {
    id: 4,
    name: "John Doe",
    avatar: "JD",
    color: "#f44336",
    lastMessage: "Lunch today?",
    time: "11:15 AM",
    unread: 0,
    online: true,
  },
  {
    id: 5,
    name: "Product Team",
    avatar: "PT",
    color: "#03a9f4",
    lastMessage: "Feature release notes ready",
    time: "12:00 PM",
    unread: 3,
    online: true,
  },
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [notifications, setNotifications] = useState([]);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    messages: 0,
    active: 0,
    increase: 0,
    response: 0,
    mentions: 0,
  });
  const [attachmentMenuAnchor, setAttachmentMenuAnchor] = useState(null);
  const [emojiAnchor, setEmojiAnchor] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const fileInputRef = useRef(null);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  let typingTimeoutRef = useRef(null);

  const currentChat = conversations.find((c) => c.id === selectedChat);

  // Typing indicator handler
  const handleTyping = () => {
    if (socketRef.current) {
      socketRef.current.emit("typing", {
        chatId: selectedChat,
        user: CURRENT_USER,
      });
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socketRef.current.emit("stop_typing", {
          chatId: selectedChat,
          user: CURRENT_USER,
        });
      }, 1000);
    }
  };

  // Voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        setAudioBlob(audioBlob);
        // Send voice message
        const reader = new FileReader();
        reader.onloadend = () => {
          socketRef.current.emit("send_voice", {
            chatId: selectedChat,
            sender: CURRENT_USER,
            audio: reader.result,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          });
        };
        reader.readAsDataURL(audioBlob);
        setSnackbar({
          open: true,
          message: "Voice message sent!",
          severity: "success",
        });
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);

      // Timer for recording
      let time = 0;
      const timer = setInterval(() => {
        if (recording) {
          time++;
          setRecordingTime(time);
        } else {
          clearInterval(timer);
        }
      }, 1000);
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Microphone access denied",
        severity: "error",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setRecordingTime(0);
    }
  };

  // Message reactions
  const handleReaction = (messageId, emoji) => {
    socketRef.current.emit("add_reaction", {
      chatId: selectedChat,
      messageId,
      emoji,
      user: CURRENT_USER,
    });
  };

  // Edit message
  const handleEditMessage = () => {
    if (editText.trim()) {
      socketRef.current.emit("edit_message", {
        chatId: selectedChat,
        messageId: editingMessage._id,
        newText: editText.trim(),
      });
      setEditDialogOpen(false);
      setEditingMessage(null);
      setEditText("");
      setSnackbar({
        open: true,
        message: "Message edited",
        severity: "success",
      });
    }
  };

  // Reply to message
  const handleReply = (message) => {
    setReplyingTo(message);
    setMessageInput(`@${message.sender} `);
  };

  // Socket setup
  useEffect(() => {
    const BACKEND_URL = "http://localhost:8080";
    const socket = io(BACKEND_URL, {
      autoConnect: false,
      transports: ["websocket", "polling"],
      reconnection: true,
    });
    socketRef.current = socket;
    socket.connect();

    socket.on("connect", () => socket.emit("join_chat", selectedChat));
    socket.on("chat_history", (history) => setMessages(history));

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      setConversations((prev) =>
        prev.map((c) =>
          c.id === msg.chatId
            ? { ...c, lastMessage: msg.text, time: msg.time }
            : c,
        ),
      );
      setNotifications((prev) => [
        {
          id: Date.now(),
          title: `New message`,
          message: msg.text,
          time: "Just now",
          read: false,
          icon: <CommentIcon />,
          color: "#667eea",
        },
        ...prev,
      ]);
    });

    socket.on("message_edited", ({ messageId, newText }) => {
      setMessages((prev) =>
        prev.map((m) =>
          m._id === messageId ? { ...m, text: newText, edited: true } : m,
        ),
      );
    });

    socket.on("reaction_added", ({ messageId, emoji, user }) => {
      setMessages((prev) =>
        prev.map((m) => {
          if (m._id === messageId) {
            const reactions = m.reactions || {};
            if (!reactions[emoji]) reactions[emoji] = [];
            if (!reactions[emoji].includes(user)) reactions[emoji].push(user);
            return { ...m, reactions };
          }
          return m;
        }),
      );
    });

    socket.on("read_receipt", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === messageId ? { ...m, read: true } : m)),
      );
    });

    socket.on("typing_indicator", ({ user, isTyping }) => {
      setTypingUsers((prev) =>
        isTyping ? [...prev, user] : prev.filter((u) => u !== user),
      );
    });

    socket.on("message_deleted", (messageId) =>
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId)),
    );

    return () => socket.disconnect();
  }, [selectedChat]);

  useEffect(() => {
    if (socketRef.current?.connected)
      socketRef.current.emit("join_chat", selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read
  useEffect(() => {
    if (messages.length > 0 && socketRef.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.sender !== CURRENT_USER) {
        socketRef.current.emit("mark_read", {
          chatId: selectedChat,
          messageId: lastMessage._id,
        });
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim() && !replyingTo) return;
    const msg = {
      chatId: selectedChat,
      sender: CURRENT_USER,
      text: messageInput.trim(),
      replyTo: replyingTo
        ? {
            id: replyingTo._id,
            text: replyingTo.text,
            sender: replyingTo.sender,
          }
        : null,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    socketRef.current.emit("send_message", msg);
    setMessageInput("");
    setReplyingTo(null);
  };

  const handleDeleteMessage = (messageId) => {
    socketRef.current.emit("delete_message", {
      chatId: selectedChat,
      messageId,
      sender: CURRENT_USER,
    });
    setSnackbar({
      open: true,
      message: "Message deleted",
      severity: "success",
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      socketRef.current.emit("send_message", {
        chatId: selectedChat,
        sender: CURRENT_USER,
        text: `📎 ${file.name}`,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
      setSnackbar({
        open: true,
        message: `File "${file.name}" attached`,
        severity: "success",
      });
    }
    setAttachmentMenuAnchor(null);
  };

  const handleEmojiSelect = (emoji) => {
    setMessageInput((prev) => prev + emoji);
    setEmojiAnchor(null);
  };

  // Theme colors
  const themeColors = darkMode
    ? {
        bg: "#121212",
        paper: "#1e1e1e",
        text: "#ffffff",
        textSecondary: "#b0b0b0",
        border: "#333333",
        inputBg: "#2c2c2c",
        messageBg: "#2d2d2d",
        ownMessageBg: "#667eea",
      }
    : {
        bg: "#f5f5f5",
        paper: "#ffffff",
        text: "#000000",
        textSecondary: "#666666",
        border: "#e0e0e0",
        inputBg: "#f1f3f4",
        messageBg: "#ffffff",
        ownMessageBg: "#667eea",
      };

  return (
    <Box
      sx={{
        bgcolor: themeColors.bg,
        minHeight: "100vh",
        transition: "all 0.3s ease",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ mt: { xs: 2, md: 4 }, mb: { xs: 2, md: 4 } }}
      >
        {/* Header with Dark Mode Toggle */}
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
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "bold", color: themeColors.text }}
            >
              Team Messages
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              ({conversations.length} total)
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  icon={<LightModeIcon />}
                  checkedIcon={<DarkModeIcon />}
                />
              }
              label=""
            />
            <IconButton
              onClick={() => setNotificationDrawerOpen(true)}
              sx={{
                animation: unreadCount > 0 ? `${pulse} 1.5s infinite` : "none",
              }}
            >
              <Badge badgeContent={unreadCount} color="error">
                <NotificationsActiveIcon
                  sx={{ color: "#667eea", fontSize: 30 }}
                />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* LEFT COLUMN - Conversations */}
          <Grid item xs={12} md={3}>
            <Paper
              sx={{
                height: { xs: "400px", md: "650px" },
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 3,
                bgcolor: themeColors.paper,
              }}
            >
              <Box
                sx={{ p: 2, borderBottom: 1, borderColor: themeColors.border }}
              >
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ flex: 1, overflowY: "auto" }}>
                {conversations
                  .filter((c) =>
                    c.name.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((conv) => (
                    <ListItem key={conv.id} disablePadding>
                      <ListItemButton
                        selected={selectedChat === conv.id}
                        onClick={() => setSelectedChat(conv.id)}
                        sx={{ "&.Mui-selected": { bgcolor: "#e3f2fd" } }}
                      >
                        <ListItemAvatar>
                          <Badge
                            overlap="circular"
                            variant="dot"
                            color={conv.online ? "success" : "default"}
                          >
                            <Avatar sx={{ bgcolor: conv.color }}>
                              {conv.avatar}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={conv.name}
                          secondary={conv.lastMessage}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
              </Box>
            </Paper>
          </Grid>

          {/* CENTER COLUMN - Chat */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                height: { xs: "500px", md: "650px" },
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderRadius: 3,
                bgcolor: themeColors.paper,
              }}
            >
              {/* Chat Header */}
              <Box
                sx={{
                  p: 2,
                  borderBottom: 1,
                  borderColor: themeColors.border,
                  display: "flex",
                  justifyContent: "space-between",
                  bgcolor: themeColors.paper,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: currentChat?.color }}>
                    {currentChat?.avatar}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", color: themeColors.text }}
                    >
                      {currentChat?.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={
                        currentChat?.online ? "success.main" : "text.secondary"
                      }
                    >
                      {currentChat?.online ? "● Online" : "Offline"}
                    </Typography>
                  </Box>
                </Box>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {/* Messages Area with Typing Indicator */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  bgcolor: themeColors.bg,
                }}
              >
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg._id}
                    message={msg}
                    isMe={msg.sender === CURRENT_USER}
                    onReact={handleReaction}
                    onEdit={(msg) => {
                      setEditingMessage(msg);
                      setEditText(msg.text);
                      setEditDialogOpen(true);
                    }}
                    onReply={handleReply}
                    onDelete={handleDeleteMessage}
                  />
                ))}
                <TypingIndicator
                  typingUsers={typingUsers.filter((u) => u !== CURRENT_USER)}
                />
                <div ref={messagesEndRef} />
              </Box>

              {/* Reply indicator */}
              {replyingTo && (
                <Box
                  sx={{
                    p: 1,
                    bgcolor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="caption">
                    Replying to: {replyingTo.text.substring(0, 50)}
                  </Typography>
                  <IconButton size="small" onClick={() => setReplyingTo(null)}>
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              )}

              {/* Input Area */}
              <Divider />
              <Box
                sx={{
                  p: 1.5,
                  bgcolor: themeColors.paper,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <IconButton
                  size="small"
                  onClick={(e) => setAttachmentMenuAnchor(e.currentTarget)}
                >
                  <AttachFileIcon />
                </IconButton>
                <Menu
                  anchorEl={attachmentMenuAnchor}
                  open={Boolean(attachmentMenuAnchor)}
                  onClose={() => setAttachmentMenuAnchor(null)}
                >
                  <MenuItem onClick={() => fileInputRef.current?.click()}>
                    <InsertDriveFileIcon sx={{ mr: 1 }} />
                    Upload File
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = handleFileUpload;
                      input.click();
                    }}
                  >
                    <ImageIcon sx={{ mr: 1 }} />
                    Upload Image
                  </MenuItem>
                </Menu>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />

                <IconButton
                  size="small"
                  onClick={(e) => setEmojiAnchor(e.currentTarget)}
                >
                  <EmojiEmotionsIcon />
                </IconButton>
                <Popover
                  anchorEl={emojiAnchor}
                  open={Boolean(emojiAnchor)}
                  onClose={() => setEmojiAnchor(null)}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(6, 1fr)",
                      gap: 0.5,
                      p: 1,
                    }}
                  >
                    {EMOJIS.map((emoji, i) => (
                      <IconButton
                        key={i}
                        onClick={() => handleEmojiSelect(emoji)}
                        size="small"
                      >
                        <Typography variant="h6">{emoji}</Typography>
                      </IconButton>
                    ))}
                  </Box>
                </Popover>

                {/* Voice Recording Button */}
                <IconButton
                  size="small"
                  onClick={recording ? stopRecording : startRecording}
                  sx={{ color: recording ? "error.main" : "inherit" }}
                >
                  {recording ? <StopIcon /> : <MicIcon />}
                </IconButton>
                {recording && (
                  <Typography variant="caption" color="error">
                    {recordingTime}s
                  </Typography>
                )}

                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => {
                    setMessageInput(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 4,
                      bgcolor: themeColors.inputBg,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendMessage}
                  sx={{
                    borderRadius: 2,
                    bgcolor: "#667eea",
                    minWidth: "unset",
                    px: 2,
                  }}
                >
                  <SendIcon />
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* RIGHT COLUMN - Stats */}
          <Grid item xs={12} md={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                height: { xs: "auto", md: "650px" },
                overflowY: { md: "auto" },
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "text.secondary" }}
              >
                Quick Stats
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <AnimatedHorizontalCard
                  title="Messages"
                  value={animatedStats.messages}
                  icon={<ChatIcon sx={{ fontSize: 22, color: "#1976d2" }} />}
                  color="#e3f2fd"
                  index={0}
                />
                <AnimatedHorizontalCard
                  title="Active"
                  value={animatedStats.active}
                  icon={<GroupIcon sx={{ fontSize: 22, color: "#667eea" }} />}
                  color="#ede7f6"
                  index={1}
                />
                <AnimatedHorizontalCard
                  title="Increase"
                  value={`+${animatedStats.increase}%`}
                  icon={
                    <TrendingUpIcon sx={{ fontSize: 22, color: "#2e7d32" }} />
                  }
                  color="#e8f5e9"
                  index={2}
                />
                <AnimatedHorizontalCard
                  title="Response"
                  value={`${animatedStats.response}%`}
                  icon={
                    <CheckCircleIcon sx={{ fontSize: 22, color: "#0288d1" }} />
                  }
                  color="#e0f7fa"
                  index={3}
                />
                <AnimatedHorizontalCard
                  title="Mentions"
                  value={animatedStats.mentions}
                  icon={
                    <NotificationsActiveIcon
                      sx={{ fontSize: 22, color: "#ed6c02" }}
                    />
                  }
                  color="#fff3e0"
                  index={4}
                />
              </Box>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  bgcolor: themeColors.paper,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <AssignmentIcon sx={{ fontSize: 20, color: "#667eea" }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Recent Activity
                  </Typography>
                </Box>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#4caf50",
                      }}
                    />
                    <Typography variant="body2">
                      John uploaded a file
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#ff9800",
                      }}
                    />
                    <Typography variant="body2">
                      Marketing posted an update
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        bgcolor: "#f44336",
                      }}
                    />
                    <Typography variant="body2">
                      Task "Review Q4" pending
                    </Typography>
                  </Box>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  bgcolor: themeColors.paper,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <PollIcon sx={{ fontSize: 20, color: "#9c27b0" }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Quick Poll
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mb: 1.5 }}>
                  Which design should we use?
                </Typography>
                <Chip
                  label="Design A (3)"
                  size="small"
                  sx={{ mr: 1, cursor: "pointer" }}
                  onClick={() =>
                    setSnackbar({
                      open: true,
                      message: "Voted for A",
                      severity: "success",
                    })
                  }
                />
                <Chip
                  label="Design B (5)"
                  size="small"
                  sx={{ cursor: "pointer" }}
                  onClick={() =>
                    setSnackbar({
                      open: true,
                      message: "Voted for B",
                      severity: "success",
                    })
                  }
                />
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Edit Message Dialog */}
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
          <DialogTitle>Edit Message</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              multiline
              rows={2}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              sx={{ mt: 1 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditMessage} variant="contained">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Notifications Drawer */}
        <Drawer
          anchor="right"
          open={notificationDrawerOpen}
          onClose={() => setNotificationDrawerOpen(false)}
          sx={{ "& .MuiDrawer-paper": { width: 400, p: 2 } }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
              pb: 2,
              borderBottom: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <Typography variant="h6">Notifications</Typography>
            <IconButton onClick={() => setNotificationDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          {notifications.map((n) => (
            <Paper
              key={n.id}
              sx={{
                p: 2,
                mb: 1.5,
                bgcolor: n.read ? "white" : "#f0f7ff",
                border: "1px solid",
                borderColor: n.read ? "#e5e7eb" : "#667eea",
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Avatar sx={{ bgcolor: n.color }}>{n.icon}</Avatar>
                <Box>
                  <Typography variant="subtitle2">{n.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {n.message}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Drawer>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
