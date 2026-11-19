import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CallHook } from "@/components/Chrome";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/pending")({
  head: () => ({ meta: [{ title: "SIH&S — Account pending" }] }),
  component: PendingAccount,
});

function PendingAccount() {
  const { user, logout, approveAccount } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  const goHome = () => {
    approveAccount();
    navigate({ to: "/home" });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-white px-6 py-10 text-[#171717]">
      <h1 className="text-2xl font-semibold">Account pending SIH&S approval</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
        {user?.fullName ? `${user.fullName}, your` : "Your"} account is created. SIH&S reviews the request before the home screen opens.
      </p>
      <div className="mt-6">
        <CallHook dark />
      </div>
      <button type="button" onClick={logout} className="mt-8 min-h-11 text-left text-sm font-semibold text-[#5cba40]">
        Sign out
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6" role="dialog" aria-modal="true" aria-labelledby="approved-title">
          <div className="w-full max-w-sm rounded-lg border border-[#e5e7eb] bg-white p-5 text-[#171717]">
            <h2 id="approved-title" className="text-xl font-semibold">Admin approved your request</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#6b7280]">Admin approved your request. You can go to the home screen now.</p>
            <button type="button" onClick={goHome} className="mt-5 min-h-11 w-full rounded-lg bg-[#5cba40] text-[16px] font-semibold text-white">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
