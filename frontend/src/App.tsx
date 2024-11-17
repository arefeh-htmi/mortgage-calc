import { MortgageCalculator } from "screens/MortgageCalculator";
import { GlobalStyles } from "./globalStyles";
import { LocaleProvider } from "./contexts/LocaleProvider";
import { MainScreen } from "screens/MainScreen";
import { ThemeProvider } from "contexts/ThemeProvider";

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider>
        <LocaleProvider>
          <MainScreen>
            <MortgageCalculator />
          </MainScreen>
        </LocaleProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
