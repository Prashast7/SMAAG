"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

import { InquiryForm } from "@/components/forms/inquiry-form";
import { Button } from "@/components/ui/button";

const TRIGGER_DELAY_MS = 18000;
const STORAGE_KEY = "smaag-inquiry-popup-seen";

function hasBeenSeen() {
  if (typeof window === "undefined") return true;
  return window.sessionStorage.getItem(STORAGE_KEY) === "true";
}

/** Shows a low-friction inquiry pop-up after a delay or exit intent, gated to once per session. */
export function InquiryPopup() {
  const [open, setOpen] = useState(false);
  const shownRef = useRef(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const show = useCallback(() => {
    if (shownRef.current || hasBeenSeen()) return;
    shownRef.current = true;
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    window.sessionStorage.setItem(STORAGE_KEY, "true");
  }, []);

  useEffect(() => {
    if (hasBeenSeen()) return;

    const timer = window.setTimeout(show, TRIGGER_DELAY_MS);

    function handleMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0) {
        show();
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements =
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
        );

      if (!focusableElements || focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <>
      <div
        aria-hidden="true"
        className="bg-foreground/20 fixed inset-0 z-50"
        onClick={close}
      />
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:inset-0 sm:items-center"
        onClick={close}
      >
        <div
          aria-labelledby="inquiry-popup-heading"
          aria-modal="true"
          className="border-border bg-card w-full max-w-md rounded-xl border p-6 shadow-lg sm:p-8"
          onClick={(event) => event.stopPropagation()}
          ref={dialogRef}
          role="dialog"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-h4" id="inquiry-popup-heading">
                Ready to talk numbers?
              </h2>
              <p className="text-small text-muted">
                Let&apos;s discuss how SMAAG can support your business.
              </p>
            </div>
            <Button
              aria-label="Close"
              onClick={close}
              ref={closeButtonRef}
              size="icon"
              variant="ghost"
            >
              <X aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-6">
            <InquiryForm onSuccess={close} source="popup" variant="compact" />
          </div>
        </div>
      </div>
    </>
  );
}
