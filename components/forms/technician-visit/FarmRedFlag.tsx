import { useTranslations } from "next-intl"
import { forwardRef, useRef } from "react"
import { useController, useFormContext } from "react-hook-form"
import Label from "../Label"
import { TechnicianVisitFormSchema } from "./schema"
import { useTechnicianVisitContext } from "./context"

export default function FarmRedFlag() {
  const { register, watch, formState: {errors} } = useFormContext<TechnicianVisitFormSchema>()
  const [presense, common, other] = watch(["fieldDisease", "fieldDiseaseNames", "fieldOtherpossibledisease"])
  const noDiseases = presense === "No"
  const t = useTranslations("FarmChecklist")
  const dialogRef = useRef<HTMLDialogElement>(null);

  return <div className="flex flex-col gap-4">
    <div>
      <Label required>{t("presense of diseases")}</Label>
      <PresenceOfDiseaseInput />
    </div>
    <div className="form-control">
      <Label required={common.length > 0 || (!noDiseases && !other)}>{t("common diseases")}</Label>
      <input
        disabled={noDiseases}
        type="button"
        className="input input-accent text-left"
        value={t("selected dieases", { count: common.length })}
        onClick={() => { dialogRef.current?.showModal() }}
      />
      <CommonDiseaseInputDialog ref={dialogRef} onClose={() => { dialogRef.current?.close() }} />
    </div>
    <div className="form-control">
      <Label required={!!other || (!noDiseases && common.length <= 0)}>{t("other diseases")}</Label>
      <input
        disabled={noDiseases}
        type="text"
        {...register("fieldOtherpossibledisease")}
        className="input input-accent"
        placeholder="List out other vaccines..." />
    </div>
    {errors.fieldDiseaseNames ? <div className="text-error text-sm">{errors.fieldDiseaseNames?.message}</div> : null}
  </div>
}

function PresenceOfDiseaseInput() {
  const { presences } = useTechnicianVisitContext()
  const { setValue, control } = useFormContext<TechnicianVisitFormSchema>()
  const { field } = useController({ control, name: "fieldDisease" })

  return <div className="py-2 join w-full">
    {presences.map(p => <button type="button"
      className={`btn join-item flex-1 ${(p.value === field.value ? "btn-accent" : "")}`}
      key={p.value}
      onClick={() => {
        field.onChange(p.value)
        if (p.value !== "No") return;
        setValue("fieldDiseaseNames", [])
        setValue("fieldOtherpossibledisease", undefined)
      }}>{p.description}</button>)}
  </div>
}

const CommonDiseaseInputDialog = forwardRef<HTMLDialogElement, { onClose: () => void }>(function CommonDiseaseInputDialog({ onClose }, ref) {
  const { control } = useFormContext<TechnicianVisitFormSchema>()
  const { field } = useController({ control, name: "fieldDiseaseNames" })
  const { diseases } = useTechnicianVisitContext()
  const t = useTranslations("FarmChecklist")

  return <dialog className="modal" ref={ref}>
    <div className="modal-box">
      <h3 className="font-bold text-lg">Choose diseases</h3>
      {diseases.map(disease => <div key={disease.value}>
        <label className="label cursor-pointer">
          {disease.description}
          <input
            formNoValidate
            type="checkbox"
            className="checkbox"
            checked={field.value.includes(disease.value)}
            onChange={(e) => {
              if (e.currentTarget.checked) field.onChange([...field.value, disease.value])
              else field.onChange(field.value.filter(v => v !== disease.value))
            }} />
        </label>
      </div>)}
      <div className="modal-action">
        <button type="button" className="btn" onClick={onClose}>Save</button>
      </div>
    </div>
  </dialog>
})