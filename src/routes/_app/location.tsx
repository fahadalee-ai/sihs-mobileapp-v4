import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import { HQ, PHONE_DISPLAY, PHONE_TEL, SERVICE_AREA } from "@/lib/content";

export const Route = createFileRoute("/_app/location")({
  head: () => ({ meta: [{ title: "SIH&S — Service area" }] }),
  component: LocationScreen,
});

function LocationScreen() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const card = `sih&s coverage contract ${HQ}`.toLowerCase();
    return !q || card.includes(q);
  }, [query]);

  return (
    <div className="pb-8 pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="px-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5cba40]">Service area</p>
        <h1 className="mt-1 text-[28px] font-bold leading-tight text-[#171717]">Find SIH&S Near You.</h1>
        <label className="mt-4 block">
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Search</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by area, street..."
            className="min-h-11 w-full rounded-lg border border-transparent bg-[#f3f4f6] px-3 text-[15px] text-[#171717] outline-none placeholder:text-[#9ca3af] focus:border-[#5cba40]"
          />
        </label>
      </div>

      <div className="relative mt-4">
        <iframe
          title="Sample service map"
          className="h-72 w-full border-0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-75.72%2C39.55%2C-75.35%2C39.85&layer=mapnik&marker=39.7391%2C-75.5398"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent" />
      </div>

      <div className="relative z-10 -mt-6 px-4">
        {visible ? (
          <article className="rounded-lg border border-[#e5e7eb] bg-white p-4 shadow-[0_8px_24px_rgba(17,17,17,0.08)]">
            <p className="inline-flex rounded-lg bg-[#5cba40] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
              {SERVICE_AREA}
            </p>
            <h2 className="mt-3 text-[18px] font-semibold leading-snug text-[#171717]">
              SIH&S service coverage
            </h2>
            <p className="mt-3 flex gap-2 text-[15px] leading-snug text-[#6b7280]">
              <MapPin size={18} className="mt-0.5 shrink-0 text-[#5cba40]" aria-hidden />
              <span>{HQ}</span>
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-[#6b7280]">
              Coverage depends on your service and contract. We will confirm availability.
            </p>
            <a
              href={`tel:${PHONE_TEL}`}
              className="mt-4 flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#5cba40] text-[16px] font-semibold text-white"
            >
              <Phone size={18} aria-hidden />
              {PHONE_DISPLAY}
            </a>
          </article>
        ) : (
          <article className="rounded-lg border border-[#e5e7eb] bg-white p-4 text-[15px] leading-relaxed text-[#171717]">
            No sample site matches that search. Coverage depends on your service and contract. We will confirm availability.
          </article>
        )}
      </div>
    </div>
  );
}
