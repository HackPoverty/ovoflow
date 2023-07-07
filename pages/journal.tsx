import SuccessDialog from "@/components/SuccessDialog";
import { ChickenEggProduction, ChickenFeeding, ChickenStock, processFormData } from "@/components/forms/farmer-journal";
import Confirmation from "@/components/forms/farmer-journal/Confirmation";
import Note from "@/components/forms/farmer-journal/Note";
import { FarmerJournalSchema, useFarmerJournalFormSchema } from "@/components/forms/farmer-journal/schema";
import Navigation from "@/components/layouts/Navigation";
import { PrivateRoute } from "@/components/layouts/PrivateRoute";
import BackButton from "@/components/navigation/BackButton";
import { FormStep, useMutistepForm } from "@/hooks/useMultiStepForm";
import { jsonApiPost } from "@/lib/axios";
import { FARMER_ROLE } from "@/lib/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { GetStaticPropsContext } from "next";
import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";


export default function FarmerJournal() {
  const [error, setError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const t = useTranslations("FarmerJournal")
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

    try {
      await jsonApiPost("node/farmer_daily_journal", processed)
      dialog.current?.showModal()
    } catch (e) {
      setError(true)

    }
  });

  const isSubmitting = methods.formState.isSubmitting;

  return <PrivateRoute role={FARMER_ROLE}>
    <Head>
      <title>{t("new journal")}</title>
    </Head>
    <Navigation title={t("new journal")} buttonNav={<BackButton />}>
      <main className="flex-1 flex flex-col overflow-hidden">
        {error && <div className="text-sm p-2 bg-error">{t("submit error")}</div>}
        <div className="px-6 py-4 shadow">
          <p className="text-neutral">{t("step", { now: currentStepIndex + 1, total: steps.length })}</p>
          <h1>{step.title}</h1>
        </div>
        <FormProvider {...methods}>
          <form className="flex-1 flex flex-col overflow-hidden" onSubmit={onSubmit}>
            <div className="flex-1 overflow-auto" ref={ref}>
              {step.form}
            </div>
            <div className="grid grid-cols-2 px-6 py-4 gap-2 shadow bg-base-100">
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

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}