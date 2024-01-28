import { getDayIdFromDate } from "./getDayIdFromDate";

export const getDefaultDayId = () => {
  const today = getDayIdFromDate(new Date());

  return today;
};

export const getDefaultMonthId = () => {
  const today = getDefaultDayId();
  const currentMonth = today.split("-").slice(0, 2).join("-");

  return currentMonth;
};
