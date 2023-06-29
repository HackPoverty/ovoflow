"use client"

import SuccessDialog from "@/components/SuccessDialog";
import { FarmQuality, FarmRedFlag, FarmVaccination, processFormData } from "@/components/forms/technician-visit";
import Confirmation from "@/components/forms/technician-visit/Confirmation";
import Note from "@/components/forms/technician-visit/Note";
import { TechnicianVisitSchema, farmDiseaseSchema, farmQualitySchema, farmVaccineSchema, technicianCommentSchema, technicianVisitSchema } from "@/components/forms/technician-visit/schema";
import { FormStep, useMutistepForm } from "@/hooks/useMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const formSteps = [
  { title: "Quality", form: <FarmQuality />, schema: farmQualitySchema },
  { title: "Disease", form: <FarmRedFlag />, schema: farmDiseaseSchema },
  { title: "Vaccination", form: <FarmVaccination />, schema: farmVaccineSchema },
  { title: "Comment", form: <Note />, schema: technicianCommentSchema },
  { title: "Review", form: <Confirmation />, schema: technicianVisitSchema }
] satisfies FormStep[]

export default function FarmerChecklist({ params }: { params: { id: string } }) {
  const [error, setError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { currentStepIndex, steps, step, back, next, isFirstStep, isLastStep } = useMutistepForm(formSteps)
  const methods = useForm<TechnicianVisitSchema>({
    resolver: zodResolver(step.schema),
    defaultValues: {
      fieldDiseaseNames: [],
      fieldVaccinations: [],
      fieldVaccineGiven: false,
    }
  })

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
    const processed = processFormData(data, params.id)
    console.log(processed);
    const response = await fetch("/api/drupal/node/technician_visit", {
      method: "POST",
      body: JSON.stringify(processed),
    })
    if (response.ok) dialog.current?.showModal()
    else if (response.status === 401 || response.status === 403) router.replace("/logout")
    else setError(true)
  })

  const isSubmitting = methods.formState.isSubmitting;

  return <>
    <main className="flex-1 flex flex-col overflow-hidden">
      {error && <div className="text-sm p-2 bg-error">Something went wrong, try again later</div>}
      <div className="p-6 shadow-lg">
        <p className="text-neutral">Step {currentStepIndex + 1} of {steps.length}</p>
        <h1 className="text-4xl font-bold">{step.title}</h1>
      </div>
      <FormProvider {...methods}>
        <form className="flex-1 flex flex-col overflow-hidden" onSubmit={onSubmit}>
          <div className="flex-1 px-6 py-2 overflow-auto">
            {step.form}
          </div>
          <div className="grid grid-flow-col p-4 gap-2 sticky bottom-0 w-full border-t-2">
            <button disabled={isFirstStep || isSubmitting} className="btn btn-primary btn-outline" onClick={onBack} type="button">Back</button>
            <button disabled={isSubmitting} className="btn btn-primary" type="submit">
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