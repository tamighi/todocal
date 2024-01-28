export const getDayIdFromDate = (date: Date) => {
  return date.toISOString().split("T")[0];
};
