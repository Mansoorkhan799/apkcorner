import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { buildSiteMetadata } from "@/lib/seo";

export const metadata: Metadata = buildSiteMetadata(
  "Who We Are",
  "Meet the team behind APK Corner and learn how we research, write, and update our guides for Pakistani users.",
  "/who-we-are"
);

export default function WhoWeArePage() {
  return (
    <LegalPage
      title="Who We Are"
      description="The people and principles behind apkcorner.com.pk."
    >
      <p>
        We are a small editorial team based in Pakistan, passionate about mobile
        gaming and helping everyday users navigate the world of mobile apps and
        earning applications with confidence.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Our Editorial Approach</h2>
      <p>
        Every guide on APK Corner follows a structured process: we identify
        what Pakistani users are searching for, download and test the app
        ourselves, document each step with screenshots, and optimise content for
        clarity and accuracy. We cite app policies where possible and flag risks
        such as account bans or changed payout terms.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Independence</h2>
      <p>
        We maintain editorial independence. While we may use affiliate links in
        the future, our reviews are not paid for by app developers. If a
        sponsored relationship ever exists, it will be clearly disclosed on the
        relevant page.
      </p>
      <h2 className="text-xl font-semibold text-foreground">For Our Readers</h2>
      <p>
        Whether you are downloading your first APK or looking for the
        latest earning strategy, we write for you — not for search engines alone.
        We believe useful content earns trust, and trust earns returning readers.
      </p>
      <p>
        Questions? Reach us via our{" "}
        <a href="/contact-us" className="text-accent-bright hover:underline">
          Contact Us
        </a>{" "}
        page.
      </p>
    </LegalPage>
  );
}
