interface Props {
  data: { name: string; value: number }[];
}

export function SimpleBarChart({ data }: Props) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className="space-y-6 mt-10 mb-10">
      {data.map((item) => (
        <div key={item.name}>
          <div className="flex justify-between text-sm mb-1">
            <span>{item.name}</span>
            <span>{item.value}</span>
          </div>

          <div className="h-2 bg-muted rounded">
            <div
              className="h-2 bg-black rounded"
              style={{
                width: `${(item.value / max) * 50}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}