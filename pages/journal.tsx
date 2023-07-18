import SuccessDialog from "@/components/SuccessDialog";
import { ChickenEggProduction, ChickenFeeding, ChickenStock } from "@/components/forms/farmer-journal";
import Confirmation from "@/components/forms/farmer-journal/Confirmation";
import Note from "@/components/forms/farmer-journal/Note";
import { FarmerJournalSchema, useFarmerJournalFormSchema } from "@/components/forms/farmer-journal/schema";
import Navigation from "@/components/layouts/Navigation";
import { PrivateRoute } from "@/components/layouts/PrivateRoute";
import BackButton from "@/components/navigation/BackButton";
import { FormStep, useMutistepForm } from "@/hooks/useMultiStepForm";
import { useNavigatorOnline } from "@/hooks/useNavigatorOnline";
import { jsonApiPost } from "@/lib/axios";
import { ServerError } from "@/lib/error";
import { getLocaleStaticsProps } from "@/lib/i18n";
import { offlineDB } from "@/lib/offline/db";
import { processJournal } from "@/lib/process";
import { FARMER_ROLE } from "@/lib/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";


export default function FarmerJournal() {
  const t = useTranslations("FarmerJournal")
  const [error, setError] = useState("")
  const dialog = useRef<HTMLDialogElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isOnline = useNavigatorOnline()

  const { trigger, isMutating } = useSWRMutation("node/farmer_daily_journal",
    async (key, { arg }: { arg: FarmerJournalSchema }) => {
      if (isOnline) {
        await jsonApiPost(key, processJournal(arg))
      } else {
        await offlineDB.farmerJournal.add({
          value: arg
        })
      }
    },
    {
      onSuccess() {
        dialog.current?.showModal()
      },
      onError(e) {
        if (e instanceof ServerError) setError(t("submit error"))
      }
    }
  )

  const {
    chickenStockSchema,
    eggProductionSchema,
    chickenFeedSchema,
    commentSchema,
    journalSchema
  } = useFarmerJournalFormSchema()
  const formSteps = [
    { title: t("stock"), form: <ChickenStock />, schema: chickenStockSchema },
    { title: t("eggs production"), form: <ChickenEggProduction />, schema: eggProductionSchema },
    { title: t("feeding"), form: <ChickenFeeding />, schema: chickenFeedSchema },
    { title: t("note"), form: <Note />, schema: commentSchema },
    { title: t("review"), form: <Confirmation />, schema: journalSchema }
  ] satisfies FormStep[];

  const {
    currentStepIndex,
    steps,
    isFirstStep,
    isLastStep,
    step,
    back,
    next } = useMutistepForm(formSteps)

  const methods = useForm<FarmerJournalSchema>({
    resolver: zodResolver(step.schema),
  });

  const onBack = () => {
    setError("")
    back()
    ref.current?.scrollTo({ top: 0 })
  }

  const onSubmit = methods.handleSubmit(async (data) => {
    setError("")
    if (isLastStep) {
      trigger(data);
    } else {
      next()
      ref.current?.scrollTo({ top: 0 })
      return
    }
  });

  const isSubmitting = methods.formState.isSubmitting || isMutating;

  return <PrivateRoute role={FARMER_ROLE}>
    <Head>
      <title>{t("new journal")}</title>
    </Head>
    <Navigation title={step.title} buttonNav={<BackButton />}>
      <main className="flex-1 flex flex-col overflow-hidden">
        {error && <div className="text-sm p-2 bg-error">{error}</div>}
        <div className="bg-primary py-1" style={{ width: `${(currentStepIndex + 1) / steps.length * 100}%` }} />
        <FormProvider {...methods}>
          <form className="flex-1 flex flex-col overflow-hidden" onSubmit={onSubmit}>
            <div className="flex-1 overflow-auto" ref={ref}>
              {step.form}
            </div>
            <div className="grid grid-cols-2 px-6 py-4 gap-2 bg-base-100 border-t-2">
              <button disabled={isFirstStep || isSubmitting}
                className="btn btn-primary btn-outline flex-1"
                onClick={onBack}
                type="button">{t("back")}</button>
              <button disabled={isSubmitting} className="btn btn-primary flex-1" type="submit">
                {
                  isSubmitting ? <span className="loading loading-spinner loading-md" /> :
                    isLastStep ? t("submit") : t("next")
                }
              </button>
            </div>
          </form>
        </FormProvider>
      </main>
      <SuccessDialog title={t("submit success")} buttonLabel={t("go to dashboard")} action={() => router.replace("/dashboard")} ref={dialog} />
    </Navigation>
  </PrivateRoute>
}

export const getStaticProps = getLocaleStaticsProps(["FarmerJournal", "Offline"])