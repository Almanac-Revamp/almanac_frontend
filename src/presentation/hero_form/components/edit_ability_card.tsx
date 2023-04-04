import { Fragment, useState } from 'react'
import classNames from 'classnames'
import 'react-quill/dist/quill.bubble.css'
import _ from 'lodash'
import { Observer } from 'mobx-react-lite'
import { SecondaryButton } from '../../components/secondary_button'
import { EditHeaderBlock } from './edit_header_block'
import { Control, useFieldArray, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { AbilityInterface } from '@src/domain/ability.domain'
import { HeroInterface } from '@src/domain/hero.domain'
import { SummonHeader } from '@src/domain/summon.domain'
import { RichTextInput } from '../../components/rich_text_input'
import { AbilityHeader, AbilitySlot } from '../../../domain/ability.domain'
import { SubAbilityBlock } from './sub_ability_block'
import { SummonBlock } from './summon_block'

export default function EditAbilityCard({
  abilityIndex,
  ability,
  setValue,
  control,
  register,
}: {
  abilityIndex: number
  ability: AbilityInterface
  setValue: UseFormSetValue<HeroInterface>
  control: Control<HeroInterface>
  register: UseFormRegister<HeroInterface>
}) {
  const [headerToggle, setHeaderToggle] = useState(false)

  const {
    append: addSubAbility,
    update: setSubAbility,
    remove: delSubAbility,
  } = useFieldArray({
    name: `abilities.${abilityIndex}.subAbility`,
    control,
  })
  const {
    append: addScaling,
    update: setScaling,
    remove: delScaling,
    swap: shiftScaling,
  } = useFieldArray({
    name: `abilities.${abilityIndex}.scaling`,
    control,
  })
  const { append: addSummon, update: setSummon } = useFieldArray({
    name: `abilities.${abilityIndex}.summon`,
    control,
  })

  return (
    <Observer>
      {() => (
        <div className="relative w-full p-5 mb-5 overflow-visible whitespace-pre-wrap text-paleViolet bg-darkViolet rounded-xl">
          <span className="absolute z-10 italic font-black text-8xl opacity-20 right-4 -top-3 noselect">{ability.slot}</span>
          <div className="flex flex-col pb-2">
            <div className="pr-6 text-2xl font-bold">
              <div className="inline-block mb-4 mr-4">Ability Name</div>
              <input {...register(`abilities.${abilityIndex}.name`)} type="text" className="input" />
              <div className="flex items-center justify-start gap-x-2">
                <SecondaryButton
                  label="Toggle Header"
                  icon={classNames('fas fa-angle-down ml-2 duration-200 transition-transform', {
                    'transform rotate-180': headerToggle,
                  })}
                  onClick={() => setHeaderToggle(!headerToggle)}
                />
                {ability.slot !== AbilitySlot.PERK && (
                  <SecondaryButton
                    label="Add Sub Ability"
                    onClick={() => addSubAbility({ name: '', desc: '', header: new AbilityHeader(), scaling: [] })}
                  />
                )}
                <SecondaryButton
                  label="Add Summoned Unit"
                  onClick={() =>
                    addSummon({
                      name: '',
                      desc: '',
                      header: new SummonHeader(),
                    })
                  }
                />
              </div>
            </div>
            {headerToggle && (
              <div className="flex flex-wrap">
                <EditHeaderBlock header={ability.header} />
              </div>
            )}
          </div>
          <div className="py-2 border-t-2">
            <div className="rounded-lg text-paleViolet bg-lightPB bg-opacity-10">
              <RichTextInput
                onChange={(v) => setValue(`abilities.${abilityIndex}`, { ...ability, desc: v })}
                value={ability?.desc}
                className="desc"
              />
            </div>
          </div>
          {ability.slot !== AbilitySlot.PERK && (
            <Fragment>
              <div className="pt-2 border-t-2">
                <div className="pb-4 text-xl font-bold">
                  <span className="mx-1">Scaling</span>
                  <SecondaryButton label="Add New Scaling" onClick={() => addScaling({ key: '', value: '' })} />
                </div>
                <div className="grid grid-cols-2 gap-x-5">
                  {_.map(ability.scaling, (scale, index) => (
                    <div key={index} className="pb-3">
                      <div className="pb-2 font-bold uppercase">
                        <div className="inline-block w-14">Key</div>
                        <input
                          type="text"
                          className="w-2/3 text-sm uppercase input"
                          value={scale.key}
                          onChange={(e) =>
                            setScaling(index, {
                              key: e.target.value,
                              value: scale.value,
                            })
                          }
                        />
                      </div>
                      <div className="font-bold">
                        <div className="inline-block mb-1 uppercase">
                          <span className="mr-1">Value</span>
                          {index > 0 && (
                            <i
                              className="ml-2 transition duration-200 cursor-pointer fas fa-caret-left hover:text-lightViolet"
                              onClick={() => shiftScaling(index, index - 1)}
                            ></i>
                          )}
                          {index < ability.scaling.length - 1 && (
                            <i
                              className="ml-2 transition duration-200 cursor-pointer fas fa-caret-right hover:text-lightViolet"
                              onClick={() => shiftScaling(index, index + 1)}
                            ></i>
                          )}
                          <i
                            className="ml-2 transition duration-200 cursor-pointer fas fa-times hover:text-lightViolet"
                            onClick={() => delScaling(index)}
                          ></i>
                        </div>
                        <div className="font-normal rounded-lg text-paleViolet bg-lightPB bg-opacity-10">
                          <RichTextInput value={scale.value} onChange={(v) => setScaling(index, { key: scale.key, value: v })} className="scaling" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <SubAbilityBlock subAbility={ability?.subAbility} setSubAbility={setSubAbility} delSubAbility={delSubAbility} />
            </Fragment>
          )}
          <SummonBlock summon={ability?.summon} setSummon={setSummon} />
        </div>
      )}
    </Observer>
  )
}
