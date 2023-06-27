"use client"

import { ChickenEggProduction, ChickenFeeding, ChickenStock, JournalConfirmation, JournalNote } from "@/components/forms/farmer-journal";
import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useMutistepForm } from "@/hooks/useMultiStepForm";
import { FarmerJournal } from "@/types/content";
import { FormProvider, useForm } from "react-hook-form";

export default function FarmerJournal() {
  const methods = useForm<FarmerJournal>({});

  const { currentStepIndex, steps, step: [title, form], back, next } = useMutistepForm([
    ["Stock", <ChickenStock key="chicken-stock" />],
    ["Egg production", <ChickenEggProduction key="chicken-egg-production" />],
    ["Feeding", <ChickenFeeding key="farm-vaccination" />],
    ["Note", <JournalNote key="journal-note" />],
    ["Confirmation", <JournalConfirmation key="farm-confirmation" />]
  ])

  return <>
    <NavigationBar title="Journal" button={<BackButton />} />
    <main className="flex-1 flex flex-col">
      <div className="px-6 pt-6">
        <p className="text-neutral">Step {currentStepIndex + 1} of {steps.length}</p>
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      <FormProvider {...methods}>
        <form className="flex-1 flex flex-col">
          <div className="flex-1">
            {form}
          </div>
          <div className="flex gap-2 px-6 py-3 sticky bottom-0 w-full bg-base-100">
            <button className="btn btn-primary btn-outline flex-1" onClick={back} type="button">Back</button>
            <button className="btn btn-primary flex-1" onClick={next} type="button">Next</button>
          </div>
        </form>
      </FormProvider>
    </main>
  </>
}