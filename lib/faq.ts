import { site } from "./site";

// Homepage FAQ. Also output as FAQPage structured data, so answers must stay plain and accurate.
export const faqs = [
  {
    q: "Where are FirstStay's holiday homes in Dubai?",
    a: "Four homes in three neighbourhoods: two in Burj Royale, Downtown Dubai (next to the Burj Khalifa and Dubai Mall), one in Grand Bleu Tower by Elie Saab on Emaar Beachfront, Dubai Harbour, and one in Creek Rise, Dubai Creek Harbour.",
  },
  {
    q: "What time are check-in and check-out?",
    a: "Check-in is from 3pm and check-out is by 11am. If you need an earlier arrival or a later departure, ask us and we will help when the calendar allows.",
  },
  {
    q: "How do I book?",
    a: `Choose your dates and guests on this site and you will be taken to our secure booking page to see live prices and pay. You can also message us on WhatsApp or call ${site.phone.display}.`,
  },
  {
    q: "Is the Tourism Dirham fee included?",
    a: "Dubai's Tourism Dirham fee is set by the Department of Economy and Tourism and charged per bedroom, per night. It is shown clearly before you pay.",
  },
  {
    q: "What do I need for check-in?",
    a: "A copy of a valid passport or Emirates ID for each guest, as Dubai's holiday-home rules require. We ask for it after booking so your arrival is quick.",
  },
  {
    q: "Can I reach someone at night?",
    a: "Yes. Our guest line is open 24 hours a day, every day, for directions, help in the apartment or a recommendation for dinner.",
  },
  {
    q: "Do you manage holiday homes for owners?",
    a: "Yes. We offer full management for a 20% fee: pricing, guest communication, cleaning, maintenance, payouts and Dubai holiday-home registration, with listings on Airbnb, Booking.com, Expedia, Vrbo and Tripadvisor plus direct bookings.",
  },
];
