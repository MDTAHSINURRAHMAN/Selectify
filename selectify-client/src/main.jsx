import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/router.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
// Helmet
import { HelmetProvider } from "react-helmet-async";
// Toaster
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: "#22c55e",
              color: "white",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#ef4444",
              color: "white",
            },
          },
        }}
      />
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>
);
