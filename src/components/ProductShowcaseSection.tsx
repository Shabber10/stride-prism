import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import productImage from "@/assets/product-device.png";
import { Cpu, Radio, BatteryFull, Brain } from "lucide-react";

const hotspots = [
  { id: 1, x: 35, y: 25, icon: Cpu, title: "10-Axis Sensor Array", desc: "Accelerometer, gyroscope, and magnetometer working in unison." },
  { id: 2, x: 70, y: 40, icon: Radio, title: "UWB Tracking", desc: "Ultra-wideband positioning with ±10cm accuracy." },
  { id: 3, x: 30, y: 75, icon: BatteryFull, title: "Graphene Battery", desc: "12-hour runtime, 30-min rapid charge." },
  { id: 4, x: 65, y: 70, icon: Brain, title: "Edge AI Chip", desc: "On-device neural processing for instant analysis." },
];

const ProductShowcaseSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  return (
    <section id="technology" className="py-24 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Technology</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Inside the <span className="gradient-text">Device</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Tap the hotspots to explore the technology powering SPOT PRO.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="relative max-w-2xl mx-auto"
        >
          {/* Product image */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 rounded-full bg-primary/5 blur-[60px]" />
            </div>
            <img
              src={productImage}
              alt="SPOT PRO device internal view"
              className="w-full max-w-md mx-auto relative z-10"
            />

            {/* Hotspots */}
            {hotspots.map((spot) => (
              <motion.button
                key={spot.id}
                className="absolute z-20"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                whileHover={{ scale: 1.3 }}
              >
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-primary/80 flex items-center justify-center cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                </div>

                {activeHotspot === spot.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 glass-strong rounded-xl p-4 min-w-[200px] text-left"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <spot.icon className="w-4 h-4 text-primary" />
                      <span className="font-display font-semibold text-sm text-foreground">{spot.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{spot.desc}</p>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;
