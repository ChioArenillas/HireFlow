export function JobCardSkeleton() {
  return (
    <div className="border rounded-xl p-4 flex gap-6 animate-pulse">
      <div className="w-16 h-16 bg-gray-300 rounded-lg" />

      <div className="flex-1 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-3 bg-gray-300 rounded w-1/4" />
        <div className="h-3 bg-gray-300 rounded w-2/3" />
      </div>
    </div>
  );
}