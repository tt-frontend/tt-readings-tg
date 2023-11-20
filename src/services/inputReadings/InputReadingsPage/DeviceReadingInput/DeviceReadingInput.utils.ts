export const getReadingInputPlaceholder = (
  value?: number | null,
  currentValue?: number | null
) => {
  return typeof value === "number"
    ? value
      ? String(value)
      : "000000,00"
    : currentValue
    ? String(currentValue)
    : "000000,00";
};
