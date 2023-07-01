"use client"

import SuccessDialog from "@/components/SuccessDialog";
import { FarmQuality, FarmRedFlag, FarmVaccination, processFormData } from "@/components/forms/technician-visit";
import Confirmation from "@/components/forms/technician-visit/Confirmation";
import Note from "@/components/forms/technician-visit/Note";
import { TechnicianVisitFormSchema, TechnicianVisitProvider, useTechnicianVisit } from "@/components/forms/technician-visit/schema";
import { useMutistepForm } from "@/hooks/useMultiStepForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next-intl/client";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function FarmerChecklist({ params }: { params: { id: string } }) {
  const t = useTranslations("FarmChecklist")
  const [error, setError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const visit = useTechnicianVisit()

  const { currentStepIndex, steps, step, back, next, isFirstStep, isLastStep } = useMutistepForm([
    { title: t("quality"), form: <FarmQuality />, schema: visit.farmQualitySchema },
    { title: t("diseases"), form: <FarmRedFlag />, schema: visit.farmDiseaseSchema },
    { title: t("vaccination"), form: <FarmVaccination />, schema: visit.farmVaccineSchema },
    { title: t("comment"), form: <Note />, schema: visit.technicianCommentSchema },
    { title: t("review"), form: <Confirmation />, schema: visit.technicianVisitFormSchema }
  ])

  const methods = useForm<TechnicianVisitFormSchema>({
    resolver: zodResolver(step.schema),
    defaultValues: {
      fieldLightSufficiency: 5,
      fieldCleanBedding: 5,
      fieldWaterCleanliness: 5,
      fieldFeedQuantity: 5,
      fieldVentillation: 5,
      fieldDisease: "No",
      fieldDiseaseNames: [],
      fieldVaccineGiven: false,
      fieldVaccinations: [],
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
  }, console.log)

  const isSubmitting = methods.formState.isSubmitting;

  return <>
    <main className="flex-1 flex flex-col overflow-hidden">
      {error && <div className="text-sm p-2 bg-error">{t("submit error")}</div>}
      <div className="px-6 py-2 shadow-lg">
        <p className="text-neutral">{t("step", { now: currentStepIndex + 1, total: steps.length })}</p>
        <h1>{step.title}</h1>
      </div>
      <TechnicianVisitProvider technicianVisit={visit}>
        <FormProvider {...methods}>
          <form className="flex-1 flex flex-col overflow-hidden" onSubmit={onSubmit}>
            <div className="flex-1 px-6 py-2 overflow-auto">
              {step.form}
            </div>
            <div className="grid grid-flow-col p-4 gap-2 sticky bottom-0 w-full border-t-2">
              <button disabled={isFirstStep || isSubmitting} className="btn btn-primary btn-outline" onClick={onBack} type="button">
                {t("back")}
              </button>
              <button disabled={isSubmitting} className="btn btn-primary" type="submit">
                {
                  isSubmitting ? <span className="loading loading-spinner loading-md" /> :
                    isLastStep ? t("submit") : t("next")
                }
              </button>
            </div>
          </form>
        </FormProvider>
      </TechnicianVisitProvider>
    </main>
    <SuccessDialog
      title={t("submit success")}
      buttonLabel={t("to the farmer")}
      action={() => router.replace(`/farmer/${params.id}`)}
      ref={dialog} />
  </>
}