import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export type AvatarState =
  | "idle"
  | "blinking"
  | "happy"
  | "clap"
  | "jump"
  | "spin"
  | "thinking"
  | "bow";

interface AvatarProps {
  state?: AvatarState;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "w-20 h-20",
  md: "w-32 h-32",
  lg: "w-48 h-48",
};

export function Avatar({ state = "idle", size = "md" }: AvatarProps) {
  const [currentState, setCurrentState] = useState<AvatarState>(state);
  const [autoBlinking, setAutoBlinking] = useState(true);

  useEffect(() => {
    setCurrentState(state);
    if (state !== "idle") {
      setAutoBlinking(false);
    }
  }, [state]);

  // Auto-blink effect
  useEffect(() => {
    if (!autoBlinking || currentState !== "idle") return;

    const blinkInterval = setInterval(() => {
      setCurrentState("blinking");
      setTimeout(() => setCurrentState("idle"), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, [autoBlinking, currentState]);

  const sizeClass = sizeMap[size];

  const containerVariants = {
    idle: { y: 0 },
    jump: { y: [0, -40, 0], transition: { duration: 0.6 } },
    spin: { rotate: 360, transition: { duration: 0.8 } },
    bow: { rotateX: 45, transition: { duration: 0.8 } },
    blinking: { scaleY: [1, 0.95, 1], transition: { duration: 0.2 } },
    happy: { scale: [1, 1.05, 1], transition: { duration: 0.4 } },
    clap: { rotateZ: [-5, 5, -5, 0], transition: { duration: 0.6 } },
    thinking: { rotateZ: [0, 3, -3, 0], transition: { duration: 1, repeat: Infinity } },
  };

  const glowVariants = {
    idle: { opacity: 0.4, scale: 1 },
    happy: { opacity: [0.4, 1, 0.4], scale: [1, 1.1, 1], transition: { duration: 0.6 } },
    clap: { opacity: [0.4, 1, 0.4], scale: [1, 1.15, 1], transition: { duration: 0.8 } },
    thinking: {
      opacity: [0.4, 0.8, 0.4],
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity },
    },
    jump: { opacity: 0.4, scale: 1 },
    spin: { opacity: 0.4, scale: 1 },
    bow: { opacity: 0.4, scale: 1 },
    blinking: { opacity: 0.4, scale: 1 },
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative"
        variants={containerVariants}
        animate={currentState}
      >
        {/* Glow background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl"
          variants={glowVariants}
          animate={currentState}
        />

        {/* Avatar Image */}
        <motion.img
          src="/avatar.png"
          alt="Avatar"
          className={`${sizeClass} relative z-10 drop-shadow-2xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Sparkles for happy state */}
        {currentState === "happy" && (
          <>
            <motion.div
              className="absolute top-8 left-8 w-3 h-3 bg-yellow-300 rounded-full"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute top-12 right-8 w-3 h-3 bg-yellow-300 rounded-full"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <motion.div
              className="absolute bottom-8 right-12 w-2 h-2 bg-yellow-300 rounded-full"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
