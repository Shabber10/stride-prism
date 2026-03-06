import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import productImage from "@/assets/product-device.png";
import SportsBackground from "@/components/SportsBackground";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic sports background */}
      <SportsBackground variant="hero" />

      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 pt-20">
        {/* Text content */}
        <motion.div
          className="flex-1 text-center lg:text-left z-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-medium text-primary">Next Generation Sports Tech</span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Precision{" "}
            <span className="gradient-text">Performance</span>{" "}
            Tracking
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            The world's most advanced wearable sensor for professional athletes. 
            Track every movement, analyze every metric, dominate every game.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="hero" size="lg" className="text-base px-8">
              Explore the Technology
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-8">
              Watch Demo
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
            {[
              { value: "99.9%", label: "Accuracy" },
              { value: "50Hz", label: "Refresh Rate" },
              { value: "12h", label: "Battery" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Product image */}
        <motion.div
          className="flex-1 relative flex items-center justify-center z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="absolute w-72 h-72 rounded-full bg-primary/10 blur-[80px] animate-pulse-glow" />
          <motion.img
            src={productImage}
            alt="SPOT Pro tracking device"
            className="w-80 h-80 md:w-96 md:h-96 object-contain relative z-10 drop-shadow-2xl"
            animate={{
              y: [0, -15, 0],
              rotateZ: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              transform: `perspective(800px) rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
            }}
          />
          {/* Orbital ring */}
          <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] border border-primary/10 rounded-full animate-spin-slow" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
