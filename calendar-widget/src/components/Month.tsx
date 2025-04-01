import { ProgramSchedule } from "@/types";
import Day from "./Day";
import { getCalendarMatrix } from "@/utils";

export default function Month({
  date,
  program,
}: {
  date: Date;
  program: ProgramSchedule;
}) {
  const { monthLayout, programLayout } = getCalendarMatrix(date, program);

  return (
    <table>
      <thead>
        <tr>
          <th scope="row" colSpan={7}>
            <h1>Weekly Program</h1>
          </th>
        </tr>
        <tr>
          <th>MON</th>
          <th>TUE</th>
          <th>WED</th>
          <th>THU</th>
          <th>FRI</th>
          <th>SAT</th>
          <th>SUN</th>
        </tr>
      </thead>
      <tbody>
        {monthLayout.map((week, i) => {
          return (
            <tr key={"week" + i}>
              {week.map((day, j) => {
                return (
                  <th
                    key={day + "" + j}
                    className={date.getDate() === day ? "current-day" : ""}
                  >
                    <Day
                      day={monthLayout[i][j]}
                      session={programLayout[i] && programLayout[i][j]}
                    />
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
