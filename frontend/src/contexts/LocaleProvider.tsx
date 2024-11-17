import { useContext, createContext, useState, PropsWithChildren } from "react";
export enum LocaleType {
  sweden = "se"
}

/** Locale is used to know the 'country/location' that user is in. The only value for it is sweden right now
 */
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
