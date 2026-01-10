import { useState, useEffect } from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";
import LandingPageSkeleton from "@/components/landing/LandingPageSkeleton";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LandingPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in relative overflow-hidden">
      {/* Glassmorphism background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-20 -left-48 w-[500px] h-[500px] bg-coral/25 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-96 -right-48 w-[450px] h-[450px] bg-lavender/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-60 left-1/3 w-[400px] h-[400px] bg-teal/15 rounded-full blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute -bottom-32 right-1/4 w-[350px] h-[350px] bg-peach/20 rounded-full blur-3xl animate-blob animation-delay-6000" />
      </div>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
