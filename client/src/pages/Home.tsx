import { useState } from "react";
import { Block1 } from "./Block1";
import { Block2 } from "./Block2";
import { Block3 } from "./Block3";
import { Transition } from "./Transition";
import { CRMDemo } from "./CRMDemo";
import { CustomFunnel } from "./CustomFunnel";
import { FinalScreen } from "./FinalScreen";

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

  const handleBlock1Submit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentScreen("block2");
  };

  const handleBlock2Submit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentScreen("block3");
  };

  const handleBlock3Submit = async (data: any) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setCurrentScreen("transition");
  };

  const handleTransitionNext = () => {
    setCurrentScreen("crm-demo");
  };

  const handleCRMDemoNext = () => {
    setCurrentScreen("custom-funnel");
  };

  const handleCustomFunnelNext = () => {
    setCurrentScreen("final");
  };

  const handleRestart = () => {
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
