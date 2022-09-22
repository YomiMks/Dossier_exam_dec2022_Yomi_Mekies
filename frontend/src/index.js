import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import SignIn from "./pages/SignIn";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
);
