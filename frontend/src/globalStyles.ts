import  { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* CSS RESET KOD */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  * {
    margin: 0;
  }
  
  html, body {
    height: 100%;
  }
  
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    font-family: Sans-serif;
  }
  
  input, button{
    font: inherit;
  }
  
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
    margin:0 auto;
  }
`;
