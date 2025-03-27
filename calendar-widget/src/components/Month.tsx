import Day from "./Day";

export default function Month() {
  const devFakeMonth = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, null, null, null],
  ];

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
        {devFakeMonth.map((week, i) => {
          return (
            <tr key={"week" + i}>
              {week.map((date, j) => {
                const currentDay = i === 3 && j === 4;
                return (
                  <th
                    key={date + "" + j}
                    className={currentDay ? "current-day" : ""}
                  >
                    <Day
                      date={date}
                      session={
                        j === 4
                          ? "Introduction to the program"
                          : "Bambalam"
                      }
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
