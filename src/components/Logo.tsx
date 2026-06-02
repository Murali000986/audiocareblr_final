export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-[2px] h-7">
        {[12, 22, 16, 26, 14, 20].map((h, i) => (
          <span
            key={i}
            className="w-[3px] rounded-sm bg-primary"
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <span className="font-display text-xl font-bold tracking-tight">
        Audio<span className="text-primary">Care</span>
      </span>
    </div>
  );
}
