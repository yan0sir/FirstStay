import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/hero";
import { Marquee, Ready, Statement } from "@/components/home/intro";
import { Homes, Places } from "@/components/home/homes";
import { Arrive, Faq, Invitation, Owners, Reviews } from "@/components/home/more";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/faq";
import { faqJsonLd, homesListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Statement />
        <Homes />
        <Places />
        <Ready />
        <Reviews />
        <Arrive />
        <Owners />
        <Faq />
        <Invitation />
      </main>
      <Footer />
      <JsonLd data={homesListJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
