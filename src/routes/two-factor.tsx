import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { DemoBadge, SampleTag } from "@/components/Marks";
import { Button, Field, Input } from "@/components/kit";

export const Route = createFileRoute("/two-factor")({
  head: () => ({ meta: [{ title: "SIH&S — Verification code" }] }),
  component: TwoFactor,
});

function TwoFactor() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [alt, setAlt] = useState(false);
  return (
    <div className="auth-screen min-h-dvh bg-[#001e16] text-white">
      <ScreenHeader title="Verification code" backTo="/login" dark />
      <form
        className="px-5 pb-10"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/home" });
        }}
      >
        <div className="mb-3 flex items-center gap-2">
          <DemoBadge />
          <SampleTag />
        </div>
        <p className="text-sm text-[#d5e6dc]">
          Enter the 6-digit code before a privileged action, such as a facility manager approving a released record or changing site authority.
        </p>
        <Field label="6-digit code">
          <Input inputMode="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="000000" />
        </Field>
        <Button type="submit" full>
          Continue
        </Button>
        <button type="button" className="mt-3 min-h-11 text-sm font-semibold text-[#5cba40]" onClick={() => setSent(true)}>
          Resend code
        </button>
        {sent && <p className="text-sm" role="status">A new sample code was sent.</p>}
        <button type="button" className="mt-2 block min-h-11 text-sm font-semibold text-[#5cba40]" onClick={() => setAlt(true)}>
          Use an alternate method
        </button>
        {alt && <p className="text-sm">Email a code to avery.sample@example.com instead.</p>}
      </form>
    </div>
  );
}
