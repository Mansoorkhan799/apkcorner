"use client";

import { useEffect, useRef } from "react";

interface KadenceAccordionProps {
  html: string;
  className?: string;
}

/**
 * Renders WordPress/Kadence HTML and restores accordion open/close behavior
 * (Kadence's frontend JS is not loaded in the headless Next.js app).
 */
export default function KadenceAccordion({ html, className = "" }: KadenceAccordionProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const cleanups: Array<() => void> = [];

    root.querySelectorAll<HTMLElement>(".wp-block-kadence-accordion").forEach((accordion) => {
      const wrap = accordion.querySelector<HTMLElement>(".kt-accordion-inner-wrap");
      if (!wrap) return;

      const allowMultiple = wrap.getAttribute("data-allow-multiple-open") === "true";
      const startOpen = Number(wrap.getAttribute("data-start-open") ?? "-1");
      const panes = Array.from(
        wrap.querySelectorAll<HTMLElement>(":scope > .wp-block-kadence-pane, :scope > .kt-accordion-pane")
      );

      const setPaneOpen = (pane: HTMLElement, open: boolean) => {
        const panel = pane.querySelector<HTMLElement>(".kt-accordion-panel");
        const header = pane.querySelector<HTMLElement>(".kt-blocks-accordion-header");
        if (!panel) return;

        pane.classList.toggle("kt-accordion-pane-active", open);
        panel.classList.toggle("kt-accordion-panel-hidden", !open);
        panel.classList.toggle("kt-accordion-panel-active", open);
        header?.setAttribute("aria-expanded", open ? "true" : "false");
      };

      // Initialize: hide all, then open start pane if configured
      panes.forEach((pane, index) => {
        setPaneOpen(pane, startOpen >= 0 && index === startOpen);
      });

      panes.forEach((pane) => {
        const header = pane.querySelector<HTMLButtonElement>(".kt-blocks-accordion-header");
        if (!header) return;

        header.setAttribute("aria-expanded", pane.classList.contains("kt-accordion-pane-active") ? "true" : "false");

        const onClick = (event: Event) => {
          event.preventDefault();
          const isOpen = pane.classList.contains("kt-accordion-pane-active");

          if (!allowMultiple) {
            panes.forEach((other) => setPaneOpen(other, false));
          }

          setPaneOpen(pane, !isOpen);
        };

        header.addEventListener("click", onClick);
        cleanups.push(() => header.removeEventListener("click", onClick));
      });
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, [html]);

  return (
    <div
      ref={rootRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
