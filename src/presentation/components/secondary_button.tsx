import React from "react";

export const SecondaryButton = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon?: string;
  onClick: () => void;
}) => {
  return (
    <button
      className="px-3 py-1 text-base font-bold transition duration-100 rounded-full bg-PB text-paleViolet focus:outline-none hover:bg-lightPB hover:text-darkPB"
      onClick={onClick}
    >
      <div>
        {label}
        {icon && <i className={icon} />}
      </div>
    </button>
  );
};
