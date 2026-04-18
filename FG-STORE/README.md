# FG-Store E-Commerce Application

A professional, production-ready React E-Commerce application utilizing modern React concepts. FG-Store demonstrates scalable architectural patterns, modern hooks, and rigorous state management logic while maintaining a high standard of UI/UX design.

## 🚀 Built With

- **Frontend Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (v3)
- **State Management:** Redux Toolkit (Cart & Products State) + Context API (Theme & Toast Notifications)
- **Routing:** React Router v6
- **Icons:** Lucide React


## ✨ Key Features

- **Robust State Management:** Clean separation of concerns. `Redux Toolkit` manages complex and async states (cart arrays, fetching products) while `Context API` handles global UI toggles (Light/Dark mode, floating Toast notifications).
- **Modern Hook Usage:** Extensive, practical examples of `useState`, `useEffect`, `useMemo`, and `useCallback` to optimize rendering and handle component lifecycles deeply.
- **Dynamic Routing:** Multi-page architecture including a Home feed, dynamic Product Details view (`/product/:id`), a Contact page, and a secure Checkout route mimicking real-world operations.
- **Responsive & Accessible Design:** Complete with Dark Mode support and tailored interactive micro-animations for buttons, cards, and page transitions.
- **Mock Checkout Experience:** Detailed, visually accurate Stripe mock checkout form and cart management interface.
- **Real Customer Service Channel:** Integrated with Tawk.to for live customer interactions out-of-the-box.

## 🛠️ Getting Started

### Prerequisites
Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```

2. Navigate into the project directory:
   ```bash
   cd react-ecommerce-demo
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173` to view the application.

## 📁 Project Structure Highlights

- `src/components/` - Reusable UI widgets (`Navbar`, `ProductCard`, `Cart`).
- `src/pages/` - Full route components (`Home`, `ProductDetails`, `Checkout`).
- `src/store/` - Redux Toolkit slices (`cartSlice`, `productsSlice`) and modern `.withTypes` hooks configuration.
- `src/context/` - Context providers for isolated UI state logic (`ThemeContext`, `ToastContext`).
- `src/types.ts` - Centralized TypeScript interfaces to ensure strict type safety across the entire application footprint.

## 🚢 Deployment

This project is perfectly optimized for immediate deployment on modern hosting platforms like **Vercel** or **Netlify**. Since it utilizes a Vite build configuration, simply connecting your GitHub repository to Vercel will automatically trigger the correct build steps.

```bash
npm run build
```

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
