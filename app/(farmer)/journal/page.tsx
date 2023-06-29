"use client"

import { ChickenEggProduction, ChickenFeeding, ChickenStock } from "@/components/forms/farmer-journal";
import Confirmation from "@/components/forms/farmer-journal/Confirmation";
import Note from "@/components/forms/farmer-journal/Note";
import { FarmerJournalSchema, chickenFeedSchema, chickenStockSchema, commentSchema, eggProductionSchema, journalSchema } from "@/components/forms/farmer-journal/schema";
import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { FormStep, useMutistepForm } from "@/hooks/useMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

const formSteps = [
  { title: "Stock", form: <ChickenStock />, schema: chickenStockSchema },
  { title: "Egg production", form: <ChickenEggProduction />, schema: eggProductionSchema },
  { title: "Feeding", form: <ChickenFeeding />, schema: chickenFeedSchema },
  { title: "Note", form: <Note />, schema: commentSchema },
  { title: "Confirmation", form: <Confirmation />, schema: journalSchema }
] satisfies FormStep[];

export default function FarmerJournal() {
  const {
    currentStepIndex,
    steps,
    isFirstStep,
    isLastStep,
    step,
    back,
    next } = useMutistepForm(formSteps)

  const methods = useForm<FarmerJournalSchema>({
    resolver: zodResolver(step.schema)
  });

  const onSubmit = methods.handleSubmit((data) => {
    if (isLastStep) console.log(data);
    else {
      next();
      ref.current?.scrollTo({ top: 0 })
    }
  }, console.log);

  const ref = useRef<HTMLDivElement>(null);

  return <>
    <title>New Jorunal | Ovoflow</title>
    <NavigationBar title="New Journal" button={<BackButton />} />
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="px-6 py-4 shadow">
        <p className="text-neutral">Step {currentStepIndex + 1} of {steps.length}</p>
        <h1>{step.title}</h1>
      </div>
      <FormProvider {...methods}>
        <form className="flex-1 flex flex-col overflow-hidden" onSubmit={onSubmit}>
          <div className="flex-1 overflow-auto" ref={ref}>
            {step.form}
          </div>
          <div className="flex gap-2 px-6 py-3 sticky bottom-0 w-full bg-base-100">
            <button disabled={isFirstStep} className="btn btn-primary btn-outline flex-1" onClick={back} type="button">Back</button>
            <button className="btn btn-primary flex-1" type="submit">Next</button>
          </div>
        </form>
      </FormProvider>
    </main>
  </>
}