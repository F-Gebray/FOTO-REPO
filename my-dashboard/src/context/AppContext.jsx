import { createContext, useContext, useReducer, useEffect } from "react";
import { initialUsers, initialOrders } from "../data/mockData";

const AppContext = createContext();

// Load initial state from localStorage
const loadInitialState = () => {
  try {
    const saved = localStorage.getItem("app_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      console.log("✅ Loading saved state:", parsed.users?.length, "users");
      return {
        users: parsed.users || initialUsers,
        orders: parsed.orders || initialOrders,
        notifications: parsed.notifications || [],
        theme: localStorage.getItem("theme") || "light",
        sidebarOpen:
          parsed.sidebarOpen !== undefined ? parsed.sidebarOpen : true,
        toasts: [],
      };
    }
  } catch (error) {
    console.error("Error loading state:", error);
  }

  return {
    users: initialUsers,
    orders: initialOrders,
    notifications: [],
    theme: localStorage.getItem("theme") || "light",
    sidebarOpen: true,
    toasts: [],
  };
};

function appReducer(state, action) {
  switch (action.type) {
    case "SET_THEME":
      localStorage.setItem("theme", action.payload);
      return { ...state, theme: action.payload };

    case "TOGGLE_SIDEBAR":
      return { ...state, sidebarOpen: !state.sidebarOpen };

    case "ADD_USER":
      const newUser = { ...action.payload, id: Date.now() };
      console.log("📝 Adding user:", newUser.name);
      return {
        ...state,
        users: [...state.users, newUser],
      };

    case "UPDATE_USER":
      console.log("✏️ Updating user:", action.payload.name);
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        ),
      };

    case "DELETE_USER":
      console.log("🗑️ Deleting user ID:", action.payload);
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

    case "UPDATE_ORDER_STATUS":
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.payload.id
            ? { ...o, status: action.payload.status }
            : o,
        ),
      };

    case "ADD_TOAST":
      return {
        ...state,
        toasts: [...state.toasts, { id: Date.now(), ...action.payload }],
      };

    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          { id: Date.now(), time: new Date(), ...action.payload },
          ...state.notifications,
        ].slice(0, 20),
      };

    case "CLEAR_NOTIFICATIONS":
      return { ...state, notifications: [] };

    case "CLEAR_ALL_DATA":
      return {
        users: [],
        orders: [],
        notifications: [],
        theme: "light",
        sidebarOpen: true,
        toasts: [],
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, loadInitialState());

  // Save entire state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      users: state.users,
      orders: state.orders,
      notifications: state.notifications,
      sidebarOpen: state.sidebarOpen,
    };
    localStorage.setItem("app_state", JSON.stringify(stateToSave));
    console.log("💾 State saved. Users:", state.users.length);
  }, [state.users, state.orders, state.notifications, state.sidebarOpen]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.theme === "dark");
  }, [state.theme]);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const notifications = [
        {
          type: "order",
          message: "New order received #" + Math.floor(Math.random() * 1000),
        },
        { type: "user", message: "New user signed up" },
        { type: "alert", message: "Server CPU at 85%" },
      ];
      const random =
        notifications[Math.floor(Math.random() * notifications.length)];
      dispatch({ type: "ADD_NOTIFICATION", payload: random });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const showToast = (message, type = "info") => {
    const id = Date.now();
    dispatch({ type: "ADD_TOAST", payload: { message, type } });
    setTimeout(() => dispatch({ type: "REMOVE_TOAST", payload: id }), 4000);
  };

  return (
    <AppContext.Provider value={{ state, dispatch, showToast }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
