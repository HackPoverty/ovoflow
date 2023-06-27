import { TechnicianVisit, VACCINES, VACCINE_MAP } from "@/types/content";
import { useRef } from "react";
import { useController, useFormContext } from "react-hook-form";

export default function FarmVaccination() {
  const { register, watch } = useFormContext<TechnicianVisit>()

  return <div className="flex flex-col gap-4">
    <div className="bg-base-300 p-2 rounded-lg">
      <label className="label cursor-pointer">
        Were vaccine given?
        <input type="checkbox" {...register("fieldVaccineGiven")} className="checkbox checkbox-accent" />
      </label>
    </div>
    <CommonVaccineInput />
    <div className="form-control">
      <label className="label"><span className="label-text">Other Vaccine</span></label>
      <input type="text" {...register("fieldOtherVaccine")} className="input input-accent" placeholder="List out other vaccines..." disabled={!watch("fieldVaccineGiven")} />
    </div>
  </div>
}

function CommonVaccineInput() {
  const { watch, control } = useFormContext<TechnicianVisit>();
  const { field } = useController({ control, name: "fieldVaccinations" })
  const dialog = useRef<HTMLDialogElement>(null);


  return <div>
    <label className="label"><span className="label-text">Common Vaccines</span></label>
    <input
      disabled={!watch("fieldVaccineGiven")}
      type="button"
      onClick={() => dialog.current?.showModal()}
      className="input input-accent w-full text-left"
      value={`${field.value.length === 0 ? "None" : field.value.length} selected`} />
    <dialog className="modal" id="vaccines" ref={dialog}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">Choose vaccines</h3>
        {
          VACCINES.map(vaccine => <div className="form-control" key={vaccine}>
            <label className="label cursor-pointer">
              {VACCINE_MAP.get(vaccine)}
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
          {/* if there is a button in form, it will close the modal */}
          <button type="button" className="btn" onClick={() => dialog.current?.close()}>Save</button>
        </div>
      </div>
    </dialog>
  </div>
}