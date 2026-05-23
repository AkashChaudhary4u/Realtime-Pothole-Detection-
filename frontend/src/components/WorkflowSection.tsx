import { motion } from "framer-motion";
import { Video, Cpu, ScanSearch, BarChart3, MapPin, Bell, ArrowRight } from "lucide-react";
import { SectionHeader } from "./DetectionDashboard";

const steps = [
  { icon: Video, title: "Video Input", desc: "Upload footage or enable live camera feed for road scanning" },
  { icon: Cpu, title: "AI Processing", desc: "Deep learning model analyzes each frame for road anomalies" },
  { icon: ScanSearch, title: "Bounding Box Detection", desc: "Identified potholes are highlighted with precision overlays" },
  { icon: BarChart3, title: "Confidence Analysis", desc: "Each detection is scored with a confidence percentage" },
  { icon: MapPin, title: "GPS Mapping", desc: "Detected hazards are geo-tagged and mapped in real-time" },
  { icon: Bell, title: "Alert Generation", desc: "Automated alerts are dispatched based on severity levels" },
];

const WorkflowSection = () => {
  return (
    <section id="about" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217_91%_60%/0.04)_0%,transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="How It Works"
          title="Detection Pipeline"
          subtitle="From video input to alert generation — our end-to-end AI workflow"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-6 relative group"
            >
              {/* Step number */}
              <div className="absolute top-4 right-4 text-4xl font-heading font-bold text-muted/40 group-hover:text-neon-blue/20 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mb-4 group-hover:from-neon-blue/30 group-hover:to-neon-purple/30 transition-all">
                <step.icon className="w-6 h-6 text-neon-blue" />
              </div>
              <h3 className="text-lg font-heading font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>

              {i < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-blue/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkflowSection;
