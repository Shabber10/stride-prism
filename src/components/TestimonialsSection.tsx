import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marcus Rivera",
    role: "Head Coach, FC Barcelona Academy",
    quote: "SPOT PRO transformed how we develop young talent. The precision of data is unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Dr. Sarah Chen",
    role: "Sports Scientist, Nike Innovation Lab",
    quote: "The AI analysis capabilities are years ahead of the competition. We've reduced injury rates by 40%.",
    rating: 5,
  },
  {
    name: "James Okafor",
    role: "Performance Director, NFL Draft Combine",
    quote: "Every millisecond matters at this level. SPOT PRO gives us insights no other device can provide.",
    rating: 5,
  },
];

const partners = ["Nike", "Adidas", "FIFA", "NBA", "UEFA", "ESPN", "Under Armour", "Puma"];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 relative">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Testimonials</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Trusted by the <span className="gradient-text">Best</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="glass rounded-2xl p-6 hover-tilt"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div>
                <div className="font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner logos */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: [0, -800] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...partners, ...partners].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-muted-foreground/30 font-display font-bold text-2xl whitespace-nowrap hover:text-muted-foreground/60 transition-colors"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
