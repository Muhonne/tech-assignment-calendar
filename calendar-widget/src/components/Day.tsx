import { Session } from "@/types";
import { MISSED_SESSION } from "@/utils";

export default function Day({
  day,
  session,
}: {
  day: number | null;
  session: Session | null | undefined;
}) {
  const hasSession = session !== null && session !== undefined;
  return (
    <div className={"day-container"}>
      <h2 className={hasSession ? "green" : ""}>
        {day === null ? <span>&nbsp;</span> : day}
      </h2>
      <h3>
        {session && session.title === MISSED_SESSION ? (
          <span>&nbsp;</span>
        ) : (
          session?.title
        )}
      </h3>
    </div>
  );
}
