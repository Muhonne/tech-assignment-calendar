import { getCalendarMatrix, getMonthIndexes } from "@/utils";
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
    expect(getMonthIndexes(new Date(2024, 0, 15))).toEqual({ firstISODay: 1, dayCount: 31 });
  });

  it("returns correct firstISODay and dayCount for February 2024 (leap year)", () => {
    expect(getMonthIndexes(new Date(2024, 1, 15))).toEqual({ firstISODay: 4, dayCount: 29 });
  });

  it("returns correct firstISODay and dayCount for April 2024", () => {
    expect(getMonthIndexes(new Date(2024, 3, 15))).toEqual({ firstISODay: 1, dayCount: 30 });
  });

  it("returns correct firstISODay and dayCount for December 2023", () => {
    expect(getMonthIndexes(new Date(2023, 11, 15))).toEqual({ firstISODay: 5, dayCount: 31 });
  });

  it("returns correct firstISODay and dayCount for leap year 2028 february", () => {
    expect(getMonthIndexes(new Date(2028, 1, 29))).toEqual({ firstISODay: 2, dayCount: 29 });
  });
  
  it("returns correct firstISODay and dayCount for 2027-8-28", () => {
    expect(getMonthIndexes(new Date(2027, 8, 28))).toEqual({ firstISODay: 3, dayCount: 30 });
  });
});

describe("utils - getCalendarMatrix", () => {
  it("generates correct matrix for a 31-day month starting on Monday (1)", () => {
    expect(getCalendarMatrix(1, 31)).toEqual([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, null, null, null, null],
    ]);
  });

  it("generates correct matrix for a 30-day month starting on Wednesday (3)", () => {
    expect(getCalendarMatrix(3, 30)).toEqual([
      [null, null, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 29, 30, null, null, null],
    ]);
  });

  it("generates correct matrix for February (28 days) starting on Friday (5)", () => {
    expect(getCalendarMatrix(5, 28)).toEqual([
      [null, null, null, null, 1, 2, 3],
      [4, 5, 6, 7, 8, 9, 10],
      [11, 12, 13, 14, 15, 16, 17],
      [18, 19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, null, null, null],
    ]);
  });

  it("generates correct matrix for February in a leap year (29 days) starting on Saturday (6)", () => {
    expect(getCalendarMatrix(6, 29)).toEqual([
      [null, null, null, null, null, 1, 2],
      [3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, null],
    ]);
  });

  it("generates correct matrix for a month that starts on Sunday (7)", () => {
    expect(getCalendarMatrix(7, 30)).toEqual([
      [null, null, null, null, null, null, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [30, null, null, null, null, null, null],
    ]);
  });

  it("generates correct matrix for a 28-day month starting on Monday (1), ending on a Sunday", () => {
    expect(getCalendarMatrix(1, 28)).toEqual([
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
    ]);
  });
});
