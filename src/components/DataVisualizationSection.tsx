import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";

const speedData = [
  { time: "0'", value: 12 }, { time: "5'", value: 24 }, { time: "10'", value: 31 },
  { time: "15'", value: 28 }, { time: "20'", value: 35 }, { time: "25'", value: 22 },
  { time: "30'", value: 30 }, { time: "35'", value: 27 }, { time: "40'", value: 33 },
  { time: "45'", value: 18 },
];

const distanceData = [
  { zone: "Z1", value: 1200 }, { zone: "Z2", value: 2400 }, { zone: "Z3", value: 1800 },
  { zone: "Z4", value: 900 }, { zone: "Z5", value: 450 },
];

const DataVisualizationSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="analytics" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Analytics</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Data-Driven <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Transform raw performance data into winning strategies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Speed chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-foreground">Sprint Speed</h3>
                <p className="text-xs text-muted-foreground">km/h over match time</p>
              </div>
              <span className="text-primary font-display font-bold text-2xl">35.2</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={speedData}>
                <defs>
                  <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(185 100% 50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(185 100% 50%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215 15% 55%)', fontSize: 11 }} />
                <YAxis hide />
                <Area type="monotone" dataKey="value" stroke="hsl(185 100% 50%)" strokeWidth={2} fill="url(#speedGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Distance zones */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-semibold text-foreground">Distance by Zone</h3>
                <p className="text-xs text-muted-foreground">meters per intensity zone</p>
              </div>
              <span className="text-primary font-display font-bold text-2xl">6.7km</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={distanceData}>
                <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: 'hsl(215 15% 55%)', fontSize: 11 }} />
                <YAxis hide />
                <Bar dataKey="value" fill="hsl(185 100% 50%)" radius={[6, 6, 0, 0]} opacity={0.8} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <h3 className="font-display font-semibold text-foreground mb-6">Live Match Dashboard</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Top Speed", value: "35.2 km/h", change: "+2.1%" },
                { label: "Total Distance", value: "11.4 km", change: "+5.8%" },
                { label: "Heart Rate Avg", value: "162 bpm", change: "-1.2%" },
                { label: "Sprint Count", value: "47", change: "+12%" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-muted/30"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className="font-display font-bold text-xl text-foreground">{stat.value}</div>
                  <div className={`text-xs mt-1 ${stat.change.startsWith("+") ? "text-primary" : "text-accent"}`}>
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DataVisualizationSection;
