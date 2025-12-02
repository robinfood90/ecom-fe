import Link from "next/link"

export default function Navbar () {
  return(
    <nav>
      <ul className="flex items-center gap-8">
        <li><Link href="/">Home</Link></li>
      </ul>
    </nav>
  )
} 