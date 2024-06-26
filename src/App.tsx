import React from "react";
import Moralis from "moralis";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router } from "react-router-dom";

import "@fontsource/poppins";
import CssBaseline from "@mui/material/CssBaseline";
import MainAppRoutes from "@/routes/routes";
import { moralisApiKey } from "@/config/moralis-connect";
import { MoralisProvider } from "react-moralis";
import { serverUrl, appId } from "@/config/moralis-connect";

import { UserProvider } from "@/stores/container/container";
import theme from "@/theme/Theme";
import themeMode from "@/stores/theme/theme";
import { AppContextProvider } from "@/context/AppContextProvider";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { themeModeState } = themeMode();

  if (!Moralis.Core.isStarted) {
    const moralisStart = async () => {
      await Moralis.start({
        apiKey: moralisApiKey,
      });
    };
    moralisStart();
  }

  const getTheme = React.useMemo(
    () => createTheme(theme(themeModeState)),
    [themeModeState]
  );

  return (
    <ThemeProvider theme={getTheme}>
      <CssBaseline />
      <React.StrictMode>
        <MoralisProvider appId={appId} serverUrl={serverUrl}>
          <AppContextProvider>
            <UserProvider>
              <Toaster />
              <Router>
                <MainAppRoutes />
              </Router>
            </UserProvider>
          </AppContextProvider>
        </MoralisProvider>
      </React.StrictMode>
    </ThemeProvider>
  );
}
