import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductShowcaseSection from "@/components/ProductShowcaseSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DataVisualizationSection from "@/components/DataVisualizationSection";
import ProductDemoSection from "@/components/ProductDemoSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProductShowcaseSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DataVisualizationSection />
      <ProductDemoSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
