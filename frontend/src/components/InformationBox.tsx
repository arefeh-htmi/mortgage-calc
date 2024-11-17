import { styled } from "contexts/ThemeProvider";
import { PropsWithChildren } from "react";

const elements = {
  infoBoxWrapper: styled.div`
    background: ${({ theme }) => theme.colors.primary };
    color: ${({ theme }) => theme.colors.white };
    text-align: center;
    padding: 1rem;
    padding-bottom: 2.5rem;
    border-radius: ${({ theme }) => theme.all.borderRadius_sm};
    clip-path: polygon(
      50% 0%,
      100% 0,
      100% 35%,
      100% 80%,
      30% 80%,
      20% 100%,
      20% 80%,
      0 80%,
      0% 35%,
      0 0
    );
  `,
};

export function InformationBox({ children }: PropsWithChildren): JSX.Element {
  return <elements.infoBoxWrapper>{children}</elements.infoBoxWrapper>;
}
