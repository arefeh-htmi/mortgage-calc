import React, { ReactNode } from "react";
import styled from "styled-components";
import { colors } from "utils/styleConstants";

interface ButtonProps {
  children: ReactNode;
  kind: "primary" | "secondary"; //secondary is a gray button, not really used anywhere
  onClick: (e: React.MouseEvent) => void;
}

const elements = {
  button: styled.button<{ background: string; textColor: string }>`
    display: flex;
    align-items: center;
    background: ${({ background }) => background};
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    color: ${({ textColor }) => textColor};
  `,
};

export function Button({
  onClick,
  kind,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <elements.button
      background={kind == "primary" ? colors.secondary : ""}
      textColor={kind == "primary" ? colors.white : ""}
      onClick={onClick}
      {...rest}
    >
      {children}
    </elements.button>
  );
}
