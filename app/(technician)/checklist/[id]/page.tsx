"use client"

import { FarmQuality, FarmRedFlag, FarmVaccination } from "@/components/forms/technician-visit";
import Confirmation from "@/components/forms/technician-visit/Confirmation";
import Note from "@/components/forms/technician-visit/Note";
import { TechnicianVisitSchema, farmDiseaseSchema, farmQualitySchema, farmVaccineSchema, technicianCommentSchema, technicianVisitSchema } from "@/components/forms/technician-visit/schema";
import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { FormStep, useMutistepForm } from "@/hooks/useMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const formSteps = [
  { title: "Quality", form: <FarmQuality />, schema: farmQualitySchema },
  { title: "Disease", form: <FarmRedFlag />, schema: farmDiseaseSchema },
  { title: "Vaccination", form: <FarmVaccination />, schema: farmVaccineSchema },
  { title: "Comment", form: <Note />, schema: technicianCommentSchema },
  { title: "Review", form: <Confirmation />, schema: technicianVisitSchema }
] satisfies FormStep[]

export default function FarmerChecklist() {

  const { currentStepIndex, steps, step, back, next, isFirstStep, isLastStep } = useMutistepForm(formSteps)
  const methods = useForm<TechnicianVisitSchema>({
    resolver: zodResolver(step.schema),
    defaultValues: {
      fieldDiseaseNames: [],
      fieldVaccinations: [],
      fieldVaccineGiven: false,
    }
  })
  const onSubmit = methods.handleSubmit((data) => {
    if (isLastStep) console.log(data);
    else next()
  }, console.log)

  return <>
    <NavigationBar title="Farmer Checklist" button={<BackButton />} />
    <main className="flex-1 flex flex-col">
      <div className="px-6 pt-6">
        <p className="text-neutral">Step {currentStepIndex + 1} of {steps.length}</p>
        <h1 className="text-4xl font-bold">{step.title}</h1>
      </div>
      <FormProvider {...methods}>
        <form className="flex-1 flex flex-col" onSubmit={onSubmit}>
          <div className="flex-1 p-6">
            {step.form}
          </div>
          <div className="flex gap-2 px-6 py-3 sticky bottom-0 w-full bg-base-100">
            <button className="btn btn-primary btn-outline flex-1" onClick={back} type="button" disabled={isFirstStep}>Back</button>
            <button className="btn btn-primary flex-1" type="submit">Next</button>
          </div>
        </form>
      </FormProvider>
    </main>
  </>
}