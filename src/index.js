import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Arquivo CSS opcional para estilização
import App from "./App.jsx";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // Refere-se ao <div id="root"> no index.html
);
