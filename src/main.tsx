import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/auth.tsx";
import { OverallThemeProvider } from "./contexts/theme.tsx";
import "./index.css";
import store from "./redux/store.ts";
import { routes } from "./routes/index.tsx";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <OverallThemeProvider>
        <CssBaseline />

        <AuthProvider>
          <RouterProvider router={router} />

          <App />
        </AuthProvider>
      </OverallThemeProvider>
    </Provider>
  </React.StrictMode>
);
