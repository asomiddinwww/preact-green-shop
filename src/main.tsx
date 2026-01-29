import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import ProviderConfig from "./router/provider-config/ProviderConfig";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="577638283566-18qcr29sl5ckh1a8fh921hhlah4eoj5g.apps.googleusercontent.com">
      <Provider store={store}>
        <ProviderConfig>
          <RouterProvider router={router} />
        </ProviderConfig>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
