import _ from "lodash";
import { Observer } from "mobx-react-lite";
import { Fragment, useContext, useEffect } from "react"
import { addEditFormContext } from "../contexts/add_edit_form_context"
import AbilityCard from "./ability_card";

export default function AddEditForm({ id }) {
  const context = useContext(addEditFormContext);

  useEffect(() => {
    context.prepareHero(id);
    context.prepareClasses();
  }, [])

  return (
    <Observer>
      {() => ( context.isLoad &&
        <div class="grid grid-cols-5 mx-16">
          <div class="pt-14 col-span-1 order-1 sticky top-16 mb-auto">
            <div class="w-full">
              <img src="/images/default.jpg" class="rounded-3xl w-3/4 object-cover object-center" />
              <div class="ml-48 -mt-8 relative">
                <div id="spin" class="h-14 w-14 rounded-full flex flex-wrap justify-center content-center border-darkViolet text-paleViolet cursor-pointer" style={{borderWidth: "1.8rem"}}>
                  <i class="fas fa-sync-alt text-2xl" />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-y-3 mt-2">
              <div class="text-paleViolet text-xl">
                <span class="font-bold mr-2">Name:</span>
                <input value={context.hero.name} onChange={(e) => context.hero.setValue('name', e.target.value)} class="input" />
              </div>
              <div class="text-paleViolet text-xl">
                <span class="font-bold mr-2">Title:</span>
                <input value={context.hero.title} onChange={(e) => context.hero.setValue('title', e.target.value)} class="input" />
              </div>
              <div class="text-paleViolet text-xl">
                <span class="font-bold mr-2">Class:</span>
                <select class="input" value={context.hero.className} onChange={(e) => context.hero.setValue('className', e.target.value)}>
                  {_.map(context.classes, (heroClass, index) => {
                  return (
                    heroClass.subtypes.length > 1 && (_.map(heroClass.subtypes, (subtypes, subIndex) => (
                      <option key={`${index}_${subIndex}`} className="text-darkViolet" value={subtypes}>{subtypes}</option>
                    )))
                  )
                })}
                </select>
              </div>
              <div class="text-paleViolet text-xl">
                <span class="font-bold mr-2">Resource:</span>
                <select class="input" value={context.hero.resource} onChange={(e) => context.hero.setValue('resource', e.target.value)}>
                  <option class="text-darkViolet" value="Mana">Mana</option>
                  <option class="text-darkViolet" value="Stamina">Stamina</option>
                  <option class="text-darkViolet" value="N/A">N/A</option>
                </select>
              </div>
              <div class="text-paleViolet text-xl">
                <span class="font-bold mr-2">Range Type:</span>
                <select class="input" value={context.hero.attackType} onChange={(e) => context.hero.setValue('attackType', e.target.value)}>
                  <option class="text-darkViolet" value="Melee">Melee</option>
                  <option class="text-darkViolet" value="Ranged">Ranged</option>
                </select>
              </div>
              <div class="w-3/4 flex justify-center">
                <button class="font-bold bg-darkViolet text-paleViolet text-xl px-5 py-2 focus:outline-none rounded-full mx-auto mt-2">
                  Save
                </button>
              </div>
            </div>
          </div>
          <div class="w-full mt-5 col-span-2 order-2">
            <div className="text-paleViolet text-2xl font-bold mb-5">Abilities
              {_.map(['P', 'Q', 'W', 'E', 'R'], (slot) => (
                <button key={slot} className={`ml-2 mb-2 font-bold text-base px-5 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100
                  ${slot != context.abilDis ? 'bg-PB text-paleViolet' : 'bg-lightPB text-darkPB'}`}
                  onClick={() => context.setValue('abilDis', slot)}
                  key={slot}
                >{ slot }</button>
              ))}
            </div>
            {_.map(['P', 'Q', 'W', 'E', 'R'], (slot, index) => (
              <Fragment key={index}>
                {
                  slot === context.abilDis && (
                    <AbilityCard ability={context.hero.abilities[index]} />
                  )
                }
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </Observer>
  )
}
