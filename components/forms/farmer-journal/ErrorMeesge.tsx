import { PropsWithChildren } from "react";

export default function ErrorMessage(props: PropsWithChildren) {
  return <span className="label-text text-error text-right col-span-2">{props.children}</span>
}