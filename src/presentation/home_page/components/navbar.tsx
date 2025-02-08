import Link from 'next/link'

export const NavBar = () => {
  return (
    <div className="sticky top-0 z-50 flex items-center w-full h-16 px-4 shadow-lg bg-darkViolet">
      <div className="px-2 py-1 text-3xl font-bold text-white">
        <Link href="/"> Almanac </Link>
      </div>
      <div className="navButton">
        <Link href="/upload"> Upload </Link>
      </div>
    </div>
  )
}
