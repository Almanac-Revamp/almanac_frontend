import classNames from "classnames";
import _ from "lodash";
import { Observer } from "mobx-react-lite";
import { useRouter } from "next/dist/client/router";
import { Fragment, useContext, useEffect } from "react"
import { addEditFormContext } from "../contexts/add_edit_form_context"
import EditAbilityCard from "./edit_ability_card";

const StatBlock = ({ stats, resource, getIcon }) => {
  return (
    <Observer>
      {() => (
      <Fragment>
        {_.map(stats, (stat, index) => {
          if(resource === 'Mana'){
            return (
              <Fragment key={index}>
                {stat.name !== 'Stamina' && stat.name !== 'Stamina Regen' && stat.name != 'Secondary Bar' && (
                  <div className={`text-paleViolet text-sm uppercase w-full`}>
                    <div className="flex flex-col gap-y-3 px-4 py-2 font-bold">
                      <div className="flex items-center"><img src={getIcon(stat.name)} className="w-4 h-4 mr-2"/>{ stat.name }:</div>
                      <div className="flex w-full gap-x-3">
                        <div>Base: <input type="text" value={stat.base} onChange={(e) => stat.setValue('base', e.target.value)} className="input w-full"/></div>
                        {stat.name != 'Range' && stat.name != 'Move Speed' && stat.name != 'Crit Damage' && stat.name != 'Secondary Bar' && (<div>Growth: <input type="text" value={stat.growth} onChange={(e) => stat.setValue('growth', e.target.value)} className="input w-full" /></div>)}
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            )
          }
          if(resource === 'Stamina'){
            return (
              <Fragment key={index}>
                {stat.name !== 'Mana' && stat.name !== 'Mana Regen' && stat.name != 'Secondary Bar' && (
                  <div className={`text-paleViolet text-sm uppercase w-full`}>
                    <div className="flex flex-col gap-y-3 px-4 py-2 font-bold">
                      <div className="flex"><img src={getIcon(stat.name)} className="w-4 h-4 mr-2"/>{ stat.name }:</div>
                      <div className="flex w-full gap-x-3">
                        <div>Base: <input type="text" value={stat.base} onChange={(e) => stat.setValue('base', e.target.value)} className="input w-full"/></div>
                        {stat.name != 'Range' && stat.name != 'Move Speed' && stat.name != 'Crit Damage' && stat.name != 'Secondary Bar' && <div>Growth: <input type="text" value={stat.growth} onChange={(e) => stat.setValue('growth', e.target.value)} className="input w-full" /></div>}
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            )
          }
          if(resource === 'N/A'){
            return (
              <Fragment key={index}>
                {stat.name !== 'Stamina' && stat.name !== 'Stamina Regen' && stat.name != 'Mana Regen' && (
                  <div className={`text-paleViolet text-sm uppercase w-full`}>
                    <div className="flex flex-col gap-y-3 px-4 py-2 font-bold">
                      <div className="flex"><img src={getIcon(stat.name)} className="w-4 h-4 mr-2"/>{ stat.name }:</div>
                      <div className="flex w-full gap-x-3">
                        <div>Base: <input type="text" value={stat.base} onChange={(e) => stat.setValue('base', e.target.value)} className="input w-full"/></div>
                        {stat.name != 'Range' && stat.name != 'Move Speed' && stat.name != 'Crit Damage' && stat.name != 'Secondary Bar' && <div>Growth: <input type="text" value={stat.growth} onChange={(e) => stat.setValue('growth', e.target.value)} className="input w-full" /></div>}
                      </div>
                    </div>
                  </div>
                )}
              </Fragment>
            )
          }
        })}
      </Fragment>
      )}
    </Observer>
  )
}

export default function AddEditForm({ id }) {
  const context = useContext(addEditFormContext);
  const router = useRouter();

  const getIcon = (head) => {
    return head == 'Secondary Bar' ? `/images/icons/mana_regen.png` : `/images/icons/${_.snakeCase(head)}.png`;
  }

  useEffect(() => {
    context.setValue('toggleStat', false);
    context.setValue('toggleAs', false);
    context.setValue('toggleRatings', false);
    context.setValue('abilDis', 'P');
    context.prepareHero(id);
    context.prepareClasses();
  }, [])

  return (
    <Observer>
      {() => ( context.isLoad &&
        <div className="grid grid-cols-5 mx-16">
          <div className="pt-14 col-span-1 order-1 sticky top-16 mb-auto">
            <div className="w-full">
              <img src={context.hero.image} className="rounded-3xl object-cover w-56 h-56" />
              <div className="ml-48 -mt-8 relative">
                <label htmlFor="myFile" id="spin" className="h-14 w-14 rounded-full flex flex-wrap justify-center content-center border-darkViolet text-paleViolet cursor-pointer"
                style={{borderWidth: "1.8rem"}}>
                  <i className="fas fa-sync-alt text-2xl" />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 mt-2">
              <div className="text-paleViolet text-xl">
                <span className="font-bold mr-2">Name:</span>
                <input value={context.hero.name} onChange={(e) => context.hero.setValue('name', e.target.value)} className="input" />
              </div>
              <div className="text-paleViolet text-xl">
                <span className="font-bold mr-2">Title:</span>
                <input value={context.hero.title} onChange={(e) => context.hero.setValue('title', e.target.value)} className="input" />
              </div>
              <div className="text-paleViolet text-xl">
                <span className="font-bold mr-2">Class:</span>
                <select className="input" value={context.hero.className} onChange={(e) => context.hero.setValue('className', e.target.value)}>
                  {_.map(context.classes, (heroClass, index) => {
                  return (
                    _.map(heroClass.subtypes, (subtypes, subIndex) => (
                      <option key={`${index}_${subIndex}`} className="text-darkViolet" value={subtypes}>{subtypes}</option>
                    ))
                  )
                })}
                </select>
              </div>
              <div className="text-paleViolet text-xl">
                <span className="font-bold mr-2">Resource:</span>
                <select className="input" value={context.hero.resource} onChange={(e) => context.hero.setValue('resource', e.target.value)}>
                  <option className="text-darkViolet" value="Mana">Mana</option>
                  <option className="text-darkViolet" value="Stamina">Stamina</option>
                  <option className="text-darkViolet" value="N/A">N/A</option>
                </select>
              </div>
              <div className="text-paleViolet text-xl">
                <span className="font-bold mr-2">Range Type:</span>
                <select className="input" value={context.hero.attackType} onChange={(e) => context.hero.setValue('attackType', e.target.value)}>
                  <option className="text-darkViolet" value="Melee">Melee</option>
                  <option className="text-darkViolet" value="Ranged">Ranged</option>
                </select>
              </div>
              <div className="w-3/4 flex justify-center">
                <button onClick={() => {
                  if(id){
                    context.edit(router, id);
                  } else {
                    context.upload(router);
                  }
                }} className="font-bold bg-darkViolet text-paleViolet text-xl px-5 py-2 focus:outline-none rounded-full mx-auto mt-2">
                  Save
                </button>
              </div>
              <input type="file" id="myFile" className="invisible h-0" onChange={e => context.changeImage(e)} accept=".jpg, .jpeg, .png" />
            </div>
          </div>
          <div className="w-full mt-5 col-span-2 order-2">
            <div className="text-paleViolet text-2xl font-bold mb-5"><span className="mr-1">Abilities</span>
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
                    <EditAbilityCard ability={context.hero.abilities[index]} />
                  )
                }
              </Fragment>
            ))}
          </div>
          <div className="w-full mt-5 pl-11 col-span-2 order-3">
          <div className="bg-darkViolet text-paleViolet text-2xl font-bold my-5 flex justify-between items-center cursor-pointer transition hover:bg-PB py-5 px-5 rounded-lg" onClick={() => context.setValue('toggleStat', !context.toggleStat)}>Base Statistics
            <i className={classNames("fas fa-angle-down mr-2", {"transform rotate-180": context.toggleStat})} /></div>
            {context.toggleStat && (
              <div className="grid grid-cols-2 gap-y-1 overflow-auto bg-darkViolet rounded-xl py-3">
                <StatBlock stats={context.hero.stats} resource={context.hero.resource} getIcon={getIcon} />
              </div>
            )}
            <div className="bg-darkViolet text-paleViolet text-2xl font-bold my-5 flex justify-between items-center cursor-pointer transition hover:bg-PB py-5 px-5 rounded-lg" onClick={() => context.setValue('toggleAs', !context.toggleAs)}>
            <span><img src={getIcon('Attack Speed')} className="inline w-5 h-5 mr-3 -mt-1"/>Attack Speed</span>
            <i className={classNames("fas fa-angle-down mr-2", {"transform rotate-180": context.toggleAs})} /></div>
            {context.toggleAs && (
              <div className="flex flex-wrap gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3">
                {_.map(context.hero.attackSpeed, (stat, index) => (
                  <div key={index} className="text-paleViolet text-sm uppercase w-1/2 flex flex-wrap px-4 py-2">
                    <div className="font-bold mb-1">{ stat.key }</div>: <input type="text" value={stat.value} onChange={(e) => stat.setValue('value', e.target.value)} className="input w-full"/>
                  </div>
                ))}
            </div>
            )}
            <div className="bg-darkViolet text-paleViolet text-2xl font-bold my-5 flex justify-between items-center cursor-pointer transition hover:bg-PB py-5 px-5 rounded-lg" onClick={() => context.setValue('toggleRatings', !context.toggleRatings)}>Ratings
            <i className={classNames("fas fa-angle-down mr-2", {"transform rotate-180": context.toggleRatings})} /></div>
            {context.toggleRatings && (
              <div className="grid grid-cols-6 gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3 px-1">
                {_.map(context.hero.ratings, (stat, index) => (
                  <div key={index} className="text-paleViolet font-bold text-sm uppercase py-2 col-span-1 flex flex-col">
                    <div className="inline-block w-full text-center">{ stat.key }</div>
                    <div className="w-full flex justify-center">
                      <select value={stat.value} onChange={(e) => stat.setValue('value', e.target.value)} className="input">
                        <option className="text-darkViolet" value="1">1</option>
                        <option className="text-darkViolet" value="2">2</option>
                        <option className="text-darkViolet" value="3">3</option>
                      </select>
                    </div>
                  </div>
                ))}
            </div>
            )}
          </div>
        </div>
      )}
    </Observer>
  )
}
