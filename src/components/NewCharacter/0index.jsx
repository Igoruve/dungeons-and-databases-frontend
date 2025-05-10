import { useState } from "react";
import { CharacterProvider, useCharacterContext } from "../../context/CharacterContext";
import NewCharacter from "./step1BasicInfo";
import SelectClass from "./step2Class";
import SelectSpecies from "./step3Species";
import SelectStats from "./step4Stats";
import SelectSkills from "./step5Skills";
import SelectItems from "./step6Items";
import FinalStep from "./lastsept";

function FullForm() {
  const [step, setStep] = useState(0);

  const arraySteps = [
    NewCharacter,
    SelectClass,
    SelectSpecies,
    SelectStats,
    SelectSkills,
    SelectItems,
    FinalStep,
  ];

  function onNext() {
    setStep((prevStep) => prevStep + 1);
  }

  function back() {
    setStep((prevStep) => prevStep - 1);
  }

  const StepComponent = arraySteps[step];

  return (
    <CharacterProvider>
      <div>
        <StepComponent onNext={onNext} back={step === 0 ? null : back} />
      </div>
    </CharacterProvider>
  );
}

export default FullForm;