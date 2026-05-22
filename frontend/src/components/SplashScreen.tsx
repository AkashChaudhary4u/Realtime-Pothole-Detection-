import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 animate-grid opacity-40" />

      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(217_91%_60%/0.12)_0%,transparent_60%)]" />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-neon-blue via-neon-purple to-neon-cyan flex items-center justify-center neon-glow-blue">
          <Eye className="w-12 h-12 text-primary-foreground" />
        </div>
        <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-blue/20 via-neon-purple/20 to-neon-cyan/20 blur-xl animate-pulse-glow" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-3"
      >
        PotholeVision
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-muted-foreground text-sm tracking-widest uppercase mb-12"
      >
        AI-powered Road Safety Intelligence
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "16rem" }}
        transition={{ delay: 0.7, duration: 0.4 }}
        className="relative"
      >
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, hsl(185 80% 55%), hsl(217 91% 60%), hsl(260 60% 55%))",
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">
          Initializing AI Systems... {progress}%
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
