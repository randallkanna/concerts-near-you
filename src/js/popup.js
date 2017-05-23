import "../css/popup.css";
import App from "./popup/app_component.jsx";
import React from "react";
import { render } from "react-dom";

render(
  <App artist="Tool" />,
  window.document.getElementById("app-container")
);
