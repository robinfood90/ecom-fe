import Link from "next/link"

export default function Navbar () {
  return(
    <nav>
      <ul className="flex items-center gap-8">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/recipe">Recipes</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  )
} 