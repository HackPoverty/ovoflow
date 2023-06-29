import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";

import { Metadata, ResolvingMetadata } from "next";
import { ReactNode } from "react";
import { getFarmerName } from "../../(dashboard)/layout";


type Props = {
  children: ReactNode,
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata) {
  const name = await getFarmerName(params.id)
  const possessive = name ? `${name}'s` : ""

  return {
    title: `${possessive} Farm Visits | Ovoflow`
  } as Metadata
}

export default async function Layout({ children, params }: Props) {
  const name = await getFarmerName(params.id)
  const possessive = name ? `${name}'s` : ""

  return <>
    <NavigationBar title={`${possessive} Farm Visits`} button={<BackButton />} />
    {children}
  </>
}