import { PropsWithChildren } from "react";
import baseStyled, {
  ThemeProvider as StyledComponentsThemeProvider,
  ThemedStyledInterface,
} from "styled-components";

export const lightTheme = {
  all: {
    borderRadius_sm: "0.2rem",
    borderRadius_md: "0.5rem",
    borderRadius_lg: "0.75rem",
    borderRadius_round: "100%",
  },
  colors: {
    white: "#fff",
    gray: "gray",
    black: "#000",
    primary: "purple",
    secondary: "green",
  },
};
export type AppTheme = typeof lightTheme;
export const styled = baseStyled as ThemedStyledInterface<AppTheme>;

export const ThemeProvider = ({ children }: PropsWithChildren) => {

  return (
    <StyledComponentsThemeProvider theme={lightTheme}>
      {children}
    </StyledComponentsThemeProvider>
  );
};