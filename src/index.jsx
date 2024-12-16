import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./i18n";
import { AuthProvider } from "./contexts/authContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4E342E",
    },
    grey: {
      main: "#FAFAFA",
    },
    secondary: {
      main: "#e0c097",
    },
    background: {
      default: "#fff",
    },
    text: {
      primary: "#000",
      secondary: "#FAF3E0",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
