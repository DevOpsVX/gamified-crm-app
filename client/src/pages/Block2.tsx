import { useState } from "react";
import { Avatar } from "@/components/Avatar";
import { QuestionnaireBlock } from "@/components/QuestionnaireBlock";
import { FormField } from "@/components/FormField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

interface Block2Data {
  mainObjections: string;
  attendanceProcess: string;
  attendanceHours: string;
  paymentMethods: string;
  managementSystem: string;
  brandMessage: string;
}

interface Block2Props {
  onNext: (data: Block2Data) => void;
  isLoading?: boolean;
}

export function Block2({ onNext, isLoading = false }: Block2Props) {
  const [avatarState, setAvatarState] = useState<"idle" | "clap" | "thinking">("idle");
  const [formData, setFormData] = useState<Block2Data>({
    mainObjections: "",
    attendanceProcess: "",
    attendanceHours: "",
    paymentMethods: "",
    managementSystem: "",
    brandMessage: "",
  });

  const handleSubmit = async () => {
    setAvatarState("clap");
    setTimeout(() => {
      setAvatarState("thinking");
      onNext(formData);
    }, 1200);
  };

  const handleInputChange = (field: keyof Block2Data, value: string) => {
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
        title="Público & Operações"
        blockNumber={2}
        totalBlocks={3}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      >
        <FormField label="Principais objeções do público">
          <Textarea
            placeholder="Quais são as principais objeções/dúvidas dos seus clientes?"
            value={formData.mainObjections}
            onChange={(e) => handleInputChange("mainObjections", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground min-h-24"
          />
        </FormField>

        <FormField label="Como funciona o atendimento atual">
          <Textarea
            placeholder="Descreva o processo de atendimento atual"
            value={formData.attendanceProcess}
            onChange={(e) => handleInputChange("attendanceProcess", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground min-h-24"
          />
        </FormField>

        <FormField label="Horários de atendimento">
          <Input
            placeholder="Ex: Seg-Sex 9h-18h, Sab 9h-13h"
            value={formData.attendanceHours}
            onChange={(e) => handleInputChange("attendanceHours", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        <FormField label="Formas de pagamento aceitas">
          <Input
            placeholder="Ex: Cartão, PIX, Boleto, Dinheiro"
            value={formData.paymentMethods}
            onChange={(e) => handleInputChange("paymentMethods", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        <FormField label="Usa algum sistema de gestão?">
          <Input
            placeholder="Ex: Nenhum, Excel, CRM específico, etc"
            value={formData.managementSystem}
            onChange={(e) => handleInputChange("managementSystem", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground"
          />
        </FormField>

        <FormField label="Existe mensagem-chave da marca?">
          <Textarea
            placeholder="Qual é a mensagem principal que você quer comunicar?"
            value={formData.brandMessage}
            onChange={(e) => handleInputChange("brandMessage", e.target.value)}
            className="bg-input border border-border text-foreground placeholder:text-muted-foreground min-h-24"
          />
        </FormField>
      </QuestionnaireBlock>
    </motion.div>
  );
}
