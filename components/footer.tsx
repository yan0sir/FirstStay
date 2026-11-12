"use client";

import Link from "next/link";
import { useState } from "react";
import { homes } from "@/lib/homes";
import { nav, site } from "@/lib/site";
import { Monogram } from "./brand";
import { Reveal } from "./motion";
import { ArrowRight, ArrowUpRight } from "./icons";

export function Footer() {
  return (
    <>
      <Newsletter />
      <footer className="on-dark bg-velvet text-timeless/85">
        <div className="container-x grid gap-12 pb-10 pt-20 md:grid-cols-12 md:pt-24">
          <div className="md:col-span-4">
            <Monogram tone="light" className="h-20 w-auto" />
            <p className="mt-6 max-w-xs">Holiday homes in Downtown Dubai, Dubai Harbour and Dubai Creek Harbour. A key to serenity.</p>
          </div>
          <FooterCol title="Stay" className="md:col-span-3">
            {homes.map((h) => (
              <li key={h.slug}><Link href={`/stays/${h.slug}`} className="hover:text-timeless">{h.name}</Link></li>
            ))}
          </FooterCol>
          <FooterCol title="Explore" className="md:col-span-2">
            {nav.slice(1, 6).map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-timeless">{n.label}</Link></li>
            ))}
          </FooterCol>
          <FooterCol title="Contact" className="md:col-span-3">
            <li><a href={site.phone.href} className="hover:text-timeless">{site.phone.display}</a></li>
            <li><a href={`mailto:${site.email}`} className="hover:text-timeless">{site.email}</a></li>
            <li><a href={site.whatsapp} target="_blank" rel="noopener" className="hover:text-timeless">WhatsApp</a></li>
            <li className="pt-2">
              <address className="not-italic">{site.address.full}</address>
            </li>
            <li className="text-sm text-timeless/65">{site.hours}</li>
          </FooterCol>
        </div>

        <div className="container-x">
          <div className="flex flex-wrap gap-x-8 gap-y-3 border-y border-timeless/20 py-6">
            {site.social.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 text-timeless">
                {s.label} <span className="text-timeless/60">{s.handle}</span>
                <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>

        <div className="container-x flex flex-col gap-2 pb-28 pt-8 text-sm md:pb-8 text-timeless/60 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} FirstStay Holiday Homes, Dubai, United Arab Emirates.</p>
          <p>Prices in AED. Secure payments on our booking page.</p>
        </div>
      </footer>
    </>
  );
}

function FooterCol({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow mb-5">{title}</p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function Newsletter() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const res = await fetch("/api/newsletter", { method: "POST", body: new FormData(e.currentTarget) }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }

  return (
    <section aria-labelledby="newsletter-title" className="section-y border-t border-line">
      <div className="container-x grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal><p className="eyebrow">Letters from Dubai</p></Reveal>
          <Reveal delay={0.08}>
            <h2 id="newsletter-title" className="t-h2 mt-6">Now and again, <span className="italic-accent">a note from Dubai.</span></h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md">New homes, quieter weeks with better rates, and the places we send our own friends.</p>
          </Reveal>
        </div>
        <Reveal delay={0.2} className="lg:col-span-5 lg:col-start-8">
          {state === "done" ? (
            <p role="status" className="font-display text-3xl text-velvet">Thank you. You&rsquo;re on the list.</p>
          ) : (
            <form onSubmit={submit} noValidate={false}>
              <label htmlFor="nl-email" className="mb-2 block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-leather">Email address</label>
              <div className="flex border-b border-velvet">
                <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="min-h-14 min-w-0 flex-1 bg-transparent font-display text-2xl text-velvet outline-none placeholder:text-leather/45" />
                <button type="submit" disabled={state === "sending"} aria-label="Subscribe" className="group flex items-center gap-3 pl-4 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-velvet disabled:opacity-50">
                  {state === "sending" ? "Sending" : "Subscribe"} <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </button>
              </div>
              <label className="mt-5 flex items-start gap-3 text-sm">
                <input type="checkbox" name="consent" required className="mt-1 size-4 accent-velvet" />
                I agree to receive occasional emails from FirstStay and can unsubscribe at any time.
              </label>
              {state === "error" && <p role="alert" className="mt-3 text-sm text-velvet">Something went wrong. Please check your email and try again.</p>}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
