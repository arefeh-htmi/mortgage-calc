import { styled } from "contexts/ThemeProvider";
import { useMemo } from "react";

interface SliderRangeFieldProps {
  name: string;
  min: number;
  max: number;
  step?: number;
  label: string;
  value: number;
  ariaValueText?: string;
  onChange?: (e: any) => void;
  formatValue?: (value: number) => string;
}

const elements = {
  rangeWrapper: styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  `,
  label: styled.label`
    display: flex;
    flex-wrap: wrap;
    position: relative;
    align-items: center;
  `,
  input: styled.input<{ backgroundFill: number }>`
    position: relative;
    width: 100%;
    height: 1.5rem;
    border-radius: ${({ theme }) => theme.all.borderRadius_lg};
    transition: 200ms ease-in-out;
    background: ${({ backgroundFill, theme }) =>
      `-webkit-linear-gradient(left, ${theme.colors.primary} 0%, ${theme.colors.primary} ${backgroundFill}%, transparent ${backgroundFill}%)`};
    appearance: none;
    -webkit-appearance: none;

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 100%;
      border-radius: ${({ theme }) => theme.all.borderRadius_lg};
      border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
      transition: 200ms ease-in-out;
      cursor: pointer;
    }

    &::-moz-range-track {
      width: 100%;
      height: 100%;
      border-radius: ${({ theme }) => theme.all.borderRadius_lg};
      border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
      transition: 200ms ease-in-out;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      height: 2.5rem;
      width: 2.5rem;
      border: ${({ theme }) => `1.5px solid ${theme.colors.white}`};
      border-radius: ${({ theme }) => theme.all.borderRadius_lg};
      background: ${({ theme }) => `1.5px solid ${theme.colors.primary}`};
      transition: 200ms ease-in-out;
      cursor: pointer;
    }

    &::-webkit-slider-thumb {
      width: 2.5rem;
      height: 2.5rem;
      margin-top: -0.5rem;
      border: ${({ theme }) => `1.5px solid ${theme.colors.white}`};
      border-radius: ${({ theme }) => theme.all.borderRadius_round};
      background: ${({ theme }) => theme.colors.primary};
      -webkit-appearance: none;
      transition: 200ms ease-in-out;
      cursor: pointer;
    }
  `,
  rangeValue: styled.span<{ calcValue: number }>`
    position: absolute;
    left: ${({ calcValue }) => `calc(${calcValue}% - (${calcValue}px))`};
    bottom: 0;
    transform: translateX(-100%);
    color: ${({ theme }) => theme.colors.white};
    user-select: none;
    white-space: nowrap;
  `,
  maxValue: styled.span`
    position: absolute;
    right: 0.9rem;
    bottom: 0;
    color: ${({ theme }) => theme.colors.gray};
    user-select: none;
    white-space: nowrap;
  `,
};

export function SliderRangeField({
  name,
  label,
  value,
  step,
  min = 0,
  max = 100,
  ariaValueText,
  onChange,
  formatValue = (value) => value.toString(),
}: SliderRangeFieldProps): JSX.Element {
  const sliderProgressValue = useMemo(
    () => Number(((value - min) * 100) / (max - min)),
    [value, min, max]
  );

  return (
    <elements.rangeWrapper>
      <elements.maxValue>{formatValue(max)}</elements.maxValue>
      <elements.label htmlFor={name} aria-label={label}>
        {label}
      </elements.label>
      <elements.input
        type="range"
        role="slider"
        id={name}
        name={name}
        defaultValue={min}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        aria-valuemax={max}
        aria-valuemin={min}
        aria-valuenow={value}
        aria-invalid={value > max || value < min}
        aria-valuetext={ariaValueText}
        backgroundFill={sliderProgressValue}
      />
      <elements.rangeValue calcValue={sliderProgressValue}>
        {formatValue(value)}
      </elements.rangeValue>
    </elements.rangeWrapper>
  );
}
