import { useRef } from "react"
import { useController, useFormContext } from "react-hook-form"
import ErrorMessage from "../ErrorMeesge"
import Label from "../Label"
import { DISEASES, Disease, PRESENCE_OPTIONS, TechnicianVisitSchema } from "./schema"

export default function FarmRedFlag() {
  const { register, control, formState: { errors }, setValue, watch } = useFormContext<TechnicianVisitSchema>()
  const { field: presence } = useController({ control, name: "fieldDisease" })
  const diseases =  watch("fieldDiseaseNames")
  const disabled = !presence.value || presence.value === "No"

  return <div className="flex flex-col gap-4">
    <div>
      <Label required>Presence of Diseases</Label>
      <div className="py-2 join w-full">
        {PRESENCE_OPTIONS.map(value =>
          <button type="button"
            className={`btn join-item flex-1 ${(value === presence.value ? "btn-accent" : "")}`}
            key={value}
            onClick={() => {
              presence.onChange(value)
              if (value !== "No") return;
              setValue("fieldDiseaseNames", [])
              setValue("fieldOtherpossibledisease", undefined)
            }}>{value}</button>)}
      </div>
      <ErrorMessage>{errors.fieldDisease && "Required"}</ErrorMessage>
    </div>
    <CommonDiseaseInput />
    <div className="form-control">
      <Label required={!(disabled || diseases.length > 0)}>Other Diseases</Label>
      <input
        type="text"
        {...register("fieldOtherpossibledisease")}
        className="input input-accent"
        placeholder="List out other vaccines..."
        disabled={disabled} />
    </div>
  </div>
}

function CommonDiseaseInput() {
  const { watch, control } = useFormContext<TechnicianVisitSchema>();
  const [hasDisease, other] = watch(["fieldDisease", "fieldOtherpossibledisease"]);
  const { field } = useController({ control, name: "fieldDiseaseNames" })
  const dialog = useRef<HTMLDialogElement>(null);
  const disabled = !hasDisease || hasDisease === "No";

  return <div>
    <Label required={!disabled && !other}>Common Diseases</Label>
    <input
      disabled={disabled}
      type="button"
      onClick={() => dialog.current?.showModal()}
      className="input input-accent w-full text-left"
      value={`${field.value.length === 0 ? "None" : field.value.length} selected`} />
    <dialog className="modal" ref={dialog}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Choose diseases</h3>
        {
          (Object.keys(DISEASES) as Array<Disease>).map(disease => <div className="form-control" key={disease}>
            <label className="label cursor-pointer">
              {DISEASES[disease]}
              <input
                formNoValidate
                type="checkbox"
                className="checkbox"
                checked={field.value.includes(disease)}
                onChange={(e) => {
                  let value = [...field.value];
                  if (e.currentTarget.checked) value.push(disease)
                  else {
                    const index = value.indexOf(disease)
                    if (index > -1) value.splice(index, 1)
                  }
                  field.onChange(value)
                }} />
            </label>
          </div>)
        }
        <div className="modal-action">
          <button type="button" className="btn" onClick={() => dialog.current?.close()}>Save</button>
        </div>
      </div>
    </dialog>
  </div>
}