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

  const leftArmVariants = {
    idle: { rotate: 0, x: 0 },
    clap: { rotate: [-20, 40, -20, 0], x: [0, 10, 0], transition: { duration: 0.6 } },
    bow: { rotate: [0, 90, 90, 0], transition: { duration: 1 } },
    jump: { rotate: [-10, 20, -10, 0], transition: { duration: 0.6 } },
  };

  const rightArmVariants = {
    idle: { rotate: 0, x: 0 },
    clap: { rotate: [20, -40, 20, 0], x: [0, -10, 0], transition: { duration: 0.6 } },
    bow: { rotate: [0, 90, 90, 0], transition: { duration: 1 } },
    jump: { rotate: [10, -20, 10, 0], transition: { duration: 0.6 } },
  };

  const leftEyeVariants = {
    idle: { scaleY: 1 },
    blinking: { scaleY: [1, 0, 1], transition: { duration: 0.2 } },
    happy: { scaleY: [1, 0.5, 1], scaleX: [1, 0.8, 1], transition: { duration: 0.4 } },
    thinking: { scaleY: [1, 0.5, 1], transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 } },
  };

  const rightEyeVariants = {
    idle: { scaleY: 1 },
    blinking: { scaleY: [1, 0, 1], transition: { duration: 0.2 } },
    happy: { scaleY: [1, 0.5, 1], scaleX: [1, 0.8, 1], transition: { duration: 0.4 } },
    thinking: { scaleY: [1, 0.5, 1], transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 } },
  };

  const mouthVariants = {
    idle: { scaleY: 1, opacity: 0.7 },
    happy: { scaleY: [1, 1.3, 1], opacity: 1, transition: { duration: 0.4 } },
    thinking: { scaleY: [0.8, 1, 0.8], opacity: 0.7, transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 } },
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

        {/* Avatar SVG */}
        <motion.svg
          viewBox="0 0 200 240"
          className={`${sizeClass} relative z-10 drop-shadow-2xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Body */}
          <ellipse cx="100" cy="140" rx="50" ry="60" fill="#e8eef5" />

          {/* Left Arm */}
          <motion.g
            variants={leftArmVariants}
            animate={currentState}
            style={{ originX: "70px", originY: "120px" }}
          >
            <ellipse cx="50" cy="120" rx="20" ry="45" fill="#d4dce8" />
          </motion.g>

          {/* Right Arm */}
          <motion.g
            variants={rightArmVariants}
            animate={currentState}
            style={{ originX: "130px", originY: "120px" }}
          >
            <ellipse cx="150" cy="120" rx="20" ry="45" fill="#d4dce8" />
          </motion.g>

          {/* Head */}
          <ellipse cx="100" cy="70" rx="45" ry="50" fill="#c5cdd8" />

          {/* Head Screen/Visor */}
          <rect x="65" y="35" width="70" height="50" rx="10" fill="#1a2a3a" />

          {/* Left Eye */}
          <motion.ellipse
            cx="80"
            cy="55"
            rx="8"
            ry="12"
            fill="#00d4ff"
            variants={leftEyeVariants}
            animate={currentState}
            style={{ originX: "80px", originY: "55px" }}
          />

          {/* Right Eye */}
          <motion.ellipse
            cx="120"
            cy="55"
            rx="8"
            ry="12"
            fill="#00d4ff"
            variants={rightEyeVariants}
            animate={currentState}
            style={{ originX: "120px", originY: "55px" }}
          />

          {/* Mouth */}
          <motion.ellipse
            cx="100"
            cy="72"
            rx="10"
            ry="8"
            fill="#00d4ff"
            variants={mouthVariants}
            animate={currentState}
            style={{ originX: "100px", originY: "72px" }}
          />

          {/* Left Ear */}
          <ellipse cx="55" cy="50" rx="15" ry="25" fill="#c5cdd8" />

          {/* Right Ear */}
          <ellipse cx="145" cy="50" rx="15" ry="25" fill="#c5cdd8" />
        </motion.svg>

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
