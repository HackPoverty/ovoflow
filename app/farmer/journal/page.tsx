import MenuButton from "@/components/navigation/MenuButton";
import NavigationBar from "@/components/navigation/NavigationBar";
import { useMutistepForm } from "@/hooks/useMultiStepForm";

export default function FarmerJournal() {
  return <>
    <NavigationBar title="Journal" button={<MenuButton />} />
    <main className="px-6 pt-6 pb-16">

    </main>
  </>
}