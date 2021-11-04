import { Fragment } from "react";
import _ from 'lodash';
import classNames from "classnames";

const Header = ({ name, header, summon }) => {
  return (
    <Fragment>
      <div className={classNames("font-bold text-2xl pr-6 whitespace-nowrap", {"py-2": summon})}>{ name }</div>
      <div className={classNames("flex flex-wrap relative z-20", {"border-t-2 py-2": summon})}>
        {_.map(header, (desc, head) => (
          <Fragment key={head}>
            {desc.slice(3, -4).toLowerCase() !== '<br>' && desc && (
              <div className={classNames("text-sm px-2 inline-block", {"uppercase": !summon})}>
                <b className={summon && "uppercase"}>{head}</b>: <span dangerouslySetInnerHTML={{__html: desc.slice(3, -4)}} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Fragment>
  )
}

const Scaling = ({ scaling }) => {
  return (
    <Fragment>
      {scaling.length > 0 && (
        <div class="py-2 border-t-2 flex flex-wrap text-sm gap-y-3">
          {
            _.map(scaling, (item, index) => (
              <div key={index} class="w-1/2 px-1">
                <div class="uppercase font-bold">{ item.key }</div>
                <div dangerouslySetInnerHTML={{__html: item.value}}></div>
              </div>
            ))
          }
        </div>
      )}
    </Fragment>
  )
}

export default function AbilityCard({ ability }) {
  return (
    <Fragment>
      <div className="relative whitespace-pre-wrap text-paleViolet bg-darkViolet p-5 rounded-xl w-full overflow-auto mb-5">
        <span className="absolute z-10 text-8xl font-black opacity-20 italic right-4 -top-3 noselect">{ ability.slot }</span>
        <div className="flex pb-2">
          <Header name={ability.name} header={ability.header} />
        </div>
        <div className="py-2 border-t-2" dangerouslySetInnerHTML={{__html: ability.desc}}></div>
        {ability.slot !== 'P' && (
          <Fragment>
            {ability.scaling && <Scaling scaling={ability.scaling} />}
            {
              _.map(ability.subAbility, (subAbility, index) => (
                <div className="pt-5" key={index}>
                  <div className="flex pb-2">
                    <Header name={subAbility.name} header={subAbility.header} />
                  </div>
                  <div className="py-2 border-t-2" dangerouslySetInnerHTML={{__html: subAbility.desc}}></div>
                  <Scaling scaling={subAbility.scaling} />
                </div>
              ))
            }
          </Fragment>
        )}
        {
          _.map(ability.summon, (unit, index) => (
            <Fragment key={index}>
              <Header name={unit.name} header={unit.header} summon={true} />
              <div className="py-2 border-t-2" dangerouslySetInnerHTML={{__html: unit.desc}}></div>
            </Fragment>
          ))
        }
      </div>
    </Fragment>
  )
}