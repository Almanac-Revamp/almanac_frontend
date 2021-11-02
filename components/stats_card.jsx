import _ from "lodash";
import classNames from "classnames";

export default function StatsCard({ mode, stats, resource }) {
  const getIcon = (head) => {
    return head == 'Secondary Bar' ? `/images/icons/mana_regen.png` : `/images/icons/${_.snakeCase(head)}.png`;
  }

  return (
    <div className="flex flex-wrap gap-y-1 overflow-auto bg-darkViolet rounded-xl py-3">
      {_.map(stats, (stat, index) => (
        <div key={index} className={classNames("text-paleViolet text-sm uppercase", {"w-1/2": stat.base})}>
          {stat.base && (
            <div className="flex px-4 py-2">
              <img src={getIcon(stat.name)} className="w-4 h-4 mr-2"/>
              <div className="truncate w-1/2 font-bold">{ stat.name }</div><span className="mr-1">:</span>
              { stat.name == 'Crit Damage' || stat.name == 'Secondary Bar' || (stat.name == 'Mana' && resource == 'N/A') ? stat.base : parseFloat(stat.base) }
              {
                parseFloat(stat.growth) ?
                ( mode ? ' - ' + (Math.round((parseFloat(stat.base) + (parseFloat(stat.growth) * 17)) * 100 ) / 100) : ' (+' + parseFloat(stat.growth) + ')' ) : ''
              }
            </div>
          )}
        </div>
      ))}
    </div>
  )
}