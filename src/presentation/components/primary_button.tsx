import React from 'react'

export const PrimaryButton = ({ label, onClick }: { label: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 text-xl font-bold transition duration-100 rounded-full bg-darkViolet text-paleViolet focus:outline-none hover:bg-lightPB hover:text-darkPB"
    >
      {label}
    </button>
  )
}
