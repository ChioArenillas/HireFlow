import { ReactNode } from "react";

interface Props {
  title: string;
  value: number | string;
  icon?: ReactNode;
}

export default function StatsCard({ title, value, icon,  }: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition flex items-start justify-between">
      
      <div className="space-y-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>

        <p className="text-sm text-muted-foreground">{title}</p>
      </div>

      {icon && (
        <div className="p-2 rounded-lg bg-gray-100 text-gray-700">
          {icon}
        </div>
      )}
    </div>
  );
}