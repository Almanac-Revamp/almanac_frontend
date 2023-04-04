import { Fragment } from 'react'
import { getIcon } from '@src/data/api/config/image.static'
import _ from 'lodash'

export default function AttackSpeedCard({ mode, attackSpeed }) {
  return (
    <Fragment>
      <div className="flex items-center my-3 text-2xl font-bold text-paleViolet">
        <img src={getIcon('attack_speed.png')} className="inline w-5 h-5 mr-3" />
        Attack Speed
      </div>
      <div className="flex flex-wrap py-3 overflow-auto gap-y-1 h-26 bg-darkViolet rounded-xl">
        {_.map(attackSpeed, (stat, index) => (
          <div key={index} className="flex flex-wrap w-1/2 px-4 py-2 text-sm uppercase text-paleViolet">
            <div className="font-bold">{stat.key}</div>
            <span className="mr-1">:</span>
            {stat.key == 'Bonus Attack Speed'
              ? mode
                ? '0% - ' + Math.round(parseFloat(stat.value) * 17 * 100) / 100 + '%'
                : stat.value + '%'
              : stat.value}
          </div>
        ))}
      </div>
    </Fragment>
  )
}
