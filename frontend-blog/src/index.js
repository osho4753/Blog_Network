import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from "@mui/material/CssBaseline";

import App from './App';
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
    </BrowserRouter>
    </CssBaseline>
  </React.StrictMode>
);
