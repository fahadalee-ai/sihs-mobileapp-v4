export function DemoBadge({ label = "Demo only" }: { label?: string }) {
  return (
    <span className="inline-flex min-h-6 items-center rounded-lg bg-[#f3f4f6] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
      {label}
    </span>
  );
}

export function SampleTag() {
  return <p className="text-xs font-medium text-[#6b7280]">Sample data — demo only</p>;
}
