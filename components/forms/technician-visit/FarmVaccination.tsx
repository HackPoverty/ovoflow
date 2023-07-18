import { useTranslations } from "next-intl";
import { forwardRef, useRef, useTransition } from "react";
import { useController, useFormContext } from "react-hook-form";
import Label from "../Label";
import { TechnicianVisitFormSchema } from "./schema";
import { useTechnicianVisitContext } from "./context";

export default function FarmVaccination() {
  const { register, watch, setValue, formState: {errors} } = useFormContext<TechnicianVisitFormSchema>()
  const [given, vaccines, other] = watch(["fieldVaccineGiven", "fieldVaccinations", "fieldOtherVaccine"])
  const t = useTranslations("FarmChecklist")
  const dialogRef = useRef<HTMLDialogElement>(null)

  return <div className="flex flex-col gap-4 p-4">
    <div className="bg-base-300 p-2 rounded-lg">
      <label className="label cursor-pointer">
        {t("were vaccine given")}
        <input type="checkbox" {...register("fieldVaccineGiven", {
          onChange(e) {
            if (e.target.checked) return
            setValue("fieldVaccinations", [])
            setValue("fieldOtherVaccine", undefined)
          }
        })} className="checkbox checkbox-accent" />
      </label>
    </div>
    <div className="form-control">
      <Label required={vaccines.length > 0 || (given && !other)}>{t("common vaccines")}</Label>
      <input
        type="button"
        className="input input-accent text-left"
        value={t("selected vaccines", { count: vaccines.length })}
        onClick={() => dialogRef.current?.showModal()}
        disabled={!given}
      />
      <CommonVaccineInputDialog ref={dialogRef} onClose={() => { dialogRef.current?.close() }} />
    </div>
    <div className="form-control">
      <Label required={!!other || (given && vaccines.length <= 0)}>{t("other vaccines")}</Label>
      <input
        type="text"
        {...register("fieldOtherVaccine")}
        className="input input-accent"
        placeholder="List out other vaccines..."
        disabled={!given}
      />
    </div>
    <div className="text-error text-sm">{errors.fieldVaccinations?.message}</div>
  </div>
}

const CommonVaccineInputDialog = forwardRef<HTMLDialogElement, { onClose: () => void }>(function CommonVaccineInputDialog({ onClose }, ref) {
  const { vaccines } = useTechnicianVisitContext()
  const { control } = useFormContext<TechnicianVisitFormSchema>()
  const { field } = useController({ control, name: "fieldVaccinations" })
  const t = useTranslations("FarmChecklist")


  return <dialog className="modal" ref={ref}>
    <div className="modal-box">
      <h3 className="font-bold text-lg">{t("choose vaccines")}</h3>
      {vaccines.map(({ value, description }) => <div className="form-control" key={value}>
        <label className="label cursor-pointer">
          {description}
          <input
            type="checkbox"
            className="checkbox"
            formNoValidate
            checked={field.value.includes(value)}
            onChange={(e) => {
              if (e.currentTarget.checked) field.onChange([...field.value, value])
              else field.onChange(field.value.filter(vaccine => vaccine !== value))
            }} />
        </label>
      </div>)}
      <div className="modal-action">
        <button type="button" className="btn" onClick={onClose}>{t("save")}</button>
      </div>
    </div>
  </dialog>
})