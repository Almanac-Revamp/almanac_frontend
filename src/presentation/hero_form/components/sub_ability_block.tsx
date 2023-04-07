import { SubAbilityInterface } from '@src/domain/ability.domain'
import { HeroInterface } from '@src/domain/hero.domain'
import classNames from 'classnames'
import _ from 'lodash'
import { Fragment, useState } from 'react'
import { UseFieldArrayRemove, UseFieldArrayUpdate } from 'react-hook-form'
import { EditHeaderBlock } from './edit_header_block'
import { RichTextInput } from '@src/presentation/components/rich_text_input'
import { SecondaryButton } from '@src/presentation/components/secondary_button'

export const SubAbilityBlock = ({
  subAbility,
  setSubAbility,
  delSubAbility,
}: {
  subAbility: SubAbilityInterface[]
  setSubAbility: UseFieldArrayUpdate<HeroInterface, `abilities.${number}.subAbility`>
  delSubAbility: UseFieldArrayRemove
}) => {
  const [subHeaderToggle, setSubHeaderToggle] = useState(_.fill(new Array(subAbility), false))

  return (
    <>
      {_.map(subAbility, (subAbil, index) => (
        <Fragment>
          <div key={index} className="flex flex-col py-2 border-t-2">
            <div className="text-2xl font-bold">
              <div className="inline-block mb-4 mr-4">Sub Ability Name</div>
              <input
                type="text"
                className="input"
                value={subAbil.name}
                onChange={(e) => setSubAbility(index, { ...subAbil, name: e.target.value })}
              />
            </div>
            <div>
              <SecondaryButton
                label="Toggle Header"
                icon={classNames('fas fa-angle-down ml-2', {
                  'transform rotate-180': subHeaderToggle[index],
                })}
                onClick={() => {
                  const temp = _.cloneDeep(subHeaderToggle)
                  temp[index] = !temp[index]
                  setSubHeaderToggle(temp)
                }}
              />
              <SecondaryButton label="Delete Sub Ability" onClick={() => delSubAbility(index)} />
            </div>
            {subHeaderToggle[index] && (
              <div className="flex flex-wrap">
                <EditHeaderBlock
                  header={subAbil.header}
                  onChange={(key, v) => setSubAbility(index, { ...subAbil, header: { ...subAbil.header, [key]: v } })}
                />
              </div>
            )}
          </div>
          <div className="py-2 border-t-2">
            <div className="rounded-lg text-paleViolet bg-lightPB bg-opacity-10">
              <RichTextInput value={subAbil.desc} onChange={(v) => setSubAbility(index, { ...subAbil, desc: v })} className="desc" />
            </div>
          </div>
          <div className="pt-2 border-t-2">
            <div className="pb-4 text-xl font-bold">
              <span className="ml-1 mr-3">Scaling</span>
              <SecondaryButton
                label="Add New Scaling"
                onClick={() => setSubAbility(index, { ...subAbil, scaling: [...subAbil.scaling, { key: '', value: '' }] })}
              />
            </div>
            <div className="grid grid-cols-2 gap-x-5">
              {_.map(subAbil.scaling, (scale, index) => (
                <div key={index} className="pb-3">
                  <div className="pb-2 font-bold uppercase">
                    <div className="inline-block w-14">Key</div>
                    <input
                      type="text"
                      className="w-2/3 text-sm uppercase input"
                      value={scale.key}
                      onChange={(e) =>
                        setSubAbility(index, {
                          ...subAbil,
                          scaling: _.map(subAbil.scaling, (s, i) => (i === index ? { ...s, key: e.target.value } : s)),
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
                          onClick={() => {
                            const tmp = subAbil.scaling[index - 1]
                            subAbil.scaling[index - 1] = subAbil.scaling[index]
                            subAbil.scaling[index] = tmp
                            setSubAbility(index, subAbil)
                          }}
                        ></i>
                      )}
                      {index < subAbil.scaling.length - 1 && (
                        <i
                          className="ml-2 transition duration-200 cursor-pointer fas fa-caret-right hover:text-lightViolet"
                          onClick={() => {
                            const tmp = subAbil.scaling[index]
                            subAbil.scaling[index] = subAbil.scaling[index + 1]
                            subAbil.scaling[index + 1] = tmp
                            setSubAbility(index, subAbil)
                          }}
                        ></i>
                      )}
                      <i
                        className="ml-2 transition duration-200 cursor-pointer fas fa-times hover:text-lightViolet"
                        onClick={() => {
                          _.pullAt(subAbil.scaling, index)
                          setSubAbility(index, subAbil)
                        }}
                      ></i>
                    </div>
                    <div className="font-normal rounded-lg text-paleViolet bg-lightPB bg-opacity-10">
                      <RichTextInput
                        value={scale.value}
                        onChange={(v) =>
                          setSubAbility(index, {
                            ...subAbil,
                            scaling: _.map(subAbil.scaling, (s, i) => (i === index ? { ...s, value: v } : s)),
                          })
                        }
                        className="scaling"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  )
}
