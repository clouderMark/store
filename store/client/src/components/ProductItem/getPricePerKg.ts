export const getPricePerKg = (weight: number, price: number): string => {
  let result;

  if (weight === 1) {
    result = price;
  } else if (weight > 1) {
    result = price / weight;
  } else if (weight < 1) {
    result = (price * 1) / weight;
  }

  return `${result?.toFixed(2)}`;
};
