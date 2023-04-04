import { ScalingInterface } from '@src/domain/hero.domain'
import _ from 'lodash'
import { Fragment } from 'react'

export const ScalingBlock = ({ scaling }: { scaling: ScalingInterface[] }) => {
  return (
    <Fragment>
      {scaling.length > 0 && (
        <div className="flex flex-wrap py-2 text-sm border-t-2 gap-y-3">
          {_.map(scaling, (item, index) => (
            <div key={index} className="w-1/2 px-1">
              <div className="font-bold uppercase">{item.key}</div>
              <div dangerouslySetInnerHTML={{ __html: item.value }}></div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  )
}
