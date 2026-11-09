import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./store/store";
import "./index.css";

/**
 * Start the app and provide the shared Redux store.
 * Post storage is handled through the postStorage module.
 */
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);