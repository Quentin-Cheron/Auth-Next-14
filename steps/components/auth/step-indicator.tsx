import { cn } from "@/lib/utils";
import React, { useEffect, useState, Fragment } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
  titleStep: { title: string }[];
  onStepClick: (step: number) => void;
};

export default function StepIndicator({
  currentStep,
  totalSteps,
  titleStep,
  onStepClick,
}: StepIndicatorProps) {
  const [step, setStep] = useState(currentStep);

  useEffect(() => {
    if (currentStep !== step) {
      const timeoutId = setTimeout(() => {
        setStep((prevStep) =>
          currentStep > prevStep ? prevStep + 1 : prevStep - 1
        );
      }, 200);
      return () => clearTimeout(timeoutId);
    }
  }, [currentStep, step]);

  const steps = () => {
    const arr = [];
    for (let i = 0; i < totalSteps; i++) {
      arr.push(i);
    }
    return arr;
  };

  return (
    <div className="flex items-center justify-center mb-6">
      {steps().map((el) => (
        <Fragment key={el}>
          {el > 0 && (
            <div
              className={cn(
                "relative h-1 bg-gray-300",
                `w-[${Math.ceil(800 / totalSteps)}px]`
              )}
            >
              <span
                className={`absolute h-1 bg-primary transition-all duration-300`}
                style={{
                  width: el < step ? "100%" : "0%",
                }}
              ></span>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                className={``}
                onClick={() => onStepClick(el + 1)}
              >
                <span
                  className={`w-6 h-6 rounded-full cursor-pointer transition-colors block  ${
                    el === step - 1
                      ? "duration-500 delay-200 bg-primary text-white"
                      : el < step - 1
                      ? "duration-500 bg-primary text-white"
                      : "duration-500 bg-gray-300"
                  }`}
                >
                  {el + 1}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{titleStep[el]?.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Fragment>
      ))}
    </div>
  );
}
