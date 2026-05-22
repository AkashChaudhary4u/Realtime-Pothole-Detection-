import { motion } from "framer-motion";
import { MapPin, Navigation, Wifi, AlertTriangle } from "lucide-react";
import { SectionHeader } from "./DetectionDashboard";

const markers = [
  { id: 1, lat: "40.7128°N", lng: "74.0060°W", road: "Main Street", severity: "High", count: 5 },
  { id: 2, lat: "40.7580°N", lng: "73.9855°W", road: "Broadway Ave", severity: "Medium", count: 3 },
  { id: 3, lat: "40.7489°N", lng: "73.9680°W", road: "Park Lane", severity: "Low", count: 1 },
  { id: 4, lat: "40.7614°N", lng: "73.9776°W", road: "5th Avenue", severity: "High", count: 7 },
];

const LocationTracking = () => {
  return (
    <section id="dashboard" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(185_80%_55%/0.04)_0%,transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Location Intelligence"
          title="Interactive Location Tracking"
          subtitle="Real-time GPS-powered pothole mapping and monitoring across the city"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass-card-hover p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-neon-cyan" />
                <span className="text-sm font-medium text-foreground">Live Map View</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-3 h-3 text-neon-cyan animate-pulse" />
                <span className="text-xs text-neon-cyan">Live Sync</span>
              </div>
            </div>
            <div className="aspect-[16/9] rounded-lg bg-muted/30 border border-border relative overflow-hidden">
              <div className="absolute inset-0 animate-grid opacity-30" />
              {/* Simulated map pins */}
              {[
                { top: "25%", left: "30%", color: "bg-destructive" },
                { top: "45%", left: "55%", color: "bg-yellow-500" },
                { top: "60%", left: "20%", color: "bg-neon-cyan" },
                { top: "35%", left: "70%", color: "bg-destructive" },
              ].map((pin, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="absolute"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className={`w-4 h-4 ${pin.color} rounded-full relative`}>
                    <div className={`absolute inset-0 ${pin.color} rounded-full animate-ping opacity-40`} />
                  </div>
                </motion.div>
              ))}
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">Interactive Map View</p>
            </div>
          </motion.div>

          {/* Info panel */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card-hover p-4"
            >
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neon-blue" /> Nearby Potholes
              </h3>
              <div className="space-y-3">
                {markers.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.road}</p>
                      <p className="text-[10px] text-muted-foreground">{m.lat}, {m.lng}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs font-medium ${m.severity === "High" ? "text-destructive" : m.severity === "Medium" ? "text-yellow-500" : "text-neon-cyan"}`}>
                        {m.severity}
                      </span>
                      <p className="text-[10px] text-muted-foreground">{m.count} detected</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4"
            >
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" /> Current Area
              </h3>
              <p className="text-xs text-muted-foreground mb-1">Downtown District — Zone A3</p>
              <p className="text-xs text-muted-foreground">Road Condition: <span className="text-yellow-500 font-medium">Moderate Risk</span></p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationTracking;
