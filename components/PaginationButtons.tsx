import { useTranslations } from "next-intl"
import Link from "next/link"

type Props = {
  onPrevious?: string,
  onNext?: string
}

export default function PaginationButtons({ onPrevious, onNext }: Props) {
  const t = useTranslations("ListNavigation")

  return <>
    <Link href={onPrevious || "#"} className={`btn rounded-full ${onPrevious ? "btn-primary" : "btn-disabled"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      {t("previous")}
    </Link>
    {/* Next */}
    <Link href={onNext || "#"} className={`btn rounded-full ${onNext ? "btn-primary" : "btn-disabled"}`}>
      {t("next")}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  </>
}