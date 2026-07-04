"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavigationItem = {
  href: string;
  label: string;
};

type NavbarClientProps = {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
  };
  contactHref: string;
  navigation: readonly NavigationItem[];
};

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Handles active-link logic and mobile-drawer behavior for the shared navigation. */
export function NavbarClient({ brand, contactHref, navigation }: NavbarClientProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const items = useMemo(
    () =>
      navigation.map((item) => ({
        ...item,
        active: isActivePath(pathname, item.href),
      })),
    [navigation, pathname],
  );

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements || focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <div className="flex h-18 items-center justify-between gap-6">
        <Link className="min-w-0 shrink-0" href="/" aria-label={brand.name}>
          <div className="flex flex-col">
            <span className="text-small font-semibold tracking-[0.18em] text-foreground uppercase">
              {brand.shortName}
            </span>
            <span className="hidden text-caption sm:block">{brand.tagline}</span>
          </div>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "rounded-full px-4 py-2 text-small font-medium",
                item.active ? "bg-accent text-foreground" : "text-muted hover:bg-accent hover:text-foreground",
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild variant="secondary">
            <a href={contactHref}>Contact</a>
          </Button>
        </div>

        <Button
          ref={triggerRef}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="lg:hidden"
          onClick={() => setOpen((current) => !current)}
          size="icon"
          variant="ghost"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      {open ? (
        <div
          aria-hidden="true"
          className="fixed inset-0 top-[73px] z-30 bg-foreground/10 lg:hidden"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        aria-label="Mobile navigation"
        aria-modal="true"
        className={cn(
          "fixed inset-x-0 top-[73px] z-40 border-b border-border bg-background lg:hidden",
          open ? "block" : "hidden",
        )}
        ref={dialogRef}
        role="dialog"
      >
        <nav className="mx-auto flex w-full max-w-(--container-xl) flex-col gap-1 px-4 py-6 sm:px-6">
          {items.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstLinkRef : undefined}
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "rounded-md px-3 py-3 text-body font-medium",
                item.active ? "bg-accent text-foreground" : "text-muted hover:bg-accent hover:text-foreground",
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button asChild className="w-full justify-center" variant="secondary">
              <a href={contactHref}>Contact</a>
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
