import { Fragment, useContext, useEffect } from "react";
import { homeContext } from "../contexts/home_context";
import _ from 'lodash';
import { Observer } from "mobx-react-lite";
import HeroThumb from "../components/hero_thumb";

export default function Home() {
  const context = useContext(homeContext);

  useEffect(() => {
    context.prepareClasses();
    if(context.searchWord === '' && context.range === '' && context.chosenClass === ''){
      context.prepareHeroes();
    } else {
      context.prepareFilteredHeroes();
    }
  }, [])

  return (
    <Observer>
      {() => (
        <Fragment>
          <div className="navButton">
            <input placeholder="SEARCH" className="input mt-3 mr-3 ml-4" value={context.searchWord} onChange={(e) => context.setValue('searchWord', e.target.value)}
            onKeyDown={(e) => {
              if(e.key === 'Enter'){
                context.prepareFilteredHeroes();
              }
            }} />
            <select className="input mr-3" value={context.chosenClass} onChange={(e) => {
              const match = false;
              _.forEach(context.classes, heroClass => {
                if(e.target.value === heroClass.archetype){
                  let types = [];
                  _.forEach(heroClass.subtypes, item => {
                    types.push(item);
                  })
                  context.setValue('classArray', types);
                  match = true;
                }
              })
              if(!match){
                context.setValue('classArray', [e.target.value]);
              }
              context.setValue('chosenClass', e.target.value);
              context.prepareFilteredHeroes();
            }}>
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
            <select className="input mr-3" value={context.range} onChange={(e) => {
              context.setValue('range', e.target.value);
              context.prepareFilteredHeroes();
            }}>
              <option className="text-darkViolet font-bold" value="">Attack Type</option>
              <option className="text-darkViolet" value="Melee">Melee</option>
              <option className="text-darkViolet" value="Ranged">Ranged</option>
            </select>
            <button className="mr-3 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
            onClick={() => {
              context.setValue('searchWord', '');
              context.setValue('chosenClass', '');
              context.setValue('range', '');
              context.prepareHeroes();
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