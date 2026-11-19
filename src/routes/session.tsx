import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CallHook } from "@/components/Chrome";

export const Route = createFileRoute("/session")({
  head: () => ({ meta: [{ title: "SIH&S — Session expired" }] }),
  component: SessionExpired,
});

function SessionExpired() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-dvh flex-col bg-white px-6 py-10 text-[#171717]">
      <h1 className="text-2xl font-semibold">Session expired</h1>
      <p className="mt-3 text-sm leading-relaxed text-[#6b7280]">
        Your session timed out for security. Sign in again. Remembered devices are listed in Settings, then Security.
      </p>
      <div className="mt-6">
        <CallHook dark />
      </div>
      <button type="button" onClick={() => navigate({ to: "/login" })} className="mt-8 min-h-11 rounded-lg bg-[#5cba40] px-4 font-semibold text-white">
        Sign in
      </button>
    </div>
  );
}
