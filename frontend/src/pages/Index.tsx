import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/SplashScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DetectionDashboard from "@/components/DetectionDashboard";
import LocationTracking from "@/components/LocationTracking";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import AlertManagement from "@/components/AlertManagement";
import WorkflowSection from "@/components/WorkflowSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          <Navbar />
          <HeroSection />
          <DetectionDashboard />
          <LocationTracking />
          <AnalyticsDashboard />
          <AlertManagement />
          <WorkflowSection />
          <FooterSection />
        </>
      )}
    </div>
  );
};

export default Index;
