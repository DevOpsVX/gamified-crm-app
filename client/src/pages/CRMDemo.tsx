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
        { id: "card-1", title: "João Silva", opportunityValue: "$0.00", assignee: "João Silva", assigneeInitials: "JS", assigneeColor: "bg-blue-500" },
        { id: "card-2", title: "Maria Santos", opportunityValue: "$0.00", assignee: "Maria Santos", assigneeInitials: "MS", assigneeColor: "bg-pink-500" },
        { id: "card-9", title: "Beatriz dos Santos", opportunityValue: "$0.00", assignee: "Beatriz dos Santos", assigneeInitials: "BS", assigneeColor: "bg-purple-500" },
      ],
    },
    {
      id: "col-2",
      title: "Conversa",
      cards: [
        { id: "card-3", title: "Pedro Costa", opportunityValue: "$0.00", assignee: "Pedro Costa", assigneeInitials: "PC", assigneeColor: "bg-green-500" },
        { id: "card-4", title: "Ana Oliveira", opportunityValue: "$0.00", assignee: "Ana Oliveira", assigneeInitials: "AO", assigneeColor: "bg-orange-500" },
        { id: "card-10", title: "Juliandengue", opportunityValue: "$0.00", assignee: "Juliandengue", assigneeInitials: "JD", assigneeColor: "bg-cyan-500" },
      ],
    },
    {
      id: "col-3",
      title: "Qualificado",
      cards: [
        { id: "card-5", title: "Carlos Mendes", opportunityValue: "$0.00", assignee: "Carlos Mendes", assigneeInitials: "CM", assigneeColor: "bg-red-500" },
        { id: "card-11", title: "Zola", opportunityValue: "$0.00", assignee: "Zola", assigneeInitials: "ZL", assigneeColor: "bg-indigo-500" },
      ],
    },
    {
      id: "col-4",
      title: "Proposta",
      cards: [
        { id: "card-6", title: "Fernanda Alves", opportunityValue: "$0.00", assignee: "Fernanda Alves", assigneeInitials: "FA", assigneeColor: "bg-yellow-500" },
        { id: "card-7", title: "Roberto Dias", opportunityValue: "$0.00", assignee: "Roberto Dias", assigneeInitials: "RD", assigneeColor: "bg-teal-500" },
        { id: "card-12", title: "Kelly Ferreira", opportunityValue: "$0.00", assignee: "Kelly Ferreira", assigneeInitials: "KF", assigneeColor: "bg-violet-500" },
      ],
    },
    {
      id: "col-5",
      title: "Fechamento",
      cards: [
        { id: "card-8", title: "Lucas Martins", opportunityValue: "$0.00", assignee: "Lucas Martins", assigneeInitials: "LM", assigneeColor: "bg-lime-500" },
        { id: "card-13", title: "Samuel", opportunityValue: "$0.00", assignee: "Samuel", assigneeInitials: "SL", assigneeColor: "bg-rose-500" },
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
          Veja como você pode organizar seus leads e oportunidades em um funil de vendas. Cada card mostra o nome do lead, valor da oportunidade e quem é responsável.
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
