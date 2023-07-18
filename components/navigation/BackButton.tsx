import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="btn-ghost btn-circle btn" onClick={router.back}>
      <ArrowLeft />
    </button>
  );
}
