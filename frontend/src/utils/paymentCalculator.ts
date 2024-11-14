import { annualInterestRate } from "./constants";
/**
 * No major changes
 * **/ 
export function paymentCalculator(amount: number, time: number): number {
  //     belopp * månadsräntesats * ( ( 1 + månadsräntesats ) ^ antal månader )
  // ----------------------------------------------------------------------
  //         ( ( 1 + månadsräntesats ) ^ antal månader ) - 1

  const totalMonth = time * 12;
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const monthlyInterestInTime = Math.pow(1 + monthlyInterestRate, totalMonth); // ( ( 1 + månadsräntesats ) ^ antal månader )
  let monthlyPayment =
    (amount * monthlyInterestInTime * monthlyInterestRate) /
    (monthlyInterestInTime - 1);

  return isNaN(monthlyPayment) ? 0 : Math.round(monthlyPayment);
}
