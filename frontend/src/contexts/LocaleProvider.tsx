import { useContext, createContext, useState, PropsWithChildren } from "react";
export enum LocaleType {
  sweden = "se"
}

// Locale is used to know the 'country' that user is in, and Language to select the 
const LocaleProviderContext = createContext<
  [LocaleType, (value: LocaleType) => void]
>(undefined as any);

export function LocaleProvider({ children }: PropsWithChildren) {
  const [locale, setLocale] = useState<LocaleType>(LocaleType.sweden);

  return (
    <LocaleProviderContext.Provider value={[locale, setLocale]}>
      {children}
    </LocaleProviderContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleProviderContext);
