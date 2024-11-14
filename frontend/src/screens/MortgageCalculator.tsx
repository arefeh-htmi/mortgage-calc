import { Button } from "components/Button.comonent";
import { MonthlyPaymentInfoBox } from "components/MonthlyPaymentInfoBox.component";
import { RangeInput } from "components/RangeInput.component";
import { useForm } from "hooks/useForm";
import React from "react";
import styled from "styled-components";
import { BASE_URL } from "utils/constants";
import { CurrencyFormat, currencyFormatter } from "utils/currencyFormater";
import { colors } from "utils/styleConstants";

interface MortgageCalculatorProps {}

const elements = {
  calculatorContainer: styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    @media screen and (max-width: 992px) {
      width: 80%;
    }
  `,
  calculatorHeader: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    @media screen and (max-width: 992px) {
      flex-wrap: wrap;
    }
  `,
  mortgageFormContainer: styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 2.5rem;
  `,
};

export function MortgageCalculator(_: MortgageCalculatorProps): JSX.Element {
  const { formValues, handleChange } = useForm({
    amount: 0,
    time: 2,
  });

  function handleSubmit(e: React.MouseEvent): void {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("amount", formValues.amount);
    params.append("time", formValues.time);

    const url = `${BASE_URL}/loan-application/?${params.toString()}`;
    console.log(url);
  }

  return (
    <elements.calculatorContainer>
      <elements.calculatorHeader>
        <h3>Lånekalkyl</h3>
        <MonthlyPaymentInfoBox
          amount={formValues.amount}
          time={formValues.time}
        />
      </elements.calculatorHeader>
      <elements.mortgageFormContainer>
        <RangeInput
          value={formValues.amount}
          name="amount"
          min={20000}
          max={200000}
          step={10000}
          onChange={handleChange}
          formatValue={(value) =>
            currencyFormatter(value, CurrencyFormat.Short_CURRENCY)
          }
          label="Lånebelopp"
          aria-valuetext={`Lånebelopp dragleglare, som visar ${
            formValues.amount
          },från ${currencyFormatter(20000)} till ${currencyFormatter(
            200000
          )}, i steg om 10000`}
        />
        <RangeInput
          value={formValues.time}
          name="time"
          min={2}
          max={10}
          step={1}
          onChange={handleChange}
          formatValue={(value) => `${value} år`}
          label="Lånetid"
          aria-valuetext={`Lånetid dragleglare, som visar ${formValues.time},från 2 till 10`}
        />
        <Button
          background={colors.secoundary}
          textColor={colors.white}
          onClick={handleSubmit}
        >
          Till ansökan
        </Button>
      </elements.mortgageFormContainer>
    </elements.calculatorContainer>
  );
}
