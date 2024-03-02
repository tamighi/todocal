import { getDayIdFromDate } from "./getDayIdFromDate";

export const getCurrentDayId = () => {
  const today = getDayIdFromDate(new Date());

  return today;
};

export const getCurrentMonthId = () => {
  const today = getCurrentDayId();
  const currentMonth = today.split("-").slice(0, 2).join("-");

  return currentMonth;
};
