import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Bell, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SampleTag } from "@/components/Marks";
import { SERVICES, greeting } from "@/lib/content";
import { customerStatusLabel } from "@/lib/customer-config";
import { useApp } from "@/lib/store";
import iconTowing from "@/img/Services_01-elaware-Intrastate-Towing.png";
import iconLockouts from "@/img/Services_02-Lockouts.png";
import iconJump from "@/img/Services_03-Jump-Starts.png";
import iconFuel from "@/img/Services_04-Fuel-Delivery.png";
import iconCollections from "@/img/Services_05-Drug-Alcohol-Collections.png";
import iconDna from "@/img/Services_06-DNA-Services.png";
import iconPimvee from "@/img/Services_07-PIM-VEE.png";
import iconNotary from "@/img/Services_08-Notary.png";
import iconCourier from "@/img/Services_09-Courier-Transport.png";
import iconCleaning from "@/img/Services_010-Cleaning.png";
import iconProperty from "@/img/Services_011-Property-Work.png";
import iconSupplies from "@/img/Services_012-Supplies.png";
import iconContracted from "@/img/Services_013-Contracted-Service.png";

export const Route = createFileRoute("/_app/home")({
  head: () => ({ meta: [{ title: "SIH&S — Home" }] }),
  component: Home,
});

const ICONS: Record<string, string> = {
  towing: iconTowing,
  lockouts: iconLockouts,
  "jump-starts": iconJump,
  "fuel-delivery": iconFuel,
  "drug-alcohol": iconCollections,
  dna: iconDna,
  "pim-vee": iconPimvee,
  notary: iconNotary,
  courier: iconCourier,
  transport: iconCourier,
  cleaning: iconCleaning,
  janitorial: iconCleaning,
  lawn: iconProperty,
  lawncare: iconProperty,
  supplies: iconSupplies,
  other: iconContracted,
};

const ACTIONS = [
  { label: "Request", go: (navigate: ReturnType<typeof useNavigate>) => navigate({ to: "/request", search: { slug: "towing" } }) },
  { label: "Track", go: (navigate: ReturnType<typeof useNavigate>) => navigate({ to: "/v2", search: { view: "tracking" } }) },
  { label: "Records", go: (navigate: ReturnType<typeof useNavigate>) => navigate({ to: "/v2", search: { view: "records" } }) },
  { label: "Problem", go: (navigate: ReturnType<typeof useNavigate>) => navigate({ to: "/v2", search: { view: "issues" } }) },
  { label: "Sign-off", go: (navigate: ReturnType<typeof useNavigate>) => navigate({ to: "/v2", search: { view: "signoff" } }) },
];

function Home() {
  const { user, guest, bookings } = useApp();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const first = user?.fullName.split(" ")[0] ?? "there";
  const active = bookings.filter((item) => item.status !== "completed" && item.status !== "canceled");
  const latest = active[0];

  const tiles = useMemo(() => {
    const q = query.trim().toLowerCase();
    const visible = SERVICES.filter((service) => !service.hidden && !service.ineligible);
    if (!q) return visible;
    return visible.filter((service) => `${service.title} ${service.short} ${service.descriptor}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="px-4 pb-8 pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-semibold leading-tight">
            {greeting()}, {guest ? "Guest" : first}
          </h1>
          <SampleTag />
        </div>
        <button
          type="button"
          aria-label="Notifications"
          aria-expanded={notesOpen}
          onClick={() => setNotesOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e5e7eb] bg-white"
        >
          <Bell size={20} aria-hidden />
        </button>
      </div>

      {notesOpen && (
        <div className="mt-3 rounded-lg border border-[#e5e7eb] bg-white p-3 text-sm" role="status">
          {bookings.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            <ul>
              {bookings.slice(0, 3).map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-center text-left font-semibold"
                    onClick={() => navigate({ to: "/requests/$id", params: { id: item.id } })}
                  >
                    {item.serviceTitle}
                    <span className="ml-2 font-normal text-[#6b7280]">{customerStatusLabel(item.status, item.customerLabel)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <label className="mt-4 flex items-center gap-2 rounded-lg bg-[#f3f4f6] px-3">
        <Search size={18} aria-hidden className="text-[#6b7280]" />
        <span className="sr-only">Search services</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search services"
          className="min-h-11 w-full bg-transparent text-sm outline-none placeholder:text-[#6b7280]"
        />
      </label>

      <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Home actions">
        {ACTIONS.map((action) => (
          <button
            key={action.label}
            type="button"
            className="min-h-11 shrink-0 rounded-lg border border-[#e5e7eb] bg-white px-3 text-sm font-semibold"
            onClick={() => action.go(navigate)}
          >
            {action.label}
          </button>
        ))}
      </nav>

      {latest && (
        <section className="mt-4 rounded-lg border border-[#e5e7eb] bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Current request</p>
            <button type="button" className="min-h-11 text-sm font-semibold text-[#5cba40]" onClick={() => navigate({ to: "/bookings" })}>
              See all
            </button>
          </div>
          <button type="button" className="mt-1 w-full text-left" onClick={() => navigate({ to: "/requests/$id", params: { id: latest.id } })}>
            <span className="block font-semibold">{latest.serviceTitle}</span>
            <span className="mt-1 block text-sm text-[#6b7280]">{latest.id}</span>
            <span className="mt-3 inline-flex min-h-7 items-center rounded-lg bg-[#5cba40] px-2 text-xs font-semibold text-white">
              {customerStatusLabel(latest.status, latest.customerLabel)}
            </span>
          </button>
        </section>
      )}

      {query.toLowerCase().includes("lockout") && (
        <p className="mt-4 rounded-lg border border-[#e5e7eb] bg-white p-3 text-sm" role="status">
          Lockout service is available only for authorized U-Haul assignments.
        </p>
      )}

      <h2 className="mb-3 mt-6 text-sm font-semibold text-[#6b7280]">Services</h2>
      {tiles.length === 0 ? (
        <p className="text-sm">No services match that search.</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3">
          {tiles.map((service) => (
            <li key={service.slug}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="flex h-full min-h-[148px] flex-col overflow-hidden rounded-lg border border-[#e5e7eb] bg-white"
              >
                <span className="flex h-[92px] items-center justify-center bg-[#f3f4f6] px-3">
                  <img src={ICONS[service.slug]} alt="" className="h-[76px] w-auto object-contain" />
                </span>
                <span className="flex flex-1 items-center justify-center px-3 py-3 text-center text-sm font-semibold leading-snug">
                  {service.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!guest && !query && (
        <p className="mt-3 rounded-lg border border-dashed border-[#e5e7eb] bg-[#f3f4f6] px-3 py-3 text-sm text-[#6b7280]">
          Specialized heavy equipment is not available for your account or location. Contact the office.
        </p>
      )}

      <section className="mt-8 rounded-lg bg-[#f3f4f6] px-4 py-5" aria-label="Standing in the Gap">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#5cba40]">SIH&S</p>
        <h2 className="mt-1 text-lg font-semibold">Standing in the Gap</h2>
        <figure className="mt-4 border-l-2 border-[#5cba40] pl-3">
          <blockquote className="text-sm leading-relaxed text-[#171717]">
            “And I sought for a man among them, that should make up the hedge, and stand in the gap before me for the land, that I should not destroy it: but I found none.”
          </blockquote>
          <figcaption className="mt-2 text-xs font-semibold text-[#6b7280]">Ezekiel 22:30</figcaption>
        </figure>
        <figure className="mt-4 border-l-2 border-[#5cba40] pl-3">
          <blockquote className="text-sm leading-relaxed text-[#171717]">
            “That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.”
          </blockquote>
          <figcaption className="mt-2 text-xs font-semibold text-[#6b7280]">Romans 10:9</figcaption>
        </figure>
      </section>
    </div>
  );
}
