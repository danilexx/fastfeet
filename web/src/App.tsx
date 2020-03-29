import * as React from "react";
import useReactFontLoader from "react-font-loader";
import { StoreProvider } from "easy-peasy";
import { GlobalStyles } from "./lib/GlobalStyles";
import { ThemeProvider } from "./lib/StyledComponents";
import { theme } from "./theme";
import store from "./store";
import Routes from "./components/Routes";

const App = () => {
  useReactFontLoader({ fonts: [{ name: "Roboto" }, { name: "Roboto Bold" }] });
  return (
    <>
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Routes />
        </ThemeProvider>
      </StoreProvider>
    </>
  );
};
export default App;
