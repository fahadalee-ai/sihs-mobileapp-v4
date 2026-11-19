import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, CreditCard, FileText, KeyRound, LogOut, MapPin, Phone, ShieldAlert, UserRound } from "lucide-react";
import { useState, type ReactNode } from "react";
import { SampleTag } from "@/components/Marks";
import { LEGAL_LINKS, PHONE_DISPLAY, PHONE_TEL } from "@/lib/content";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({ meta: [{ title: "SIH&S — Profile" }] }),
  component: Profile,
});

function Row({
  to,
  params,
  icon,
  label,
  detail,
}: {
  to: "/locations" | "/payment" | "/profile-edit" | "/signup" | "/legal/$doc" | "/password" | "/incident" | "/documents" | "/access" | "/organization" | "/properties";
  params?: { doc: string };
  icon: ReactNode;
  label: string;
  detail?: string;
}) {
  return (
    <Link
      to={to}
      params={params}
      className="flex min-h-[56px] items-center gap-3 border-b border-[#eeeeee] px-4 last:border-b-0"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#f3f4f6] text-[#5cba40]">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[16px] font-medium text-[#171717]">{label}</span>
        {detail && <span className="block truncate text-[13px] text-[#6b7280]">{detail}</span>}
      </span>
      <ChevronRight size={18} className="text-[#6b7280]" aria-hidden />
    </Link>
  );
}

function Profile() {
  const { user, guest, cardLast4, logout } = useApp();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const signedIn = Boolean(user) && !guest;
  const initial = user?.fullName?.trim().charAt(0).toUpperCase() || "G";

  return (
    <div className="px-4 pb-8 pt-[max(1rem,env(safe-area-inset-top))]">
      <h1 className="text-[28px] font-bold text-[#171717]">Profile</h1>
      <div className="mt-2"><SampleTag /></div>

      {signedIn && user ? (
        <section className="mt-4 flex items-center gap-3 rounded-lg border border-[#e5e7eb] bg-white p-4 text-[#171717]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#5cba40] text-[22px] font-bold text-white">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[18px] font-semibold">{user.fullName}</p>
            <p className="truncate text-[14px] text-[#6b7280]">{user.email}</p>
            <p className="text-[13px] text-[#6b7280]">Role: {(user.roles ?? ["Customer"]).join(" · ")}</p>
            <p className="text-[13px] text-[#6b7280]">Organization: {user.organization ?? "Not linked"}</p>
            <p className="text-[13px] text-[#6b7280]">Authorized sites: Demo Site North · Verified</p>
            <p className="text-[13px] text-[#6b7280]">Demo Site South · Pending verification</p>
            <a href={`tel:+1${user.phone.replace(/\D/g, "")}`} className="mt-1 inline-flex min-h-11 items-center text-[14px] font-semibold text-[#5cba40]">
              {user.phone}
            </a>
          </div>
        </section>
      ) : (
        <section className="mt-4 rounded-lg border border-[#e5e7eb] bg-white p-4 text-[#171717]">
          <p className="text-[16px] font-semibold">Browsing as a guest</p>
          <p className="mt-1 text-[14px] leading-relaxed text-[#6b7280]">
            Create an account to save requests, locations, and payment references.
          </p>
          <Link
            to="/signup"
            className="mt-3 inline-flex min-h-11 items-center rounded-lg bg-[#5cba40] px-4 text-[15px] font-semibold text-white"
          >
            Create an account
          </Link>
        </section>
      )}

      <h2 className="mb-2 mt-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6b7280]">Account</h2>
      <nav className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white" aria-label="Account">
        {signedIn && (
          <Row to="/profile-edit" icon={<UserRound size={18} aria-hidden />} label="Edit Profile" />
        )}
        <Row to="/locations" icon={<MapPin size={18} aria-hidden />} label="Saved places" detail="Addresses used on requests" />
        <Row
          to="/payment"
          icon={<CreditCard size={18} aria-hidden />}
          label="Payment Method"
          detail={signedIn && cardLast4 ? `Square · •••• ${cardLast4}` : "No card on file"}
        />
        {signedIn && <Row to="/password" icon={<KeyRound size={18} aria-hidden />} label="Change Password" detail="Current password is never shown" />}
        {signedIn && <Row to="/access" icon={<UserRound size={18} aria-hidden />} label="Roles and Access" detail="Access is assigned by SIH&S" />}
        {signedIn && user?.organizationAccess !== "linked" && (
          <Row to="/organization" icon={<FileText size={18} aria-hidden />} label="Request organization access" detail="Pending until SIH&S verifies" />
        )}
        {signedIn && user?.organizationAccess === "linked" && (
          <Row to="/properties" icon={<MapPin size={18} aria-hidden />} label="Properties and Organization" detail="Linked properties and approval limit" />
        )}
        <Row to="/documents" icon={<FileText size={18} aria-hidden />} label="Documents" detail="Customer-visible files only" />
        <Row to="/incident" icon={<ShieldAlert size={18} aria-hidden />} label="Help" detail="Call, text, email, and replay tutorial" />
        <Link to="/v2" search={{ view: "security" }} className="flex min-h-[56px] items-center gap-3 border-b border-[#eeeeee] px-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#f3f4f6] text-[#5cba40]"><KeyRound size={18} aria-hidden /></span>
          <span className="text-[16px] font-medium">Security</span>
        </Link>
        <Link to="/v2" search={{ view: "menu" }} className="flex min-h-[56px] items-center gap-3 px-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#f3f4f6] text-[#5cba40]"><FileText size={18} aria-hidden /></span>
          <span className="text-[16px] font-medium">Contracts, quotes, and records</span>
        </Link>
      </nav>

      <h2 className="mb-2 mt-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#6b7280]">Legal & Compliance</h2>
      <nav className="overflow-hidden rounded-lg border border-[#e5e7eb] bg-white" aria-label="Legal and compliance">
        {LEGAL_LINKS.map((link) => (
          <Row key={link.id} to="/legal/$doc" params={{ doc: link.id }} icon={<FileText size={18} aria-hidden />} label={link.title} />
        ))}
      </nav>

      <a
        href={`tel:${PHONE_TEL}`}
        className="mt-6 flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#5cba40] text-[16px] font-semibold text-white"
      >
        <Phone size={18} aria-hidden />
        Call {PHONE_DISPLAY}
      </a>

      <button
        type="button"
        onClick={() => setConfirm(true)}
        className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-lg border border-[#fecaca] bg-white text-[16px] font-semibold text-[#dc2626]"
      >
        <LogOut size={18} aria-hidden />
        Log Out
      </button>

      {confirm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50" role="dialog" aria-modal="true" aria-labelledby="logout-title">
          <div className="w-full max-w-[480px] rounded-t-lg bg-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))] text-[#171717]">
            <h2 id="logout-title" className="text-[20px] font-semibold text-[#171717]">
              Log out of SIH&S?
            </h2>
            <p className="mt-1 text-[15px] text-[#6b7280]">You can sign in again at any time.</p>
            <div className="mt-4 flex gap-3">
              <button type="button" className="min-h-11 flex-1 rounded-lg border border-[#e5e7eb] font-semibold text-[#171717]" onClick={() => setConfirm(false)}>
                Stay
              </button>
              <button
                type="button"
                className="min-h-11 flex-1 rounded-lg bg-[#171717] font-semibold text-white"
                onClick={() => {
                  logout();
                  navigate({ to: "/login" });
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
