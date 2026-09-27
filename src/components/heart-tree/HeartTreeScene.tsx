"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday.config";
import BackgroundGrid from "@/components/background/BackgroundGrid";
import HeartTree from "@/components/svg/HeartTree";
import Heart from "@/components/svg/Heart";

interface HeartTreeSceneProps {
  onContinue: () => void;
}

const floatingHearts = [
  { x: "8%", y: "10%", size: 22, color: "#F06292", delay: 0.5, duration: 3.8 },
  { x: "80%", y: "12%", size: 18, color: "#F5A623", delay: 1.2, duration: 4.2 },
  { x: "4%", y: "55%", size: 16, color: "#FF8A65", delay: 0.8, duration: 3.5 },
  { x: "88%", y: "50%", size: 24, color: "#F06292", delay: 1.5, duration: 4.0 },
  { x: "20%", y: "80%", size: 20, color: "#F5A623", delay: 0.3, duration: 3.6 },
  { x: "72%", y: "78%", size: 16, color: "#FF8A65", delay: 1.0, duration: 4.5 },
  { x: "60%", y: "8%", size: 14, color: "#F06292", delay: 0.6, duration: 3.3 },
  { x: "30%", y: "6%", size: 26, color: "#F5A623", delay: 0.9, duration: 4.1 },
];

export default function HeartTreeScene({ onContinue }: HeartTreeSceneProps) {
  const [showHearts, setShowHearts] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const { heartTree } = birthdayConfig;

  useEffect(() => {
    const t1 = setTimeout(() => setShowHearts(true), 1200);
    const t2 = setTimeout(() => setShowTitle(true), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden">
      <BackgroundGrid variant="peach" />

      {/* Floating ambient hearts */}
      {floatingHearts.map((h, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: h.x, top: h.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.7, 0.5, 0.7],
            scale: [0.5, 1, 0.9, 1],
            y: [0, -18, 0, -18, 0],
            rotate: [-8, 8, -8],
          }}
          transition={{
            delay: h.delay,
            duration: h.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Heart width={h.size} height={h.size} fill={h.color} opacity={0.8} />
        </motion.div>
      ))}

      {/* Tree container */}
      <div className="relative z-10 flex flex-col items-center w-full flex-1 pt-4">
        {/* Eyebrow */}
        <motion.p
          className="text-sm md:text-base font-semibold tracking-widest mb-4"
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: "#B05070",
            fontStyle: "italic",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {heartTree.eyebrow}
        </motion.p>

        {/* Heart Tree SVG */}
        <motion.div
          className="w-full max-w-[380px] md:max-w-[440px] relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.0, ease: "easeOut" }}
        >
          <HeartTree
            showHearts={showHearts}
            className="w-full h-auto drop-shadow-xl"
          />
        </motion.div>
      </div>

      {/* Bottom text */}
      <div className="relative z-10 w-full px-6 pb-8">
        <AnimatePresence>
          {showTitle && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <motion.h2
                className="font-black mb-1"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  color: "#E91E8C",
                  fontSize: "clamp(24px, 7vw, 48px)",
                  textShadow: "0 2px 12px rgba(233,30,140,0.3)",
                }}
              >
                {heartTree.title}
              </motion.h2>
              <motion.p
                className="text-sm md:text-base mb-6"
                style={{ fontFamily: "'Nunito', sans-serif", color: "#9B5070" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {heartTree.subtitle}
              </motion.p>
              <motion.button
                onClick={onContinue}
                className="px-8 py-3 rounded-full font-bold text-white text-sm md:text-base cursor-pointer"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: "linear-gradient(135deg, #E91E8C, #C0155A)",
                  boxShadow: "0 4px 20px rgba(233,30,140,0.4)",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Continue to next scene"
              >
                {heartTree.continueText}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
