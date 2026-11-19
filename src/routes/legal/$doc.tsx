import { createFileRoute } from "@tanstack/react-router";
import { LegalLinks, ScreenHeader, isLegalId } from "@/components/Chrome";
import { LEGAL, PATENT_FOOTNOTE } from "@/lib/content";

export const Route = createFileRoute("/legal/$doc")({
  head: ({ params }) => ({
    meta: [{ title: `SIH&S — ${isLegalId(params.doc) ? LEGAL[params.doc].title : "Legal"}` }],
  }),
  component: LegalDoc,
});

function LegalDoc() {
  const { doc } = Route.useParams();
  if (!isLegalId(doc)) {
    return (
      <div className="min-h-dvh bg-white text-[#171717]">
        <ScreenHeader title="Legal" backTo="/login" dark />
        <p className="px-4">That document is not available.</p>
      </div>
    );
  }
  const page = LEGAL[doc];
  return (
    <div className="min-h-dvh bg-white text-[#171717]">
      <ScreenHeader title={page.title} backTo="/profile" dark />
      <article className="space-y-4 px-4 pb-10 text-sm leading-relaxed text-[#171717]">
        {page.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="text-xs text-[#6b7280]">{PATENT_FOOTNOTE}</p>
        <h2 className="pt-2 text-base font-semibold">Related documents</h2>
        <LegalLinks dark />
      </article>
    </div>
  );
}
