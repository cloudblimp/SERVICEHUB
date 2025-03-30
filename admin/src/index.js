import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import { ServiceProvider } from "./Context/ServiceContext";
import { AvailabilityProvider } from "./Context/AvailContext";
import { NewDataProvider } from "./Context/NewDataContext";
import { PrimeReactProvider } from "primereact/api";
// import Tailwind from "primereact/passthrough/tailwind";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <PrimeReactProvider value={{ unstyled: false }}> */}
    <AuthProvider>
      <ServiceProvider>
        <NewDataProvider>
          <AvailabilityProvider>
            <BrowserRouter>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </BrowserRouter>
          </AvailabilityProvider>
        </NewDataProvider>
      </ServiceProvider>
    </AuthProvider>
    {/* </PrimeReactProvider> */}
  </>
);
