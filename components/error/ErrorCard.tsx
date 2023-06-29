export default function ErrorCard({ reset }: { reset?: () => void }) {
  return <div className="bg-error rounded-md p-4 min-h-[120px] flex flex-col gap-2 justify-between" onClick={reset}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="stroke-currentshrink-0 w-10 h-10">
      <path strokeLinecap="round" stroke-width="2" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
    <div className="text-sm">Failed to fetch data, tap to try again</div>
  </div>
}