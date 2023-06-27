import BackButton from "@/components/navigation/BackButton";
import NavigationBar from "@/components/navigation/NavigationBar";

type Props = {
  params: {
    id: string
  }
}

export default function FarmerDetail({params}: Props) {
  return <>
    <NavigationBar title="Farmer Detail" button={<BackButton />} />
    <main className="px-6 pt-6 pb-16">
      <p>Id: {params.id}</p>
    </main>
  </>
}