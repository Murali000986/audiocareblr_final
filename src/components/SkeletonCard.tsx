export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 flex flex-col gap-3">
      <div className="aspect-[4/3] rounded-xl shimmer" />
      <div className="space-y-2 mt-1">
        <div className="h-4 w-3/4 rounded shimmer" />
        <div className="h-3 w-1/2 rounded shimmer" />
        <div className="h-3 w-1/3 rounded shimmer" />
        <div className="h-8 w-full rounded-lg shimmer mt-3" />
      </div>
    </div>
  );
}
