📊 React Admin Dashboard

A modern, responsive Admin Dashboard built with React, Vite, and Tailwind CSS.
It includes authentication flow, dynamic user management, charts, and a clean UI with dark mode support.

🚀 Features
🔐 Authentication system (Login / Logout / Protected Routes)
👤 Dynamic user profile (no hardcoded data)
📊 Dashboard analytics overview
🧑‍💼 User management (CRUD ready)
🛒 Orders management system
🌗 Light / Dark mode support
📱 Fully responsive design
🔔 Notifications system
⚡ Fast performance with Vite
🧱 Tech Stack
React 18
Vite
React Router DOM
Context API (state management)
Tailwind CSS
Lucide Icons
Recharts (charts & analytics)
📁 Project Structure
src/
├── components/
├── context/
├── pages/
├── data/
├── hooks/
├── App.jsx
└── main.jsx
🔐 Authentication Flow
Login stores user in Context + LocalStorage
User session persists on refresh
Protected routes block unauthorized access
Logout clears session and redirects to login
🎯 Core Pages
Dashboard
Users Management
Orders
Analytics
Profile
Settings
Login
🖥️ UI Highlights
Modern dashboard layout
Collapsible sidebar
Responsive navbar
Card-based UI system
Smooth dark mode transitions
⚙️ Setup Instructions

# install dependencies

npm install

# start development server

npm run dev
📌 Future Improvements
Backend integration (Node / Firebase)
JWT authentication
Role-based access control
Real API data fetching
Advanced analytics dashboard
👨‍💻 Author

Built as a learning + portfolio project for mastering modern React dashboard architecture.
