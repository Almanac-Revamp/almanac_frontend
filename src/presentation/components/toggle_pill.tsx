export const TogglePill = ({ condition, label, onClick }: { condition: boolean; label: string; onClick: () => void }) => {
  return (
    <button
      key={label}
      className={`ml-2 mb-2 font-bold text-base px-5 py-1 focus:outline-none rounded-full mx-auto hover:bg-lightPB hover:text-darkPB transition duration-100
${condition ? 'bg-PB text-paleViolet' : 'bg-lightPB text-darkPB'}`}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
