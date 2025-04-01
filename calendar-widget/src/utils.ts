import { getDaysInMonth, getISODay, startOfMonth } from "date-fns";
import {
  MonthLayout,
  MonthLayoutIndexes,
  ProgramLayout,
  ProgramSchedule,
  Session,
  WeekdayEnum,
  WeekKey,
} from "./types";

/**
 * Assuming date-fns deals with
 * - locale differences like start of week sun|mon
 * - leap years etc.
 */

export const MISSED_SESSION = "MISSED_SESSION";

export function getMonthIndexes(today: Date): MonthLayoutIndexes {
  const firstDate = startOfMonth(today);
  const firstISODay = getISODay(firstDate);
  const dayCount = getDaysInMonth(today);
  return {
    firstISODay,
    dayCount,
  };
}

export function getMonthLayout(date: Date) {
  const { firstISODay, dayCount } = getMonthIndexes(date);
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

export function getProgramLayout(
  program: ProgramSchedule,
  month: MonthLayout,
  day: number
) {
  const programLayout: ProgramLayout = [];

  // start from first full week
  let weekIndex = 0;
  if (month[0][0] === null) {
    programLayout[weekIndex] = [];
    weekIndex = 1;
  }

  // unfinished sessions pushed to next date
  const rollOverSessions: Session[] = [];

  // assume data is ordered and in correct format
  Object.keys(program).forEach((weekKey) => {
    programLayout[weekIndex] = new Array(7);
    program[weekKey as WeekKey].forEach((session) => {
      const pastDay = month[weekIndex][WeekdayEnum[session.weekday]]! < day;
      if (pastDay) {
        if (session.completed) {
          programLayout[weekIndex]![WeekdayEnum[session.weekday]] = session;
        } else {
          programLayout[weekIndex]![WeekdayEnum[session.weekday]] = {
            ...session,
            title: MISSED_SESSION,
          };
          rollOverSessions.push(session);
        }
      } else if (rollOverSessions.length > 0) {
        programLayout[weekIndex]![WeekdayEnum[session.weekday]] =
          rollOverSessions[0];
        rollOverSessions.splice(0, 1);
        rollOverSessions.push(session);
      } else {
        programLayout[weekIndex]![WeekdayEnum[session.weekday]] = session;
      }
    });
    weekIndex++;
  });
  return programLayout;
}

export function getCalendarMatrix(date: Date, program: ProgramSchedule) {
  const monthLayout = getMonthLayout(date);
  const programLayout = getProgramLayout(program, monthLayout, date.getDate());
  return { monthLayout, programLayout };
}
