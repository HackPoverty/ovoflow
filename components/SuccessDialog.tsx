import { forwardRef } from "react";

type Props = {
  title?: string,
  buttonLabel?: string,
  action: () => void
}

export default forwardRef<HTMLDialogElement, Props>(function SuccessDialog(props, ref) {
  return <dialog className="modal" ref={ref}>
    <div className="modal-box flex flex-col items-center gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-success w-12 h-12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
      </svg>
      <p>{props.buttonLabel}</p>
      <button type="button" className="btn btn-success" onClick={props.action}>{props.buttonLabel}</button>
    </div>
  </dialog>
})

