import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactionSpeedTest from "./pages/training/ReactionSpeedTest.tsx";
import CardMemoryTest from "./pages/training/CardMemoryTest.tsx";
import Practice from "./pages/training/Practice.tsx";
import Settings from "./pages/training/Settings.tsx";
import LoginPage from "./pages/LoginPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/reaction-speed-test" element={<ReactionSpeedTest />} />
          <Route path="/card-memory-test" element={<CardMemoryTest />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
