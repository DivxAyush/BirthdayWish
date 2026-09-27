"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday.config";
import BackgroundGrid from "@/components/background/BackgroundGrid";
import Balloon from "@/components/svg/Balloon";
import Heart from "@/components/svg/Heart";
import { BalloonData } from "@/types";

interface BalloonsSceneProps {
  onContinue: () => void;
}

const balloonColors = [
  "#FF6B9D",
  "#FF8E53",
  "#A78BFA",
  "#34D399",
  "#60A5FA",
  "#F472B6",
  "#FB923C",
  "#E879F9",
];

function buildBalloons(): BalloonData[] {
  return birthdayConfig.reasons.map((r, i) => ({
    ...r,
    id: `balloon-${i}`,
    color: balloonColors[i % balloonColors.length],
    x: 8 + (i % 3) * 30 + (i % 2 === 0 ? 0 : 5),
    floatOffset: i * 0.6,
    rotateRange: i % 2 === 0 ? 6 : -6,
    delay: i * 0.15,
    size: 70 + (i % 3) * 12,
    popped: false,
  }));
}

interface PopParticle {
  id: number;
  x: number;
  y: number;
  angle: number;
  color: string;
  dist: number;
}

export default function BalloonsScene({ onContinue }: BalloonsSceneProps) {
  const [balloons, setBalloons] = useState<BalloonData[]>(buildBalloons);
  const [poppedMessages, setPoppedMessages] = useState<
    { id: string; title: string; message: string; x: number; y: number }[]
  >([]);
  const [particles, setParticles] = useState<{ id: string; particles: PopParticle[] }[]>([]);
  const [activeMessage, setActiveMessage] = useState<{
    id: string;
    title: string;
    message: string;
  } | null>(null);
  const { balloons: balloonsConfig } = birthdayConfig;

  const allPopped = balloons.every((b) => b.popped);

  const popBalloon = useCallback(
    (balloonId: string, e: React.MouseEvent) => {
      const balloon = balloons.find((b) => b.id === balloonId);
      if (!balloon || balloon.popped) return;

      // Mark as popped
      setBalloons((prev) =>
        prev.map((b) => (b.id === balloonId ? { ...b, popped: true } : b))
      );

      // Generate pop particles
      const newParticles: PopParticle[] = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: e.clientX,
        y: e.clientY,
        angle: (i / 12) * 360,
        color: balloon.color,
        dist: 40 + Math.random() * 60,
      }));
      setParticles((prev) => [...prev, { id: balloonId, particles: newParticles }]);

      // Show message
      setActiveMessage({ id: balloonId, title: balloon.title, message: balloon.message });

      // Remove particles after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== balloonId));
      }, 1000);
    },
    [balloons]
  );

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-hidden">
      <BackgroundGrid variant="pink" />

      {/* Header */}
      <motion.div
        className="relative z-10 text-center pt-10 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h2
          className="font-black text-white text-2xl md:text-4xl mb-1"
          style={{
            fontFamily: "'Nunito', sans-serif",
            textShadow: "0 2px 16px rgba(0,0,0,0.2)",
          }}
        >
          {balloonsConfig.heading}
        </h2>
        <p
          className="text-white/65 text-sm md:text-base"
          style={{ fontFamily: "'Nunito', sans-serif", fontStyle: "italic" }}
        >
          {balloonsConfig.subheading}
        </p>
      </motion.div>

      {/* Balloon grid */}
      <div className="relative z-10 flex-1 w-full px-4 pt-6 pb-4">
        <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
          {balloons.map((balloon, i) => (
            <motion.div
              key={balloon.id}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 60, scale: 0.6 }}
              animate={
                balloon.popped
                  ? { opacity: 0, scale: 0.1, y: -20 }
                  : { opacity: 1, y: 0, scale: 1 }
              }
              transition={
                balloon.popped
                  ? { duration: 0.25, ease: "easeIn" }
                  : {
                      delay: balloon.delay + 0.3,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 80,
                    }
              }
            >
              {/* Floating animation wrapper */}
              <motion.div
                animate={
                  !balloon.popped
                    ? {
                        y: [0, -12, 0, -12, 0],
                        rotate: [0, balloon.rotateRange, 0, -balloon.rotateRange, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 3 + balloon.floatOffset,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: balloon.floatOffset,
                }}
                className="cursor-pointer select-none"
                onClick={(e) => popBalloon(balloon.id, e)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Pop balloon to reveal message ${i + 1}`}
              >
                <Balloon
                  color={balloon.color}
                  width={balloon.size}
                  height={Math.round(balloon.size * 1.5)}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pop particles */}
      <AnimatePresence>
        {particles.map(({ id, particles: pts }) =>
          pts.map((p) => {
            const rad = (p.angle * Math.PI) / 180;
            return (
              <motion.div
                key={`${id}-${p.id}`}
                className="fixed pointer-events-none z-50 rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: p.color,
                  left: p.x,
                  top: p.y,
                }}
                initial={{ scale: 1, x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos(rad) * p.dist,
                  y: Math.sin(rad) * p.dist,
                  scale: 0,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            );
          })
        )}
      </AnimatePresence>

      {/* Message modal */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setActiveMessage(null)}
            />
            {/* Card */}
            <motion.div
              className="relative z-10 max-w-sm w-full rounded-3xl p-7 text-center"
              style={{
                background: "rgba(255,255,255,0.97)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
              }}
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 15 }}
            >
              <Heart width={48} height={48} fill="#E91E8C" className="mx-auto mb-4" />
              <h3
                className="font-black text-lg mb-3"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#3D1A47" }}
              >
                {activeMessage.title}
              </h3>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#7A5080" }}
              >
                {activeMessage.message}
              </p>
              <motion.button
                className="mt-6 px-6 py-2.5 rounded-full font-bold text-white text-sm cursor-pointer"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: "linear-gradient(135deg, #E91E8C, #C0155A)",
                }}
                onClick={() => setActiveMessage(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close message"
              >
                ✨ Aww, thanks!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* All popped / Continue */}
      <div className="relative z-10 px-6 pb-8 text-center">
        <AnimatePresence>
          {allPopped ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p
                className="text-white/80 mb-4 text-sm"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {balloonsConfig.allPoppedText}
              </p>
              <motion.button
                onClick={onContinue}
                className="px-8 py-3 rounded-full font-bold text-white cursor-pointer"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: "rgba(255,255,255,0.2)",
                  border: "1.5px solid rgba(255,255,255,0.4)",
                  backdropFilter: "blur(12px)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Continue to love letter"
              >
                {balloonsConfig.continueText}
              </motion.button>
            </motion.div>
          ) : (
            <motion.p
              className="text-white/40 text-xs"
              style={{ fontFamily: "'Nunito', sans-serif" }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {balloons.filter((b) => !b.popped).length} left to discover
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
