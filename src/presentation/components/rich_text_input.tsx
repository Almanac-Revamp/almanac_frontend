import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export const RichTextInput = observer(({ value, onChange, className }: { value?: string; onChange: (val: string) => void; className?: string }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="bubble"
      modules={{
        toolbar: [
          ['bold'],
          [{ script: 'super' }],
          [
            {
              color: [
                '#ff9800',
                '#ffbd00',
                '#f44336',
                '#03a9f4',
                '#4caf50',
                '#ffeb3b',
                '#e930e9',
                '#1d87da',
                '#ff855f',
                '#687fff',
                '#e5662b',
                '#ff5119',
                '#F3E5AB',
                '#BE98D4',
                '#7fd3f8',
                '#A19BDA',
                '#72a483',
              ],
            },
          ],
          ['clean'],
        ],
      }}
      formats={['bold', 'italic', 'underline', 'strike', 'script', 'color']}
      defaultValue={value}
      style={{ height: '2.65rem' }}
      className={className}
    />
  )
})
