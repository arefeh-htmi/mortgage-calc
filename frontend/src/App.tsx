import { StrictMode } from "react";
import { MortgageCalculator } from "screens/MortgageCalculator";
import styled from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { LocaleProvider } from "./contexts/LocaleProvider";

const elements = {
  appContainer: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  `,
};

function App() {
  return (
    <StrictMode>
      <GlobalStyles />
      <LocaleProvider>
          <elements.appContainer>
            <MortgageCalculator />
          </elements.appContainer>
      </LocaleProvider>
    </StrictMode>
  );
}

export default App;
