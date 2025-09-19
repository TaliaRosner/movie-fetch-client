import React from "react";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "./index.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div className="app">
      <MainView />
    </div>
  </React.StrictMode>
);
