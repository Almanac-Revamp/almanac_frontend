import { SummonInterface } from '@src/domain/summon.domain'
import classNames from 'classnames'
import _ from 'lodash'
import { Fragment, useState } from 'react'
import { EditHeaderBlock } from './edit_header_block'
import { RichTextInput } from '@src/presentation/components/rich_text_input'
import { UseFieldArrayUpdate } from 'react-hook-form'
import { HeroInterface } from '@src/domain/hero.domain'
import { SecondaryButton } from '@src/presentation/components/secondary_button'

export const SummonBlock = ({
  summon,
  setSummon,
}: {
  summon: SummonInterface[]
  setSummon: UseFieldArrayUpdate<HeroInterface, `abilities.${number}.summon`>
}) => {
  const [summonHeaderToggle, setSummonHeaderToggle] = useState(_.fill(new Array(summon), false))

  return (
    <>
      {_.map(summon, (unit, index) => (
        <Fragment>
          <div className="flex flex-col py-2 border-t-2">
            <div className="pr-6 text-2xl font-bold">
              <div className="inline-block mb-4 mr-4">Unit Name</div>
              <input type="text" className="input" value={unit.name} onChange={(e) => setSummon(index, { ...unit, name: e.target.value })} />
              <SecondaryButton
                label="Toggle Header"
                icon={classNames('fas fa-angle-down ml-2', {
                  'transform rotate-180': summonHeaderToggle[index],
                })}
                onClick={() => {
                  const temp = _.cloneDeep(summonHeaderToggle)
                  temp[index] = !temp[index]
                  setSummonHeaderToggle(temp)
                }}
              />
            </div>
            {summonHeaderToggle[index] && (
              <div className="flex flex-wrap">
                <EditHeaderBlock
                  header={unit.header}
                  summon
                  onChange={(key, v) => setSummon(index, { ...unit, header: { ...unit.header, [key]: v } })}
                />
              </div>
            )}
          </div>
          <div className="py-2 border-t-2">
            <div className="rounded-lg text-paleViolet bg-lightPB bg-opacity-10">
              <RichTextInput value={unit.desc} onChange={(v) => setSummon(index, { ...unit, desc: v })} className="desc" />
            </div>
          </div>
        </Fragment>
      ))}
    </>
  )
}
