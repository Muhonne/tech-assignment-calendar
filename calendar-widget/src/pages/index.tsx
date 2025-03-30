import Month from "@/components/Month";
import { setMonth, setDate } from "date-fns";
import { useState } from "react";

export default function Home() {

  const [date, setDateToState] = useState<Date>(new Date())

  return (
    <>
    <button style={{padding: '5px', margin:'5px', border: '1px solid #333'}} onClick={() => setDateToState(setMonth(date, date.getMonth()-1))}>month -1</button>
    <button style={{padding: '5px', margin:'5px', border: '1px solid #333'}} onClick={() => setDateToState(setMonth(date, date.getMonth()+1))}>month +1</button>
    
    <button style={{padding: '5px', margin:'5px', border: '1px solid #333'}} onClick={() => setDateToState(setDate(date, date.getDate()-1))}>day -1</button>
    <button style={{padding: '5px', margin:'5px', border: '1px solid #333'}} onClick={() => setDateToState(setDate(date, date.getDate()+1))}>day +1</button>
    <p>{date.getFullYear()} - {date.getMonth()} - {date.getDate()}</p>
      <Month date={date}/>
    </>
  );
}
