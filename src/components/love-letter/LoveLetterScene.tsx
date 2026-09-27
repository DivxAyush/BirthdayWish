"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday.config";
import Envelope from "@/components/svg/Envelope";
import Heart from "@/components/svg/Heart";

interface LoveLetterSceneProps {
  onContinue: () => void;
}

const floatingParticles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 4 + Math.random() * 8,
  color: i % 2 === 0 ? "#F9A8D4" : i % 3 === 0 ? "#F472B6" : "#FBCFE8",
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
}));

export default function LoveLetterScene({ onContinue }: LoveLetterSceneProps) {
  const [phase, setPhase] = useState<"envelope" | "opening" | "letter">("envelope");
  const { letter } = birthdayConfig;

  const openEnvelope = () => {
    if (phase !== "envelope") return;
    setPhase("opening");
    setTimeout(() => setPhase("letter"), 1200);
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-start overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, #fff 0%, #FDF4FF 40%, #FAE4FF 100%)",
      }}
    >
      {/* Floating particles */}
      {floatingParticles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            opacity: 0.4,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            delay: p.delay,
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Envelope phase */}
      <AnimatePresence mode="wait">
        {phase === "envelope" && (
          <motion.div
            key="envelope"
            className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2
              className="font-black text-2xl md:text-4xl mb-2 text-center"
              style={{
                fontFamily: "'Nunito', sans-serif",
                color: "#9D174D",
                textShadow: "0 2px 12px rgba(157,23,77,0.2)",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {letter.title}
            </motion.h2>
            <motion.p
              className="text-pink-400 text-sm mb-8"
              style={{ fontFamily: "'Dancing Script', cursive" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Tap the envelope to open ✉️
            </motion.p>
            <motion.div
              className="cursor-pointer select-none"
              initial={{ opacity: 0, scale: 0.7, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
              onClick={openEnvelope}
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open love letter envelope"
            >
              <Envelope width={280} height={200} isOpen={false} />
            </motion.div>
          </motion.div>
        )}

        {phase === "opening" && (
          <motion.div
            key="opening"
            className="relative z-10 flex flex-col items-center justify-center flex-1 w-full"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -5, 5, -3, 0] }}
              transition={{ duration: 0.6 }}
            >
              <Envelope width={280} height={200} isOpen={true} />
            </motion.div>
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Heart width={40} height={40} fill="#E91E8C" />
            </motion.div>
          </motion.div>
        )}

        {phase === "letter" && (
          <motion.div
            key="letter"
            className="relative z-10 w-full flex-1 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Letter paper */}
            <div
              className="flex-1 overflow-y-auto mx-4 my-6 rounded-3xl p-6 md:p-8 shadow-xl"
              style={{
                background: "#FFFBFF",
                boxShadow: "0 8px 40px rgba(236,72,153,0.15), 0 2px 8px rgba(0,0,0,0.06)",
                border: "1px solid rgba(249,168,212,0.4)",
              }}
            >
              {/* Letter header hearts */}
              <div className="flex justify-center gap-2 mb-4">
                {[24, 16, 24].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1, type: "spring" }}
                  >
                    <Heart width={s} height={s} fill="#F9A8D4" />
                  </motion.div>
                ))}
              </div>

              {/* Salutation */}
              <motion.p
                className="text-lg md:text-xl font-bold mb-5"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: "#9D174D",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {letter.salutation}
              </motion.p>

              {/* Paragraphs */}
              <div className="space-y-4">
                {letter.paragraphs.map((para, i) => (
                  <motion.p
                    key={i}
                    className="text-sm md:text-base leading-relaxed"
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      color: "#5B2067",
                      lineHeight: 1.8,
                    }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Closing */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + letter.paragraphs.length * 0.12 + 0.2 }}
              >
                <p
                  className="text-sm italic mb-1"
                  style={{ fontFamily: "'Dancing Script', cursive", color: "#9D174D" }}
                >
                  {letter.closing}
                </p>
                <p
                  className="text-xl font-bold"
                  style={{ fontFamily: "'Dancing Script', cursive", color: "#E91E8C" }}
                >
                  {letter.signature}
                </p>
                <Heart width={24} height={24} fill="#E91E8C" className="mt-2" />
              </motion.div>
            </div>

            {/* Continue button */}
            <motion.div
              className="flex justify-center pb-6 px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                onClick={onContinue}
                className="px-8 py-3 rounded-full font-bold text-white text-sm md:text-base cursor-pointer"
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  background: "linear-gradient(135deg, #E91E8C, #C0155A)",
                  boxShadow: "0 4px 20px rgba(233,30,140,0.4)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Continue to final scene"
              >
                One final surprise 🎉
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
