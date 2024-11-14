import { Fragment } from "react";
import { MortgageCalculator } from "screens/MortgageCalculator";
import styled from "styled-components";
import { GlobalStyles } from "./globalStyles";

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
    <Fragment>
      <GlobalStyles />
      <elements.appContainer>
        <MortgageCalculator />
      </elements.appContainer>
    </Fragment>
  );
}

export default App;
