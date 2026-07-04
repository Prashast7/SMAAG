/** Provides a keyboard-accessible shortcut to the main content region. */
export function SkipNavLink() {
  return (
    <a
      className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      href="#main-content"
    >
      Skip to content
    </a>
  );
}
