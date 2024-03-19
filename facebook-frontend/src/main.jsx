import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Homepage from "./Pages/Homepage.jsx";
import Marketplace from "./Pages/Marketplace.jsx";
import Groups from "./Pages/Groups.jsx";
import Gaming from "./Pages/Gaming.jsx";
import LoginPage from "./Pages/LoginPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Homepage />, default: true },
      { path: "/marketplace", element: <Marketplace /> },
      { path: "/groups", element: <Groups /> },
      { path: "/gaming", element: <Gaming /> },
    ],
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <div>404 Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
