import SuccessDialog from "@/components/SuccessDialog";
import { FarmConfirmation, FarmNote, FarmQuality, FarmRedFlag, FarmVaccination } from "@/components/forms/technician-visit";
import { TechnicianVisitProvider } from "@/components/forms/technician-visit/context";
import { TechnicianVisitFormSchema, useTechnicianVisit } from "@/components/forms/technician-visit/schema";
import Navigation from "@/components/layouts/Navigation";
import { PrivateRoute } from "@/components/layouts/PrivateRoute";
import BackButton from "@/components/navigation/BackButton";
import { useFarmerName } from "@/hooks/useFarmerName";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useMutistepForm } from "@/hooks/useMultiStepForm";
import { useNavigatorOnline } from "@/hooks/useNavigatorOnline";
import { jsonApiPost } from "@/lib/axios";
import { ServerError } from "@/lib/error";
import { getLocaleStaticsProps } from "@/lib/i18n";
import { offlineDB } from "@/lib/offline/db";
import { processTechnical } from "@/lib/process";
import { TECHNICIAN_ROLE } from "@/lib/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocateFixedIcon, LocateIcon, LocateOffIcon } from "lucide-react";
import { GetStaticPaths } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";

export default function Checklist() {
  const { query, replace } = useRouter()
  const [error, setError] = useState("");
  const farmerId = query.farmerId as string;
  const name = useFarmerName(farmerId)
  const t = useTranslations("FarmChecklist")
  const dialog = useRef<HTMLDialogElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isOnline = useNavigatorOnline()
  const { location, isLoading: isLocationLoading } = useGeolocation();

  const { trigger, isMutating } = useSWRMutation("node/technician_visit",
    async (key, { arg }: { arg: TechnicianVisitFormSchema }) => {
      if (isOnline) {
        jsonApiPost(key, processTechnical(arg, farmerId))
      } else {
        await offlineDB.technicianVisit.add({
          value: arg,
          farmerId
        })
      }
    },
    {
      onSuccess() {
        dialog.current?.showModal()
      },
      onError(e) {
        if (e instanceof ServerError)
          setError(t("submit error"))
      }
    }
  )

  const visit = useTechnicianVisit()

  const { currentStepIndex, steps, step, back, next, isFirstStep, isLastStep } = useMutistepForm([
    { title: t("quality"), form: <FarmQuality />, schema: visit.farmQualitySchema },
    { title: t("diseases"), form: <FarmRedFlag />, schema: visit.farmDiseaseSchema },
    { title: t("vaccination"), form: <FarmVaccination />, schema: visit.farmVaccineSchema },
    { title: t("comment"), form: <FarmNote />, schema: visit.technicianCommentSchema },
    { title: t("review"), form: <FarmConfirmation location={location} />, schema: visit.technicianVisitFormSchema }
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
    setError("")
    back()
    ref.current?.scrollTo({ top: 0 })
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    setError("")
    if (!isLastStep) {
      next()
      ref.current?.scrollTo({ top: 0 })
      return
    } else {
      trigger(data)
    }
  })

  const isSubmitting = methods.formState.isSubmitting || isMutating;

  return <>
    <Head>
      <title>{t("title")}</title>
    </Head>
    <Navigation title={step.title} buttonNav={<BackButton />}>
      <PrivateRoute role={TECHNICIAN_ROLE}>
        <div className="bg-base-200">
          <div className="p-1 bg-primary" style={{ width: `${(currentStepIndex + 1) / steps.length * 100}%` }} />
          {name ?
            <div className="px-6 py-2 bg-base-200 font-semibold">
              {t("owner", { name })}
            </div> : null}
        </div>
        <TechnicianVisitProvider technicianVisit={visit}>
          <FormProvider {...methods}>
            {error && <div className="text-sm p-2 bg-error">{error}</div>}
            <form className="flex-1 flex flex-col overflow-hidden" onSubmit={onSubmit}>
              {/* Form step */}
              <div className="flex-1 overflow-auto">
                {step.form}
              </div>

              {/* Location banner */}
              {location ? <div className="px-4 py-1 bg-success text-sm inline-flex items-center gap-1">
                <LocateFixedIcon className="w-4 h-4" />
                {t("location is used")}
              </div> : isLocationLoading ? <div className="px-4 py-1 bg-base-300 text-sm inline-flex items-center gap-1">
                <LocateIcon className="w-4 h-4" />
                {t("location loading")}
              </div> : <div className="px-4 py-1 bg-error text-sm inline-flex items-center gap-1">
                <LocateOffIcon className="w-4 h-4" />
                {t("location not found")}
              </div>}

              {/* Form navigation */}
              <div className="grid grid-flow-col p-4 gap-2 sticky bottom-0 w-full border-t-2">
                <button disabled={isFirstStep || isSubmitting} className="btn btn-primary btn-outline" onClick={onBack} type="button">
                  {t("back")}
                </button>
                <button disabled={isSubmitting || isLastStep && !location} className="btn btn-primary" type="submit">
                  {
                    isSubmitting ? <span className="loading loading-spinner loading-md" /> :
                      isLastStep ? t("submit") : t("next")
                  }
                </button>
              </div>
            </form>
          </FormProvider>
        </TechnicianVisitProvider>
        <SuccessDialog
          title={t("submit success")}
          buttonLabel={t("to the farmer")}
          action={() => replace(`/farmer/${farmerId}`)}
          ref={dialog} />
      </PrivateRoute>
    </Navigation>
  </>
}

export const getStaticProps = getLocaleStaticsProps(["FarmChecklist", "Offline"])

export const getStaticPaths: GetStaticPaths<{ farmerId: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

