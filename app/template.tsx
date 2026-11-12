/**
 * Page transition: every page (re)mount fades in from under a short cream veil (.page-veil in
 * globals.css). No transform on the wrapper, so the fixed header and sticky sections keep working.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="page-veil" />
      {children}
    </>
  );
}
