import classNames from "classnames";
import { useContext } from "react";
import { SectionContext } from "../../context/SectionInViewContext";

type BottomNavActionProps = {
  label: string;
  icon: React.ReactNode;
  action?: () => void;
  isActive?: boolean;
};

export default function BottomNavAction({
  label,
  icon,
  action,
  isActive = false,
}: BottomNavActionProps) {
  return (
    <div
      className={classNames(
        `flex flex-col basis-20 flex-grow h-full items-center 
          p-2 cursor-pointer transition-transform transition-colors duration-300`,
        {
          "text-cyan-500 border-t-4 border-cyan-500": isActive,
          "text-white": !isActive,
        }
      )}
      onClick={() => action && action()}
    >
      <div className="flex-grow h-2 w-full flex justify-center">{icon}</div>
      <div>{label}</div>
    </div>
  );
}
