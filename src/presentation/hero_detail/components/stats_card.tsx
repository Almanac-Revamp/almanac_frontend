import _ from 'lodash'
import classNames from 'classnames'
import { getIcon } from '@src/data/api/config/image.static'

export default function StatsCard({ mode, stats, resource }) {
  return (
    <div className="flex flex-wrap py-3 overflow-auto gap-y-1 bg-darkViolet rounded-xl">
      {_.map(stats, (stat, index) => (
        <div key={index} className={classNames('text-paleViolet text-sm uppercase', { 'w-1/2': stat.base })}>
          {stat.base && (
            <div className="flex px-4 py-2">
              <img src={getIcon(stat.name == 'Secondary Bar' ? 'mana_regen.png' : `${_.snakeCase(stat.name)}.png`)} className="w-4 h-4 mr-2" />
              <div className="w-1/2 font-bold truncate">{stat.name}</div>
              <span className="mr-1">:</span>
              {stat.name == 'Crit Damage' || stat.name == 'Secondary Bar' || (stat.name == 'Mana' && resource == 'N/A')
                ? stat.base
                : parseFloat(stat.base)}
              {parseFloat(stat.growth)
                ? mode
                  ? ' - ' + Math.round((parseFloat(stat.base) + parseFloat(stat.growth) * 17) * 100) / 100
                  : ' (+' + parseFloat(stat.growth) + ')'
                : ''}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
