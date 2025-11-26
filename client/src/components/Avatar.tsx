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
  | "bow"
  | "shine";

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
  const [showShine, setShowShine] = useState(false);

  useEffect(() => {
    setCurrentState(state);
    if (state === "shine") {
      setShowShine(true);
      const timer = setTimeout(() => {
        setShowShine(false);
        setCurrentState("idle");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const sizeClass = sizeMap[size];

  const containerVariants = {
    idle: { y: 0, scale: 1 },
    jump: { y: [0, -50, 0], transition: { duration: 0.6 } },
    spin: { rotate: 360, transition: { duration: 0.8 } },
    bow: { rotateX: 35, transition: { duration: 0.8 } },
    happy: { scale: [1, 1.05, 1], transition: { duration: 0.4 } },
    clap: { rotateZ: [-5, 5, -5, 0], transition: { duration: 0.6 } },
    thinking: { rotateZ: [0, 3, -3, 0], transition: { duration: 1, repeat: Infinity } },
    shine: { scale: [1, 1.1, 1], transition: { duration: 0.6 } },
    blinking: { scaleY: [1, 0.95, 1], transition: { duration: 0.2 } },
  };

  const glowVariants = {
    idle: { opacity: 0.3, scale: 1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
    happy: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.15, 1],
      boxShadow: ["0 0 20px rgba(0, 212, 255, 0.3)", "0 0 40px rgba(0, 212, 255, 0.6)", "0 0 20px rgba(0, 212, 255, 0.3)"],
      transition: { duration: 0.6 },
    },
    clap: {
      opacity: [0.3, 0.9, 0.3],
      scale: [1, 1.2, 1],
      boxShadow: ["0 0 20px rgba(0, 212, 255, 0.3)", "0 0 50px rgba(0, 212, 255, 0.8)", "0 0 20px rgba(0, 212, 255, 0.3)"],
      transition: { duration: 0.8 },
    },
    thinking: {
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.08, 1],
      boxShadow: ["0 0 20px rgba(0, 212, 255, 0.3)", "0 0 35px rgba(0, 212, 255, 0.5)", "0 0 20px rgba(0, 212, 255, 0.3)"],
      transition: { duration: 1.5, repeat: Infinity },
    },
    shine: {
      opacity: [0.3, 1, 0.3],
      scale: [1, 1.2, 1],
      boxShadow: [
        "0 0 20px rgba(0, 212, 255, 0.3)",
        "0 0 60px rgba(255, 215, 0, 0.8), 0 0 40px rgba(0, 212, 255, 0.8)",
        "0 0 20px rgba(0, 212, 255, 0.3)",
      ],
      transition: { duration: 0.8 },
    },
    jump: { opacity: 0.3, scale: 1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
    spin: { opacity: 0.3, scale: 1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
    bow: { opacity: 0.3, scale: 1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
    blinking: { opacity: 0.3, scale: 1, boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)" },
  };

  const shineRayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.3, 0.8],
      transition: { duration: 0.8 },
    },
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
          className="absolute inset-0 rounded-full blur-3xl"
          variants={glowVariants}
          animate={currentState}
        />

        {/* Shine rays for special effect */}
        {showShine && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-yellow-300"
              variants={shineRayVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-400"
              variants={shineRayVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1, duration: 0.8 }}
            />
            <motion.div
              className="absolute -inset-4 rounded-full border border-yellow-300/50"
              variants={shineRayVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </>
        )}

        {/* Avatar Image Container */}
        <motion.div
          className={`${sizeClass} relative z-10 rounded-full overflow-hidden shadow-2xl border-4 border-cyan-400/30 bg-gradient-to-br from-cyan-400/10 to-blue-500/10`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Robot Avatar Image */}
          <img
            src="/robot-avatar.png"
            alt="Robot Avatar"
            className="w-full h-full object-cover"
          />

          {/* Overlay gradient for better integration */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-blue-500/5 pointer-events-none" />
        </motion.div>

        {/* Sparkles for happy state */}
        {(currentState === "happy" || currentState === "shine") && (
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

        {/* Shine particles for shine state */}
        {showShine && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 80,
                  y: Math.sin((i / 8) * Math.PI * 2) * 80,
                  opacity: 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: "-2px",
                  marginTop: "-2px",
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
}
