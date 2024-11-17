import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import { registerSW } from "virtual:pwa-register";

// PWA 서비스 워커 등록
if ("serviceWorker" in navigator) {
  registerSW({
    onRegistered: (registration?: ServiceWorkerRegistration) => {
      if (registration) {
        console.log("Service Worker registered", registration);
      }
    },
    onRegisterError: (error: Error) => {
      // any 대신 Error 타입 사용
      console.error("Service Worker registration error", error);
    },
  });
}

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
