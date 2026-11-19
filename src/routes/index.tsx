import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { CallHook } from "@/components/Chrome";
import { markSplashSeen } from "@/lib/intro";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SIH&S" },
      {
        name: "description",
        content:
          "SIH&S — structured incident response, towing and roadside, collections, DNA services, PIM-VEE™, and notary.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const router = useRouter();

  const openOnboarding = () => {
    markSplashSeen();
    void router.navigate({ to: "/onboarding", replace: true });
  };

  useEffect(() => {
    const t = window.setTimeout(openOnboarding, 2800);
    return () => window.clearTimeout(t);
  }, [router]);

  return (
    <div className="flex min-h-dvh flex-col bg-[#001e16] text-white">
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <BrandLogo size="lg" animate />
        <p className="mt-4 text-center font-serif text-lg italic text-[#f4f7f5]">Standing in the Gap</p>
        <button
          type="button"
          onClick={openOnboarding}
          className="mt-8 min-h-11 rounded-lg bg-[#5cba40] px-8 text-[17px] font-semibold text-white"
        >
          Continue
        </button>
        <div className="mt-4">
          <CallHook dark />
        </div>
      </div>
    </div>
  );
}
