import Navbar           from "../components/Navbar";
import HeroSection      from "../components/HeroSection";
import StatsSection     from "../components/StatsSection";
import FeaturesSection  from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import RolesSection     from "../components/RolesSection";
import AboutSection     from "../components/AboutSection";
import CTABanner        from "../components/CTABanner";
import Footer           from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
 
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <RolesSection />
        <AboutSection />
        <CTABanner />
      </main>
 
      <Footer />
    </>
  );
}