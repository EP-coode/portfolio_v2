export { BottomNav } from "./BottomNav";
export { SideNav } from "./SideNav";

export type NavActionProps = {
  label: string;
  icon: React.ReactNode;
  action?: () => void;
  isActive?: boolean;
};

export type NavProps = {
  onLogoClick?: () => void;
  actions: NavActionProps[];
};
