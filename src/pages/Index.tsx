import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedJobs } from "@/components/FeaturedJobs";
import { Stats } from "@/components/Stats";
import { HowItWorks } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <Stats />
      <FeaturedJobs />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Index;