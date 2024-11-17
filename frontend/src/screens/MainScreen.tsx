
import { Text } from "components/Text";
import { useLocale } from "contexts/LocaleProvider";
import { styled } from "contexts/ThemeProvider";
import { PropsWithChildren } from "react";

const elements = {
  appContainer: styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  screenContainer: styled.div`
    padding: 3rem 2rem;
  `,
};
export function MainScreen({ children }: PropsWithChildren) {
  const [locale] = useLocale();
  return (
    <elements.screenContainer>
      <Text> Current Locale: {locale}</Text>
      <elements.appContainer>{children}</elements.appContainer>
    </elements.screenContainer>
  );
}
