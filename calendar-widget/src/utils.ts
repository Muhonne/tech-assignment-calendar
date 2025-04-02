import { getDaysInMonth, getISODay, startOfMonth } from "date-fns";
import {
  MonthLayout,
  MonthLayoutIndexes,
  ProgramLayout,
  ProgramSchedule,
  Activity,
  WeekdayEnum,
  WeekKey,
} from "./types";

export function getMonthIndexes(today: Date): MonthLayoutIndexes {
  const firstDate = startOfMonth(today);
  const firstISODay = getISODay(firstDate);
  const dayCount = getDaysInMonth(today);
  return {
    firstISODay,
    dayCount,
  };
}

/**
 *
 * @param date today
 * @returns 2d matrix with day numbers
 */
export function getMonthLayout(date: Date) {
  const { firstISODay, dayCount } = getMonthIndexes(date);
  const monthLayout: MonthLayout = [];
  let dayIndex = 1;
  for (let w = 0; dayIndex <= dayCount; w++) {
    monthLayout[w] = [];
    for (let d = 0; d < 7; d++) {
      if (w === 0 && d >= firstISODay - 1) {
        // first week does not always start from monday
        monthLayout[w][d] = dayIndex;
        dayIndex++;
      } else if (w > 0 && dayIndex <= dayCount) {
        // fill out the rest of the weeks until end of days
        monthLayout[w][d] = dayIndex;
        dayIndex++;
      } else {
        // last week does not always end in sunday
        monthLayout[w][d] = null;
      }
    }
  }
  return monthLayout;
}

/**
 *
 * @param program from api
 * @param month 2d matrix
 * @param day today
 * @returns 2d matrix of sessions, matching indexes to month
 */
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

  // unfinished sessions pushed to today and onwards
  const rollOverActivities: Activity[] = [];

  // assume data is ordered and in correct format
  Object.keys(program).forEach((weekKey) => {
    programLayout[weekIndex] = new Array(7);
    program[weekKey as WeekKey].forEach((session) => {
      // session day exist on the month
      if (
        Array.isArray(month[weekIndex]) &&
        Number.isInteger(WeekdayEnum[session.weekday]) &&
        Number.isInteger(month[weekIndex][WeekdayEnum[session.weekday]])
      ) {
        if (month[weekIndex][WeekdayEnum[session.weekday]]! < day) {
          // past days might have rollovers
          if (session.completed) {
            programLayout[weekIndex]![WeekdayEnum[session.weekday]] = session;
          } else if (!session.completed) {
            rollOverActivities.push(session);
          }
        } else {
          // future days placed normally, rollovers handled in rendering Month
          programLayout[weekIndex]![WeekdayEnum[session.weekday]] = session;
        }
      } else {
        console.warn(
          `Theres a session that is not on the month, week ${weekIndex} ${JSON.stringify(
            session
          )}`
        );
      }
    });
    weekIndex++;
  });
  return { programLayout, rollOverActivities };
}

/**
 * Perhaps unnecessary helper function but clean interfaces are nice
 * @param date today
 * @param program schedule from api
 * @returns 2d matrixes for rendering the schedule on a month
 */
export function getCalendarMatrix(date: Date, program: ProgramSchedule) {
  const monthLayout = getMonthLayout(date);
  const { programLayout, rollOverActivities } = getProgramLayout(
    program,
    monthLayout,
    date.getDate()
  );
  return { monthLayout, programLayout, rollOverActivities };
}
