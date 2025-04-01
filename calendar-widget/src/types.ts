export type MonthLayoutIndexes = {
  firstISODay: number;
  dayCount: number;
};

export type MonthLayout = Array<Array<null | number>>;

type Weekday =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";
export enum WeekdayEnum {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export interface Session {
  weekday: Weekday;
  title: string;
  completed: boolean;
}

export type WeekKey = `week${number}`;
export type ProgramSchedule = Record<WeekKey, Session[]>;

export type ProgramLayout = Array<null | Array<undefined | Session>>;
