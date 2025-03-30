import { getDaysInMonth, getISODay, startOfMonth } from "date-fns";
import { MonthLayout, MonthLayoutIndexes } from "./types";

/**
 * Assuming date-fns deals with
 * - locale differences like start of week sun|mon
 * - leap years etc.
 */
export function getMonthIndexes(today: Date): MonthLayoutIndexes {
  const firstDate = startOfMonth(today);
  const firstISODay = getISODay(firstDate);
  const dayCount = getDaysInMonth(today);

  return {
    firstISODay,
    dayCount,
  };
}

export function getCalendarMatrix(
  firstISODay: MonthLayoutIndexes["firstISODay"],
  dayCount: MonthLayoutIndexes["dayCount"]
) {
  const monthLayout: MonthLayout = [];
  let dayIndex = 1;
  for (let w = 0; dayIndex <= dayCount; w++) {
    monthLayout[w] = [];
    for (let d = 0; d < 7; d++) {
      if (w === 0 && d >= firstISODay - 1) {
        monthLayout[w][d] = dayIndex;
        dayIndex++;
      } else if (w > 0 && dayIndex <= dayCount) {
        monthLayout[w][d] = dayIndex;
        dayIndex++;
      } else {
        monthLayout[w][d] = null;
      }
    }
  }
  return monthLayout;
}
