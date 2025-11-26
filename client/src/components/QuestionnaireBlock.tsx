import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface QuestionnaireBlockProps {
  title: string;
  blockNumber: number;
  totalBlocks: number;
  children: ReactNode;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function QuestionnaireBlock({
  title,
  blockNumber,
  totalBlocks,
  children,
  onSubmit,
  isLoading = false,
}: QuestionnaireBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-card border border-border rounded-lg p-8 shadow-xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold text-foreground">{title}</h2>
            <span className="text-sm font-medium text-muted-foreground">
              Etapa {blockNumber} de {totalBlocks}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${(blockNumber / totalBlocks) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-8">{children}</div>

        {/* Submit button */}
        <div className="flex justify-end">
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-2 rounded-lg transition-all"
          >
            {isLoading ? "Enviando..." : "Enviar respostas"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
