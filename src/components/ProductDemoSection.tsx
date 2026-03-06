import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const players = [
  { id: 1, x: 30, y: 25, path: [[30,25],[35,30],[40,28],[45,35],[42,40]], color: "hsl(185 100% 50%)" },
  { id: 2, x: 55, y: 45, path: [[55,45],[50,40],[52,35],[48,30],[55,28]], color: "hsl(265 90% 60%)" },
  { id: 3, x: 70, y: 60, path: [[70,60],[65,55],[68,50],[72,45],[75,50]], color: "hsl(185 100% 50%)" },
  { id: 4, x: 20, y: 70, path: [[20,70],[25,65],[30,68],[28,72],[32,75]], color: "hsl(265 90% 60%)" },
];

const heatmapPoints = [
  { x: 35, y: 30, intensity: 0.9 },
  { x: 50, y: 50, intensity: 0.7 },
  { x: 65, y: 40, intensity: 0.8 },
  { x: 40, y: 65, intensity: 0.5 },
  { x: 55, y: 25, intensity: 0.6 },
  { x: 75, y: 55, intensity: 0.4 },
  { x: 25, y: 45, intensity: 0.7 },
];

const ProductDemoSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
          <span className="text-primary text-sm font-medium tracking-widest uppercase">Live Demo</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 mb-4">
            Real-Time <span className="gradient-text">Tracking</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            See how SPOT PRO tracks player movements across the entire field.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative max-w-4xl mx-auto glass rounded-2xl p-4 md:p-8 overflow-hidden"
        >
          {/* Field */}
          <div className="relative w-full aspect-[16/9] rounded-xl border border-primary/20 bg-muted/20 overflow-hidden">
            {/* Field lines */}
            <div className="absolute inset-0">
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-primary/10" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-primary/10" />
              {/* Goal areas */}
              <div className="absolute left-0 top-1/4 bottom-1/4 w-[12%] border-r border-t border-b border-primary/10" />
              <div className="absolute right-0 top-1/4 bottom-1/4 w-[12%] border-l border-t border-b border-primary/10" />
            </div>

            {/* Heatmap */}
            {heatmapPoints.map((point, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary/20 blur-xl"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: `${point.intensity * 80 + 20}px`,
                  height: `${point.intensity * 80 + 20}px`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
            ))}

            {/* Player paths */}
            <svg className="absolute inset-0 w-full h-full">
              {players.map((player) => (
                <motion.polyline
                  key={player.id}
                  points={player.path.map(([x, y]) => `${x}%,${y}%`).join(" ")}
                  fill="none"
                  stroke={player.color}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  opacity={activePlayer === null || activePlayer === player.id ? 0.6 : 0.1}
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: player.id * 0.3 }}
                />
              ))}
            </svg>

            {/* Players */}
            {players.map((player) => (
              <motion.div
                key={player.id}
                className="absolute cursor-pointer z-10"
                style={{ left: `${player.x}%`, top: `${player.y}%` }}
                onClick={() => setActivePlayer(activePlayer === player.id ? null : player.id)}
                whileHover={{ scale: 1.5 }}
                animate={{
                  x: [0, 10, -5, 8, 0],
                  y: [0, -8, 5, -3, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="w-4 h-4 rounded-full border-2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: player.color,
                    borderColor: player.color,
                    boxShadow: `0 0 12px ${player.color}`,
                  }}
                />
                {activePlayer === player.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-5 left-1/2 -translate-x-1/2 glass-strong rounded-lg p-3 min-w-[120px] text-center"
                  >
                    <div className="text-xs font-semibold text-foreground">Player #{player.id}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Speed: {(20 + Math.random() * 15).toFixed(1)} km/h</div>
                    <div className="text-[10px] text-muted-foreground">Dist: {(2 + Math.random() * 4).toFixed(1)} km</div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">Click on players to view live stats</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDemoSection;
