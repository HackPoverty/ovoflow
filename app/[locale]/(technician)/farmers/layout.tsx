import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { ReactNode } from "react";

export const metadata = {
  title: "Farmers List | Ovoflow"
}

export default function Layout({ children }: { children: ReactNode }) {
  return <>
    <NavigationBar title="Farmers List" button={<MenuButton />} />
    {children}
  </>
}