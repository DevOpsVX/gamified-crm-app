import { motion } from "framer-motion";
import { Kanban, KanbanColumn } from "@/components/Kanban";
import { Button } from "@/components/ui/button";

interface CRMDemoProps {
  onNext: () => void;
}

export function CRMDemo({ onNext }: CRMDemoProps) {
  const demoColumns: KanbanColumn[] = [
    {
      id: "col-1",
      title: "Novo Lead",
      cards: [
        { id: "card-1", title: "Contato via LinkedIn", description: "João Silva" },
        { id: "card-2", title: "Email de interesse", description: "Maria Santos" },
        { id: "card-9", title: "Indicação de cliente", description: "Beatriz dos Santos" },
      ],
    },
    {
      id: "col-2",
      title: "Conversa",
      cards: [
        { id: "card-3", title: "Primeira reunião agendada", description: "Pedro Costa" },
        { id: "card-4", title: "Apresentação enviada", description: "Ana Oliveira" },
        { id: "card-10", title: "Demo agendada", description: "Juliandengue" },
      ],
    },
    {
      id: "col-3",
      title: "Qualificado",
      cards: [
        { id: "card-5", title: "Orçamento aprovado", description: "Carlos Mendes" },
        { id: "card-11", title: "Necessidade confirmada", description: "Zola" },
      ],
    },
    {
      id: "col-4",
      title: "Proposta",
      cards: [
        { id: "card-6", title: "Proposta enviada", description: "Fernanda Alves" },
        { id: "card-7", title: "Negociação em andamento", description: "Roberto Dias" },
        { id: "card-12", title: "Aguardando resposta", description: "Kelly Ferreira" },
      ],
    },
    {
      id: "col-5",
      title: "Fechamento",
      cards: [
        { id: "card-8", title: "Contrato assinado", description: "Lucas Martins" },
        { id: "card-13", title: "Contrato assinado", description: "Samuel" },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-blue-950/20 p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold text-foreground mb-2">Exemplo de CRM</h1>
        <p className="text-muted-foreground">
          Veja como você pode organizar seus leads e oportunidades em um funil de vendas
        </p>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <Kanban columns={demoColumns} editable={false} />
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <Button
          onClick={onNext}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
        >
          Informar quais etapas quero no meu CRM
        </Button>
      </motion.div>
    </motion.div>
  );
}
