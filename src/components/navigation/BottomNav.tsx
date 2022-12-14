import { NavProps } from ".";
import BottomNavAction from "./BottomNavAction";

export const BottomNav = ({ actions, className }: NavProps) => {
  return (
    <nav
      className={`sticky z-50 bottom-0 h-14 xs:h-16 w-full text-sm left-0 bg-gray-light flex justify-around align-middle ${className}`}
    >
      {actions.map(({ icon, label, action, isActive }) => (
        <BottomNavAction
          icon={icon}
          label={label}
          action={action}
          isActive={isActive}
          key={label}
        />
      ))}
    </nav>
  );
};
