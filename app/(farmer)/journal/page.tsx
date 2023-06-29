"use client"

import SuccessDialog from "@/components/SuccessDialog";
import { ChickenEggProduction, ChickenFeeding, ChickenStock, processFormData } from "@/components/forms/farmer-journal";
import Confirmation from "@/components/forms/farmer-journal/Confirmation";
import Note from "@/components/forms/farmer-journal/Note";
import { FarmerJournalSchema, chickenFeedSchema, chickenStockSchema, commentSchema, eggProductionSchema, journalSchema } from "@/components/forms/farmer-journal/schema";
import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { FormStep, useMutistepForm } from "@/hooks/useMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const formSteps = [
  { title: "Stock", form: <ChickenStock />, schema: chickenStockSchema },
  { title: "Egg production", form: <ChickenEggProduction />, schema: eggProductionSchema },
  { title: "Feeding", form: <ChickenFeeding />, schema: chickenFeedSchema },
  { title: "Note", form: <Note />, schema: commentSchema },
  { title: "Confirmation", form: <Confirmation />, schema: journalSchema }
] satisfies FormStep[];

export default function FarmerJournal() {
  const [error, setError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const onBack = () => {
    setError(false)
    back()
    ref.current?.scrollTo({ top: 0 })
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    setError(false)
    if (!isLastStep) {
      next()
      ref.current?.scrollTo({ top: 0 })
      return
    }
    const processed = processFormData(data)
    const response = await fetch("/api/drupal/node/farmer_daily_journal", {
      method: "POST",
      body: JSON.stringify(processed)
    })
    if (response.ok) dialog.current?.showModal()
    else if (response.status === 401 || response.status === 403) router.replace("/logout")
    else setError(true)
  });

  const isSubmitting = methods.formState.isSubmitting;


  return <>
    <title>New Jorunal | Ovoflow</title>
    <NavigationBar title="New Journal" button={<BackButton />} />
    <main className="flex-1 flex flex-col overflow-hidden">
      {error && <div className="text-sm p-2 bg-error">Something went wrong, try again later</div>}
      <div className="px-6 py-4 shadow">
        <p className="text-neutral">Step {currentStepIndex + 1} of {steps.length}</p>
        <h1>{step.title}</h1>
      </div>
      <FormProvider {...methods}>
        <form className="flex-1 flex flex-col overflow-hidden" onSubmit={onSubmit}>
          <div className="flex-1 overflow-auto" ref={ref}>
            {step.form}
          </div>
          <div className="grid grid-cols-2 px-6 py-4 gap-2 shadow bg-base-100">
            <button disabled={isFirstStep || isSubmitting} className="btn btn-primary btn-outline flex-1" onClick={onBack} type="button">Back</button>
            <button disabled={isSubmitting} className="btn btn-primary flex-1" type="submit">
              {
                isSubmitting ? <span className="loading loading-spinner loading-md" /> :
                  isLastStep ? "Submit" : "Next"
              }
            </button>
          </div>
        </form>
      </FormProvider>
    </main>
    <SuccessDialog action={router.back} ref={dialog} />
  </>
}