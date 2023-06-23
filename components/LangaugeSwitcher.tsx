export default function LangaugeSwitcher() {
  return <div className="rounded-lg bg-base-300 shadow-xl w-full p-2 flex flex-row">
    <label className="flex-1 text-center">
      <input name="lang" type="radio" className="peer hidden" checked />
      <span className="peer-checked:font-bold">English</span>
    </label>
    <label className="flex-1 text-center">
      <input name="lang" type="radio" className="peer hidden" />
      <span className="peer-checked:font-bold">Português</span>
    </label>
  </div>
}