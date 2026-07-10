import { fixContentUrls } from "@/lib/wordpress";
import { stripLeadingH1 } from "@/lib/schema/parse-content";
import KadenceAccordion from "@/components/KadenceAccordion";

interface WordPressContentProps {
  html: string;
  className?: string;
  /** Skip first H1 when title is rendered in the post hero banner */
  skipLeadingH1?: boolean;
}

/** Remove Kadence accordion inline styles (light theme) so our dark styles apply. */
function stripAccordionInlineStyles(html: string): string {
  return html.replace(
    /<style\b[^>]*>[\s\S]*?\.kt-accordion[\s\S]*?<\/style>/gi,
    ""
  );
}

/**
 * Renders WordPress/Kadence block HTML with working accordion FAQs.
 */
export default function WordPressContent({
  html,
  className = "",
  skipLeadingH1: shouldSkipH1 = false,
}: WordPressContentProps) {
  let content = fixContentUrls(html);
  if (shouldSkipH1) content = stripLeadingH1(content);
  content = stripAccordionInlineStyles(content);

  return (
    <KadenceAccordion
      html={content}
      className={`wp-content entry-content ${className}`}
    />
  );
}
