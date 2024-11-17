import { Button } from "components/Button";
import { InformationBox } from "components/InformationBox";
import { SliderRangeField } from "components/RangeInput";
import { useForm } from "hooks/useForm";
import styled from "styled-components";
import {
  CurrencyFormat,
  useCurrencyFormatter,
} from "hooks/useCurrencyFormatter";
import { Text } from "components/Text";
import { useSubmitMortgageApplication } from "hooks/useSubmitMortgageApplication";
import {
  TimeDurationFormat,
  useTimeDurationFormatter,
} from "hooks/useTimeDurationFormatter";
import { calculateMonthlyPayment } from "utils/paymentCalculator";

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
  const monthlyPayment = calculateMonthlyPayment(formValues.amount, formValues.time);

  function handleSubmit(): void {
    submitMortgage(formValues.amount, formValues.time);
  }

  return (
    <elements.calculatorContainer>
      <elements.calculatorHeader>
        <Text kind="Title">Lånekalkyl</Text>
        <InformationBox>
          <Text kind="SubTitle">Exempel på månadskostnad</Text>
          <Text>
            {formatDuration(
              currencyFormatter(monthlyPayment),
              TimeDurationFormat.MONTH_SHORT
            )}
          </Text>
        </InformationBox>
      </elements.calculatorHeader>

      <elements.mortgageFormContainer>
        <SliderRangeField
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
          ariaValueText={`Lånebelopp dragleglare, som visar ${
            formValues.amount
          },från ${currencyFormatter(20000)} till ${currencyFormatter(
            200000
          )}, i steg om 10000`}
        />

        <SliderRangeField
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
          ariaValueText={`Lånetid dragleglare, som visar ${formValues.time}, från 2 till 10`}
        />

        <Button kind="primary" onClick={handleSubmit}>
          Till ansökan
        </Button>
      </elements.mortgageFormContainer>
    </elements.calculatorContainer>
  );
}
