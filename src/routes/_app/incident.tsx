import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CallHook, ScreenHeader } from "@/components/Chrome";
import { Button, Field, Textarea } from "@/components/kit";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/incident")({
  head: () => ({ meta: [{ title: "SIH&S — Report a concern" }] }),
  component: IncidentReport,
});

const TYPES = ["Service complaint", "Safety concern at a job", "Property damage", "Billing question", "Other"];

function IncidentReport() {
  const { submitIncident, incidents, bookings } = useApp();
  const [type, setType] = useState(TYPES[0]);
  const [details, setDetails] = useState("");
  const [requestId, setRequestId] = useState("");
  const [ref, setRef] = useState("");

  return (
    <div>
      <ScreenHeader title="Help" backTo="/profile" />
      <section className="px-4 pb-4">
        <h2 className="text-base font-semibold">How a request works</h2>
        <p className="mt-2 text-sm text-[#6b7280]">Call, Text, and Email open your phone's own apps. In-app messages are sent through SIH&S.</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <a href={`tel:${PHONE_TEL}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#e5e7eb] text-sm font-semibold">Call</a>
          <a href={`sms:${PHONE_TEL}`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#e5e7eb] text-sm font-semibold">Text</a>
          <a href={`mailto:${EMAIL}?subject=SIH%26S%20inquiry`} className="inline-flex min-h-11 items-center justify-center rounded-md border border-[#e5e7eb] text-sm font-semibold">Email</a>
        </div>
        <Link to="/onboarding" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#5cba40]">Replay tutorial</Link>
        <Link to="/v2" search={{ view: "sms" }} className="mt-1 block min-h-11 text-sm font-semibold text-[#5cba40]">SMS sign-up</Link>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-[#6b7280]">
          <li>You submit a request. That does not dispatch a crew or confirm a time.</li>
          <li>SIH&S reviews it and calls the callback number on the request.</li>
          <li>A quote or deposit appears only after SIH&S confirms the request.</li>
          <li>Call {PHONE_DISPLAY} if you need someone now.</li>
        </ol>
      </section>
      <form
        className="px-4 pb-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          setRef(submitIncident({ type, details: details.trim(), restricted: false, requestId }));
        }}
      >
        <div className="mb-4 rounded-lg border border-[#e5e7eb] bg-white p-4">
          <p className="text-sm font-semibold">If anyone is in danger, call 911 first.</p>
          <div className="mt-2">
            <CallHook />
          </div>
        </div>
        <Field label="Category">
          <select className="min-h-11 w-full rounded-xl border border-border bg-card px-3" value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Description">
          <Textarea value={details} onChange={(e) => setDetails(e.target.value)} />
        </Field>
        <Field label="Related request (optional)">
          <select className="min-h-11 w-full rounded-xl border border-border bg-card px-3" value={requestId} onChange={(e) => setRequestId(e.target.value)}>
            <option value="">None</option>
            {bookings.map((item) => (
              <option key={item.id} value={item.id}>{item.id} · {item.serviceTitle}</option>
            ))}
          </select>
        </Field>
        <p className="mb-4 text-sm text-muted-foreground">Do not include medical or other sensitive details if you can avoid it. SIH&S will contact you. Submitting a concern is not a claim submission.</p>
        <Button type="submit" full>Submit concern</Button>
        {ref && (
          <p className="mt-4 text-sm font-semibold" role="status">Concern received. Reference {ref}.</p>
        )}
      </form>
      <section className="px-4 pb-8">
        <h2 className="text-base font-semibold">My Concerns</h2>
        {incidents.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No concerns yet.</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {incidents.map((item) => (
              <li key={item.id} className="rounded-md border border-border bg-card p-3 text-sm">
                <p className="font-semibold">{item.id} · {item.status ?? "Received"}</p>
                <p>{item.type}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
