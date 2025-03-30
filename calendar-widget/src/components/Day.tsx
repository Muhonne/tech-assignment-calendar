export default function Day({
  day,
  session,
}: {
  day: number | null;
  session: string;
}) {
  return (
    <div className="day-container">
      <h2>{day === null ? <span>&nbsp;</span> : day}</h2>
      <h3>{(day !== null && session.toUpperCase()) || <span>&nbsp;</span>}</h3>
    </div>
  );
}
