import Link from "next/link";

export default function NavBar() {
  return (
    <div className="flex items-center w-full h-16 bg-darkViolet px-4 sticky top-0 z-50">
    <div className="font-bold text-3xl px-2 py-1 text-white">
      <Link href="/"> Almanac </Link>
    </div>
    <div className="navButton">
      <Link href="/upload"> Upload </Link>
    </div>
  </div>
  )
}