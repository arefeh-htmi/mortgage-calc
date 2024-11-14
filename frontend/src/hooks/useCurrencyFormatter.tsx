import { LocaleType, useLocale } from "../contexts/LocaleProvider";

export enum CurrencyFormat {
  "Short_CURRENCY",
  "DEFAULT",
}

const currencyLocaleMap: Record<LocaleType, string> = {
  [LocaleType.sweden]: "SEK",
};

export function useCurrencyFormatter() {
  const [localSettings] = useLocale();

  const currencyFormatter = (
    price: number,
    currencyDisplayFormat: CurrencyFormat = CurrencyFormat.DEFAULT
  ): string => {
    let intlFormatter = new Intl.NumberFormat(localSettings, {
      style: "currency",
      currency: currencyLocaleMap[localSettings],
      useGrouping: true,
      currencyDisplay:
        currencyDisplayFormat === CurrencyFormat.Short_CURRENCY ? "narrowSymbol" : "code",
      minimumFractionDigits: 0,
    });

    return intlFormatter.format(price);
  };

  return currencyFormatter;
}