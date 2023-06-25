export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="drawer">
  <input id="private-drawer" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col h-screen">
    {children}
  </div>
  <div className="drawer-side z-30">
    <label htmlFor="private-drawer" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
    </ul>
  </div>
</div>
}