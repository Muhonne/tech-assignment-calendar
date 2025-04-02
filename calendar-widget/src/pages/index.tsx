import Month from "@/components/Month";
import { ProgramSchedule } from "@/types";
import { setMonth, setDate } from "date-fns";
import { useEffect, useState } from "react";
const mockDate = new Date(2025,4,15); // matches design.png
export default function Home() {
  const [program, setProgram] = useState<ProgramSchedule | undefined>();
  const [date, setDateToState] = useState<Date>(mockDate);

  const fetchNormal = () => {
    fetch("api/hello?type=normal")
      .then((response) => response.json())
      .then((data: ProgramSchedule) => {
        setProgram(data);
      });
  };

  const fetchMissed = () => {
    fetch("api/hello?type=missed")
      .then((response) => response.json())
      .then((data: ProgramSchedule) => {
        setProgram(data);
      });
  };

  const fetchStaggered = () => {
    fetch("api/hello?type=staggered")
      .then((response) => response.json())
      .then((data: ProgramSchedule) => {
        setProgram(data);
      });
  };

  const fetchSixweek = () => {
    fetch("api/hello?type=fourweek")
      .then((response) => response.json())
      .then((data: ProgramSchedule) => {
        setProgram(data);
      });
  };

  useEffect(() => {
    fetchNormal();
  }, []);

  return (
    <>
      <button
        onClick={() => setDateToState(setMonth(date, date.getMonth() - 1))}
      >
        month -1
      </button>
      <button
        onClick={() => setDateToState(setMonth(date, date.getMonth() + 1))}
      >
        month +1
      </button>

      <button onClick={() => setDateToState(setDate(date, date.getDate() - 1))}>
        day -1
      </button>
      <button onClick={() => setDateToState(setDate(date, date.getDate() + 1))}>
        day +1
      </button>
      <button onClick={fetchNormal}>normal program</button>
      <button onClick={fetchMissed}>missed program</button>
      <button onClick={fetchStaggered}>staggered program</button>
      <button onClick={fetchSixweek}>sixweek program</button>
      <style>{`
        button {padding: 5px; margin: 5px; border: 2px solid #333;}
        button:hover{border: 2px solid blue;}
        button:active{border: 2px solid green;}
      `}</style>
      <p>
        {date.getFullYear()} - {date.getMonth()} - {date.getDate()}
      </p>
      {!!program && !!date && <Month date={date} program={program} />}
    </>
  );
}
