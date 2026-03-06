import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

interface SportsBackgroundProps {
  variant?: "hero" | "cta" | "section";
  className?: string;
}

// Generates a flowing sine-wave path with multiple harmonics
const generateWavePath = (
  width: number,
  height: number,
  amplitude: number,
  frequency: number,
  yOffset: number,
  phase: number
) => {
  const points: string[] = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * width;
    const y =
      yOffset +
      Math.sin((i / steps) * Math.PI * frequency + phase) * amplitude +
      Math.sin((i / steps) * Math.PI * frequency * 2.3 + phase * 1.5) * (amplitude * 0.3);
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(" ");
};

// Speed streak line data
interface Streak {
  x1: number;
  y1: number;
  length: number;
  angle: number;
  delay: number;
  duration: number;
  color: string;
}

const SportsBackground = ({ variant = "hero", className = "" }: SportsBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Memoize random data so it doesn't change on re-render
  const streaks: Streak[] = useMemo(() => {
    const colors = [
      "hsla(185, 100%, 50%, 0.6)",
      "hsla(265, 90%, 60%, 0.5)",
      "hsla(185, 100%, 50%, 0.3)",
      "hsla(30, 100%, 60%, 0.4)",
      "hsla(0, 80%, 55%, 0.3)",
      "hsla(185, 100%, 70%, 0.4)",
    ];
    return Array.from({ length: variant === "hero" ? 18 : 10 }, () => ({
      x1: Math.random() * 120 - 10,
      y1: Math.random() * 120 - 10,
      length: Math.random() * 80 + 40,
      angle: -30 + Math.random() * 20,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 1.5,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  }, [variant]);

  const particles = useMemo(() => {
    return Array.from({ length: variant === "hero" ? 40 : 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }));
  }, [variant]);

  // Animated wave canvas for flowing line-art waves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const waveConfigs = [
      { amplitude: 60, frequency: 2, yOffset: 0.3, color: "hsla(185, 100%, 50%, 0.12)", width: 1.5, speed: 0.008 },
      { amplitude: 45, frequency: 2.5, yOffset: 0.4, color: "hsla(265, 90%, 60%, 0.1)", width: 1.2, speed: 0.006 },
      { amplitude: 80, frequency: 1.5, yOffset: 0.55, color: "hsla(185, 100%, 50%, 0.08)", width: 2, speed: 0.01 },
      { amplitude: 35, frequency: 3, yOffset: 0.65, color: "hsla(30, 100%, 60%, 0.07)", width: 1, speed: 0.012 },
      { amplitude: 50, frequency: 2, yOffset: 0.75, color: "hsla(0, 80%, 55%, 0.06)", width: 1.5, speed: 0.007 },
      { amplitude: 70, frequency: 1.8, yOffset: 0.5, color: "hsla(185, 100%, 50%, 0.05)", width: 2.5, speed: 0.005 },
    ];

    // Draw multiple parallel lines per wave for the "many-line" effect
    const drawWave = (
      w: number,
      h: number,
      config: typeof waveConfigs[0],
      phase: number,
      lineCount: number
    ) => {
      for (let line = 0; line < lineCount; line++) {
        const lineOffset = (line - lineCount / 2) * 4;
        ctx.beginPath();
        ctx.strokeStyle = config.color;
        ctx.lineWidth = config.width;

        const steps = 120;
        for (let i = 0; i <= steps; i++) {
          const x = (i / steps) * w;
          const progress = i / steps;
          const y =
            config.yOffset * h +
            lineOffset +
            Math.sin(progress * Math.PI * config.frequency + phase) * config.amplitude +
            Math.sin(progress * Math.PI * config.frequency * 2.1 + phase * 1.7) * (config.amplitude * 0.25) +
            Math.cos(progress * Math.PI * config.frequency * 0.7 + phase * 0.5) * (config.amplitude * 0.15);

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      time += 0.016;

      waveConfigs.forEach((config) => {
        const phase = time * config.speed * 60;
        drawWave(w, h, config, phase, variant === "hero" ? 8 : 5);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Gradient mesh base */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Canvas-based flowing waves */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.9 }}
      />

      {/* Radial glow centers */}
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] bg-primary/8 top-1/4 left-1/4 animate-pulse-glow" />
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[100px] bg-accent/6 bottom-1/4 right-1/4 animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      {variant === "hero" && (
        <div className="absolute w-[300px] h-[300px] rounded-full blur-[80px] bg-[hsla(30,100%,60%,0.05)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}

      {/* SVG speed streaks */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {streaks.map((streak, i) => {
          const rad = (streak.angle * Math.PI) / 180;
          const x2 = streak.x1 + Math.cos(rad) * streak.length;
          const y2 = streak.y1 + Math.sin(rad) * streak.length;
          return (
            <motion.line
              key={`streak-${i}`}
              x1={`${streak.x1}%`}
              y1={`${streak.y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke={streak.color}
              strokeWidth={Math.random() * 1.5 + 0.5}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.8, 0.8, 0],
              }}
              transition={{
                duration: streak.duration,
                delay: streak.delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 1,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {/* Small geometric shapes (like the reference images) */}
        {variant === "hero" && (
          <>
            {[
              { x: 85, y: 15, size: 8 },
              { x: 10, y: 80, size: 6 },
              { x: 75, y: 75, size: 10 },
            ].map((shape, i) => (
              <motion.circle
                key={`circle-${i}`}
                cx={`${shape.x}%`}
                cy={`${shape.y}%`}
                r={shape.size}
                fill="none"
                stroke="hsla(185, 100%, 50%, 0.15)"
                strokeWidth="1"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 1.5 }}
              />
            ))}

            {/* Dashed geometric accent lines */}
            {[
              { x1: 5, y1: 20, x2: 15, y2: 15 },
              { x1: 88, y1: 30, x2: 95, y2: 25 },
              { x1: 8, y1: 60, x2: 14, y2: 55 },
            ].map((line, i) => (
              <motion.line
                key={`accent-${i}`}
                x1={`${line.x1}%`}
                y1={`${line.y1}%`}
                x2={`${line.x2}%`}
                y2={`${line.y2}%`}
                stroke="hsla(185, 100%, 50%, 0.2)"
                strokeWidth="2"
                strokeDasharray="4 6"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 2 }}
              />
            ))}
          </>
        )}
      </svg>

      {/* Floating particles / sparks */}
      {particles.map((p, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: i % 3 === 0
              ? "hsla(185, 100%, 50%, 0.6)"
              : i % 3 === 1
              ? "hsla(265, 90%, 60%, 0.5)"
              : "hsla(30, 100%, 60%, 0.4)",
          }}
          animate={{
            y: [0, -(20 + Math.random() * 30), 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0, 0.9, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Small triangle particles (like in reference image 3) */}
      {variant === "hero" &&
        Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`tri-${i}`}
            className="absolute"
            style={{
              left: `${30 + Math.random() * 40}%`,
              top: `${20 + Math.random() * 60}%`,
              width: 0,
              height: 0,
              borderLeft: `${3 + Math.random() * 3}px solid transparent`,
              borderRight: `${3 + Math.random() * 3}px solid transparent`,
              borderBottom: `${5 + Math.random() * 4}px solid hsla(${
                [185, 265, 0, 30][Math.floor(Math.random() * 4)]
              }, 80%, 55%, ${0.15 + Math.random() * 0.2})`,
            }}
            animate={{
              y: [0, -(10 + Math.random() * 40), 0],
              x: [0, (Math.random() - 0.5) * 30, 0],
              opacity: [0, 0.7, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              delay: Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      {/* Vignette overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, hsl(var(--background)) 100%)",
        }}
      />
    </div>
  );
};

export default SportsBackground;
