import classNames from "classnames";
import { Fragment } from "react";

export default function RatingsCard({ ratings }) {
  return (
    <Fragment>
      <div className="text-paleViolet text-2xl font-bold my-3">Ratings</div>
      <div className="flex flex-wrap gap-y-1 h-26 overflow-auto bg-darkViolet rounded-xl py-3">
        {_.map(ratings, (stat, index) => (
          <div key={index} className="text-paleViolet w-1/2 font-bold text-sm uppercase px-4 py-2">
            <div className="inline-block w-1/5 ml-2 mr-8">{ stat.key }</div>
            <div className="bg-lightViolet w-2/5 inline-block rounded mx-3">
              <div className={classNames("bg-PB rounded text-right pr-2",
              {'w-1/3': stat.value === '1'},
              {'w-2/3': stat.value === '2'},
              {'w-full': stat.value === '3'})}>{ stat.value }</div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}