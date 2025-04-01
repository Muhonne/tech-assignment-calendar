import { ProgramSchedule } from "@/types";
import {
  getMonthLayout,
  getMonthIndexes,
  getProgramLayout,
  MISSED_SESSION,
} from "@/utils";
import "@testing-library/jest-dom";

/**
 * test core logic
 * component tests don't add much value IMO
 * prefer e.g. Playwright
 *
 * most tests made with chatgpt, verified and modified by a human
 *
 * TBD: https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs
 */
describe("utils - getMonthIndexes", () => {
  it("returns correct firstISODay and dayCount for January 2024", () => {
    expect(getMonthIndexes(new Date(2024, 0, 15))).toEqual({
      firstISODay: 1,
      dayCount: 31,
    });
  });

  it("returns correct firstISODay and dayCount for February 2024 (leap year)", () => {
    expect(getMonthIndexes(new Date(2024, 1, 15))).toEqual({
      firstISODay: 4,
      dayCount: 29,
    });
  });

  it("returns correct firstISODay and dayCount for April 2024", () => {
    expect(getMonthIndexes(new Date(2024, 3, 15))).toEqual({
      firstISODay: 1,
      dayCount: 30,
    });
  });

  it("returns correct firstISODay and dayCount for December 2023", () => {
    expect(getMonthIndexes(new Date(2023, 11, 15))).toEqual({
      firstISODay: 5,
      dayCount: 31,
    });
  });

  it("returns correct firstISODay and dayCount for leap year 2028 february", () => {
    expect(getMonthIndexes(new Date(2028, 1, 29))).toEqual({
      firstISODay: 2,
      dayCount: 29,
    });
  });

  it("returns correct firstISODay and dayCount for 2027-8-28", () => {
    expect(getMonthIndexes(new Date(2027, 8, 28))).toEqual({
      firstISODay: 3,
      dayCount: 30,
    });
  });
});

describe("utils - getMonthLayout", () => {
  it("should return correct layout for a month starting on Monday", () => {
    const date = new Date(2024, 3, 1);
    const layout = getMonthLayout(date);

    expect(layout).toEqual([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, null, null, null, null, null],
    ]);
  });

  it("should return correct layout for a month starting on Wednesday", () => {
    const date = new Date(2024, 4, 1);
    const layout = getMonthLayout(date);

    expect(layout).toEqual([
      [null, null, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 29, 30, 31, null, null],
    ]);
  });

  it("should return correct layout for February in a leap year", () => {
    const date = new Date(2024, 1, 1);
    const layout = getMonthLayout(date);

    expect(layout).toEqual([
      [null, null, null, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, null, null, null],
    ]);
  });
});

describe("utils - getProgramLayout", () => {
  // TODO: more test cases
  const date = new Date(2025, 2, 17);
  const monthLayout = getMonthLayout(date);
  it("gets normal program", () => {
    const program: ProgramSchedule = {
      week1: [
        {
          weekday: "MONDAY",
          title: "The Meru Health Program",
          completed: true,
        },
      ],
      week2: [
        {
          weekday: "MONDAY",
          title: "Mind on Autopilot",
          completed: true,
        },
      ],
      week3: [
        {
          weekday: "MONDAY",
          title: "The Negativity Spiral",
          completed: true,
        },
      ],
    };
    expect(getProgramLayout(program, monthLayout, 17)).toEqual([
      [],
      [
        {
          weekday: "MONDAY",
          title: "The Meru Health Program",
          completed: true,
        },
        ,
        ,
        ,
        ,
        ,
      ],
      [
        { weekday: "MONDAY", title: "Mind on Autopilot", completed: true },
        ,
        ,
        ,
        ,
        ,
      ],
      [
        { weekday: "MONDAY", title: "The Negativity Spiral", completed: true },
        ,
        ,
        ,
        ,
        ,
      ],
    ]);
  });

  it("gets program with missed session", () => {
    const program2: ProgramSchedule = {
      week1: [
        {
          weekday: "MONDAY",
          title: "The Meru Health Program",
          completed: true,
        },
      ],
      week2: [
        {
          weekday: "MONDAY",
          title: "Mind on Autopilot",
          completed: false,
        },
      ],
      week3: [
        {
          weekday: "MONDAY",
          title: "The Negativity Spiral",
          completed: true,
        },
      ],
    };
    expect(getProgramLayout(program2, monthLayout, 17)).toEqual([
      [],
      [
        {
          weekday: "MONDAY",
          title: "The Meru Health Program",
          completed: true,
        },
        ,
        ,
        ,
        ,
        ,
      ],
      [
        { weekday: "MONDAY", title: MISSED_SESSION, completed: false },
        ,
        ,
        ,
        ,
        ,
      ],
      [
        { weekday: "MONDAY", title: "Mind on Autopilot", completed: false },
        ,
        ,
        ,
        ,
        ,
      ],
    ]);
  });
});
