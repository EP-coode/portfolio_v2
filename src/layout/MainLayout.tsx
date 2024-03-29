import React, { ReactNode } from "react";
import { Footer } from "../components/Footer";
import WindowScrollProgres from "../components/WindowScrollProgres";
import { BottomNav, SideNav, mainNavActions } from "../components/navigation";
import { useRouter } from "next/router";

type Props = {
  children: ReactNode;
  activeActionId: string;
};

const showProgressBarOnPaths = ["/", "/articles/[article_slug]"];

export const MainLayout = ({ children, activeActionId }: Props) => {
  const router = useRouter();
  const _navActions = mainNavActions(router, activeActionId);
  const showProggresBar = showProgressBarOnPaths.some(
    (p) => p == router.pathname
  );

  return (
    <div className="bg-gray-dark font-lato text-justify">
      {showProggresBar && <WindowScrollProgres />}
      <div className="flex flex-col md:flex-row w-full">
        <SideNav actions={_navActions} className="hidden md:flex"></SideNav>
        <div className="min-h-screen grow-1 w-full flex flex-col md:mb-0 mb-14">
          <div className="flex-1 pb-24 overflow-hidden ">{children}</div>
          <Footer />
        </div>
        <BottomNav
          actions={_navActions}
          className="md:hidden z-50 fixed bottom-0"
        ></BottomNav>
      </div>
    </div>
  );
};
