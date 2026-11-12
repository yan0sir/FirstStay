import Link from "next/link";
import { Monogram } from "@/components/brand";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="container-x flex min-h-svh flex-col items-center justify-center py-24 text-center">
      <Monogram className="h-24 w-auto" />
      <p className="eyebrow mt-10">Error 404</p>
      <h1 className="t-h1 mt-6">This door <span className="italic-accent">is locked.</span></h1>
      <p className="mt-6 max-w-md">The page you were looking for has moved or no longer exists. Let&rsquo;s get you back to the homes.</p>
      <Link href="/" className="btn btn-primary mt-10"><span>Back to FirstStay</span></Link>
    </main>
  );
}
