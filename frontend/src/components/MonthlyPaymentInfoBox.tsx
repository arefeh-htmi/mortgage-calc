import styled from "styled-components";
import { useCurrencyFormatter } from "hooks/useCurrencyFormatter";
import { paymentCalculator } from "utils/paymentCalculator";
import { colors } from "utils/styleConstants";

interface monthlyPaymentInfoBoxProps {
  amount: number;
  time: number;
}

const elements = {
  monthlyPaymentInfoBoxWrapper: styled.div`
    background: ${colors.primary};
    color: ${colors.white};
    text-align: center;
    padding: 1rem;
    padding-bottom: 2.5rem;
    border-radius: 0.2rem;
    clip-path: polygon(
      50% 0%,
      100% 0,
      100% 35%,
      100% 80%,
      30% 80%,
      20% 100%,
      20% 80%,
      0 80%,
      0% 35%,
      0 0
    );
  `,
};

export function MonthlyPaymentInfoBox({
  amount,
  time,
}: monthlyPaymentInfoBoxProps): JSX.Element {
  const monthlyPayment = paymentCalculator(amount, time);
  const currencyFormatter = useCurrencyFormatter();

  return (
    <elements.monthlyPaymentInfoBoxWrapper>
      <h5>Exempel på månadskostnad</h5>
      <span> {currencyFormatter(monthlyPayment)} / mån </span>
    </elements.monthlyPaymentInfoBoxWrapper>
  );
}
