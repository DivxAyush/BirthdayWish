"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday.config";
import BackgroundGrid from "@/components/background/BackgroundGrid";
import Cake from "@/components/svg/Cake";

interface CakeSceneProps {
  onContinue: () => void;
}

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
  rotate: number;
  shape: "rect" | "circle";
  size: number;
  delay: number;
  duration: number;
  vx: number;
}

const colors = ["#F48FB1", "#CE93D8", "#90CAF9", "#FFF176", "#80DEEA", "#FFCC02"];

function generateConfetti(count: number): Confetti[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: -10,
    color: colors[Math.floor(Math.random() * colors.length)],
    rotate: Math.random() * 360,
    shape: Math.random() > 0.5 ? "rect" : "circle",
    size: 4 + Math.random() * 6,
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 2,
    vx: (Math.random() - 0.5) * 40,
  }));
}

// Floating particles for dark bg
const darkParticles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 2 + Math.random() * 4,
  color: i % 3 === 0 ? "#F48FB1" : i % 3 === 1 ? "#CE93D8" : "#fff",
  delay: Math.random() * 3,
  duration: 3 + Math.random() * 3,
}));

export default function CakeScene({ onContinue }: CakeSceneProps) {
  const [candleBlown, setCandleBlown] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [cakeBuildPhase, setCakeBuildPhase] = useState(0); // 0: no frosting, 1: frosting drips, 2: full
  const { cake } = birthdayConfig;

  // Build the cake progressively
  useEffect(() => {
    const t1 = setTimeout(() => setCakeBuildPhase(1), 1000);
    const t2 = setTimeout(() => setCakeBuildPhase(2), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const blowCandle = () => {
    if (candleBlown) return;
    setCandleBlown(true);
    setConfetti(generateConfetti(40));
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden">
      <BackgroundGrid variant="dark" />

      {/* Floating ambient particles */}
      {darkParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: 0.5,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Confetti burst */}
      <AnimatePresence>
        {confetti.map((c) => (
          <motion.div
            key={c.id}
            className="absolute pointer-events-none"
            style={{
              left: `${c.x}%`,
              top: 0,
              width: c.shape === "rect" ? c.size * 2 : c.size,
              height: c.size,
              backgroundColor: c.color,
              borderRadius: c.shape === "circle" ? "50%" : "2px",
            }}
            initial={{ y: -20, opacity: 1, rotate: c.rotate, x: 0 }}
            animate={{
              y: ["0vh", "110vh"],
              opacity: [1, 0.8, 0],
              rotate: [c.rotate, c.rotate + 360],
              x: [0, c.vx],
            }}
            exit={{ opacity: 0 }}
            transition={{
              delay: c.delay,
              duration: c.duration,
              ease: "easeIn",
            }}
          />
        ))}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full flex-1 justify-between px-6 pt-12 pb-8">
        {/* Title */}
        <motion.h2
          className="text-center font-bold text-white"
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(22px, 6vw, 38px)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          {cake.eyebrow}
        </motion.h2>

        {/* Cake illustration */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring", stiffness: 60 }}
        >
          {/* Candle instruction */}
          <AnimatePresence>
            {!candleBlown && cakeBuildPhase === 2 && (
              <motion.p
                className="text-white/60 text-sm mb-4 text-center"
                style={{ fontFamily: "'Nunito', sans-serif" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                {cake.blowText}
              </motion.p>
            )}
          </AnimatePresence>

          {/* The cake - clickable on candle */}
          <motion.div
            className="cursor-pointer select-none"
            onClick={blowCandle}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title={cake.candleText}
          >
            <Cake
              width={280}
              height={220}
              candleBlown={candleBlown}
            />
          </motion.div>

          {/* Flame glow */}
          {!candleBlown && (
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,184,48,0.4) 0%, transparent 70%)",
                top: "calc(50% - 80px)",
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-white/55 text-sm md:text-base text-center mb-4"
          style={{ fontFamily: "'Nunito', sans-serif", fontStyle: "italic" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          {candleBlown ? cake.postBlowText : cake.subtitle}
        </motion.p>

        {/* Continue button */}
        <motion.button
          onClick={onContinue}
          className="px-8 py-3 rounded-xl font-bold text-white text-sm md:text-base cursor-pointer"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{
            background: "rgba(255,255,255,0.2)",
            scale: 1.03,
          }}
          whileTap={{ scale: 0.97 }}
          aria-label="Continue to balloon section"
        >
          {cake.continueText}
        </motion.button>
      </div>
    </div>
  );
}
