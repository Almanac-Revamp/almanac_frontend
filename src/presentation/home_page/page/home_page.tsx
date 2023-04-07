import { Fragment, useState } from 'react'
import _ from 'lodash'
import HeroThumb from '@src/presentation/home_page/components/hero_thumb'
import { SecondaryButton } from '@src/presentation/components/secondary_button'
import { useFetchHeroes } from '@src/data/api/hero.hook'
import { useFetchClasses } from '@src/data/api/config/hero.hook'

export const HomePage = () => {
  const { data: heroes } = useFetchHeroes()
  const { data: classes } = useFetchClasses()

  const [searchWord, setSearchWord] = useState('')
  const [chosenClass, setChosenClass] = useState('')
  const [range, setRange] = useState('')

  return (
    <Fragment>
      <div className="navButton">
        <input
          placeholder="SEARCH"
          className="mt-3 ml-4 mr-3 input"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              // context.prepareFilteredHeroes()
            }
          }}
        />
        <select
          className="mr-3 input"
          value={chosenClass}
          onChange={(e) => {
            // let match = false
            // _.forEach(classes, (heroClass) => {
            //   if (e.target.value === heroClass.archetype) {
            //     let types = []
            //     _.forEach(heroClass.subtypes, (item) => {
            //       types.push(item)
            //     })
            //     context.setValue('classArray', types)
            //     match = true
            //   }
            // })
            // if (!match) {
            //   context.setValue('classArray', [e.target.value])
            // }
            // context.setValue('chosenClass', e.target.value)
            // context.prepareFilteredHeroes()
          }}
        >
          <option className="font-bold text-darkViolet" value="">
            Classes
          </option>
          {_.map(classes, (heroClass, index) => {
            return (
              <Fragment key={index}>
                <option className="font-semibold text-darkViolet" value={heroClass.archetype}>
                  {heroClass.archetype}
                </option>
                {heroClass.subtypes.length > 1 &&
                  _.map(heroClass.subtypes, (subtypes, subIndex) => (
                    <option key={`${index}_${subIndex}`} className="text-darkViolet" value={subtypes}>
                      &#8226; {subtypes}
                    </option>
                  ))}
              </Fragment>
            )
          })}
        </select>
        <select
          className="mr-3 input"
          value={range}
          onChange={(e) => {
            setRange(e.target.value)
            // context.prepareFilteredHeroes()
          }}
        >
          <option className="font-bold text-darkViolet" value="">
            Attack Type
          </option>
          <option className="text-darkViolet" value="Melee">
            Melee
          </option>
          <option className="text-darkViolet" value="Ranged">
            Ranged
          </option>
        </select>
        <SecondaryButton
          label="Clear"
          onClick={() => {
            setSearchWord('')
            setChosenClass('')
            setRange('')
          }}
        />
        <span className="ml-2">Total Heroes: {_.size(heroes)}</span>
      </div>
      <div className="grid grid-cols-1 mx-5 mb-5 md:grid-cols-2 lg:grid-cols-3 xl:lg:grid-cols-5">
        {_.map(heroes, (hero, index) => (
          <HeroThumb key={index} hero={hero} />
        ))}
      </div>
    </Fragment>
  )
}
