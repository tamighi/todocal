export const getDefaultDayId = () => {
  const today = new Date().toISOString().split("T")[0];

  return today;
};

export const getDefaultMonthId = () => {
  const today = getDefaultDayId();
  const currentMonth = today.split("-").slice(0, 2).join("-");

  return currentMonth;
};
