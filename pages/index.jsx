import { Fragment, useContext, useEffect, useRef } from "react";
import { homeContext } from "../contexts/home_context";
import _ from 'lodash';
import { Observer } from "mobx-react-lite";
import HeroThumb from "../components/hero_thumb";
import { NextSeo } from "next-seo";

export default function Home() {
  const context = useContext(homeContext);

  const selectClass = useRef();
  const selectType = useRef();
  const input = useRef();

  useEffect(() => {
    context.prepareClasses();
    context.prepareHeroes();
  }, [context])

  return (
    <Observer>
      {() => (
        <Fragment>
          <NextSeo title="Almanac – Hero Database" />
          <div className="navButton">
            <input ref={input} placeholder="SEARCH" className="input mt-3 mr-3 ml-4" onChange={(e) => context.setValue('searchWord', e.target.value)} />
            <select ref={selectClass} className="input mr-3" onChange={(e) => context.setValue('chosenClass', e.target.value)}>
              <option className="text-darkViolet font-bold" value=''>Classes</option>
              {_.map(context.classes, (heroClass, index) => {
                return (
                  <Fragment key={index}>
                    <option value="" className="text-darkViolet font-semibold" value={heroClass.archetype}>{heroClass.archetype}</option>
                    {heroClass.subtypes.length > 1 && (_.map(heroClass.subtypes, (subtypes, subIndex) => (
                      <option key={`${index}_${subIndex}`} className="text-darkViolet" value={subtypes}>&#8226; {subtypes}</option>
                    )))}
                  </Fragment>
                )
              })}
            </select>
            <select ref={selectType} className="input mr-3" onChange={(e) => context.setValue('range', e.target.value)}>
              <option className="text-darkViolet font-bold" value="">Attack Type</option>
              <option className="text-darkViolet" value="Melee">Melee</option>
              <option className="text-darkViolet" value="Ranged">Ranged</option>
            </select>
            <button className="mr-3 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
            onClick={() => {
              input.current.value = '';
              selectClass.current.firstElementChild.selected = true;
              selectType.current.firstElementChild.selected = true;
            }}>Clear</button>
            Total Heroes: { context.heroes.length }
          </div>
          <div className="grid grid-cols-5 mb-5 mx-5">
            {_.map(context.heroes, (hero, index) => (
              <HeroThumb key={index} hero={hero} />
            ))}
          </div>
        </Fragment>
      )}
    </Observer>
  )
}