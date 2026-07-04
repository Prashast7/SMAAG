import type { PropsWithChildren } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { InquiryPopup } from "@/components/inquiry-popup";
import { Navbar } from "@/components/navigation/navbar";
import { SkipNavLink } from "@/components/ui/skip-nav-link";

/** Composes the global application chrome shared across the site. */
export function SiteShell({ children }: PropsWithChildren) {
  return (
    <>
      <SkipNavLink />
      <div className="bg-background text-foreground flex min-h-screen flex-col overflow-x-clip">
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
      <InquiryPopup />
    </>
  );
}
