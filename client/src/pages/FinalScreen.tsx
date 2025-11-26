import { motion } from "framer-motion";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface FinalScreenProps {
  onRestart: () => void;
}

export function FinalScreen({ onRestart }: FinalScreenProps) {
  const [avatarState, setAvatarState] = useState<"bow">("bow");

  useEffect(() => {
    // Avatar starts with bow animation
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-background via-blue-950/30 to-background flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(100, 200, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(100, 200, 255, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(100, 200, 255, 0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Avatar */}
      <div className="mb-12 relative z-10">
        <Avatar state={avatarState} size="lg" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center max-w-2xl relative z-10"
      >
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Tudo certo!
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Suas respostas foram enviadas com sucesso.
        </p>
        <p className="text-lg text-muted-foreground mb-12">
          Em breve, você receberá um email com as próximas etapas para estruturar sua solução de IA.
        </p>

        <Button
          onClick={onRestart}
          variant="outline"
          className="border-accent text-accent hover:bg-accent/10 font-semibold px-8 py-3 rounded-lg transition-all"
        >
          Reiniciar
        </Button>
      </motion.div>

      {/* Confetti animation */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 10,
            opacity: 0,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: 2 + Math.random() * 1,
            delay: Math.random() * 0.5,
            repeat: Infinity,
          }}
        />
      ))}
    </motion.div>
  );
}
