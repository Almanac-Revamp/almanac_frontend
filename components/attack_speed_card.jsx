import { Fragment } from "react";
import { getIcon } from "../services/get";

export default function AttackSpeedCard({ mode, attackSpeed }) {
  return (
    <Fragment>
      <div className="text-paleViolet text-2xl font-bold my-3 flex items-center">
        <img src={getIcon('attack_speed.png')} className="inline w-5 h-5 mr-3"/>
        Attack Speed
      </div>
      <div className="flex flex-wrap gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3">
        {_.map(attackSpeed, (stat, index) => (
          <div key={index} className="text-paleViolet text-sm uppercase w-1/2 flex flex-wrap px-4 py-2">
            <div className="font-bold">{ stat.key }</div><span className="mr-1">:</span>
            { stat.key == 'Bonus Attack Speed' ? (mode ? '0% - ' + (Math.round((parseFloat(stat.value) * 17) * 100) / 100) + '%' : stat.value + '%' ) : stat.value }
          </div>
        ))}
      </div>
    </Fragment>
  )
}