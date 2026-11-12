import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/intro";
import { BookCta, Facilities, Statement } from "@/components/home/story";
import { Collection } from "@/components/home/collection";
import { Rooms } from "@/components/home/rooms";
import { Places } from "@/components/home/homes";
import { Faq, Invitation, Owners, Reviews } from "@/components/home/more";
import { FloatingBook } from "@/components/floating-book";
import { JsonLd } from "@/components/json-ld";
import { faqs } from "@/lib/faq";
import { faqJsonLd, homesListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Guest journey: arrive (hero) → feel it (statement) → see the homes → step inside → what's included
// → where → proof → book. Owners, questions and contact follow.
export default function HomePage() {
  return (
    <>
      <Header pill={false} />
      <main id="main">
        <Hero />
        <Marquee />
        <Statement />
        <Collection />
        <Rooms />
        <Facilities />
        <Places />
        <Reviews />
        <BookCta />
        <Owners />
        <Faq />
        <Invitation />
      </main>
      <Footer />
      <FloatingBook />
      <JsonLd data={homesListJsonLd()} />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
