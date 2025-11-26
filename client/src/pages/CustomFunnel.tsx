import { motion } from "framer-motion";
import { useState } from "react";
import { Avatar } from "@/components/Avatar";
import { Kanban, KanbanColumn } from "@/components/Kanban";
import { Button } from "@/components/ui/button";

interface CustomFunnelProps {
  onNext: (funnelData?: any) => void;
}

export function CustomFunnel({ onNext }: CustomFunnelProps) {
  const [avatarState, setAvatarState] = useState<"idle" | "clap" | "happy">("idle");
  const [columns, setColumns] = useState<KanbanColumn[]>([
    { id: "col-1", title: "Novo Lead", cards: [] },
    { id: "col-2", title: "Conversa", cards: [] },
    { id: "col-3", title: "Qualificado", cards: [] },
    { id: "col-4", title: "Proposta", cards: [] },
    { id: "col-5", title: "Fechamento", cards: [] },
  ]);

  const handleFinalize = () => {
    setAvatarState("clap");
    setTimeout(() => {
      setAvatarState("happy");
      setTimeout(() => {
        // Passar dados do funil para salvar no Supabase
        onNext(columns);
      }, 1000);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-blue-950/20 p-8"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <Avatar state={avatarState} size="md" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">Seu Funil Personalizado</h1>
        <p className="text-muted-foreground">
          Customize suas colunas, renomeie-as ou adicione novas etapas conforme necessário
        </p>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <Kanban columns={columns} onColumnsChange={setColumns} editable={true} />
      </motion.div>

      {/* Finalize Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <Button
          onClick={handleFinalize}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
        >
          Finalizar e salvar informações
        </Button>
      </motion.div>
    </motion.div>
  );
}
