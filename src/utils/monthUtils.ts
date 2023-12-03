import { Day, Month } from "@/models";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

  return firstDayOfMonth === 0 ? 7 : firstDayOfMonth;
};

/**
 * Add padding days in the array
 */
export const padDaysBeforeMonth = (month: Month): (Day | null)[] => {
  const { id, days } = month;

  const [currentYear, currentMonth] = id.split("-").map(Number);

  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const dayArray: (Day | null)[] = days;

  // fill null till first day in the month
  Array.from(Array(firstDayOfMonth - 1).keys()).forEach(() =>
    dayArray.unshift(null),
  );

  return dayArray;
};

/**
 * Add day objects in the array
 */
export const populateDaysInMonth = (month: Month): Month => {
  const { id, days } = month;

  const [currentYear, currentMonth] = id.split("-").map(Number);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const dayArray: Day[] = [];

  // Fill the rest of the array based on existing days in the month.days array
  for (let i = 1; i <= daysInMonth; i++) {
    const isoDate = new Date(Date.UTC(currentYear, currentMonth - 1, i))
      .toISOString()
      .split("T")[0];

    const existingDay = days.find((day) => day.id === isoDate);

    if (existingDay) {
      dayArray.push(existingDay);
    } else {
      dayArray.push({ id: isoDate, todos: [] });
    }
  }

  // Update the month object with the filled dayArray
  const updatedMonth: Month = {
    id,
    days: dayArray,
  };

  return updatedMonth;
};

/**
 * Transform day array into a table.
 */
export const createCalendarGrid = (days: (Day | null)[]): (Day | null)[][] => {
  const calendarTable: (Day | null)[][] = [];

  let rowIndex = -1;

  days.forEach((day, index) => {
    if (index % 7 === 0) {
      rowIndex++;
      calendarTable[rowIndex] = [];
    }
    calendarTable[rowIndex].push(day);
  });

  while (calendarTable[rowIndex].length < 7) calendarTable[rowIndex].push(null);

  return calendarTable;
};

/**
 * @param monthId Id of the month in format yyyy-mm
 * @returns the next month in same format.
 */
export const getNextMonth = (monthId: string) => {
  const [year, month] = monthId.split("-").map(Number);
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  return `${nextYear}-${nextMonth.toString().padStart(2, "0")}`;
};

/**
 * @param monthId Id of the month in format yyyy-mm
 * @returns the previous month in same format.
 */
export const getPrevMonth = (monthId: string) => {
  const [year, month] = monthId.split("-").map(Number);
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  return `${prevYear}-${prevMonth.toString().padStart(2, "0")}`;
};

export const getMonthIdFromDayId = (dayId: string) => {
  const [year, month] = dayId.split("-");
  return [year, month].join("-");
};
