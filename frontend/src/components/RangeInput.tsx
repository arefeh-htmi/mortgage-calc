import { useMemo } from "react";
import styled from "styled-components";
import { colors } from "utils/styleConstants";

interface RangeInputProps {
  name: string;
  min: number;
  max: number;
  step?: number;
  label: string;
  value: number;
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
    border-radius: 0.75rem;
    transition: 200ms ease-in-out;
    background: ${({ backgroundFill }) =>
      `-webkit-linear-gradient(left, ${colors.primary} 0%, ${colors.primary} ${backgroundFill}%, ${colors.white} ${backgroundFill}%)`};
    -webkit-appearance: none;

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 100%;
      border-radius: 0.75rem;
      border: 1px solid ${colors.gray};
      transition: 200ms ease-in-out;
      cursor: pointer;
    }

    &::-moz-range-track {
      width: 100%;
      height: 100%;
      border-radius: 0.75rem;
      border: 1px solid ${colors.gray};
      transition: 200ms ease-in-out;
      cursor: pointer;
    }

    &::-moz-range-thumb {
      height: 2.5rem;
      width: 2.5rem;
      border: 1.5px solid ${colors.white};
      border-radius: 0.75rem;
      background: ${colors.primary};
      transition: 200ms ease-in-out;
      cursor: pointer;
    }

    &::-webkit-slider-thumb {
      width: 2.5rem;
      height: 2.5rem;
      margin-top: -0.5rem;
      border: 1.5px solid ${colors.white};
      border-radius: 100%;
      background: ${colors.primary};
      -webkit-appearance: none;
      cursor: pointer;
    }
  `,
  rangeValue: styled.span<{ calcValue: number }>`
    position: absolute;
    left: ${({ calcValue }) => `calc(${calcValue}% - (${calcValue}px))`};
    bottom: 0;
    transform: translateX(-100%);
    color: ${colors.white};
    user-select: none;
    white-space: nowrap;
  `,
  maxValue: styled.span`
    position: absolute;
    right: 0.9rem;
    bottom: 0;
    color: ${colors.gray};
    user-select: none;
    white-space: nowrap;
  `,
};

export function RangeInput({
  name,
  label,
  value,
  step,
  min = 0,
  max = 100,
  onChange,
  formatValue = (value) => value.toString(),
  ...rest
}: RangeInputProps): JSX.Element {
  
  const backgroundFillValue = useMemo(
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
        backgroundFill={backgroundFillValue}
        {...rest}
      />
      <elements.rangeValue calcValue={backgroundFillValue}>
        {formatValue(value)}
      </elements.rangeValue>
    </elements.rangeWrapper>
  );
}
