import { Fragment, useContext, useState } from 'react';
import classNames from "classnames";
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.bubble.css';
import { quillContext } from "../contexts/quill_context";
import _ from "lodash";
import { Observer } from 'mobx-react-lite';

const EditHeaderBlock = ({ context, header }) => {
  const keys = _.keysIn(header)

  return (
    <Fragment>
      {_.map(keys, (key, index) => (
        <div key={index} className="uppercase px-2 text-sm whitespace-nowrap py-1 w-1/2">
          <div className="font-bold inline-block w-1/2">{ _.startCase(key) }</div>
          <div className="font-normal bg-lightPB bg-opacity-10 rounded-lg">
            <ReactQuill value={header[key]} onChange={(v) => header.setValue(key, v)}
            theme={context.theme} modules={context.modules} formats={context.formats}
            style={{height: "2.65rem"}} className="header" />
          </div>
        </div>
      ))}
    </Fragment>
  )
}

export default function EditAbilityCard({ ability }) {
  const context = useContext(quillContext);
  const [headerToggle, setHeaderToggle] = useState(false);

  return (
    <Observer>
      {() => (
        <div className="relative whitespace-pre-wrap text-paleViolet bg-darkViolet p-5 rounded-xl w-full overflow-visible mb-5">
          <span className="absolute z-10 text-8xl font-black opacity-20 italic right-4 -top-3 noselect">{ ability.slot }</span>
          <div className="flex flex-col pb-2">
            <div className="font-bold text-2xl pr-6">
              <div className="mb-4 mr-4 inline-block">Ability Name</div>
              <input type="text" className="input" value={ability.name} onChange={(e) => ability.setValue('name', e.target.value)} />
              <div>
                <button className="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
                onClick={() => setHeaderToggle(!headerToggle)}>
                  Toggle Header<i className={classNames("fas fa-angle-down ml-2", {"transform rotate-180": headerToggle})} />
                </button>
                {ability.slot !== 'P' && (
                  <button className="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
                  onClick={() => ability.addSubAbility()}>
                    Add Sub Ability
                  </button>
                )}
                <button className="ml-2 mb-2 font-bold bg-PB text-paleViolet text-base px-3 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
                onClick={() => ability.addSummon()}>
                  Add Summoned Unit
                </button>
              </div>
            </div>
            {
              headerToggle && (
                <div className="flex flex-wrap">
                  <EditHeaderBlock context={context} header={ability.header} />
                </div>
              )
            } 
          </div>
          <div className="py-2 border-t-2">
            <div className="text-paleViolet bg-lightPB bg-opacity-10 rounded-lg">
              <ReactQuill value={ability.desc} onChange={(v) => ability.setValue('desc', v)}
              theme={context.theme} modules={context.modules} formats={context.formats} className="desc" />
            </div>
          </div>
          {ability.slot !== 'P' && (
            <div className="pt-2 border-t-2">
              <div className="font-bold text-xl pb-4">
                <span className="mx-1">Scaling</span>
                <button className="ml-2 font-bold bg-PB text-paleViolet text-lg px-4 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100"
                onClick={() => ability.addScaling()}>
                  Add New Scaling
                </button>
              </div>
              <div className="grid grid-cols-2 gap-x-5">
                {_.map(ability.scaling, (scale, index) => (
                  <div key={index} className="pb-3">
                    <div className="uppercase font-bold pb-2">
                      <div className="w-14 inline-block">Key</div>
                      <input type="text" className="input w-2/3 text-sm uppercase" value={scale.key} onChange={(e) => scale.setValue('key', e.target.value)} />
                    </div>
                    <div className="font-bold">
                      <div className="uppercase inline-block mb-1"><span className="mr-1">Value</span>
                        {index > 0 && (<i className="fas fa-caret-left ml-2 cursor-pointer hover:text-lightViolet transition duration-200" onClick={() => ability.shiftLeft(index)}></i>)}
                        {index < ability.scaling.length - 1 && <i className="fas fa-caret-right ml-2 cursor-pointer hover:text-lightViolet transition duration-200"  onClick={() => ability.shiftRight(index)}></i>}
                        <i className="fas fa-times cursor-pointer ml-2 hover:text-lightViolet transition duration-200"  onClick={() => ability.delItem('scaling', index)}></i>
                      </div>
                      <div className="text-paleViolet font-normal bg-lightPB bg-opacity-10 rounded-lg">
                        <ReactQuill value={scale.value} onChange={(v) => scale.setValue('value', v)}
                        theme={context.theme} modules={context.modules} formats={context.formats}
                        className="scaling" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      )}
    </Observer>
  )
}