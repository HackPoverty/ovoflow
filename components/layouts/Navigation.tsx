import { Menu } from 'lucide-react'
import { ReactNode } from "react"

type Props = {
  title: string,
  buttonNav?: ReactNode,
  children?: ReactNode,
  drawer?: ReactNode
}

export default function Navigation({ title, buttonNav, drawer, children }: Props) {
  return <div className="drawer">
    <input id="private-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex flex-col h-screen">
      <nav className="navbar bg-base-300 z-20">
        {buttonNav || <label htmlFor="private-drawer" className="btn btn-circle btn-ghost flex-none cursor-pointer">
          <Menu />
        </label>}
        <div className="flex-1 px-4 font-semibold">{title}</div>
      </nav>
      {children}
    </div>
    <div className="drawer-side z-30">
      <label htmlFor="private-drawer" className="drawer-overlay"></label>
      <ul className="menu w-60 h-full bg-base-200 text-base-content">
        {drawer}
      </ul>
    </div>
  </div>
}