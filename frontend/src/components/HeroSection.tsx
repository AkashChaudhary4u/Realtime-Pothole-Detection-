import { motion } from "framer-motion";
import { Play, ArrowRight, Shield, Zap, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 animate-grid opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217_91%_60%/0.08)_0%,transparent_50%)]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-neon-blue/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <span className="text-xs text-muted-foreground tracking-wide uppercase">AI-Powered Detection System Active</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight mb-6"
          >
            <span className="gradient-text">Pothole</span>
            <span className="text-foreground">Vision</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered real-time pothole detection and intelligent road safety monitoring for smarter, safer cities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <button className="btn-primary-glow flex items-center justify-center gap-2 text-base">
              Get Started <ArrowRight className="w-4 h-4" />
            </button>
            <button className="btn-outline-glow flex items-center justify-center gap-2 text-base">
              <Play className="w-4 h-4" /> View Live Demo
            </button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            {[
              { icon: Zap, label: "Real-time Detection", value: "< 50ms" },
              { icon: Shield, label: "Detection Accuracy", value: "98.7%" },
              { icon: MapPin, label: "Areas Monitored", value: "1,200+" },
            ].map((item, i) => (
              <div key={i} className="glass-card-hover p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-neon-blue/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-neon-blue" />
                </div>
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
