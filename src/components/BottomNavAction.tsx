import classNames from "classnames";

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
          "text-blue-400 border-t-4 border-blue-400": isActive,
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
