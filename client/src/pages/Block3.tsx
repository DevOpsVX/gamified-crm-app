import { useState } from "react";
import { Avatar } from "@/components/Avatar";
import { QuestionnaireBlock } from "@/components/QuestionnaireBlock";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface Block3Data {
  aiShouldDo: string;
  aiShouldNotDo: string;
  aiVoiceTone: string;
  aiMainFunction: string;
  tasksToAutomate: string;
}

interface Block3Props {
  onNext: (data: Block3Data) => void;
  isLoading?: boolean;
}

export function Block3({ onNext, isLoading = false }: Block3Props) {
  const [avatarState, setAvatarState] = useState<"idle" | "happy">("idle");
  const [formData, setFormData] = useState<Block3Data>({
    aiShouldDo: "",
    aiShouldNotDo: "",
    aiVoiceTone: "",
    aiMainFunction: "",
    tasksToAutomate: "",
  });

  const handleSubmit = async () => {
    setAvatarState("happy");
    setTimeout(() => {
      onNext(formData);
    }, 1000);
  };

  const handleInputChange = (field: keyof Block3Data, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-blue-950/20 flex flex-col items-center justify-center p-4"
    >
      {/* Avatar */}
      <div className="mb-12">
        <Avatar state={avatarState} size="lg" />
      </div>

      {/* Form */}
      <QuestionnaireBlock
        title="IA & Expectativas"
        blockNumber={3}
        totalBlocks={3}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField label="O que a IA deve fazer">
          <Textarea
            placeholder="Descreva as principais funções que a IA deve desempenhar"
            value={formData.aiShouldDo}
            onChange={(e) => handleInputChange("aiShouldDo", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground min-h-24"
          />
        </FormField>

        <FormField label="O que NÃO deve fazer">
          <Textarea
            placeholder="Quais são os limites? O que a IA não deve fazer?"
            value={formData.aiShouldNotDo}
            onChange={(e) => handleInputChange("aiShouldNotDo", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground min-h-24"
          />
        </FormField>

        <FormField label="Tom de voz da IA">
          <Input
            placeholder="Ex: Profissional, Amigável, Técnico, Casual"
            value={formData.aiVoiceTone}
            onChange={(e) => handleInputChange("aiVoiceTone", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        <FormField label="Função principal da IA">
          <Input
            placeholder="Ex: Atendimento ao cliente, Qualificação de leads, Suporte técnico"
            value={formData.aiMainFunction}
            onChange={(e) => handleInputChange("aiMainFunction", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        <FormField label="Tarefas manuais que gostaria de automatizar">
          <Textarea
            placeholder="Quais tarefas repetitivas você gostaria que a IA automatizasse?"
            value={formData.tasksToAutomate}
            onChange={(e) => handleInputChange("tasksToAutomate", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground min-h-24"
          />
        </FormField>
      </QuestionnaireBlock>
    </motion.div>
  );
}
