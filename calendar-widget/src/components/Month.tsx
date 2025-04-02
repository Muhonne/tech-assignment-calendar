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
  const { monthLayout, programLayout, rollOverActivities } = getCalendarMatrix(
    date,
    program
  );
  const mutableRollOver = structuredClone(rollOverActivities);
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
                const currentDate = date.getDate() === day;
                const rollOverTime = day !== null && date.getDate() <= day;
                let session;
                if (programLayout[i] && programLayout[i][j])
                  // normal case
                  session = programLayout[i][j];
                if (rollOverTime) {
                  if (mutableRollOver.length > 0) {
                    // rollover case, push todays session to be last rollover
                    session = mutableRollOver[0];
                    mutableRollOver.splice(0, 1);
                    if (programLayout[i] && programLayout[i][j])
                      mutableRollOver.push(programLayout[i][j]);
                  }
                }

                return (
                  <th
                    key={day + "" + j}
                    className={currentDate ? "current-day" : ""}
                  >
                    <Day day={monthLayout[i][j]} session={session} />
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
