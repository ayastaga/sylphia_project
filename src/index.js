import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

// import all components for website
import Collapsible from "./components/Collapsible";
import Upload from "./components/Upload";
import Output from "./components/Output";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <div className="container-main">
      <Collapsible />
      <Upload />
      <Output />
    </div>
  </React.StrictMode>
);

reportWebVitals();
