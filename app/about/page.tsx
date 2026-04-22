import type { Metadata } from "next";
import { About } from "@/components/about/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hisaku is a two-person studio in Hyderabad building websites, marketing systems, and AI automation. The work is the pitch.",
};

export default function AboutPage() {
  return <About />;
}
