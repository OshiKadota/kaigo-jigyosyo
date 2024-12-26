export const isNullableNumber = (value: number | null) => {
  return typeof value === "number" || value === null;
};

export const isNumber = (value: number): boolean => {
  return typeof value === "number";
};
