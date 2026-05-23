import { motion } from "framer-motion";
import { BarChart3, TrendingUp, AlertTriangle, Shield, Activity, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";
import { SectionHeader } from "./DetectionDashboard";

const dailyData = [
  { day: "Mon", count: 18 }, { day: "Tue", count: 32 },
  { day: "Wed", count: 24 }, { day: "Thu", count: 45 },
  { day: "Fri", count: 38 }, { day: "Sat", count: 22 },
  { day: "Sun", count: 15 },
];

const weeklyData = [
  { week: "W1", current: 120, previous: 95 },
  { week: "W2", current: 145, previous: 110 },
  { week: "W3", current: 98, previous: 130 },
  { week: "W4", current: 165, previous: 142 },
];

const severityData = [
  { name: "High", value: 30, color: "hsl(0 72% 51%)" },
  { name: "Medium", value: 45, color: "hsl(45 93% 47%)" },
  { name: "Low", value: 25, color: "hsl(185 80% 55%)" },
];

const stats = [
  { label: "Total Detected", value: "2,847", icon: Target, change: "+12.5%", color: "text-neon-blue" },
  { label: "Detection Accuracy", value: "98.7%", icon: Shield, change: "+0.3%", color: "text-neon-cyan" },
  { label: "High Risk Roads", value: "23", icon: AlertTriangle, change: "-5.2%", color: "text-destructive" },
  { label: "Active Alerts", value: "14", icon: Activity, change: "+8", color: "text-neon-purple" },
];

const AnalyticsDashboard = () => {
  return (
    <section id="analytics" className="relative py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(217_91%_60%/0.05)_0%,transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          badge="Analytics"
          title="Advanced Analytics Dashboard"
          subtitle="Comprehensive insights into detection performance and road safety trends"
        />

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="stat-card"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-xs text-neon-cyan">{stat.change}</span>
              </div>
              <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Detection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-hover p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-4 h-4 text-neon-blue" />
              <h3 className="text-sm font-semibold text-foreground">Daily Detection Trend</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 18%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} axisLine={false} />
                <Bar dataKey="count" fill="hsl(217 91% 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Weekly Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card-hover p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-neon-cyan" />
              <h3 className="text-sm font-semibold text-foreground">Weekly Comparison</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(230 20% 18%)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} axisLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215 20% 55%)" }} axisLine={false} />
                <Area type="monotone" dataKey="current" stroke="hsl(185 80% 55%)" fill="hsl(185 80% 55% / 0.15)" strokeWidth={2} />
                <Area type="monotone" dataKey="previous" stroke="hsl(260 60% 55%)" fill="hsl(260 60% 55% / 0.1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Severity Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card-hover p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <h3 className="text-sm font-semibold text-foreground">Severity Distribution</h3>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={severityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                  {severityData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-2">
              {severityData.map((s, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs text-muted-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Risk Gauge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 glass-card-hover p-6 max-w-md mx-auto text-center"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4">Overall Road Risk Level</h3>
          <div className="relative w-full h-4 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "62%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, hsl(185 80% 55%), hsl(45 93% 47%), hsl(0 72% 51%))" }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Low</span>
            <span className="text-yellow-500 font-semibold">Moderate — 62%</span>
            <span>Critical</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
