import { BASE_URL } from "utils/constants";

export function useSubmitMortgageApplication() {
  function submitMortgageApplication(amount: number, time: number): void {
    const params = new URLSearchParams();
    params.append("amount", amount.toString());
    params.append("time", time.toString());

    const url = `${BASE_URL}/loan-application/?${params.toString()}`;
    console.log(url);
  }

  return submitMortgageApplication;
}
