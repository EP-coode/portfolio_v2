import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextRouter } from "next/router";
import { CirclePersonIcon, MailIcon } from "../../icons";
import { scroolIntoViewById } from "../../utils/scroolIntoViewById";

export { BottomNav } from "./BottomNav";
export { SideNav } from "./SideNav";

export type NavActionProps = {
  id: string;
  label: string;
  icon: React.ReactNode;
  action?: () => void | Promise<void>;
  isActive?: boolean;
};

export type NavProps = {
  onLogoClick?: () => void;
  actions: NavActionProps[];
  className?: string;
};

export const mainNavActions = (
  router: NextRouter,
  activeActionId: string
): NavActionProps[] => [
  {
    id: "AboutMe",
    icon: <CirclePersonIcon />,
    label: "AboutMe",
    isActive: activeActionId == "AboutMe" && router.pathname == "/",
    action: async () => {
      if (router.pathname != "/") await router.push("/");
      scroolIntoViewById("AboutMe");
    },
  },
  {
    id: "Experience",
    icon: <FontAwesomeIcon icon={faBuilding} className="h-full" />,
    label: "Experience",
    isActive: activeActionId == "Experience" && router.pathname == "/",
    action: async () => {
      if (router.pathname != "/") await router.push("/");
      scroolIntoViewById("Experience");
    },
  },
  // {
  //   id: "Projects",
  //   icon: <WorkerIcon />,
  //   label: "Projects",
  //   isActive: activeActionId == "Projects" && router.pathname == "/",
  //   action: async () => {
  //     if (router.pathname != "/") await router.push("/");
  //     scroolIntoViewById("Projects");
  //   },
  // },
  {
    id: "Contact",
    icon: <MailIcon />,
    label: "Contact",
    isActive: activeActionId == "Contact" && router.pathname == "/",
    action: async () => {
      if (router.pathname != "/") await router.push("/");
      scroolIntoViewById("Contact");
    },
  },
  {
    id: "Blog",
    icon: <FontAwesomeIcon icon={faBuilding} className="h-full" />,
    label: "Blog",
    isActive: router.pathname.includes("articles"),
    action: async () => {
      router.push("/articles/all/0");
    },
  },
];
