import 'quill/dist/quill.bubble.css'
import { createContext } from 'react'

class QuillContext {
  theme: string
  modules: { toolbar: any[] }
  formats: string[]

  constructor() {
    this.theme = 'bubble'
    this.modules = {
      toolbar: [
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
    }
    this.formats = ['bold', 'italic', 'underline', 'strike', 'script', 'color']
  }

  setValue(key, value) {
    this[key] = value
  }
}

export const quillContext = createContext(new QuillContext())
