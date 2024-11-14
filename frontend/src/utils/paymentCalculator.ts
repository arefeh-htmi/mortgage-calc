import { annualIntrestRate } from "./constants";

export function paymentCalculator(amount: number, time: number): number {
  //     belopp * månadsräntesats * ( ( 1 + månadsräntesats ) ^ antal månader )
  // ----------------------------------------------------------------------
  //         ( ( 1 + månadsräntesats ) ^ antal månader ) - 1

  const totalMonth = time * 12;
  const monthlyIntrestRate = annualIntrestRate / 12 / 100;
  const monthlyIntresetInTime = Math.pow(1 + monthlyIntrestRate, totalMonth); // ( ( 1 + månadsräntesats ) ^ antal månader )
  let monthlyPayment =
    (amount * monthlyIntresetInTime * monthlyIntrestRate) /
    (monthlyIntresetInTime - 1);

  return isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment);
}
