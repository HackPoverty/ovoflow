import { DISEASES, DISEASE_MAP, PresenceOfDisease, TechnicianVisit } from "@/types/content"
import { useController, useFormContext } from "react-hook-form"
import Label from "../Label"
import { useRef } from "react"

export default function FarmRedFlag() {
  const { register, watch } = useFormContext<TechnicianVisit>()
  const noDisease = watch("fieldDisease") === "No"

  return <div className="flex flex-col gap-4">
    <div className="form-control">
      <Label>Presence of Diseases</Label>
      <div className="flex bg-base-300 rounded-lg py-2">
        {
          PresenceOfDisease.map(value => <label key={`presence.${value}`} className="flex-1 text-center">
            <input type="radio" value={value} className="peer hidden" {...register("fieldDisease")} required />
            <span className="peer-checked:font-bold peer-checked:text-accent">{value}</span>
          </label>)
        }
      </div>
    </div>
    <CommonDiseaseInput />
    <div className="form-control">
      <Label>Other Diseases</Label>
      <input type="text" {...register("fieldOtherVaccine")} className="input input-accent" placeholder="List out other vaccines..." disabled={noDisease} />
    </div>
  </div>
}

function CommonDiseaseInput() {
  const { watch, control } = useFormContext<TechnicianVisit>();
  const { field } = useController({ control, name: "fieldDiseaseNames" })
  const dialog = useRef<HTMLDialogElement>(null);

  return <div>
    <Label>Common Diseases</Label>
    <input
      disabled={watch("fieldDisease") === "No"}
      type="button"
      onClick={() => dialog.current?.showModal()}
      className="input input-accent w-full text-left"
      value={`${field.value.length === 0 ? "None" : field.value.length} selected`} />
    <dialog className="modal" ref={dialog}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Choose diseases</h3>
        {
          DISEASES.map(disease => <div className="form-control" key={disease}>
            <label className="label cursor-pointer">
              {DISEASE_MAP.get(disease)}
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
          {/* if there is a button in form, it will close the modal */}
          <button type="button" className="btn" onClick={() => dialog.current?.close()}>Save</button>
        </div>
      </div>
    </dialog>
  </div>
}