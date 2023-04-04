import classNames from 'classnames'
import { useState } from 'react'

export const ToggleBanner = ({ title, children }: { title: React.ReactNode; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="flex items-center justify-between px-5 py-5 my-5 text-2xl font-bold transition rounded-lg cursor-pointer bg-darkViolet text-paleViolet hover:bg-PB"
        onClick={() => setOpen((prev) => !prev)}
      >
        {title}
        <i
          className={classNames('fas fa-angle-down mr-2 duration-200 transition-transform', {
            'transform rotate-180': open,
          })}
        />
      </div>
      {open && children}
    </>
  )
}
