import { useState } from "react";
import { Avatar } from "@/components/Avatar";
import { QuestionnaireBlock } from "@/components/QuestionnaireBlock";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface Block1Data {
  city: string;
  website: string;
  mainOffer: string;
  averageTicket: string;
  weeklyAttendance: string;
}

interface Block1Props {
  onNext: (data: Block1Data) => void;
  isLoading?: boolean;
}

export function Block1({ onNext, isLoading = false }: Block1Props) {
  const [avatarState, setAvatarState] = useState<"idle" | "happy" | "thinking">("idle");
  const [formData, setFormData] = useState<Block1Data>({
    city: "",
    website: "",
    mainOffer: "",
    averageTicket: "",
    weeklyAttendance: "",
  });

  const handleSubmit = async () => {
    setAvatarState("happy");
    setTimeout(() => {
      setAvatarState("thinking");
      onNext(formData);
    }, 1000);
  };

  const handleInputChange = (field: keyof Block1Data, value: string) => {
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
        title="Informações do Negócio"
        blockNumber={1}
        totalBlocks={3}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField label="Cidade/Região de atuação" required>
          <Input
            placeholder="Ex: São Paulo, SP"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        <FormField label="Possui site? Qual?" required>
          <Input
            placeholder="Ex: www.exemplo.com.br"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        <FormField label="Oferta principal" required>
          <Textarea
            placeholder="Descreva sua principal oferta/serviço"
            value={formData.mainOffer}
            onChange={(e) => handleInputChange("mainOffer", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground min-h-24"
          />
        </FormField>

        <FormField label="Ticket médio" required>
          <Input
            placeholder="Ex: R$ 500 - R$ 2.000"
            value={formData.averageTicket}
            onChange={(e) => handleInputChange("averageTicket", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        <FormField label="Volume médio de atendimentos por semana" required>
          <Input
            placeholder="Ex: 10-15 atendimentos"
            value={formData.weeklyAttendance}
            onChange={(e) => handleInputChange("weeklyAttendance", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>
      </QuestionnaireBlock>
    </motion.div>
  );
}
