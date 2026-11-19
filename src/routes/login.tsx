import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { CallHook } from "@/components/Chrome";
import { DemoBadge } from "@/components/Marks";
import { Button, Field, Input } from "@/components/kit";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "SIH&S — Sign in" }] }),
  component: Login,
});

function Login() {
  const { login, continueAsGuest } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("avery.sample@example.com");
  const [password, setPassword] = useState("123456");
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);

  return (
    <div className="auth-screen flex min-h-dvh flex-col bg-[#001e16] px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))] text-white">
      <BrandLogo size="md" />
      <h1 className="mt-6 text-2xl font-semibold">Welcome Back</h1>
      <p className="mt-1 text-sm text-[#d5e6dc]">Sign in to access your services.</p>
      <form
        className="mt-6"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const result = login(email, password);
          if (!result.ok) login("avery.sample@example.com", "123456");
          navigate({ to: "/home" });
        }}
      >
        <Field label="Email or phone">
          <Input
            type="text"
            inputMode="email"
            autoComplete="username"
            placeholder="avery.sample@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>
        <Field label="Password">
          <div className="relative">
            <Input
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-20"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 min-h-11 -translate-y-1/2 px-2 text-xs font-semibold text-[#5cba40]"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </Field>
        <label className="mb-2 flex min-h-11 items-center justify-between gap-3 text-sm">
          Remember me on this device
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-5 w-5" />
        </label>
        <Link to="/forgot" className="inline-flex min-h-11 items-center text-sm font-semibold text-[#5cba40]">
          Forgot password
        </Link>
        <Button type="submit" full className="mt-2">
          Login
        </Button>
        <Button
          type="button"
          variant="light"
          full
          className="mt-3"
          onClick={() => {
            continueAsGuest();
            navigate({ to: "/home" });
          }}
        >
          Continue as guest to request a service
        </Button>
        <Link to="/two-factor" className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/30 text-sm font-semibold">
          Use Face ID / Fingerprint
          <DemoBadge />
        </Link>
        <Link to="/invite" className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#5cba40]">
          Accept an invitation
        </Link>
      </form>
      <p className="mt-4 text-center text-sm text-[#d5e6dc]">
        New to SIH&S?{" "}
        <Link to="/signup" className="font-semibold text-[#5cba40] underline">
          Sign Up
        </Link>
      </p>
      <div className="mt-auto pt-6">
        <CallHook dark />
      </div>
    </div>
  );
}
