"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { birthdayConfig } from "@/config/birthday.config";
import BackgroundGrid from "@/components/background/BackgroundGrid";
import Heart from "@/components/svg/Heart";

interface FinalSceneProps {
  onRestart: () => void;
}

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  shape: "rect" | "circle" | "heart";
  vx: number;
}

const confettiColors = ["#F48FB1", "#CE93D8", "#90CAF9", "#FFF176", "#80DEEA", "#FF8A65", "#FFCC02"];

function generateConfetti(): ConfettiPiece[] {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
    size: 5 + Math.random() * 8,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    rotate: Math.random() * 360,
    shape: (["rect", "circle", "heart"] as const)[Math.floor(Math.random() * 3)],
    vx: (Math.random() - 0.5) * 60,
  }));
}

const floatingHearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 90 + 5,
  y: Math.random() * 80 + 10,
  size: 16 + Math.random() * 28,
  color:
    i % 3 === 0 ? "#F06292" : i % 3 === 1 ? "#F5A623" : "#FF8A65",
  delay: Math.random() * 2,
  duration: 3 + Math.random() * 3,
}));

export default function FinalScene({ onRestart }: FinalSceneProps) {
  const [confetti] = useState<ConfettiPiece[]>(generateConfetti);
  const { final } = birthdayConfig;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <BackgroundGrid variant="dark" />

      {/* Confetti */}
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute pointer-events-none"
          style={{
            left: `${c.x}%`,
            top: "-2%",
            width: c.shape === "rect" ? c.size * 1.8 : c.size,
            height: c.shape === "rect" ? c.size * 0.5 : c.size,
            backgroundColor: c.shape !== "heart" ? c.color : "transparent",
            borderRadius: c.shape === "circle" ? "50%" : "2px",
          }}
          initial={{ y: 0, opacity: 1, rotate: c.rotate, x: 0 }}
          animate={{
            y: ["0vh", "105vh"],
            opacity: [1, 0.9, 0.5, 0],
            rotate: [c.rotate, c.rotate + 540],
            x: [0, c.vx],
          }}
          transition={{
            delay: c.delay,
            duration: c.duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          {c.shape === "heart" && (
            <Heart width={c.size} height={c.size} fill={c.color} />
          )}
        </motion.div>
      ))}

      {/* Floating ambient hearts */}
      {floatingHearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none"
          style={{ left: `${h.x}%`, top: `${h.y}%` }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.4, 0.6],
            y: [0, -20, 0],
            scale: [0.8, 1, 0.9, 1],
          }}
          transition={{
            delay: h.delay + 0.5,
            duration: h.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart width={h.size} height={h.size} fill={h.color} opacity={0.5} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Glow orb */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 280,
            height: 280,
            background:
              "radial-gradient(circle, rgba(233,30,140,0.3) 0%, rgba(200,21,90,0.1) 50%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Emoji */}
        <motion.div
          className="text-5xl mb-4"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
        >
          {final.emoji}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-black text-white mb-2"
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(40px, 12vw, 90px)",
            textShadow:
              "0 0 40px rgba(233,30,140,0.6), 0 4px 24px rgba(0,0,0,0.3)",
            letterSpacing: "-1px",
          }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, type: "spring", stiffness: 80 }}
        >
          {final.title}
        </motion.h1>

        {/* Name */}
        <motion.h2
          className="font-black mb-6"
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(28px, 9vw, 68px)",
            color: "#F06292",
            textShadow: "0 0 30px rgba(240,98,146,0.7)",
          }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.7, type: "spring" }}
        >
          {final.name} 🌸
        </motion.h2>

        {/* Message */}
        <motion.p
          className="text-white/70 text-sm md:text-lg max-w-sm mb-3 leading-relaxed"
          style={{ fontFamily: "'Nunito', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          {final.message}
        </motion.p>

        {/* Signature */}
        <motion.p
          className="text-white/50 text-sm italic mb-10"
          style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.1rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          {final.signature}
        </motion.p>

        {/* Pulsing hearts row */}
        <motion.div
          className="flex gap-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          {[28, 20, 28].map((s, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              <Heart
                width={s}
                height={s}
                fill={i === 1 ? "#F5A623" : "#F06292"}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Restart */}
        <motion.button
          onClick={onRestart}
          className="px-6 py-2.5 rounded-full text-white/50 text-xs border border-white/20 cursor-pointer hover:text-white/80 transition-colors"
          style={{ fontFamily: "'Nunito', sans-serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          aria-label="Replay the birthday experience"
        >
          ↩ Replay from the beginning
        </motion.button>
      </div>
    </div>
  );
}
