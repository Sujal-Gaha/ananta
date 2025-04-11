import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SimulationsSection } from "@/components/SimulationsSection";
import { HeroSection } from "@/components/HeroSection";

export const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <SimulationsSection />
      </main>
      <Footer />
    </div>
  );
};
