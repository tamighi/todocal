export const getDayArrayFromMonthId = (monthId: string) => {
  const [currentYear, currentMonth] = monthId.split("-").map(Number);
  const firstDay = new Date(currentYear, currentMonth - 1, 1);
  const lastDay = new Date(currentYear, currentMonth, 0); // Setting day to 0 gets the last day of the previous month

  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday, etc.

  const dayArray = [];

  // Add padding for days from the previous month
  const prevMonthLastDay = new Date(currentYear, currentMonth - 1, 0).getDate();
  for (
    let i = prevMonthLastDay - startingDayOfWeek + 1;
    i <= prevMonthLastDay;
    i++
  ) {
    const day = new Date(Date.UTC(currentYear, currentMonth - 2, i))
      .toISOString()
      .split("T")[0];
    dayArray.push({ id: day, padDay: true });
  }

  // Populate the array with days in the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const day = new Date(Date.UTC(currentYear, currentMonth - 1, i))
      .toISOString()
      .split("T")[0];
    dayArray.push({ id: day });
  }

  // Add padding for days from the next month
  const remainingDays = 7 - (dayArray.length % 7);
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(Date.UTC(currentYear, currentMonth, i))
      .toISOString()
      .split("T")[0];
    dayArray.push({ id: day, padDay: true });
  }

  // Chunk the array into rows
  const rowArray = [];
  while (dayArray.length > 0) {
    rowArray.push(dayArray.splice(0, 7));
  }

  return rowArray;
};

export const getNextMonthId = (monthId: string) => {
  const [year, month] = monthId.split("-").map(Number);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  return `${nextYear}-${nextMonth.toString().padStart(2, "0")}`;
};

export const getPrevMonthId = (monthId: string) => {
  const [year, month] = monthId.split("-").map(Number);
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  return `${prevYear}-${prevMonth.toString().padStart(2, "0")}`;
};

export const getMonthIdFromDayId = (dayId: string) => {
  const [year, month] = dayId.split("-");
  return [year, month].join("-");
};
