import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { ThreadView } from "@/components/home/thread-view";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ThreadView />
    </>
  );
}
