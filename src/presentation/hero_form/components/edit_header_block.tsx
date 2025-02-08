import { AbilityHeaderInterface } from '@src/domain/ability.domain'
import classNames from 'classnames'
import { RichTextInput } from '@src/presentation/components/rich_text_input'
import _ from 'lodash'
import { SummonHeaderInterface } from '@src/domain/summon.domain'

export const EditHeaderBlock = ({
  slot,
  header,
  summon,
  onChange,
}: {
  slot: string
  header: AbilityHeaderInterface | SummonHeaderInterface
  summon?: boolean
  onChange: (key: string, val: string) => void
}) => {
  return (
    <>
      {_.map(_.keys(header), (key) => (
        <div key={slot + key} className="w-1/2 px-2 py-1 text-sm whitespace-nowrap">
          <div className="inline-block w-1/2 font-bold uppercase">{_.startCase(key)}</div>
          <div className={classNames('font-normal bg-lightPB bg-opacity-10 rounded-lg', { uppercase: !summon })}>
            <RichTextInput
              value={header[key]}
              // onChange={(v) => header.setValue(key, v)}
              onChange={(v) => onChange(key, v)}
              className="header"
            />
          </div>
        </div>
      ))}
    </>
  )
}
