import Link from "next/link";
import styles from "@/styles/background.module.css";

export default function NotFound() {
  return <div className={`min-h-screen flex flex-col items-center justify-center gap-6 ${styles.fancy}`}>
    <title>Page not found | Ovoflow</title>
    <h1 className="text-white">Page not found</h1>
    <Link href="/" className="btn btn-secondary">Return to home</Link>
  </div>
}