import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge, SampleTag } from "@/components/Marks";
import { Button, Field, Input, Textarea } from "@/components/kit";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, SMS_CONSENT } from "@/lib/content";
import { useApp } from "@/lib/store";
import mapArt from "@/img/illu-map.png";

const VIEWS = [
  "menu",
  "security",
  "no-access",
  "drafts",
  "contracts",
  "quotes",
  "invoices",
  "messages",
  "sms",
  "records",
  "issues",
  "uhaul",
  "outcomes",
  "signoff",
  "tracking",
  "courier",
  "testing",
  "duplicate",
  "offline",
  "legal",
  "payments",
  "reschedule",
  "gate",
  "incident-file",
] as const;

type View = (typeof VIEWS)[number];

export const Route = createFileRoute("/_app/v2")({
  validateSearch: (search: Record<string, unknown>): { view: View } => {
    const view = typeof search.view === "string" ? search.view : "menu";
    return { view: (VIEWS as readonly string[]).includes(view) ? (view as View) : "menu" };
  },
  component: V2,
});

function V2() {
  const { view } = Route.useSearch();
  const navigate = useNavigate();
  const go = (next: View) => navigate({ to: "/v2", search: { view: next } });

  return (
    <div className="bg-white text-[#171717]">
      <ScreenHeader title={titleFor(view)} backTo={view === "menu" ? "/home" : "/v2"} />
      <div className="space-y-4 px-4 pb-10">
        <SampleTag />
        {view === "menu" && <Menu go={go} />}
        {view === "security" && <Security />}
        {view === "no-access" && <NoAccess />}
        {view === "drafts" && <Drafts />}
        {view === "contracts" && <Contracts />}
        {view === "quotes" && <Quotes />}
        {view === "invoices" && <Invoices />}
        {view === "messages" && <Messages />}
        {view === "sms" && <Sms />}
        {view === "records" && <Records />}
        {view === "issues" && <Issues />}
        {view === "uhaul" && <Uhaul />}
        {view === "outcomes" && <Outcomes />}
        {view === "signoff" && <Signoff />}
        {view === "tracking" && <Tracking />}
        {view === "courier" && <Courier />}
        {view === "testing" && <Testing />}
        {view === "duplicate" && <Duplicate />}
        {view === "offline" && <Offline />}
        {view === "legal" && <LegalAccepted />}
        {view === "payments" && <Payments />}
        {view === "reschedule" && <Reschedule />}
        {view === "gate" && <Gate />}
        {view === "incident-file" && <IncidentFile />}
      </div>
    </div>
  );
}

function titleFor(view: View) {
  const map: Record<View, string> = {
    menu: "More",
    security: "Security",
    "no-access": "No access",
    drafts: "Drafts",
    contracts: "Contracts & Sites",
    quotes: "Quote",
    invoices: "Invoices",
    messages: "Job messages",
    sms: "SMS sign-up",
    records: "Released records",
    issues: "Report a problem",
    uhaul: "U-Haul assignment",
    outcomes: "Job outcomes",
    signoff: "Satisfaction sign-off",
    tracking: "Live tracking",
    courier: "Medical courier",
    testing: "Testing visit",
    duplicate: "Possible duplicate",
    offline: "Offline",
    legal: "Accepted versions",
    payments: "Payment history",
    reschedule: "Reschedule",
    gate: "Verify to view",
    "incident-file": "Incident file",
  };
  return map[view];
}

function Card({ children }: { children: ReactNode }) {
  return <section className="rounded-lg border border-[#e5e7eb] bg-white p-4">{children}</section>;
}

function Menu({ go }: { go: (view: View) => void }) {
  const items: { view: View; label: string; detail: string }[] = [
    { view: "security", label: "Security", detail: "Biometrics, devices, sessions" },
    { view: "drafts", label: "Drafts", detail: "Resume a saved request" },
    { view: "contracts", label: "Contracts & Sites", detail: "Facility manager view" },
    { view: "quotes", label: "Quotes", detail: "Accept or decline" },
    { view: "invoices", label: "Invoices", detail: "Progress billing sample" },
    { view: "payments", label: "Payment history", detail: "Partial, failed, refund, credit" },
    { view: "tracking", label: "Track progress", detail: "Simulated unit location" },
    { view: "records", label: "Released records", detail: "Named recipient and version" },
    { view: "issues", label: "Report a problem", detail: "Under office review" },
    { view: "signoff", label: "Required sign-off", detail: "Separate from crew completion" },
    { view: "uhaul", label: "Authorized U-Haul lockout", detail: "Only path for lockout" },
    { view: "testing", label: "Testing visit", detail: "Privacy-limited logistics" },
    { view: "courier", label: "Medical courier", detail: "Package ID only" },
    { view: "incident-file", label: "Incident file", detail: "PIM-VEE customer view" },
    { view: "messages", label: "Job messages", detail: "Call, text, email, escalate" },
    { view: "sms", label: "SMS sign-up", detail: "Optional, unchecked" },
    { view: "outcomes", label: "Outcome states", detail: "No access, unsafe, canceled" },
    { view: "reschedule", label: "Reschedule", detail: "Slot, reason, notice" },
    { view: "gate", label: "Guest verification gate", detail: "Masked until verified" },
    { view: "no-access", label: "No access", detail: "Outside your site or role" },
    { view: "duplicate", label: "Duplicate request", detail: "Existing request sample" },
    { view: "offline", label: "Offline queue", detail: "Waiting, sent, failed" },
    { view: "legal", label: "Accepted versions", detail: "Document, version, date" },
  ];
  return (
    <ul className="overflow-hidden rounded-lg border border-[#e5e7eb]">
      {items.map((item) => (
        <li key={item.view} className="border-b border-[#eeeeee] last:border-b-0">
          <button type="button" onClick={() => go(item.view)} className="flex min-h-14 w-full items-center justify-between gap-3 px-4 text-left">
            <span>
              <span className="block text-[16px] font-medium">{item.label}</span>
              <span className="block text-[13px] text-[#6b7280]">{item.detail}</span>
            </span>
            <DemoBadge />
          </button>
        </li>
      ))}
    </ul>
  );
}

function Security() {
  const [bio, setBio] = useState(false);
  return (
    <>
      <Card>
        <div className="flex items-center justify-between gap-3">
          <p className="font-semibold">Use Face ID / Fingerprint</p>
          <DemoBadge />
        </div>
        <label className="mt-3 flex min-h-11 items-center justify-between gap-3 text-sm">
          Biometrics on this device
          <input type="checkbox" checked={bio} onChange={(e) => setBio(e.target.checked)} className="h-5 w-5" />
        </label>
        <p className="mt-2 text-sm text-[#6b7280]">Session timeout is 15 minutes of inactivity. A remembered session stays on this device until you sign it out.</p>
      </Card>
      <Card>
        <h2 className="font-semibold">Remembered devices</h2>
        <p className="mt-2 text-sm">Sample Phone — last used today · ET</p>
        <h2 className="mt-4 font-semibold">Active sessions</h2>
        <p className="mt-2 text-sm">This device · Sample City</p>
        <div className="mt-3 grid gap-2">
          <Button type="button" variant="outline" full>Sign out this device</Button>
          <Button type="button" variant="outline" full>Sign out all devices</Button>
        </div>
      </Card>
      <Card>
        <h2 className="font-semibold">Report lost device</h2>
        <p className="mt-2 text-sm text-[#6b7280]">Remote sign-out blocks that device. Offline copies expire after 24 hours and are not saved to your photo gallery or cloud backup.</p>
        <Button type="button" full className="mt-3">Report lost device</Button>
      </Card>
    </>
  );
}

function NoAccess() {
  return (
    <Card>
      <h2 className="text-lg font-semibold">You don't have access to this record.</h2>
      <p className="mt-2 text-sm text-[#6b7280]">Contact the office. Records are limited to your organization, sites, and jobs.</p>
      <a href={`tel:${PHONE_TEL}`} className="mt-4 inline-flex min-h-11 items-center font-semibold text-[#5cba40]">Call {PHONE_DISPLAY}</a>
    </Card>
  );
}

function Drafts() {
  return (
    <Card>
      <h2 className="font-semibold">Weekly cleaning — Site B</h2>
      <p className="mt-1 text-sm text-[#6b7280]">Saved as a draft. Answers stay on this device until you submit.</p>
      <Link to="/request" search={{ slug: "cleaning" }} className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#5cba40]">Resume draft</Link>
    </Card>
  );
}

function Contracts() {
  const { user } = useApp();
  const manager = user?.roles?.includes("Facility Manager");
  if (!manager) {
    return <Card><p>Contracts and purchase orders are shown only for facility managers on a contract account.</p></Card>;
  }
  return (
    <>
      <Card>
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Company</p>
        <p className="mt-1 font-semibold">Sample Facilities Co.</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Contract</p>
        <p>Sample Contract SC-100 · scope version 3</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Site</p>
        <p>Demo Site North · authority Verified</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Purchase order</p>
        <p>PO-SAMPLE-14</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-[#6b7280]">Contract line</p>
        <p>Weekly cleaning · authorized change: add lobby, version 3</p>
      </Card>
      <Card>
        <h2 className="font-semibold">Visits</h2>
        <p className="mt-2 text-sm">Visit 12 · Completed · 9:00 AM ET</p>
        <p className="mt-1 text-sm">Visit 13 · Scheduled · 9:00 AM ET</p>
        <p className="mt-3 text-sm text-[#6b7280]">A completed visit does not close other visits or the contract. Contract status: Active.</p>
      </Card>
    </>
  );
}

function Quotes() {
  const [choice, setChoice] = useState<"open" | "accepted" | "declined">("open");
  return (
    <Card>
      <p className="text-sm">Payer: Sample Facilities Co.</p>
      <p className="mt-1 text-sm">Quote version v2 · expires Dec 1, 2026</p>
      <p className="mt-1 text-sm">Deposit $40 · Balance $120</p>
      <p className="mt-3 text-sm">Booked: Not yet · Deposit: Not paid · Dispatch: Not requested</p>
      <p className="mt-2 text-sm text-[#6b7280]">Payment does not automatically dispatch. Dispatch does not require full payment unless the office states so.</p>
      {choice === "open" && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button type="button" onClick={() => setChoice("accepted")}>Accept quote</Button>
          <Button type="button" variant="outline" onClick={() => setChoice("declined")}>Decline quote</Button>
        </div>
      )}
      {choice !== "open" && <p className="mt-4 font-semibold" role="status">Quote {choice}.</p>}
    </Card>
  );
}

function Invoices() {
  return (
    <>
      <Card>
        <h2 className="font-semibold">Invoice SAMPLE-1</h2>
        <p className="mt-1 text-sm">Job SIHS-104218 · payer reference Sample Facilities Co.</p>
        <p className="mt-2 text-sm">Units ordered: 1 light-duty tow. Crew hours and GPS events are not shown.</p>
        <p className="mt-2 text-sm">Progress invoice 1 of 2 on this job.</p>
      </Card>
      <Card>
        <p className="font-semibold">Duplicate invoice prevented</p>
        <p className="mt-1 text-sm text-[#6b7280]">A second invoice for the same progress line was not created.</p>
      </Card>
    </>
  );
}

function Messages() {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <Card>
        <p className="text-sm text-[#6b7280]">Call, Text, and Email open your phone's own apps. In-app messages are sent through SIH&S.</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <a href={`tel:${PHONE_TEL}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#e5e7eb] text-sm font-semibold">Call</a>
          <a href={`sms:${PHONE_TEL}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#e5e7eb] text-sm font-semibold">Text</a>
          <a href={`mailto:${EMAIL}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#e5e7eb] text-sm font-semibold">Email</a>
        </div>
      </Card>
      <Card>
        <p className="text-sm"><span className="font-semibold">Office</span> · 9:12 AM ET</p>
        <p className="mt-1">Your request SIHS-104218 is confirmed. This is not a dispatch notice.</p>
        <Button type="button" variant="outline" full className="mt-3" onClick={() => setFailed(true)}>Escalate to office</Button>
        {failed && <p className="mt-3 text-sm" role="status">Message could not be delivered — try again or call.</p>}
      </Card>
    </>
  );
}

function Sms() {
  const [sms, setSms] = useState(false);
  return (
    <Card>
      <p className="text-sm">{SMS_CONSENT}</p>
      <p className="mt-3 text-sm text-[#6b7280]">You can use email, push, or phone instead. Declining SMS does not block your account, requests, or payment.</p>
      <label className="mt-4 flex min-h-11 items-start gap-3 text-sm">
        <input type="checkbox" checked={sms} onChange={(e) => setSms(e.target.checked)} className="mt-1 h-5 w-5" />
        <span>I want service text messages. This box starts unchecked.</span>
      </label>
      <p className="mt-3 text-sm">Reply STOP to opt out. Reply HELP for assistance.</p>
    </Card>
  );
}

function Records() {
  const [blocked, setBlocked] = useState(false);
  return (
    <>
      <Card>
        <h2 className="font-semibold">Interim report</h2>
        <p className="mt-1 text-sm">Version 2 · Released to Sample Recipient · Dec 2, 2026</p>
        <p className="mt-2 text-sm">Restricted information removed from this shared copy.</p>
        <p className="mt-2 text-sm text-[#6b7280]">Opened by Sample Recipient · Dec 2, 2026 · 4:10 PM ET</p>
        <Button type="button" variant="outline" full className="mt-3" onClick={() => setBlocked(true)}>Show renewal block</Button>
      </Card>
      {blocked && (
        <Card>
          <p className="font-semibold">Authorization needs renewal — contents changed</p>
          <p className="mt-2 text-sm">Viewing is blocked until the office re-authorizes this copy.</p>
        </Card>
      )}
      <Card>
        <p className="text-sm">Integrity checks help detect changed or missing files. They do not prove an observation is true.</p>
        <p className="mt-2 text-sm">Original kept. Correction: caption clarified · reason: typo · office · Dec 3, 2026.</p>
      </Card>
    </>
  );
}

function Issues() {
  const [sent, setSent] = useState(false);
  return (
    <Card>
      <Field label="Job">
        <Input defaultValue="SIHS-104218" readOnly />
      </Field>
      <Field label="Problem type">
        <Input defaultValue="Work incomplete" readOnly />
      </Field>
      <Field label="Description">
        <Textarea defaultValue="Sample note: lobby was not finished." />
      </Field>
      <p className="text-sm text-[#6b7280]">Photos: JPG or PNG, up to 10 MB. Demo only.</p>
      {!sent ? <Button type="button" full className="mt-3" onClick={() => setSent(true)}>Submit</Button> : <p className="mt-3 font-semibold" role="status">Under office review</p>}
      <ol className="mt-4 list-decimal space-y-1 pl-5 text-sm">
        <li>Reported</li>
        <li>Under review</li>
        <li>Rework scheduled</li>
        <li>Reinspection</li>
        <li>Resolved, or resolved by authorized exception</li>
      </ol>
      <p className="mt-2 text-sm text-[#6b7280]">Prior photos stay on the record. Sample resolver: Office reviewer · Dec 4, 2026.</p>
    </Card>
  );
}

function Uhaul() {
  const [code, setCode] = useState("");
  const [ok, setOk] = useState(false);
  return (
    <Card>
      <DemoBadge />
      <h2 className="mt-2 font-semibold">Authorized U-Haul assignment</h2>
      <p className="mt-2 text-sm">Lockout is available only on this path. Public and private-pay requests do not include lockout.</p>
      <p className="mt-2 text-sm text-[#6b7280]">Dispatch verifies contract eligibility before any job is dispatched.</p>
      <Field label="U-Haul assignment / authorization number">
        <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="UH-SAMPLE-100" />
      </Field>
      <Button type="button" full onClick={() => setOk(true)}>Verify contract eligibility</Button>
      {ok && <p className="mt-3 text-sm font-semibold" role="status">Eligible in this demo. You can continue the lockout request.</p>}
    </Card>
  );
}

function Outcomes() {
  const rows = [
    ["No access / no-show", "Crew arrived 9:14 AM ET. Site was locked. Next: office will contact you."],
    ["Unsafe conditions", "Work stopped 9:40 AM ET. Next: office reviews before any return visit."],
    ["Equipment mismatch", "Flatbed was required. Next: office will requote."],
    ["Unsuccessful work", "Service was not finished. Next: issue is under office review."],
    ["Canceled", "Canceled before dispatch. Next: no charge in this sample."],
  ];
  return (
    <div className="space-y-3">
      {rows.map(([title, body]) => (
        <Card key={title}>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm">{body}</p>
          <a href={`tel:${PHONE_TEL}`} className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-[#5cba40]">Contact office</a>
        </Card>
      ))}
    </div>
  );
}

function Signoff() {
  const [choice, setChoice] = useState("Satisfactory");
  const [done, setDone] = useState(false);
  const needs = choice !== "Satisfactory";
  return (
    <Card>
      <p className="text-sm text-[#6b7280]">This sign-off is separate from the worker's completion record. It appears only when dispatch required it.</p>
      <Field label="Result">
        <select className="min-h-11 w-full rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] px-3" value={choice} onChange={(e) => setChoice(e.target.value)}>
          <option>Satisfactory</option>
          <option>Completed with exceptions</option>
          <option>Unsatisfactory</option>
        </select>
      </Field>
      <Field label="Signer name"><Input defaultValue="Avery Sample" /></Field>
      <Field label="Authority / role"><Input defaultValue="Facility manager" /></Field>
      <Field label="Signed statement"><Textarea defaultValue="I reviewed the released proof for this visit." /></Field>
      <Field label="Signature"><Input placeholder="Sign here (demo pad)" /></Field>
      {needs && <Field label="Exceptions (required)"><Textarea placeholder="What was not satisfactory" /></Field>}
      <p className="text-sm text-[#6b7280]">Date and time: recorded when you confirm · ET</p>
      {!done ? <Button type="button" full className="mt-3" onClick={() => setDone(true)}>Confirm sign-off</Button> : <p className="mt-3 font-semibold" role="status">Sign-off recorded. The crew completion record is unchanged.</p>}
      <p className="mt-4 text-sm">Signature not provided — reason: signer left before the pad was offered. Dispute state stays on the job.</p>
    </Card>
  );
}

function Tracking() {
  const [mode, setMode] = useState<"live" | "stale" | "none">("live");
  const choices = [
    { id: "live" as const, label: "Live" },
    { id: "stale" as const, label: "Stale" },
    { id: "none" as const, label: "Unavailable" },
  ];
  return (
    <Card>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Assigned unit</h2>
          <p className="text-sm text-[#6b7280]">Unit SAMPLE-12</p>
        </div>
        <DemoBadge />
      </div>
      <div className="relative mt-3 h-52 overflow-hidden rounded-lg bg-[#e7eef2]" role="img" aria-label={mode === "none" ? "Location unavailable" : mode === "stale" ? "Location is delayed" : "Unit is en route"}>
        {mode !== "none" && <img src={mapArt} alt="" className={`h-full w-full object-cover ${mode === "stale" ? "opacity-40 grayscale" : ""}`} />}
        {mode === "live" && (
          <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <span className="rounded-lg bg-[#171717] px-2 py-1 text-xs font-semibold text-white">SAMPLE-12</span>
            <span className="mt-1 h-4 w-4 rounded-full border-2 border-white bg-[#5cba40] shadow" />
          </span>
        )}
        {mode === "stale" && (
          <p className="absolute inset-x-3 bottom-3 rounded-lg bg-white/95 px-3 py-2 text-sm font-semibold">Location is delayed — last update 12 min ago</p>
        )}
        {mode === "none" && (
          <p className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold">Location unavailable</p>
        )}
      </div>
      <p className="mt-3 text-sm" role="status">
        {mode === "live" && "ETA 18 min · Last updated 2 min ago. ETA is based on the assigned unit's last known location."}
        {mode === "stale" && "The pin is not current. Last update 12 min ago."}
        {mode === "none" && "No location is available for this assignment right now."}
      </p>
      <p className="mt-2 text-sm text-[#6b7280]">Tracking is active only during your active assignment. Arrival detected — awaiting confirmation. It does not finish the job or create a charge.</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {choices.map((choice) => {
          const selected = mode === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={selected}
              onClick={() => setMode(choice.id)}
              className={`min-h-11 rounded-lg border px-2 text-sm font-semibold ${selected ? "border-[#5cba40] bg-[#5cba40] text-white" : "border-[#e5e7eb] bg-white text-[#171717]"}`}
            >
              {choice.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function Courier() {
  const [id, setId] = useState("");
  const ok = id.trim().length > 0;
  return (
    <Card>
      <p className="text-sm">Package tracking does not replace clinical specimen chain of custody.</p>
      <Field label="Package ID">
        <Input value={id} onChange={(e) => setId(e.target.value)} placeholder="PKG-SAMPLE-100" />
      </Field>
      {ok && <p className="text-sm">Package accepted for a business handoff. No patient names, results, label photos, or clinical attachments.</p>}
      <p className="mt-3 text-sm text-[#6b7280]">Authorized business handoff signature is allowed. Passenger and patient details are restricted.</p>
    </Card>
  );
}

function Testing() {
  return (
    <Card>
      <h2 className="font-semibold">Ref TL-48K2</h2>
      <p className="mt-2 text-sm">Assigned provider: Sample Collection Desk</p>
      <p className="mt-1 text-sm">Routing: Demo Site North</p>
      <ul className="mt-3 space-y-1 text-sm">
        <li>En Route · 8:40 AM ET</li>
        <li>Arrived · 9:05 AM ET</li>
        <li>Service Completed · 9:22 AM ET</li>
        <li>Departed · 9:28 AM ET</li>
      </ul>
      <Field label="Operational reason">
        <select className="min-h-11 w-full rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] px-3">
          <option>Site not accessible</option>
          <option>Reschedule requested</option>
          <option>Provider delay</option>
        </select>
      </Field>
      <p className="text-sm">Codes and location/time records can still identify a person. Testing logistics are used only when privacy safeguards are confirmed by the office.</p>
      <p className="mt-2 text-sm">Visit completion records describe the visit only, not sample collection, test validity, results, or regulatory compliance.</p>
      <p className="mt-2 text-sm text-[#6b7280]">Photos, video, signatures, attachments, and free text are turned off. Billing uses coded lines only.</p>
      <p className="mt-2 text-sm">Notice: Visit Ref TL-48K2 is En Route.</p>
    </Card>
  );
}

function Duplicate() {
  return (
    <Card>
      <h2 className="font-semibold">Possible duplicate request detected</h2>
      <p className="mt-2 text-sm">A similar request is already SIHS-104218.</p>
      <Link to="/requests/$id" params={{ id: "SIHS-104218" }} className="mt-3 inline-flex min-h-11 items-center font-semibold text-[#5cba40]">View existing request</Link>
    </Card>
  );
}

function Offline() {
  return (
    <Card>
      <p className="text-sm">Temporary copies are encrypted and are not saved to your photo gallery or cloud backup.</p>
      <ul className="mt-3 space-y-2 text-sm">
        <li>Waiting · note saved 8:02 AM ET</li>
        <li>Sent · request SIHS-104218 · original time 8:10 AM ET</li>
        <li>Failed · message · Retry does not create a second copy</li>
      </ul>
      <p className="mt-3 text-sm">This job was reassigned while you were offline. Your update was kept for office review — it was not applied.</p>
      <p className="mt-2 text-sm">Upload status: Uploaded. Archive status: Not archived. Those stay separate.</p>
      <Button type="button" variant="outline" full className="mt-3">Retry</Button>
    </Card>
  );
}

function LegalAccepted() {
  return (
    <Card>
      <ul className="space-y-3 text-sm">
        <li>Full Terms & Agreement · version 2.0 · accepted Nov 5, 2026</li>
        <li>Privacy Policy · version 2.0 · accepted Nov 5, 2026</li>
        <li>Facility manager notices are separate from customer notices.</li>
      </ul>
    </Card>
  );
}

function Payments() {
  const rows = [
    ["Partial payment", "Confirmed by payment provider"],
    ["Failed payment", "Verified by office from receipt"],
    ["Canceled", "No charge captured"],
    ["Refund", "Entered manually — reviewed by office, Nov 5, 2026, receipt"],
    ["Credit", "Applied to the next invoice"],
  ];
  return (
    <div className="space-y-3">
      <Card>
        <p className="font-semibold">You'll pay securely with Square</p>
        <DemoBadge />
        <p className="mt-2 text-sm">This app never collects or displays a full card number.</p>
      </Card>
      {rows.map(([title, body]) => (
        <Card key={title}><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm">{body}</p></Card>
      ))}
    </div>
  );
}

function Reschedule() {
  const [done, setDone] = useState(false);
  return (
    <Card>
      <p className="text-sm text-[#6b7280]">Availability is checked against crew qualifications and equipment before confirmation.</p>
      <Field label="New slot">
        <select className="min-h-11 w-full rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] px-3">
          <option>Tue 9:00 AM ET</option>
          <option>Tue 1:00 PM ET</option>
        </select>
      </Field>
      <Field label="Reason"><Input defaultValue="Site meeting moved" /></Field>
      {!done ? <Button type="button" full onClick={() => setDone(true)}>Confirm new time</Button> : <p className="font-semibold" role="status">Reschedule notice sent. Each visit keeps its own record and local time zone.</p>}
    </Card>
  );
}

function Gate() {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <h2 className="font-semibold">{open ? "Job SIHS-220184" : "Job #••••"}</h2>
      {!open ? (
        <>
          <p className="mt-2 text-sm">Verify to view job and payment details. A code was sent by SMS or email.</p>
          <Field label="Verification code"><Input placeholder="000000" inputMode="numeric" /></Field>
          <Button type="button" full onClick={() => setOpen(true)}>Verify</Button>
        </>
      ) : (
        <p className="mt-2 text-sm">Sample details unlocked for this demo. Payment still goes through Square. No card number is shown.</p>
      )}
    </Card>
  );
}

function IncidentFile() {
  const [audio, setAudio] = useState(false);
  const [ack, setAck] = useState(false);
  return (
    <>
      <Card>
        <h2 className="font-semibold">Incident SAMPLE-INC-7</h2>
        <p className="mt-2 text-sm">Linked tasks you can see: arrival notes. Other tasks stay hidden for this role.</p>
        <p className="mt-2 text-sm">Applicable evidence is required before property is moved when safe.</p>
        <p className="mt-2 text-sm">Safety exception recorded · Avery Sample · hazard in the lane · photo missing.</p>
      </Card>
      <Card>
        <p className="text-sm">Audio is off by default.</p>
        <label className="mt-2 flex min-h-11 items-center justify-between text-sm">
          Audio
          <input type="checkbox" checked={audio} onChange={(e) => setAudio(e.target.checked)} className="h-5 w-5" />
        </label>
        <label className="mt-2 flex min-h-11 items-start gap-3 text-sm">
          <input type="checkbox" checked={ack} onChange={(e) => setAck(e.target.checked)} className="mt-1 h-5 w-5" />
          I acknowledge the capture restrictions before recording.
        </label>
        <Field label="Facts observed"><Textarea defaultValue="Vehicle was at the curb." /></Field>
        <Field label="Opinions / notes"><Textarea defaultValue="Sample opinion, kept separate from facts." /></Field>
        <p className="text-sm">Report label: Interim report. A complete report is a separate release.</p>
      </Card>
    </>
  );
}
