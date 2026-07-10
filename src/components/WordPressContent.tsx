import { fixContentUrls } from "@/lib/wordpress";
import { stripLeadingH1 } from "@/lib/schema/parse-content";
import AnimatedWordPressContent from "@/components/AnimatedWordPressContent";

interface WordPressContentProps {
  html: string;
  className?: string;
  /** Skip first H1 when title is rendered in the post hero banner */
  skipLeadingH1?: boolean;
}

/** Remove Kadence accordion inline styles (light theme) so our dark styles apply. */
function stripAccordionInlineStyles(html: string): string {
  // Match each <style> block on its own. A previous regex spanned from the first
  // <style> to a later .kt-accordion block and deleted the post body + images.
  return html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, (block) =>
    /\.kt-accordion/i.test(block) ? "" : block
  );
}

/**
 * Renders WordPress/Kadence block HTML with Framer Motion scroll reveals
 * and working accordion FAQs — applies to every published post.
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
    <AnimatedWordPressContent
      html={content}
      className={`wp-content entry-content ${className}`}
    />
  );
}
