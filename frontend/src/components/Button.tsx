import { styled } from "contexts/ThemeProvider";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  kind: "primary" | "secondary"; //secondary is a gray button, not really used anywhere
  onClick: (e: React.MouseEvent) => void;
}

const elements = {
  button: styled.button<{ isPrimary: boolean }>`
    display: flex;
    align-items: center;
    background: ${({ theme, isPrimary }) =>
      isPrimary ? theme.colors.secondary : ""};
    border-radius: ${({ theme }) => theme.all.borderRadius_md};
    padding: 0.5rem 1rem;
    border: none;
    color: ${({ theme, isPrimary }) => (isPrimary ? theme.colors.white : "")};
  `,
};

export function Button({
  onClick,
  kind,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <elements.button isPrimary={kind == "primary"} onClick={onClick} {...rest}>
      {children}
    </elements.button>
  );
}
