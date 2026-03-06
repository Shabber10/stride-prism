import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SportsBackground from "@/components/SportsBackground";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 relative overflow-hidden">
      <SportsBackground variant="cta" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            Ready to{" "}
            <span className="gradient-text">Dominate</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Join over 500 professional teams worldwide using SPOT PRO to unlock peak performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" className="text-base px-10 gap-2">
              Order Now <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="hero-outline" size="lg" className="text-base px-10">
              Request a Demo
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <span>✓ 30-day trial</span>
            <span>✓ Free shipping</span>
            <span>✓ 2-year warranty</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
