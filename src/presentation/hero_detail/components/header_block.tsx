import { AbilityHeaderInterface } from '@src/domain/ability.domain'
import { SummonHeaderInterface } from '@src/domain/summon.domain'
import classNames from 'classnames'
import _ from 'lodash'
import { Fragment } from 'react'

export const HeaderBlock = ({ name, header, summon }: { name: string; header: AbilityHeaderInterface | SummonHeaderInterface; summon?: boolean }) => {
  return (
    <Fragment>
      <div className={classNames('font-bold text-2xl pr-6 whitespace-nowrap', { 'py-2': summon })}>{name}</div>
      <div className={classNames('flex flex-wrap relative z-20', { 'border-t-2 py-2': summon })}>
        {_.map(header, (desc, head) => (
          <Fragment key={head}>
            {desc.slice(3, -4).toLowerCase() !== '<br>' && desc && (
              <div className={classNames('text-sm px-2 inline-block', { uppercase: !summon })}>
                <b className={summon && 'uppercase'}>{_.startCase(head)}</b>: <span dangerouslySetInnerHTML={{ __html: desc.slice(3, -4) }} />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Fragment>
  )
}
