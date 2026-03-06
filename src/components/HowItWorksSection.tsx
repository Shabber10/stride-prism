import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Watch, Activity, BarChart3, TrendingUp } from "lucide-react";

const steps = [
  { icon: Watch, title: "Wear the Device", desc: "Attach the lightweight sensor — it weighs only 6 grams." },
  { icon: Activity, title: "Track Performance", desc: "Every movement captured at 50Hz with 10-axis precision." },
  { icon: BarChart3, title: "Analyze Data", desc: "AI processes thousands of data points in real-time." },
  { icon: TrendingUp, title: "Improve Training", desc: "Actionable insights to optimize every training session." },
];

const HowItWorksSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Process</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-0.5 bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden md:block" />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className={`flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:flex-row`}
                >
                  <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-center`}>
                    <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground text-sm">{step.desc}</p>
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center glow-primary"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <step.icon className="w-7 h-7 text-primary-foreground" />
                    </motion.div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
