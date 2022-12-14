import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./pages/home/App";
import Auth from "./pages/auth/Auth";
import Dashboard from "./pages/dashboard/Dashboard";
import E404 from "./pages/errors/E404";
import store from "./app/store";
import { Provider } from "react-redux";
import "./style/globals.scss";
import React from "react";
import Notification from "./components/Notification";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/404" element={<E404 />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
      <Notification />
    </Provider>
  </React.StrictMode>
);
