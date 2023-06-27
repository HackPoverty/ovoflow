"use client"

import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";

type Props = {
  active: string
} & ComponentProps<"a">

export default function NavLink({ className, active, ...props }: Props) {
  const segment = useSelectedLayoutSegment()
  const isActive = active === segment;

  return <li className={`${isActive ? "bg-base-300" : " "} rounded-md p-2`}>
    <a {...props} className={`${isActive ? "font-semibold" : ""} ${className}`} />
  </li>
}