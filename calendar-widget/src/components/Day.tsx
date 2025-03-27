export default function Day({
  date,
  session,
}: {
  date: number | null;
  session: string;
}) {
  return (
    <div className="day-container">
      <h2>{date === null ? <span>&nbsp;</span> : date}</h2>
      <h3>{(date !== null && session.toUpperCase()) || <span>&nbsp;</span>}</h3>
    </div>
  );
}
