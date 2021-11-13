import Link from "next/link"
import { getThumbnail } from "../services/get"

export default function HeroThumb({ hero }) {
  return (
    <Link href={`/show/${hero._id}`}>
      <div className="flex py-3 px-6 cursor-pointer transition duration-150 rounded-lg hover:bg-PB">
        <div>
          <img className="rounded-3xl w-24 h-24 object-cover object-center"
          src={hero.thumbName ? getThumbnail(hero.thumbName) : '/images/default.jpg'}
          alt="Default" />
        </div>
        <div className="pl-3 pt-2">
          <ul className="text-paleViolet">
            <li className="font-semibold text-lg w-36 truncate">
              { hero.name }
            </li>
            <li className="w-36 truncate">
              { hero.title }
            </li>
            <li className="w-36 truncate">
              { hero.className } &#8226; { hero.attackType }
            </li>
          </ul>
        </div>
      </div>
    </Link>
  )
}