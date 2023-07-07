import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps } from "react";

type Props = {
  active?: string
} & ComponentProps<typeof Link>

function close() {
  if (!document) return;
  let checkbox = document.querySelector<HTMLInputElement>("input#private-drawer")
  if (!checkbox) return;
  checkbox.checked = !checkbox.checked
}

export default function NavLink({ className, active, ...props }: Props) {
  const {route} = useRouter()
  const isActive = active === route;

  return <li className="my-1" onClick={close}>
    <Link {...props} className={`py-4 ${isActive ? "font-semibold bg-base-300" : ""} ${className}`} />
  </li>
}