export enum TimeDurationFormat {
  "MONTH_SHORT",
  "YEAR",
}
export function useTimeDurationFormatter() {
  const formatTimeDuration = (
    timeDuration: number | string,
    format: TimeDurationFormat
  ): string => {
    switch (format) {
      case TimeDurationFormat.MONTH_SHORT:
        return `${timeDuration} mån`;
      case TimeDurationFormat.YEAR:
        return `${timeDuration} år`;
      default:
        return "";
    }
  };

  return formatTimeDuration;
}
