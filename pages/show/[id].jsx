import { Observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment, useContext, useEffect } from "react";
import { showHeroContext } from "../../contexts/show_hero_context";
import _ from 'lodash';
import AbilityCard from "../../components/ability_card";
import StatsCard from "../../components/stats_card";
import AttackSpeedCard from "../../components/attack_speed_card";
import RatingsCard from "../../components/ratings_card";
import { NextSeo } from "next-seo";

export default function ShowHero() {
  const context = useContext(showHeroContext);
  const router = useRouter();
  const { id } = router.query;

  const deleteHero = () => {

  }

  useEffect(() => {
    if(id){
      context.prepareHero(id);
    }
  }, [router.query])

  return (
    <Observer>
      {() => (
      <Fragment>
        <NextSeo title={context.isLoad ? `Almanac – ${context.hero.name}, ${context.hero.title}` : "Almanac – Hero Database"} />
        {context.isLoad && (
          <Fragment>
            <div className="grid grid-cols-5 mx-16">
              <div className="pt-14 col-span-1 order-1 sticky top-16 mb-auto">
                <div className="w-full">
                  <img className="rounded-3xl w-3/4 mb-7 object-cover object-center" src="/images/default.jpg" />
                </div>
                <ul v-if="loaded">
                  <li className="text-paleViolet text-3xl font-bold uppercase">
                    { context.hero.name }
                  </li>
                  <li className="text-paleViolet text-lg">
                    { context.hero.title }
                  </li>
                  <li className="text-paleViolet text-xl">
                    <span className="font-bold">Class:</span> { context.hero.class }
                  </li>
                  <li className="text-paleViolet text-xl">
                    <span className="font-bold">Resource:</span> { context.hero.resource }
                  </li>
                  <li className="text-paleViolet text-xl">
                    <span className="font-bold">Range Type:</span> { context.hero.attackType }
                  </li>
                </ul>
                <div className="w-3/4 flex justify-center mt-5">
                  <Link href={`/edit/${id}`}><button className="displayButton">Edit</button></Link>
                  <button className="displayButton" onClick={deleteHero}>Delete</button>
                </div>
              </div>
              <div className="w-full mt-5 col-span-2 order-2">
                <div className="text-paleViolet text-2xl font-bold mb-5">Abilities
                  {_.map(context.hero.abilities, (ability, index) => (
                    <button key={index} className={`ml-2 mb-2 font-bold text-base px-5 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100
                    ${ability.slot != context.abilDis ? 'bg-PB text-paleViolet' : 'bg-lightPB text-darkPB'}`}
                    onClick={() => context.setValue('abilDis', ability.slot)}
                    key={ability.name}
                    >{ ability.slot }</button>
                  ))}
                </div>
                {_.map(context.hero.abilities, (ability, index) => (
                  <Fragment key={index}>
                    {
                      ability.slot === context.abilDis && (
                        <AbilityCard ability={ability} />
                      )
                    }
                  </Fragment>
                ))}
              </div>
              <div className="w-full pt-5 pl-11 col-span-2 order-3 sticky top-16 mb-auto">
                <div className="text-paleViolet text-2xl font-bold mb-3">Base Statistics
                  <button className="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
                  onClick={() => context.setValue('mode', !context.mode)}>
                    {context.mode ? 'Level 1 - 18' : 'Base + Growth'}
                  </button>
                </div>
                <StatsCard mode={context.mode} stats={context.hero.stats} resource={context.hero.resource} />
                <AttackSpeedCard mode={context.mode} attackSpeed={context.hero.attackSpeed} />
                <RatingsCard ratings={context.hero.ratings} />
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
      )}
    </Observer>
  )
}