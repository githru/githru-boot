export const formatData = (month: string, value: string) => {
  const monthsArray = month.split(",");
  const valuesArray = value.split(",").map(Number);
  return monthsArray.map((month, index) => ({
    month,
    value: valuesArray[index],
  }));
};
