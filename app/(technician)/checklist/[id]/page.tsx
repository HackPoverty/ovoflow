"use client"

import { FarmConfirmation, FarmNote, FarmQuality, FarmRedFlag, FarmVaccination } from "@/components/forms/technician-visit";
import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useMutistepForm } from "@/hooks/useMultiStepForm";
import { TechnicianVisit } from "@/types/content";
import { FormProvider, useForm } from "react-hook-form";

export default function FarmerChecklist() {
  const methods = useForm<TechnicianVisit>({
    defaultValues: {
      fieldDiseaseNames: [],
      fieldOtherpossibledisease: null,
      fieldOtherVaccine: null,
      fieldVisitComments: null,
      fieldVaccineGiven: false,
      fieldVaccinations: [],
    },
  })

  const { currentStepIndex, steps, step, back, next } = useMutistepForm([
    ["Quality", <FarmQuality key="farm-quality" />],
    ["Disease", <FarmRedFlag key="farm-red-flag" />],
    ["Vaccination", <FarmVaccination key="farm-vaccination" />],
    ["Note", <FarmNote key="farm-note" />],
    ["Confirmation", <FarmConfirmation key="farm-confirmation" />]
  ])
  const [title, form] = step;

  return <>
    <NavigationBar title="Farmer Checklist" button={<BackButton />} />
    <main className="flex-1 flex flex-col">
      <div className="px-6 pt-6">
        <p className="text-neutral">Step {currentStepIndex + 1} of {steps.length}</p>
        <h1 className="text-4xl font-bold">{title}</h1>
      </div>
      <FormProvider {...methods}>
        <form className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
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