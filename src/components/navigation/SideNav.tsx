import classNames from "classnames";
import Image from "next/image";
import React from "react";

import logo from "../../../public/images/logo.png";
import { NavProps } from ".";
import SideNavAction from "./SideNavAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const SideNav = ({ actions, onLogoClick }: NavProps) => (
  <nav className="w-40 h-screen sticky top-0 left-0 bg-gray-light flex-grow-0 flex-shrink-0 z-20 flex flex-col">
    <div
      onClick={onLogoClick}
      className={classNames("p-4 bg-stone-800 select-none", {
        "cursor-pointer": onLogoClick,
      })}
    >
      <Image src={logo} objectFit="cover" placeholder="blur" alt="logo" />
      <h2 className="text-white text-center text-2xl font-mono">
        Ernest Przybył
      </h2>
    </div>
    <nav className="flex-grow flex flex-col justify-center overflow-hidden">
      {actions.map(({ icon, label, isActive, action }) => (
        <SideNavAction
          label={label}
          isActive={isActive}
          action={action}
          icon={icon}
          key={label}
        />
      ))}
    </nav>
    <div className="py-10 px-7">
      <div className="h-6 w-100 text-white flex flex-row justify-around">
        <a
          className="hover:scale-110"
          target="_blank"
          href="https://www.linkedin.com/in/ernestprzybyl"
          rel="noopener noreferrer"
          aria-label="linkedin"
        >
          <FontAwesomeIcon icon={faLinkedin} className="h-full" />
        </a>
        <a
          className="hover:scale-110"
          target="_blank"
          href="https://github.com/EP-coode"
          rel="noopener noreferrer"
          aria-label="github"
        >
          <FontAwesomeIcon icon={faGithub} className="h-full" />
        </a>
      </div>
    </div>
  </nav>
);
