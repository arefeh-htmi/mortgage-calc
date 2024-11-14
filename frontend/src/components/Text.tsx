import { PropsWithChildren } from "react";

export type TextType = "Title" | "SubTitle" | "Text";

interface TextProps extends PropsWithChildren {
  kind?: TextType;
}

function Text({ kind = "Text", children }: TextProps) {
  switch (kind) {
    case "SubTitle":
      return <h5>{children}</h5>;
    case "Title":
      return <h3>{children}</h3>;
    case "Text":
    default:
      return <span>{children}</span>;
  }
}

export { Text };
