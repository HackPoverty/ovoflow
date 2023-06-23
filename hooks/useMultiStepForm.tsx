import { ReactNode, useState } from "react";

type FormStep = [string, ReactNode];

export function useMutistepForm(steps: FormStep[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  function next() {
    setCurrentStepIndex(i => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }

  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i
      return i - 1
    })
  }


  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    next,
    back,
    isFristStep: currentStepIndex === 0,
    isLasstStep: currentStepIndex === steps.length - 1,
  }
}