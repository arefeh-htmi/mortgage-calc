export enum CurrencyFormat {
  "Short_CURRENCY",
  "DEFAULT",
}

export function currencyFormatter(
  price: number,
  format: CurrencyFormat = CurrencyFormat.DEFAULT
): string {
  let intlFormatter = new Intl.NumberFormat("sv-se", {
    style: "currency",
    currency: "SEK",
    useGrouping: true,
    currencyDisplay:
      format === CurrencyFormat.Short_CURRENCY ? "narrowSymbol" : "code",
    minimumFractionDigits: 0,
  });

  return intlFormatter.format(price);
}
