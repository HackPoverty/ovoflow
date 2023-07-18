import { Menu } from "lucide-react";
import { ReactNode } from "react";

type Props = {
  title: string;
  buttonNav?: ReactNode;
  children?: ReactNode;
  drawer?: ReactNode;
};

export default function Navigation({ title, buttonNav, drawer, children }: Props) {
  return (
    <div className="drawer">
      <input id="private-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex h-screen flex-col">
        <nav className="navbar z-20 bg-base-300">
          {buttonNav || (
            <label
              htmlFor="private-drawer"
              className="btn-ghost btn-circle btn flex-none cursor-pointer"
            >
              <Menu />
            </label>
          )}
          <div className="flex-1 px-4 font-semibold">{title}</div>
        </nav>
        {children}
      </div>
      <div className="drawer-side z-30">
        <label htmlFor="private-drawer" className="drawer-overlay"></label>
        <ul className="menu h-full w-60 bg-base-200 text-base-content">{drawer}</ul>
      </div>
    </div>
  );
}
