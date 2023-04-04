import classNames from 'classnames'
import _ from 'lodash'
import { Fragment } from 'react'

export default function RatingsCard({ ratings }) {
  return (
    <Fragment>
      <div className="my-3 text-2xl font-bold text-paleViolet">Ratings</div>
      <div className="flex flex-wrap py-3 overflow-auto gap-y-1 h-26 bg-darkViolet rounded-xl">
        {_.map(ratings, (stat, index) => (
          <div key={index} className="w-1/2 px-4 py-2 text-sm font-bold uppercase text-paleViolet">
            <div className="inline-block w-1/5 ml-2 mr-8">{stat.key}</div>
            <div className="inline-block w-2/5 mx-3 rounded bg-lightViolet">
              <div
                className={classNames(
                  'bg-PB rounded text-right pr-2',
                  { 'w-1/3': stat.value === '1' },
                  { 'w-2/3': stat.value === '2' },
                  { 'w-full': stat.value === '3' }
                )}
              >
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  )
}
