import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Commented because it fired API call twice.
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
