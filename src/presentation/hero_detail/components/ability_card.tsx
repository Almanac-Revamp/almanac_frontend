import { Fragment } from 'react'
import _ from 'lodash'
import { HeaderBlock } from './header_block'
import { AbilityInterface } from '@src/domain/ability.domain'
import { ScalingBlock } from './scaling_block'

export default function AbilityCard({ ability }: { ability: AbilityInterface }) {
  return (
    <Fragment>
      <div className="relative w-full p-5 mb-5 overflow-auto whitespace-pre-wrap text-paleViolet bg-darkViolet rounded-xl">
        <span className="absolute z-10 italic font-black text-8xl opacity-20 right-4 -top-3 noselect">{ability.slot}</span>
        <div className="flex pb-2">
          <HeaderBlock name={ability.name} header={ability.header} />
        </div>
        <div className="py-2 border-t-2" dangerouslySetInnerHTML={{ __html: ability.desc }}></div>
        {ability.slot !== 'P' && (
          <Fragment>
            {ability.scaling && <ScalingBlock scaling={ability.scaling} />}
            {_.map(ability.subAbility, (subAbility, index) => (
              <div className="pt-5" key={index}>
                <div className="flex pb-2">
                  <HeaderBlock name={subAbility.name} header={subAbility.header} />
                </div>
                <div className="py-2 border-t-2" dangerouslySetInnerHTML={{ __html: subAbility.desc }}></div>
                <ScalingBlock scaling={subAbility.scaling} />
              </div>
            ))}
          </Fragment>
        )}
        {_.map(ability.summon, (unit, index) => (
          <Fragment key={index}>
            <HeaderBlock name={unit.name} header={unit.header} summon />
            <div className="py-2 border-t-2" dangerouslySetInnerHTML={{ __html: unit.desc }}></div>
          </Fragment>
        ))}
      </div>
    </Fragment>
  )
}
