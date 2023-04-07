import Link from 'next/link'
import { useRouter } from 'next/router'

export const NavBar = () => {
  const router = useRouter()

  return (
    <div className="sticky top-0 z-50 flex items-center w-full h-16 px-4 bg-darkViolet">
      <div className="px-2 py-1 text-3xl font-bold text-white cursor-pointer" onClick={() => router.push('/')}>
        Almanac
      </div>
      <div className="cursor-pointer navButton" onClick={() => router.push('/upload')}>
        Upload
      </div>
    </div>
  )
}
