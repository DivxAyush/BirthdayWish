"use client";
import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scene } from "@/types";
import IntroScene from "@/components/intro/IntroScene";
import HeartTreeScene from "@/components/heart-tree/HeartTreeScene";
import CakeScene from "@/components/birthday/CakeScene";
import BalloonsScene from "@/components/balloons/BalloonsScene";
import LoveLetterScene from "@/components/love-letter/LoveLetterScene";
import FinalScene from "@/components/final/FinalScene";

const SCENE_ORDER: Scene[] = [
  "intro",
  "heart-tree",
  "cake",
  "balloons",
  "love-letter",
  "final",
];

// Progress dots mapping
const SCENE_LABELS: Record<Scene, string> = {
  intro: "Welcome",
  "heart-tree": "For You",
  cake: "Cake",
  balloons: "Surprises",
  "love-letter": "Letter",
  final: "Celebrate",
};

export default function BirthdayPage() {
  const [currentScene, setCurrentScene] = useState<Scene>("intro");
  const [direction, setDirection] = useState(1);

  const goToNext = useCallback(() => {
    const currentIndex = SCENE_ORDER.indexOf(currentScene);
    if (currentIndex < SCENE_ORDER.length - 1) {
      setDirection(1);
      setCurrentScene(SCENE_ORDER[currentIndex + 1]);
    }
  }, [currentScene]);

  const restart = useCallback(() => {
    setDirection(-1);
    setCurrentScene("intro");
  }, []);

  const goToScene = useCallback(
    (scene: Scene) => {
      const currentIndex = SCENE_ORDER.indexOf(currentScene);
      const targetIndex = SCENE_ORDER.indexOf(scene);
      setDirection(targetIndex > currentIndex ? 1 : -1);
      setCurrentScene(scene);
    },
    [currentScene]
  );

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-40%" : "40%",
      opacity: 0,
      scale: 0.96,
    }),
  };

  const currentIndex = SCENE_ORDER.indexOf(currentScene);

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-black">
      {/* Scene container */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentScene}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.6,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="absolute inset-0 w-full h-full"
        >
          {currentScene === "intro" && <IntroScene onContinue={goToNext} />}
          {currentScene === "heart-tree" && (
            <HeartTreeScene onContinue={goToNext} />
          )}
          {currentScene === "cake" && <CakeScene onContinue={goToNext} />}
          {currentScene === "balloons" && (
            <BalloonsScene onContinue={goToNext} />
          )}
          {currentScene === "love-letter" && (
            <LoveLetterScene onContinue={goToNext} />
          )}
          {currentScene === "final" && <FinalScene onRestart={restart} />}
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator - dots at bottom */}
      {currentScene !== "intro" && currentScene !== "final" && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {SCENE_ORDER.map((scene, i) => (
            <button
              key={scene}
              onClick={() => goToScene(scene)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: scene === currentScene ? 24 : 8,
                height: 8,
                background:
                  i <= currentIndex
                    ? "rgba(255,255,255,0.9)"
                    : "rgba(255,255,255,0.25)",
              }}
              aria-label={`Go to ${SCENE_LABELS[scene]} scene`}
              title={SCENE_LABELS[scene]}
            />
          ))}
        </motion.div>
      )}
    </main>
  );
}
