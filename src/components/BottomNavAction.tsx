import classNames from "classnames";

type BottomNavActionProps = {
  label: string;
  icon: React.ReactNode;
  action?: () => any;
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
        "flex flex-col h-full items-center mx-2 cursor-pointer transition-colors basis-20",
        {
          "text-blue-400": isActive,
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
