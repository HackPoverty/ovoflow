import Link from "next-intl/link";

export default function LogoutButton() {
  return <li className="p-2"><Link className="text-error" href="/logout">Logout</Link></li>
}