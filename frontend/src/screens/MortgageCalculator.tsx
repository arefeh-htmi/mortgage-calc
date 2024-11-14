import { Button } from "components/Button";
import { MonthlyPaymentInfoBox } from "components/MonthlyPaymentInfoBox";
import { RangeInput } from "components/RangeInput";
import { useForm } from "hooks/useForm";
import styled from "styled-components";
import {
  CurrencyFormat,
  useCurrencyFormatter,
} from "hooks/useCurrencyFormatter";
import { colors } from "utils/styleConstants";
import { Text } from "components/Text";
import { useSubmitMortgageApplication } from "hooks/useSubmitMorgageApplication";
import {
  TimeDurationFormat,
  useTimeDurationFormatter,
} from "hooks/useTimeDurationFormatter";

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

type MortgageFormModel = {
  amount: number;
  time: number;
};
export function MortgageCalculator(_: MortgageCalculatorProps): JSX.Element {
  const currencyFormatter = useCurrencyFormatter();
  const formatDuration = useTimeDurationFormatter();

  const submitMortgage = useSubmitMortgageApplication();
  const { formValues, handleChange } = useForm<MortgageFormModel>({
    amount: 0,
    time: 2,
  });

  function handleSubmit(): void {
    submitMortgage(formValues.amount, formValues.time);
  }

  return (
    <elements.calculatorContainer>
      <elements.calculatorHeader>
        <Text kind="Title">Lånekalkyl</Text>
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
          formatValue={(value) =>
            formatDuration(value, TimeDurationFormat.YEAR)
          }
          label="Lånetid"
          aria-valuetext={`Lånetid dragleglare, som visar ${formValues.time},från 2 till 10`}
        />

        <Button
          background={colors.secondary}
          textColor={colors.white}
          onClick={handleSubmit}
        >
          Till ansökan
        </Button>
      </elements.mortgageFormContainer>
    </elements.calculatorContainer>
  );
}
