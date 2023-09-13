import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from "@mui/material/CssBaseline";
import App from './App';
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import store from './redux/start.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <CssBaseline>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
    <Provider store={store}>
    <App />
    </Provider>
    </ThemeProvider>
    </BrowserRouter>
    </CssBaseline>
  </>
);
