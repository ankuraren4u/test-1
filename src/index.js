import React from "react";
import ReactDOM from "react-dom";
import { createRenderer } from "fela";
import { RendererProvider, ThemeProvider } from "react-fela";

import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme.js";

const renderer = createRenderer({
  devMode: true
});

ReactDOM.render(
  <React.StrictMode>
    <RendererProvider renderer={renderer}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </RendererProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
