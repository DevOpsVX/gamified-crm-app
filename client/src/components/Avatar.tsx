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
  sm: { container: "w-24 h-24", head: "w-12 h-12", body: "w-16 h-20" },
  md: { container: "w-32 h-32", head: "w-16 h-16", body: "w-24 h-32" },
  lg: { container: "w-48 h-48", head: "w-24 h-24", body: "w-36 h-48" },
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

  const sizes = sizeMap[size];

  const containerVariants = {
    idle: { y: 0 },
    jump: { y: [0, -40, 0], transition: { duration: 0.6 } },
    spin: { rotate: 360, transition: { duration: 0.8 } },
    bow: { rotateX: 45, transition: { duration: 0.8 } },
  };

  const headVariants = {
    idle: { rotateY: 0 },
    blinking: { scaleY: [1, 0.3, 1], transition: { duration: 0.2 } },
    happy: { rotateZ: [0, -5, 5, 0], transition: { duration: 0.4 } },
    clap: { rotateZ: [-10, 10, -10, 0], transition: { duration: 0.6 } },
    thinking: { rotateZ: [0, 5, -5, 0], transition: { duration: 1, repeat: Infinity } },
  };

  const eyesVariants = {
    idle: { scaleY: 1 },
    blinking: { scaleY: [1, 0, 1], transition: { duration: 0.2 } },
    happy: { scaleY: [1, 0.5, 1], transition: { duration: 0.4 } },
  };

  const mouthVariants = {
    idle: { scaleY: 1, opacity: 0.7 },
    happy: { scaleY: [1, 1.3, 1], opacity: 1, transition: { duration: 0.4 } },
    thinking: { scaleY: [0.8, 1, 0.8], transition: { duration: 1, repeat: Infinity } },
  };

  const visorVariants = {
    idle: { opacity: 0.8 },
    thinking: {
      opacity: [0.8, 1, 0.8],
      boxShadow: [
        "0 0 20px rgba(100, 200, 255, 0.3)",
        "0 0 40px rgba(100, 200, 255, 0.6)",
        "0 0 20px rgba(100, 200, 255, 0.3)",
      ],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  const armVariants = {
    idle: { rotate: 0 },
    clap: {
      rotate: [0, -40, 0, -40, 0],
      transition: { duration: 0.8 },
    },
    bow: {
      rotate: [0, 90, 90, 0],
      transition: { duration: 1 },
    },
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
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes.container} relative`}
        variants={containerVariants}
        animate={currentState === "bow" ? "bow" : currentState === "jump" ? "jump" : currentState === "spin" ? "spin" : "idle"}
      >
        {/* Glow background */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-2xl"
          variants={glowVariants}
          animate={currentState}
        />

        {/* Body */}
        <motion.div
          className={`${sizes.body} mx-auto rounded-3xl bg-gradient-to-b from-white to-gray-100 shadow-2xl flex flex-col items-center justify-start pt-4 relative z-10`}
        >
          {/* Head */}
          <motion.div
            className={`${sizes.head} rounded-full bg-gradient-to-b from-gray-800 to-black relative mb-2`}
            variants={headVariants}
            animate={currentState}
          >
            {/* Visor */}
            <motion.div
              className="absolute inset-2 rounded-full bg-gradient-to-b from-gray-600 to-black border-2 border-gray-700"
              variants={visorVariants}
              animate={currentState}
            >
              {/* Eyes */}
              <div className="absolute inset-0 flex items-center justify-center gap-2">
                <motion.div
                  className="w-2 h-3 rounded-full bg-cyan-400"
                  variants={eyesVariants}
                  animate={currentState}
                />
                <motion.div
                  className="w-2 h-3 rounded-full bg-cyan-400"
                  variants={eyesVariants}
                  animate={currentState}
                />
              </div>

              {/* Mouth */}
              <motion.div
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-2 rounded-full bg-cyan-400"
                variants={mouthVariants}
                animate={currentState}
              />
            </motion.div>
          </motion.div>

          {/* Arms */}
          <div className="flex gap-4 mb-2 w-full justify-center">
            <motion.div
              className="w-3 h-12 rounded-full bg-white"
              variants={armVariants}
              animate={currentState}
              style={{ originY: 0 }}
            />
            <motion.div
              className="w-3 h-12 rounded-full bg-white"
              variants={armVariants}
              animate={currentState}
              style={{ originY: 0 }}
            />
          </div>

          {/* Sparkles for happy state */}
          {currentState === "happy" && (
            <>
              <motion.div
                className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full"
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.6 }}
              />
              <motion.div
                className="absolute top-4 right-2 w-2 h-2 bg-yellow-300 rounded-full"
                animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
