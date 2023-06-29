import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { ReactNode } from "react";
import { getFarmerName } from "../../farmer/[id]/(dashboard)/layout";

type Props = {
  params: {
    id: string
  },
  children: ReactNode
}

export const metadata = {
  title: "Farmer Checklist | Ovoflow"
}

export default async function Layout({ children, params }: Props) {
  const name = await getFarmerName(params.id);
  const title = name ? `Checklist for ${name}` : "Farmer Checklist"

  return <>
    <NavigationBar title={title} button={<BackButton />} />
    {children}
  </>;
}