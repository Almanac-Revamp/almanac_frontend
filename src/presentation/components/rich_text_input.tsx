import { quillContext } from '@src/core/lib/quill_context'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { Value } from 'react-quill'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export const RichTextInput = observer(({ value, onChange, className }: { value?: Value; onChange: (val: string) => void; className?: string }) => {
  const context = useContext(quillContext)

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme={context.theme}
      modules={context.modules}
      formats={context.formats}
      style={{ height: '2.65rem' }}
      className={className}
    />
  )
})
