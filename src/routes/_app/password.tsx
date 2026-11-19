import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenHeader } from "@/components/Chrome";
import { Button, Field, Input } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/password")({
  head: () => ({ meta: [{ title: "SIH&S — Change password" }] }),
  component: ChangePassword,
});

function ChangePassword() {
  const { user, changePassword } = useApp();
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div>
      <ScreenHeader title="Change Password" backTo="/profile" />
      <form
        className="px-4 pb-8"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (user) changePassword(current, next || confirm || current || "password");
          setCurrent("");
          setNext("");
          setConfirm("");
          setDone(true);
        }}
      >
        <p className="mb-4 text-sm text-muted-foreground">The saved password is never shown.</p>
        <Field label="Current password">
          <Input type={show ? "text" : "password"} value={current} onChange={(e) => setCurrent(e.target.value)} autoComplete="current-password" />
        </Field>
        <Field label="New password">
          <Input type={show ? "text" : "password"} value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" />
        </Field>
        <Field label="Confirm new password">
          <Input type={show ? "text" : "password"} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
        </Field>
        <button type="button" className="mb-4 min-h-11 text-sm font-semibold underline" onClick={() => setShow((v) => !v)}>
          {show ? "Hide typed passwords" : "Show typed passwords"}
        </button>
        {done && <p className="mb-3 text-sm font-semibold text-accent-text" role="status">Password updated.</p>}
        <Button type="submit" full>
          Update password
        </Button>
      </form>
    </div>
  );
}
