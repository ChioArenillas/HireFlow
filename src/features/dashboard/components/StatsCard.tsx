interface Props {
  title: string;
  value: number | string;
}

export default function StatsCard({ title, value }: Props) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-3xl font-bold">{value}</p>

      <p className="text-xs text-muted-foreground">{title}</p>
    </div>
  );
}
