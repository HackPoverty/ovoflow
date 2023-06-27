import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
  return <>
    <NavigationBar title="Technician Visit" button={<BackButton />} />
    {children}
  </>
}