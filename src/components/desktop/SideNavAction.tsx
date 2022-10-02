import classNames from "classnames";
import React from "react";

type Props = {
  label: string;
  isActive: boolean;
  action: () => void;
};

const SideNavAction = ({ label, isActive, action }: Props) => {
  return (
    <button
      onClick={action}
      className={classNames(
        `w-100 border-t-2 last-of-type:border-b-2 py-2 border-gray-dark
        text-center text-white text-xl
        duration-200 transition-all
        hover:scale-105`,
        {
          "text-cyan-600 border-r-8": isActive,
        }
      )}
    >
      {label}
    </button>
  );
};

export default SideNavAction;
