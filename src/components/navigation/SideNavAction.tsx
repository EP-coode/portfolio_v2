import classNames from "classnames";
import React from "react";
import { NavActionProps } from ".";

const SideNavAction = ({ label, isActive, action }: NavActionProps) => {
  return (
    <button
      onClick={action}
      className={classNames(
        `w-100 border-t-2 last-of-type:border-b-2 py-2 border-gray-dark
        text-center text-xl
        duration-200 transition-all
        hover:scale-105`,
        {
          "text-cyan-600 border-r-8": isActive,
          "text-white": !isActive,
        }
      )}
    >
      {label}
    </button>
  );
};

export default SideNavAction;
