import { getIcon } from '@src/data/api/config/image.static'
import { HeroInterface, ResourceType, StatInterface, StatList } from '@src/domain/hero.domain'
import _ from 'lodash'
import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { UseFormRegister } from 'react-hook-form'

export const StatBlock = observer(
  ({ stats, resource, register }: { stats: StatInterface[]; resource: ResourceType; register: UseFormRegister<HeroInterface> }) => {
    let prevent = []

    switch (resource) {
      case ResourceType.MANA:
        prevent = [StatList.STAMINA, StatList.STAMINA_REGEN, StatList.SECONDARY_BAR]
        break
      case ResourceType.STAMINA:
        prevent = [StatList.MANA, StatList.MANA_REGEN, StatList.SECONDARY_BAR]
        break
      case ResourceType.NONE:
        prevent = [StatList.STAMINA, StatList.STAMINA_REGEN, StatList.MANA_REGEN]
        break
    }

    return (
      <>
        {_.map(stats, (stat, index) => (
          <Fragment key={index}>
            {!_.includes(prevent, stat.name) && (
              <div className={`text-paleViolet text-sm uppercase w-full`}>
                <div className="flex flex-col px-4 py-2 font-bold gap-y-3">
                  <div className="flex items-center">
                    <img src={getIcon(stat.name == 'Secondary Bar' ? 'mana_regen.png' : `${_.snakeCase(stat.name)}.png`)} className="w-4 h-4 mr-2" />
                    {stat.name}:
                  </div>
                  <div className="flex w-full gap-x-3">
                    <div>
                      {'Base: '}
                      <input {...register(`stats.${index}.base`)} className="w-full input" />
                    </div>
                    {!_.includes([StatList.RANGE, StatList.MOVE_SPEED, StatList.CRIT_DAMAGE, StatList.SECONDARY_BAR], stat.name) && (
                      <div>
                        {'Growth: '}
                        <input {...register(`stats.${index}.growth`)} className="w-full input" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </>
    )
  }
)
