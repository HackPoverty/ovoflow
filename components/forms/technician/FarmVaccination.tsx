import { TechnicianVisit, VACCINES, VACCINE_MAP } from "@/types/content";
import { useController, useFormContext } from "react-hook-form";

export default function FarmVaccination() {
  const { register, watch } = useFormContext<TechnicianVisit>()

  return <div>
    <div className="form-control bg-base-300 my-4 p-2 rounded-lg">
      <label className="label cursor-pointer">
        Were vaccine given?
        <input type="checkbox" {...register("fieldVaccineGiven")} className="checkbox checkbox-accent" />
      </label>
    </div>
    <CommonVaccineInput />
    <div className="form-control my-4">
      <label className="label"><span className="label-text">Other Vaccine</span></label>
      <input type="text" {...register("fieldOtherVaccine")} className="input input-accent" placeholder="List out other vaccines..." disabled={!watch("fieldVaccineGiven")} />
    </div>
  </div>
}

function CommonVaccineInput() {
  const { watch, control } = useFormContext<TechnicianVisit>();
  const { field } = useController({ control, name: "fieldVaccinations" })

  return <div className="my-4">
    <label className="label"><span className="label-text">Common Vaccines</span></label>
    <input
      disabled={!watch("fieldVaccineGiven")}
      type="button"
      onClick={() => (window as any).vaccine_modal.showModal()}
      className="input input-accent w-full text-left"
      value={`${field.value.length === 0 ? "None" : field.value.length} selected`} />
    <dialog className="modal" id="vaccine_modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Choose vaccines</h3>
        {
          VACCINES.map(vaccine => <div className="form-control" key={vaccine}>
            <label className="label cursor-pointer">
              {VACCINE_MAP.get(vaccine)}
              <input
                type="checkbox"
                className="checkbox"
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
          <button className="btn">Save</button>
        </div>
      </form>
    </dialog>
  </div>
}