import * as React from "react";
import useReactFontLoader from "react-font-loader";
import { StoreProvider } from "easy-peasy";
import { toast } from "react-toastify";
import { GlobalStyles } from "./lib/GlobalStyles";
import { ThemeProvider } from "./lib/StyledComponents";
import { theme } from "./theme";
import store from "./store";
import Routes from "./components/Routes";
import "react-toastify/dist/ReactToastify.css";

// Call it once in your app. At the root of your app is the best place
toast.configure({
  style: {
    fontSize: "2rem",
  },
});
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
