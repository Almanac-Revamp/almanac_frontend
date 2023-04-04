import classNames from 'classnames'
import _ from 'lodash'
import { Observer } from 'mobx-react-lite'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import EditAbilityCard from '../components/edit_ability_card'
import { PrimaryButton } from '../../components/primary_button'
import { NextSeo } from 'next-seo'
import { useFetchHeroById } from '@src/data/api/hero.hook'
import { getThumbnail, getIcon } from '../../../data/api/config/image.static'
import { useForm } from 'react-hook-form'
import { AttackType, ResourceType } from '@src/domain/hero.domain'
import { AbilityDefaultValue } from '@src/forms/ability.form'
import { changeImage } from '@src/core/util/image.util'
import { StatBlock } from '../components/stat_block'
import { useFetchClasses } from '@src/data/api/config/hero.hook'
import { ToggleBanner } from '../../components/toggle_banner'
import { AbilitySlot } from '@src/domain/ability.domain'
import { TogglePill } from '@src/presentation/components/toggle_pill'

export const AddEditForm = ({ id }: { id: string }) => {
  const router = useRouter()

  const [abilDis, setAbilityDis] = useState<AbilitySlot>(AbilitySlot.PERK)

  const [img, setImg] = useState('')

  const { data, isLoading } = useFetchHeroById(id, { enabled: Boolean(id) })
  const { data: classes } = useFetchClasses()

  const { reset, register, control, watch, setValue } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: AbilityDefaultValue(data),
  })

  const hero = watch()

  useEffect(() => {
    reset(AbilityDefaultValue(data))
  }, [data])

  return (
    <Observer>
      {() =>
        !isLoading && (
          <>
            <NextSeo title="Edit | Almanac Database" />
            <div className="grid grid-cols-5 mx-16">
              <div className="sticky order-1 col-span-1 mb-auto pt-14 top-16">
                <div className="w-full">
                  <img src={img || getThumbnail(data?.thumbName)} className="object-cover w-56 h-56 rounded-3xl" />
                  <div className="relative ml-48 -mt-8">
                    <label
                      htmlFor="myFile"
                      id="spin"
                      className="flex flex-wrap content-center justify-center rounded-full cursor-pointer h-14 w-14 border-darkViolet text-paleViolet"
                      style={{ borderWidth: '1.8rem' }}
                    >
                      <i className="text-2xl fas fa-sync-alt" />
                    </label>
                  </div>
                </div>
                <div className="flex flex-col mt-2 gap-y-3">
                  <div className="text-xl text-paleViolet">
                    <span className="mr-2 font-bold">Name:</span>
                    <input {...register('name')} className="input" />
                  </div>
                  <div className="text-xl text-paleViolet">
                    <span className="mr-2 font-bold">Title:</span>
                    <input {...register('title')} className="input" />
                  </div>
                  <div className="text-xl text-paleViolet">
                    <span className="mr-2 font-bold">Class:</span>
                    <select className="input" {...register('className')}>
                      {_.map(classes, (heroClass, index) => {
                        return _.map(heroClass.subtypes, (subtypes, subIndex) => (
                          <option key={`${index}_${subIndex}`} className="text-darkViolet" value={subtypes}>
                            {subtypes}
                          </option>
                        ))
                      })}
                    </select>
                  </div>
                  <div className="text-xl text-paleViolet">
                    <span className="mr-2 font-bold">Resource:</span>
                    <select {...register('resource')} className="input">
                      {_.map(ResourceType, (t) => (
                        <option className="text-darkViolet" value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-xl text-paleViolet">
                    <span className="mr-2 font-bold">Range Type:</span>
                    <select className="input" {...register('attackType')}>
                      {_.map(AttackType, (t) => (
                        <option className="text-darkViolet" value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-center w-3/4">
                    <PrimaryButton
                      label="Save"
                      onClick={() => {
                        // if (id) {
                        //   context.edit(router, id);
                        // } else {
                        //   context.upload(router);
                        // }
                      }}
                    />
                  </div>
                  <input
                    type="file"
                    id="myFile"
                    className="invisible h-0"
                    onChange={(e) => changeImage(e.target.files[0], (e) => setImg(e.target.result.toString()))}
                    accept=".jpg, .jpeg, .png"
                  />
                </div>
              </div>
              <div className="order-2 w-full col-span-2 mt-5">
                <div className="mb-5 text-2xl font-bold text-paleViolet">
                  <span className="mr-1">Abilities</span>
                  {_.map(AbilitySlot, (slot) => (
                    <TogglePill label={slot} condition={slot != abilDis} onClick={() => setAbilityDis(slot)} />
                  ))}
                </div>
                <EditAbilityCard
                  ability={_.find(hero?.abilities, ['slot', abilDis])}
                  abilityIndex={_.findIndex(hero?.abilities, ['slot', abilDis])}
                  control={control}
                  setValue={setValue}
                  register={register}
                />
              </div>
              <div className="order-3 w-full col-span-2 mt-5 pl-11">
                <ToggleBanner title="Base Statistics">
                  <div className="grid grid-cols-2 py-3 overflow-auto gap-y-1 bg-darkViolet rounded-xl">
                    <StatBlock stats={hero?.stats} resource={hero?.resource} register={register} />
                  </div>
                </ToggleBanner>
                <ToggleBanner
                  title={
                    <span>
                      <img src={getIcon('attack_speed.png')} className="inline w-5 h-5 mr-3 -mt-1" />
                      Attack Speed
                    </span>
                  }
                >
                  <div className="flex flex-wrap py-3 overflow-auto gap-y-1 h-26 bg-darkViolet rounded-xl">
                    {_.map(hero?.attackSpeed, (stat, index) => (
                      <div key={index} className="flex flex-wrap w-1/2 px-4 py-2 text-sm uppercase text-paleViolet">
                        <div className="mb-1 font-bold">{stat.key}</div>:{' '}
                        <input type="text" {...register(`attackSpeed.${index}.value`)} className="w-full input" />
                      </div>
                    ))}
                  </div>
                </ToggleBanner>
                <ToggleBanner title="Ratings">
                  <div className="grid grid-cols-6 px-1 py-3 overflow-auto gap-y-1 h-26 bg-darkViolet rounded-xl">
                    {_.map(hero?.ratings, (stat, index) => (
                      <div key={index} className="flex flex-col col-span-1 py-2 text-sm font-bold uppercase text-paleViolet">
                        <div className="inline-block w-full text-center">{stat.key}</div>
                        <div className="flex justify-center w-full">
                          <select {...register(`ratings.${index}.value`)} className="input">
                            <option className="text-darkViolet" value="1">
                              1
                            </option>
                            <option className="text-darkViolet" value="2">
                              2
                            </option>
                            <option className="text-darkViolet" value="3">
                              3
                            </option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </ToggleBanner>
              </div>
            </div>
          </>
        )
      }
    </Observer>
  )
}
