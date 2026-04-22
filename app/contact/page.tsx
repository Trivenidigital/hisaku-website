import type { Metadata } from "next";
import { Contact } from "@/components/contact/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about the project. We reply within one business day.",
};

export default function ContactPage() {
  return <Contact />;
}
