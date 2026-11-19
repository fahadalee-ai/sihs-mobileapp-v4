import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { SampleTag } from "@/components/Marks";
import { Button, Field, Input } from "@/components/kit";

export const Route = createFileRoute("/invite")({
  head: () => ({ meta: [{ title: "SIH&S — Invitation" }] }),
  component: Invite,
});

function Invite() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  return (
    <div className="auth-screen min-h-dvh bg-[#001e16] text-white">
      <ScreenHeader title="Invitation" backTo="/login" dark />
      <form
        className="space-y-2 px-5 pb-10"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <SampleTag />
        <h1 className="text-2xl font-semibold">You've been invited by Sample Facilities Co.</h1>
        <p className="text-sm text-[#d5e6dc]">Confirm the organization and role, then set a password.</p>
        <Field label="Organization">
          <Input defaultValue="Sample Facilities Co." readOnly />
        </Field>
        <Field label="Role">
          <Input defaultValue="Facility Manager" readOnly />
        </Field>
        <Field label="Password">
          <Input type="password" autoComplete="new-password" />
        </Field>
        <Field label="Confirm password">
          <Input type="password" autoComplete="new-password" />
        </Field>
        <Button type="submit" full>
          Accept invitation
        </Button>
        {done && (
          <p className="text-sm font-semibold" role="status">
            Invitation accepted in this demo.
          </p>
        )}
        <button type="button" className="min-h-11 text-sm font-semibold text-[#5cba40]" onClick={() => navigate({ to: "/login" })}>
          Back to sign in
        </button>
      </form>
    </div>
  );
}
