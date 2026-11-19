import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { SampleTag } from "@/components/Marks";
import { Button, Field, Input } from "@/components/kit";

export const Route = createFileRoute("/forgot")({
  head: () => ({ meta: [{ title: "SIH&S — Secure recovery" }] }),
  component: Forgot,
});

const STEPS = ["Account", "Code", "New password", "Success"] as const;

function Forgot() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [code, setCode] = useState("");
  return (
    <div className="min-h-dvh bg-white text-[#171717]">
      <ScreenHeader title="Secure recovery" backTo="/login" />
      <div className="px-5 pb-10">
        <SampleTag />
        <p className="mt-2 text-sm text-[#6b7280]">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>
        {step === 0 && (
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(1);
            }}
          >
            <Field label="Email or phone">
              <Input defaultValue="avery.sample@example.com" />
            </Field>
            <Button type="submit" full>
              Send verification code
            </Button>
          </form>
        )}
        {step === 1 && (
          <form
            className="mt-4"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              setStep(2);
            }}
          >
            <Field label="Verification code">
              <Input inputMode="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="000000" />
            </Field>
            <Button type="submit" full>
              Continue
            </Button>
          </form>
        )}
        {step === 2 && (
          <form
            className="mt-4"
            onSubmit={(e) => {
              e.preventDefault();
              setStep(3);
            }}
          >
            <Field label="New password">
              <Input type="password" autoComplete="new-password" />
            </Field>
            <Field label="Confirm password">
              <Input type="password" autoComplete="new-password" />
            </Field>
            <Button type="submit" full>
              Save password
            </Button>
          </form>
        )}
        {step === 3 && (
          <div className="mt-4">
            <p className="font-semibold" role="status">
              Password updated. Sign in with the new password.
            </p>
            <Button type="button" full className="mt-4" onClick={() => navigate({ to: "/login" })}>
              Back to sign in
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
