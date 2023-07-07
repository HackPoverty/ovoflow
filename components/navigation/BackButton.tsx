import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/router'

export default function BackButton() {
  const router = useRouter()

  return <button className="btn btn-circle btn-ghost" onClick={router.back}>
    <ArrowLeft />
  </button>
}