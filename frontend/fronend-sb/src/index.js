import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

//node application using react to make develompent easier
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
