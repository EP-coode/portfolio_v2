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
        "flex flex-col h-full min-w-fit items-center mx-2 transition-transform cursor-pointer",
        {
          "text-blue-400": isActive,
          "text-white": !isActive,
        }
      )}
      onClick={() => action && action()}
    >
      <div className="w-fit h-fit flex-grow">{icon}</div>
      <div>{label}</div>
    </div>
  );
}
