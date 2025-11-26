import { motion } from "framer-motion";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface TransitionProps {
  onNext: () => void;
}

export function Transition({ onNext }: TransitionProps) {
  const [avatarState, setAvatarState] = useState<"thinking" | "bow">("thinking");

  useEffect(() => {
    const timer = setTimeout(() => {
      setAvatarState("bow");
    }, 2000);
    return () => clearTimeout(timer);
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
          Ótimo trabalho!
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Agora vamos estruturar o seu funil de vendas.
        </p>

        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
        >
          Ver exemplo de CRM
        </Button>
      </motion.div>
    </motion.div>
  );
}
