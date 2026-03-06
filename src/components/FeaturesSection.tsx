import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Zap, Wifi, Brain, Shield, Battery } from "lucide-react";

const features = [
  { icon: Cpu, title: "Ultra-Precise Sensors", desc: "10-axis motion tracking with sub-millimeter accuracy across all movement planes.", progress: 99 },
  { icon: Brain, title: "AI-Powered Analysis", desc: "Real-time machine learning algorithms process movement patterns and predict fatigue.", progress: 95 },
  { icon: Zap, title: "Instant Feedback", desc: "Live performance data streamed to coaches within 5ms latency.", progress: 97 },
  { icon: Wifi, title: "Mesh Connectivity", desc: "Track up to 50 players simultaneously with zero-config mesh networking.", progress: 92 },
  { icon: Shield, title: "Military-Grade Build", desc: "IP68 waterproof, impact-resistant with aerospace-grade materials.", progress: 98 },
  { icon: Battery, title: "All-Day Battery", desc: "12+ hours of continuous tracking with rapid 30-minute charging.", progress: 90 },
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass rounded-2xl p-6 hover-tilt cursor-pointer overflow-hidden"
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/5 to-accent/5" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-all duration-500">
          <feature.icon className="w-6 h-6 text-primary" />
        </div>

        <h3 className="font-display font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.desc}</p>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full gradient-primary"
              initial={{ width: 0 }}
              animate={inView ? { width: `${feature.progress}%` } : {}}
              transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: "easeOut" }}
            />
          </div>
          <span className="text-xs font-medium text-primary">{feature.progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Capabilities</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Engineered for <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every component designed to push the boundaries of performance tracking technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
