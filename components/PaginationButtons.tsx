import Link from "next/link"

type Props = {
  prevLink?: string,
  nextLink?: string
}

export default function PaginationButtons({ prevLink, nextLink }: Props) {
  return <>
    <Link href={prevLink || "#"} className={`btn rounded-full ${prevLink ? "btn-primary" : "btn-disabled"}`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      previous
    </Link>
    {/* Next */}
    <Link href={nextLink || "#"} className={`btn rounded-full ${nextLink ? "btn-primary" : "btn-disabled"}`}>
      next
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  </>
}