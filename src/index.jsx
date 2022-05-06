import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import React from "react";
import { StateProvider } from "./context/StateContext";
import initialState from "./context/initialState";
import reducer from "./context/reducer";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <StrictMode>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </StrictMode>
  );
} else {
  throw Error("no root element");
}
