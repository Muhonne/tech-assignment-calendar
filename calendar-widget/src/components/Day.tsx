import { Activity } from "@/types";

export default function Day({
  day,
  session,
}: {
  day: number | null;
  session: Activity | null | undefined;
}) {
  const hasActivity = session !== null && session !== undefined;
  return (
    <div className={"day-container"}>
      <h2 className={hasActivity ? "green" : ""}>
        {day === null ? <span>&nbsp;</span> : day}
      </h2>
      <h3>{session ? session.title : <span>&nbsp;</span>}</h3>
    </div>
  );
}
