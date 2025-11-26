import { useState, useEffect } from "react";
import { Block1 } from "./Block1";
import { Block2 } from "./Block2";
import { Block3 } from "./Block3";
import { Transition } from "./Transition";
import { CRMDemo } from "./CRMDemo";
import { CustomFunnel } from "./CustomFunnel";
import { FinalScreen } from "./FinalScreen";
import { trpc } from "@/lib/trpc";
import { nanoid } from "nanoid";

type Screen =
  | "block1"
  | "block2"
  | "block3"
  | "transition"
  | "crm-demo"
  | "custom-funnel"
  | "final";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("block1");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [responseId, setResponseId] = useState<string | null>(null);

  // Mutations
  const createResponse = trpc.responses.create.useMutation();
  const updateResponse = trpc.responses.update.useMutation();

  // Gerar session_id único ao montar o componente
  useEffect(() => {
    const id = nanoid();
    setSessionId(id);
  }, []);

  const handleBlock1Submit = async (data: any) => {
    setIsLoading(true);
    try {
      // Criar nova resposta no Supabase
      const response = await createResponse.mutateAsync({
        session_id: sessionId,
        city: data.city,
        website: data.website,
        offer: data.mainOffer,
        avg_price: data.averageTicket,
        volume: data.weeklyAttendance,
      });
      
      if (response?.id) {
        setResponseId(response.id);
      }
      
      setCurrentScreen("block2");
    } catch (error) {
      console.error("Error saving Block 1 data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlock2Submit = async (data: any) => {
    setIsLoading(true);
    try {
      // Atualizar resposta existente
      if (responseId) {
        await updateResponse.mutateAsync({
          id: responseId,
          data: {
            objections: data.mainObjections,
            flow: data.attendanceProcess,
            hours: data.attendanceHours,
            payment_methods: data.paymentMethods ? data.paymentMethods.split(',').map((m: string) => m.trim()) : [],
            system: data.managementSystem,
            key_message: data.brandMessage,
          },
        });
      }
      
      setCurrentScreen("block3");
    } catch (error) {
      console.error("Error saving Block 2 data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBlock3Submit = async (data: any) => {
    setIsLoading(true);
    try {
      // Atualizar resposta existente com dados finais
      if (responseId) {
        await updateResponse.mutateAsync({
          id: responseId,
          data: {
            ai_capabilities: data.aiShouldDo ? [data.aiShouldDo] : [],
            ai_restrictions: data.aiShouldNotDo,
            tone: data.aiVoiceTone,
            main_function: data.aiMainFunction,
            manual_tasks: data.tasksToAutomate,
          },
        });
      }
      
      setCurrentScreen("transition");
    } catch (error) {
      console.error("Error saving Block 3 data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransitionNext = () => {
    setCurrentScreen("crm-demo");
  };

  const handleCRMDemoNext = () => {
    setCurrentScreen("custom-funnel");
  };

  const handleCustomFunnelNext = async (funnelData?: any) => {
    // Salvar dados do funil personalizado
    if (responseId && funnelData) {
      try {
        await updateResponse.mutateAsync({
          id: responseId,
          data: {
            funnel_columns: funnelData,
          },
        });
      } catch (error) {
        console.error("Error saving funnel data:", error);
      }
    }
    
    setCurrentScreen("final");
  };

  const handleRestart = () => {
    // Gerar novo session_id para nova sessão
    const id = nanoid();
    setSessionId(id);
    setResponseId(null);
    setCurrentScreen("block1");
  };

  return (
    <>
      {currentScreen === "block1" && (
        <Block1 onNext={handleBlock1Submit} isLoading={isLoading} />
      )}
      {currentScreen === "block2" && (
        <Block2 onNext={handleBlock2Submit} isLoading={isLoading} />
      )}
      {currentScreen === "block3" && (
        <Block3 onNext={handleBlock3Submit} isLoading={isLoading} />
      )}
      {currentScreen === "transition" && (
        <Transition onNext={handleTransitionNext} />
      )}
      {currentScreen === "crm-demo" && (
        <CRMDemo onNext={handleCRMDemoNext} />
      )}
      {currentScreen === "custom-funnel" && (
        <CustomFunnel onNext={handleCustomFunnelNext} />
      )}
      {currentScreen === "final" && (
        <FinalScreen onRestart={handleRestart} />
      )}
    </>
  );
}
