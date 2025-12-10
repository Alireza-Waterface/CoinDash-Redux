# CoinDash 🪙 — Professional Crypto Portfolio Tracker

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=white)

> **A feature-rich DeFi Dashboard simulating real-world portfolio management, built to demonstrate advanced proficiency in Redux Toolkit, Async State Management, and Modern React Architecture.**

---

## 📖 Project Overview

**CoinDash** is a real-time cryptocurrency dashboard that allows users to track market trends and manage a virtual portfolio.

Unlike simple "counter apps," this project simulates a complex production environment by integrating **Server State** (live API data) with **Client State** (user portfolio holdings) and **UI State** (themes, notifications). It solves real-world frontend challenges such as data caching, race conditions, derived state calculations, and performance optimization.

### 🎯 Project Goal
The primary goal of this application is to demonstrate **Enterprise-Level State Management** using the modern Redux ecosystem, moving beyond basic CRUD to handle asynchronous data flows and complex state derivation.

---

## ✨ Key Features

### 🚀 Core Functionality
-   **Live Market Data:** Real-time prices, 24h changes, and market caps fetched from the CoinGecko API.
-   **Virtual Portfolio:** Simulate Buying/Selling assets. The app calculates your "Net Worth" dynamically based on live prices and your specific holdings.
-   **Interactive Charts:** 7-Day historical price trends visualized using Area Charts (Recharts).
-   **Advanced Filtering:** Search, Sort by Rank, Price, or Gainers/Losers with memoized performance.
-   **Global UI System:**
    -   Dark/Light Mode toggle (persisted in LocalStorage).
    -   Custom Toast Notification system (Redux-managed).
    -   Responsive Design (Mobile-First approach).

### 🛠 Technical Highlights
-   **Async Redux (RTK Query):** utilizes `createApi` for data fetching, caching (preventing over-fetching), and automatic loading/error states.
-   **Feature-Based Architecture:** Code is organized by domain (`features/market`, `features/portfolio`) rather than file type, scalable for large teams.
-   **Performance Optimization:**
    -   **React Compiler:** Utilizing the latest React 19 compiler features.
    -   **Code Splitting:** Route-based lazy loading with `React.lazy` and `Suspense`.
    -   **Memoization:** Heavy calculations (sorting/filtering) are memoized to prevent re-renders.
-   **Modern Routing:** Implements **React Router v7** using `createBrowserRouter` and Data Router patterns.

---

## 🏗 Tech Stack & Libraries

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | React 19+ (Vite) | Core UI Library |
| **Language** | TypeScript | Strict static typing for props, state, and API responses |
| **State Management** | **Redux Toolkit** | `createSlice` for client state, `createApi` (RTK Query) for server state |
| **Routing** | React Router DOM (v7) | Client-side routing, Lazy loading, Layouts |
| **Styling** | Tailwind CSS | Utility-first styling, Dark mode configuration |
| **Visualization** | Recharts | Composable charting library for React |
| **Icons** | Lucide / HeroIcons | SVG Icons |

---

## 📂 Project Structure

```bash
src/
├── app/                  # Global Redux Store configuration & Typed Hooks
├── components/           # Reusable UI components (Layout, Modal, Toast, Loader)
├── features/             # Feature-based logic modules
│   ├── market/           # API Services (RTK Query) & Market Components
│   ├── portfolio/        # Portfolio Slice (Client State) & Logic
│   └── ui/               # UI Slice (Theme, Toasts)
├── pages/                # Page-level components (Lazy Loaded)
├── types/                # Shared TypeScript interfaces
├── hooks/                # Custom React Hooks (useClickOutside)
└── main.tsx              # Entry point
```

## 🚀 Getting started
Follow these steps to run project locally.

### Prerequisites
-  NodeJS v18.* or higher
-  npm / yarn / bun (I used bun for this project)

   1. Clone the repository
   ```bash
   git clone https://github.com/Alireza-Waterface/CoinDash-Redux.git
   cd coindash
   ```

   2. Install dependencies
   ```bash
   bun install
   ```

   3. Environment Setup
      Create a `.env` file in the root directory. You can use the CoinGecko public demo API.
   ```bash
   VITE_CG_API_KEY=YOUR_API_KEY_FROM_COINGECKO
   VITE_CG_BASE_URL=https://api.coingecko.com/api/v3
   ```

   4. Run the Development Server
   ```bash
   bun run dev
   ```

   Open `http://localhost:5173` in your browser.

## 🔮 Future Insights & Roadmap
  This project is designed to be scalable. Here are the planned next steps:

  1. Backend Integration: Replace LocalStorage persistence with a real backend (Node.js/Supabase) to store user portfolios permanently.
  2. Authentication: Add User Login/Signup to support multiple user profiles.
  3. Transaction History: Create a specialized Slice to track every Buy/Sell event for tax/audit purposes.
  4. WebSocket Integration: Replace polling with WebSockets for sub-second price updates.
  5. PWA Support: Make the app installable on mobile devices.


## Created by [Alireza Abchehre] - Built to showcase advanced React & Redux proficiency.


## ❤️✌️ Thanks for your time & attention.
