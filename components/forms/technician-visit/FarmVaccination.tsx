import { useRef } from "react";
import { useController, useFormContext } from "react-hook-form";
import { TechnicianVisitSchema, VACCINES, Vaccine } from "./schema";
import Label from "../Label";

export default function FarmVaccination() {
  const { register, watch, setValue } = useFormContext<TechnicianVisitSchema>()
  const [given, vaccines] = watch(["fieldVaccineGiven", "fieldVaccinations"])

  return <div className="flex flex-col gap-4">
    <div className="bg-base-300 p-2 rounded-lg">
      <label className="label cursor-pointer">
        Were vaccine given?
        <input type="checkbox" {...register("fieldVaccineGiven", {
          onChange(e) {
            if (e.target.checked) return
            setValue("fieldVaccinations", [])
            setValue("fieldOtherVaccine", undefined)
          }
        })} className="checkbox checkbox-accent" />
      </label>
    </div>
    <CommonVaccineInput />
    <div className="form-control">
      <Label required={given && vaccines.length <= 0}>Other Vaccines</Label>
      <input 
        type="text" 
        {...register("fieldOtherVaccine")} 
        className="input input-accent" 
        placeholder="List out other vaccines..." 
        disabled={!given} />
    </div>
  </div>
}

function CommonVaccineInput() {
  const { watch, control } = useFormContext<TechnicianVisitSchema>();
  const { field } = useController({ control, name: "fieldVaccinations" })
  const dialog = useRef<HTMLDialogElement>(null);
  const [given, other] = watch(["fieldVaccineGiven", "fieldOtherVaccine"])

  return <div>
    <Label required={given && !other}>Common Vaccines</Label>
    <input
      disabled={!given}
      type="button"
      onClick={() => dialog.current?.showModal()}
      className="input input-accent w-full text-left"
      value={`${field.value.length === 0 ? "None" : field.value.length} selected`} />
    <dialog className="modal" id="vaccines" ref={dialog}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Choose vaccines</h3>
        {
          (Object.keys(VACCINES) as Array<Vaccine>).map(vaccine => <div className="form-control" key={vaccine}>
            <label className="label cursor-pointer">
              {VACCINES[vaccine]}
              <input
                type="checkbox"
                className="checkbox"
                formNoValidate
                checked={field.value.includes(vaccine)}
                onChange={(e) => {
                  let value = [...field.value];
                  if (e.currentTarget.checked) value.push(vaccine)
                  else {
                    const index = value.indexOf(vaccine)
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