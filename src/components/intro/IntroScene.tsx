"use client";
import { motion, AnimatePresence } from "framer-motion";
import { birthdayConfig } from "@/config/birthday.config";
import BackgroundGrid from "@/components/background/BackgroundGrid";
import Heart from "@/components/svg/Heart";

interface IntroSceneProps {
  onContinue: () => void;
}

const floatingHeartData = [
  { x: "10%", y: "15%", size: 28, color: "#FF8FB1", delay: 0.2, duration: 3.5 },
  { x: "85%", y: "20%", size: 20, color: "#FFD6E0", delay: 0.8, duration: 4.0 },
  { x: "5%", y: "70%", size: 36, color: "#FF4D8C", delay: 0.5, duration: 3.2 },
  { x: "88%", y: "75%", size: 24, color: "#FFB3C9", delay: 1.2, duration: 3.8 },
  { x: "20%", y: "88%", size: 18, color: "#FFD6E0", delay: 0.3, duration: 4.2 },
  { x: "75%", y: "85%", size: 30, color: "#FF6BA5", delay: 1.0, duration: 3.6 },
  { x: "15%", y: "45%", size: 16, color: "#FFE0EB", delay: 1.5, duration: 4.5 },
  { x: "82%", y: "48%", size: 22, color: "#FF8FB1", delay: 0.7, duration: 3.3 },
];

export default function IntroScene({ onContinue }: IntroSceneProps) {
  const { intro } = birthdayConfig;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <BackgroundGrid variant="pink" />

      {/* Floating Hearts */}
      {floatingHeartData.map((h, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: h.x, top: h.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0.6, 0.8],
            scale: [0, 1, 0.95, 1],
            y: [0, -15, 0, -15, 0],
            rotate: [-5, 5, -5],
          }}
          transition={{
            delay: h.delay + 0.5,
            duration: h.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Heart width={h.size} height={h.size} fill={h.color} />
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 select-none">
        {/* Eyebrow text */}
        <motion.p
          className="text-white/70 text-lg md:text-xl mb-4 tracking-widest"
          style={{ fontFamily: "'Dancing Script', cursive", fontStyle: "italic" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
        >
          {intro.eyebrow}
        </motion.p>

        {/* Main title */}
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.9, type: "spring", stiffness: 80 }}
        >
          <h1
            className="font-black leading-none text-white"
            style={{
              fontSize: "clamp(64px, 18vw, 130px)",
              fontFamily: "'Nunito', sans-serif",
              textShadow: "0 4px 24px rgba(0,0,0,0.25), 0 2px 0 rgba(255,255,255,0.1)",
              letterSpacing: "-2px",
            }}
          >
            {intro.title}
          </h1>
          <h1
            className="font-black leading-none text-white"
            style={{
              fontSize: "clamp(60px, 17vw, 120px)",
              fontFamily: "'Nunito', sans-serif",
              textShadow: "0 4px 24px rgba(0,0,0,0.25), 0 2px 0 rgba(255,255,255,0.1)",
              letterSpacing: "-2px",
              marginTop: "-8px",
            }}
          >
            {intro.titleLine2}
          </h1>
        </motion.div>

        {/* Gold divider arc */}
        <motion.div
          className="my-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.6, ease: "easeOut" }}
        >
          <svg width="200" height="24" viewBox="0 0 200 24" fill="none">
            <path
              d="M20 18 Q100 4 180 18"
              stroke="#F5C842"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-white/65 text-lg md:text-xl tracking-widest mb-12"
          style={{ fontFamily: "'Dancing Script', cursive", fontStyle: "italic" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
        >
          {intro.subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={onContinue}
          className="group relative px-8 py-4 rounded-full text-white font-bold text-base md:text-lg overflow-hidden cursor-pointer"
          style={{
            fontFamily: "'Nunito', sans-serif",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            border: "1.5px solid rgba(255,255,255,0.35)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            background: "rgba(255,255,255,0.25)",
          }}
          whileTap={{ scale: 0.97 }}
          aria-label="Open your birthday gift"
        >
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            {intro.continueText}
          </motion.span>
        </motion.button>
      </div>

      {/* Bottom vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(192,21,90,0.4), transparent)",
        }}
      />
    </div>
  );
}
