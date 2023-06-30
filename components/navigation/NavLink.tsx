"use client"

import Link from "next-intl/link";
import { useSelectedLayoutSegment } from "next/navigation";
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
  const segment = useSelectedLayoutSegment()
  const isActive = active === segment;

  return <li className="my-1" onClick={close}>
    <Link {...props} className={`py-4 ${isActive ? "font-semibold bg-base-300" : ""} ${className}`} />
  </li>
}