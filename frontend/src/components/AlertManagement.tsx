import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Search, Filter, Clock, MapPin, CheckCircle, AlertTriangle } from "lucide-react";
import { SectionHeader } from "./DetectionDashboard";

const alertsData = [
  { id: 1, type: "Large Pothole Detected", severity: "High", location: "Main St & 5th Ave", time: "2 min ago", status: "Pending", coords: "40.7128°N, 74.0060°W" },
  { id: 2, type: "Road Surface Crack", severity: "Medium", location: "Broadway Ave", time: "15 min ago", status: "Pending", coords: "40.7580°N, 73.9855°W" },
  { id: 3, type: "Minor Surface Damage", severity: "Low", location: "Park Lane South", time: "1 hr ago", status: "Resolved", coords: "40.7489°N, 73.9680°W" },
  { id: 4, type: "Critical Road Hazard", severity: "High", location: "Highway I-95 Exit 12", time: "2 hrs ago", status: "Pending", coords: "40.7614°N, 73.9776°W" },
  { id: 5, type: "Pavement Deterioration", severity: "Medium", location: "Elm Street", time: "5 hrs ago", status: "Resolved", coords: "40.7282°N, 73.7949°W" },
  { id: 6, type: "Pothole Cluster", severity: "High", location: "2nd Avenue", time: "6 hrs ago", status: "Resolved", coords: "40.7306°N, 73.9866°W" },
];

const severityColor: Record<string, string> = {
  High: "bg-destructive/20 text-destructive",
  Medium: "bg-yellow-500/20 text-yellow-500",
  Low: "bg-neon-cyan/20 text-neon-cyan",
};

const AlertManagement = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = alertsData.filter((a) => {
    if (filter !== "All" && a.severity !== filter) return false;
    if (search && !a.type.toLowerCase().includes(search.toLowerCase()) && !a.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <section id="alerts" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(0_72%_51%/0.03)_0%,transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Alert Center"
          title="Alert Management"
          subtitle="Track, filter, and manage all road safety alerts in real-time"
        />

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon-blue/50"
              placeholder="Search alerts..."
            />
          </div>
          <div className="flex gap-2">
            {["All", "High", "Medium", "Low"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-2 text-xs rounded-lg border transition-all ${filter === f ? "border-neon-blue bg-neon-blue/10 text-neon-blue" : "border-border text-muted-foreground hover:text-foreground"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Alert Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium">Alert</th>
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium hidden sm:table-cell">Location</th>
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium">Severity</th>
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium hidden md:table-cell">Time</th>
                  <th className="text-left p-4 text-xs text-muted-foreground font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((alert) => (
                  <tr key={alert.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-neon-blue shrink-0" />
                        <div>
                          <p className="font-medium text-foreground">{alert.type}</p>
                          <p className="text-[10px] text-muted-foreground sm:hidden">{alert.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{alert.location}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground">{alert.coords}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColor[alert.severity]}`}>
                        {alert.severity}
                      </span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{alert.time}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        {alert.status === "Resolved" ? (
                          <CheckCircle className="w-3 h-3 text-neon-cyan" />
                        ) : (
                          <AlertTriangle className="w-3 h-3 text-yellow-500" />
                        )}
                        <span className={`text-xs ${alert.status === "Resolved" ? "text-neon-cyan" : "text-yellow-500"}`}>
                          {alert.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AlertManagement;
