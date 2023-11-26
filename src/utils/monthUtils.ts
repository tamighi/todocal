import { Day, Month } from "@/models";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
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
  Array.from(Array(firstDayOfMonth).keys()).forEach(() =>
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
    const isoDate = new Date(currentYear, currentMonth - 1, i)
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
