import React, { ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  children: ReactNode;
  background: string;
  textColor: string;
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
  background,
  textColor,
  onClick,
  children,
  ...rest
}: ButtonProps): JSX.Element {
  return (
    <elements.button
      background={background}
      textColor={textColor}
      onClick={onClick}
      {...rest}
    >
      {children}
    </elements.button>
  );
}
