import { Observer } from 'mobx-react-lite'
import { Fragment, useState } from 'react'
import _ from 'lodash'
import AbilityCard from '../../src/presentation/hero_detail/components/ability_card'
import StatsCard from '../../src/presentation/hero_detail/components/stats_card'
import AttackSpeedCard from '../../src/presentation/hero_detail/components/attack_speed_card'
import RatingsCard from '../../src/presentation/hero_detail/components/ratings_card'
import { NextSeo } from 'next-seo'
import { useFetchHeroById } from '@src/data/api/hero.hook'
import { getThumbnail } from '@src/data/api/config/image.static'
import { AbilitySlot } from '@src/domain/ability.domain'
import { SecondaryButton } from '@src/presentation/components/secondary_button'
import { TogglePill } from '@src/presentation/components/toggle_pill'
import { useRouter } from 'next/router'
import { PrimaryButton } from '@src/presentation/components/primary_button'

export default function ShowHero({ id }: { id: string }) {
  const router = useRouter()

  const { data, isLoading } = useFetchHeroById(id, { enabled: Boolean(id) })

  const [abilDis, setAbilDis] = useState<AbilitySlot>(AbilitySlot.PERK)
  const [mode, setMode] = useState(true)

  return (
    <Observer>
      {() => (
        <Fragment>
          <NextSeo title={!isLoading ? `${data?.name} - ${data?.title} | Almanac Database` : 'Almanac Database'} />
          {!isLoading && (
            <Fragment>
              <div className="grid grid-cols-5 mx-16">
                <div className="sticky order-1 col-span-1 mb-auto pt-14 top-16">
                  <div className="w-full">
                    <img className="object-cover w-56 h-56 rounded-3xl mb-7" src={getThumbnail(data?.thumbName)} />
                  </div>
                  <ul v-if="loaded">
                    <li className="text-3xl font-bold uppercase text-paleViolet">{data?.name}</li>
                    <li className="text-lg text-paleViolet">{data?.title}</li>
                    <li className="text-xl text-paleViolet">
                      <span className="font-bold">Class:</span> {data?.className}
                    </li>
                    <li className="text-xl text-paleViolet">
                      <span className="font-bold">Resource:</span> {data?.resource}
                    </li>
                    <li className="text-xl text-paleViolet">
                      <span className="font-bold">Range Type:</span> {data?.attackType}
                    </li>
                  </ul>
                  <div className="flex justify-center w-3/4 mt-5">
                    <PrimaryButton label="Edit" onClick={() => router.push(`/edit/${id}`)} />
                  </div>
                </div>
                <div className="order-2 w-full col-span-2 mt-5">
                  <div className="mb-5 text-2xl font-bold text-paleViolet">
                    <span className="mr-1">Abilities</span>
                    {_.map(data?.abilities, (ability, index) => (
                      <TogglePill label={ability.slot} condition={ability.slot != abilDis} onClick={() => setAbilDis(ability.slot)} />
                    ))}
                  </div>
                  {_.map(data?.abilities, (ability, index) => (
                    <Fragment key={index}>{ability.slot === abilDis && <AbilityCard ability={ability} />}</Fragment>
                  ))}
                </div>
                <div className="sticky order-3 w-full col-span-2 pt-5 mb-auto pl-11 top-16">
                  <div className="flex items-center mb-3 text-2xl font-bold text-paleViolet">
                    <p className="mr-2">Base Statistics</p>
                    <SecondaryButton label={mode ? 'Level 1 - 18' : 'Base + Growth'} onClick={() => setMode((prev) => !prev)} />
                  </div>
                  <StatsCard mode={mode} stats={data?.stats} resource={data?.resource} />
                  <AttackSpeedCard mode={mode} attackSpeed={data?.attackSpeed} />
                  <RatingsCard ratings={data?.ratings} />
                </div>
              </div>
            </Fragment>
          )}
        </Fragment>
      )}
    </Observer>
  )
}

export async function getServerSideProps(context) {
  return {
    props: { id: context.params.id },
  }
}
