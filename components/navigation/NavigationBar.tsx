import { ReactNode } from "react";

export default function NavigationBar({ title, button }: { title: string, button?: ReactNode }) {
  return <nav className="navbar bg-base-300 sticky top-0 z-20">
    {button}
    <div className="flex-1 px-4 font-semibold">{title}</div>
  </nav>
}