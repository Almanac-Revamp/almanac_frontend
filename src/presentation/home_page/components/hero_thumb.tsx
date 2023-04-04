import { getThumbnail } from '@src/data/api/config/image.static'
import Link from 'next/link'

export default function HeroThumb({ hero }) {
  return (
    <Link href={`/show/${hero._id}`}>
      <div className="flex px-6 py-3 transition duration-150 rounded-lg cursor-pointer hover:bg-PB">
        <div>
          <img className="object-cover object-center w-24 h-24 rounded-3xl" src={getThumbnail(hero.thumbName)} alt="Default" />
        </div>
        <div className="pt-2 pl-3">
          <ul className="text-paleViolet">
            <li className="text-lg font-semibold truncate w-36">{hero.name}</li>
            <li className="truncate w-36">{hero.title}</li>
            <li className="truncate w-36">
              {hero.className} &#8226; {hero.attackType}
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
}
