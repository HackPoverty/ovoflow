import { ClipboardCheck } from "lucide-react";
import { forwardRef } from "react";

type Props = {
  title?: string,
  buttonLabel?: string,
  action: () => void
}

export default forwardRef<HTMLDialogElement, Props>(function SuccessDialog(props, ref) {
  return <dialog className="modal" ref={ref}>
    <div className="modal-box flex flex-col items-center gap-4">
      <ClipboardCheck className="text-success w-12 h-12" />
      <p>{props.title}</p>
      <button type="button" className="btn btn-success" onClick={props.action}>{props.buttonLabel}</button>
    </div>
  </dialog>
})

