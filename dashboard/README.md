# 📸 FOTO Dashboard

A modern React dashboard application built with Material UI and Recharts. Features a responsive layout with a sidebar, topbar, theme settings, and interactive data visualization charts.

---

## 🚀 Features

- 📊 Interactive charts using Recharts
- 🎨 Light / Dark theme toggle with Material UI
- 📁 Reusable Dashboard Layout
- 📱 Responsive design
- ⚡ Modern React architecture using Context API
- 🧩 Modular component structure

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React | UI framework |
| Material UI (MUI) | Component library & theming |
| Recharts | Data visualization |
| JavaScript (ES6+) | Core language |

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/F-Gebray/FOTO-REPO.git
   ```

2. **Navigate into the dashboard folder**

   ```bash
   cd FOTO-REPO/dashboard
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

---

## ▶️ Run the Project

Start the development server:

```bash
npm run dev
```

The app will run at: **http://localhost:5173**

---

## 📊 Charts & Data Visualization

The dashboard includes interactive data visualization built with Recharts:

- Weekly sales bar chart
- Responsive chart layouts
- Tooltip interaction on hover

---

## 🎨 Theme Settings

The project uses a global `SettingsContext` to control app-wide preferences such as dark/light mode.

```jsx
const { darkMode, setDarkMode } = useSettings();
```

---

## 🧱 Layout System

The dashboard layout wraps all pages with a consistent structure:

```
DashboardLayout
 ├── Sidebar
 ├── Topbar
 └── Page Content
```

---

## 📌 Future Improvements

- [ ] Authentication system
- [ ] API integration
- [ ] More charts and analytics
- [ ] Responsive mobile sidebar
- [ ] Notifications system

---

## 👤 Author

**Fitwi Gebray Teklemichael**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Self--Taught%20React%20Developer-blue?logo=linkedin)](https://www.linkedin.com/in/fitwi-gebray-teklemichael-4aa1a02a4/)  
[![GitHub](https://img.shields.io/badge/GitHub-F--Gebray-black?logo=github)](https://github.com/F-Gebray)

---

## 📄 License

This project is for personal use. Feel free to fork and adapt it for your own portfolio.
