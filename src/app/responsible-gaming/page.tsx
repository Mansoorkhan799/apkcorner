import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildSiteMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSiteMetadata(
  "Responsible Gaming",
  "Our responsible gaming policy for Teen Patti APKs readers. Play safely, set limits, and know when to stop.",
  "/responsible-gaming"
);

export default function ResponsibleGamingPage() {
  return (
    <LegalPage
      title="Responsible Gaming"
      description="Play smart. Stay in control."
    >
      <p>
        Teen Patti APKs is an informational website. We encourage all readers
        to approach mobile earning games and card games responsibly. Gambling and
        real-money gaming carry financial and emotional risks.
      </p>
      <h2 className="text-xl font-semibold text-zinc-900">Age Requirement</h2>
      <p>
        Our content is intended for users aged <strong>18 and above</strong> only.
        If you are under 18, please leave this site and do not download or use
        any apps featured in our guides.
      </p>
      <h2 className="text-xl font-semibold text-zinc-900">Play Within Your Means</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Never spend money you cannot afford to lose</li>
        <li>Set daily or weekly time and spending limits before you play</li>
        <li>Do not chase losses — stop when you reach your limit</li>
        <li>Treat in-app earnings as uncertain, not guaranteed income</li>
        <li>Take regular breaks from gaming</li>
      </ul>
      <h2 className="text-xl font-semibold text-zinc-900">Warning Signs</h2>
      <p>Consider seeking help if gaming affects your life in these ways:</p>
      <ul className="list-disc space-y-2 pl-6">
        <li>Borrowing money to play or cover losses</li>
        <li>Neglecting work, studies, or family responsibilities</li>
        <li>Feeling anxious or irritable when not playing</li>
        <li>Hiding gaming activity from others</li>
      </ul>
      <h2 className="text-xl font-semibold text-zinc-900">Our Role</h2>
      <p>
        We do not operate games and cannot control app behaviour. App developers
        are responsible for their own responsible gaming tools. We provide
        information only and urge readers to use in-app limits where available.
      </p>
      <p>
        If you or someone you know needs support, contact a local counselling
        service or speak to a trusted family member. In Pakistan, mental health
        helplines and community support groups are available in major cities.
      </p>
    </LegalPage>
  );
}
