export const getNextDayId = (dayId: string) => {
  const currentDate = new Date(dayId);
  currentDate.setDate(currentDate.getDate() + 1);
  return currentDate.toISOString().split("T")[0];
};

export const getPrevDayId = (dayId: string) => {
  const currentDate = new Date(dayId);
  currentDate.setDate(currentDate.getDate() - 1);
  return currentDate.toISOString().split("T")[0];
};
