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
  md: "w-40 h-40",
  lg: "w-56 h-56",
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
      setTimeout(() => setCurrentState("idle"), 150);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, [autoBlinking, currentState]);

  const sizeClass = sizeMap[size];

  const containerVariants = {
    idle: { y: 0 },
    jump: { y: [0, -50, 0], transition: { duration: 0.6 } },
    spin: { rotate: 360, transition: { duration: 0.8 } },
    bow: { rotateX: 35, transition: { duration: 0.8 } },
    blinking: { scaleY: [1, 0.98, 1], transition: { duration: 0.15 } },
    happy: { scale: [1, 1.03, 1], transition: { duration: 0.4 } },
    clap: { rotateZ: [-3, 3, -3, 0], transition: { duration: 0.6 } },
    thinking: { rotateZ: [0, 2, -2, 0], transition: { duration: 1, repeat: Infinity } },
  };

  const leftArmVariants = {
    idle: { rotate: -15, x: 0, y: 0 },
    clap: { rotate: [-15, 45, -15, 0], x: [0, 8, 0], transition: { duration: 0.6 } },
    bow: { rotate: [0, 80, 80, 0], transition: { duration: 1 } },
    jump: { rotate: [-15, 10, -15, 0], transition: { duration: 0.6 } },
    happy: { rotate: [-15, -5, -15], transition: { duration: 0.4 } },
  };

  const rightArmVariants = {
    idle: { rotate: 15, x: 0, y: 0 },
    clap: { rotate: [15, -45, 15, 0], x: [0, -8, 0], transition: { duration: 0.6 } },
    bow: { rotate: [0, 80, 80, 0], transition: { duration: 1 } },
    jump: { rotate: [15, -10, 15, 0], transition: { duration: 0.6 } },
    happy: { rotate: [15, 5, 15], transition: { duration: 0.4 } },
  };

  const leftEyeVariants = {
    idle: { scaleY: 1, scaleX: 1 },
    blinking: { scaleY: [1, 0.1, 1], transition: { duration: 0.15 } },
    happy: { scaleY: [1, 0.4, 1], scaleX: [1, 0.85, 1], transition: { duration: 0.4 } },
    thinking: { scaleY: [1, 0.4, 1], transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 } },
  };

  const rightEyeVariants = {
    idle: { scaleY: 1, scaleX: 1 },
    blinking: { scaleY: [1, 0.1, 1], transition: { duration: 0.15 } },
    happy: { scaleY: [1, 0.4, 1], scaleX: [1, 0.85, 1], transition: { duration: 0.4 } },
    thinking: { scaleY: [1, 0.4, 1], transition: { duration: 0.3, repeat: Infinity, repeatDelay: 2 } },
  };

  const mouthVariants = {
    idle: { scaleY: 1, opacity: 0.6 },
    happy: { scaleY: [1, 1.4, 1], opacity: 1, transition: { duration: 0.4 } },
    thinking: { scaleY: [0.9, 1.1, 0.9], opacity: 0.6, transition: { duration: 0.5, repeat: Infinity, repeatDelay: 2 } },
  };

  const glowVariants = {
    idle: { opacity: 0.3, scale: 1 },
    happy: { opacity: [0.3, 0.8, 0.3], scale: [1, 1.15, 1], transition: { duration: 0.6 } },
    clap: { opacity: [0.3, 0.9, 0.3], scale: [1, 1.2, 1], transition: { duration: 0.8 } },
    thinking: {
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.08, 1],
      transition: { duration: 1.5, repeat: Infinity },
    },
    jump: { opacity: 0.3, scale: 1 },
    spin: { opacity: 0.3, scale: 1 },
    bow: { opacity: 0.3, scale: 1 },
    blinking: { opacity: 0.3, scale: 1 },
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
          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/25 via-blue-400/15 to-cyan-400/25 blur-3xl"
          variants={glowVariants}
          animate={currentState}
        />

        {/* Avatar SVG */}
        <motion.svg
          viewBox="0 0 240 280"
          className={`${sizeClass} relative z-10 drop-shadow-2xl`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f5f7fa", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#e8ecf1", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="armGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#f0f3f8", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#dce3eb", stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="headGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#d4dce5", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#c5cdd8", stopOpacity: 1 }} />
            </linearGradient>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Body - Main sphere */}
          <ellipse cx="120" cy="160" rx="65" ry="75" fill="url(#bodyGradient)" filter="url(#shadow)" />

          {/* Body - Bottom accent */}
          <ellipse cx="120" cy="200" rx="50" ry="30" fill="#e0e6ed" opacity="0.6" />

          {/* Left Arm */}
          <motion.g
            variants={leftArmVariants}
            animate={currentState}
            style={{ originX: "70px", originY: "140px" }}
          >
            <ellipse cx="50" cy="140" rx="28" ry="55" fill="url(#armGradient)" filter="url(#shadow)" />
            {/* Arm highlight */}
            <ellipse cx="45" cy="115" rx="12" ry="25" fill="#ffffff" opacity="0.4" />
          </motion.g>

          {/* Right Arm */}
          <motion.g
            variants={rightArmVariants}
            animate={currentState}
            style={{ originX: "170px", originY: "140px" }}
          >
            <ellipse cx="190" cy="140" rx="28" ry="55" fill="url(#armGradient)" filter="url(#shadow)" />
            {/* Arm highlight */}
            <ellipse cx="195" cy="115" rx="12" ry="25" fill="#ffffff" opacity="0.4" />
          </motion.g>

          {/* Head */}
          <ellipse cx="120" cy="80" rx="55" ry="65" fill="url(#headGradient)" filter="url(#shadow)" />

          {/* Head highlight */}
          <ellipse cx="95" cy="45" rx="20" ry="25" fill="#ffffff" opacity="0.3" />

          {/* Head Screen/Visor - Background */}
          <rect x="70" y="35" width="100" height="65" rx="12" fill="#0f1f2e" filter="url(#shadow)" />

          {/* Visor shine */}
          <rect x="72" y="37" width="96" height="12" rx="10" fill="#1a3a4a" opacity="0.6" />

          {/* Left Eye */}
          <motion.ellipse
            cx="90"
            cy="65"
            rx="12"
            ry="16"
            fill="#00d4ff"
            variants={leftEyeVariants}
            animate={currentState}
            style={{ originX: "90px", originY: "65px" }}
            filter="url(#shadow)"
          />

          {/* Left Eye shine */}
          <motion.ellipse
            cx="88"
            cy="62"
            rx="4"
            ry="5"
            fill="#ffffff"
            opacity="0.6"
            variants={leftEyeVariants}
            animate={currentState}
          />

          {/* Right Eye */}
          <motion.ellipse
            cx="150"
            cy="65"
            rx="12"
            ry="16"
            fill="#00d4ff"
            variants={rightEyeVariants}
            animate={currentState}
            style={{ originX: "150px", originY: "65px" }}
            filter="url(#shadow)"
          />

          {/* Right Eye shine */}
          <motion.ellipse
            cx="152"
            cy="62"
            rx="4"
            ry="5"
            fill="#ffffff"
            opacity="0.6"
            variants={rightEyeVariants}
            animate={currentState}
          />

          {/* Mouth */}
          <motion.ellipse
            cx="120"
            cy="85"
            rx="14"
            ry="11"
            fill="#00d4ff"
            variants={mouthVariants}
            animate={currentState}
            style={{ originX: "120px", originY: "85px" }}
            filter="url(#shadow)"
          />

          {/* Mouth shine */}
          <motion.ellipse
            cx="120"
            cy="82"
            rx="6"
            ry="3"
            fill="#ffffff"
            opacity="0.5"
            variants={mouthVariants}
            animate={currentState}
          />

          {/* Left Ear */}
          <ellipse cx="65" cy="55" rx="22" ry="32" fill="url(#headGradient)" filter="url(#shadow)" />
          {/* Left Ear highlight */}
          <ellipse cx="60" cy="40" rx="8" ry="15" fill="#ffffff" opacity="0.25" />

          {/* Right Ear */}
          <ellipse cx="175" cy="55" rx="22" ry="32" fill="url(#headGradient)" filter="url(#shadow)" />
          {/* Right Ear highlight */}
          <ellipse cx="180" cy="40" rx="8" ry="15" fill="#ffffff" opacity="0.25" />

          {/* Body highlight */}
          <ellipse cx="85" cy="120" rx="25" ry="40" fill="#ffffff" opacity="0.15" />
        </motion.svg>

        {/* Sparkles for happy state */}
        {currentState === "happy" && (
          <>
            <motion.div
              className="absolute top-6 left-6 w-3 h-3 bg-yellow-300 rounded-full shadow-lg"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6 }}
            />
            <motion.div
              className="absolute top-16 right-4 w-3 h-3 bg-yellow-300 rounded-full shadow-lg"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <motion.div
              className="absolute bottom-12 right-8 w-2 h-2 bg-yellow-300 rounded-full shadow-lg"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
