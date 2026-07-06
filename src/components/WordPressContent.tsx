import { fixContentUrls } from "@/lib/wordpress";
import { stripLeadingH1 } from "@/lib/schema/parse-content";

interface WordPressContentProps {
  html: string;
  className?: string;
  /** Skip first H1 when title is rendered in the post hero banner */
  skipLeadingH1?: boolean;
}

/**
 * Renders WordPress/Kadence block HTML exactly as stored in the CMS.
 * Headings (H1–H6), images, lists, and block structure are never modified.
 */
export default function WordPressContent({
  html,
  className = "",
  skipLeadingH1: shouldSkipH1 = false,
}: WordPressContentProps) {
  let content = fixContentUrls(html);
  if (shouldSkipH1) content = stripLeadingH1(content);

  return (
    <div
      className={`wp-content entry-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
