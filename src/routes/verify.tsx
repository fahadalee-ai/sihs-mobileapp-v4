import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { Button, Field, Input } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/verify")({
  head: () => ({ meta: [{ title: "SIH&S — Verify email" }] }),
  component: Verify,
});

function Verify() {
  const { pendingEmail, verifyCode, verifyEmail } = useApp();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = window.setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [seconds]);

  return (
    <div className="auth-screen min-h-dvh bg-[#001e16] text-white">
      <ScreenHeader title="Verify Email" backTo="/signup" dark />
      <form
        className="px-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          verifyEmail(code);
          navigate({ to: "/ready" });
        }}
      >
        <p className="mb-4 text-sm text-[#d5e6dc]">Enter the 6-digit code sent to {pendingEmail}.</p>
        {verifyCode && (
          <p className="mb-4 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm">
            Prototype code: <span className="font-semibold">{verifyCode}</span>
          </p>
        )}
        <Field label="Verification code">
          <Input
            inputMode="text"
            autoComplete="one-time-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="000000"
          />
        </Field>
        <Button type="submit" full>
          Verify
        </Button>
        <button
          type="button"
          onClick={() => setSeconds(30)}
          className="mt-4 min-h-11 text-sm font-semibold text-[#5cba40]"
        >
          {seconds > 0 ? `Resend in ${seconds}s` : "Resend code"}
        </button>
      </form>
    </div>
  );
}
