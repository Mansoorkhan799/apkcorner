import { fixContentUrls } from "@/lib/wordpress";

interface WordPressContentProps {
  html: string;
  className?: string;
}

/**
 * Renders WordPress/Kadence block HTML exactly as stored in the CMS.
 * Headings (H1–H6), images, lists, and block structure are never modified.
 */
export default function WordPressContent({ html, className = "" }: WordPressContentProps) {
  const content = fixContentUrls(html);

  return (
    <div
      className={`wp-content entry-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
