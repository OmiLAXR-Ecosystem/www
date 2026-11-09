import React from "react";
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBook, faCube } from "@fortawesome/free-solid-svg-icons";
import Icon from "./Icon";

interface INavListMenuItem {
  title: string,
  href: string,
  target?: string,
  icon: React.ReactNode
}

// nav list menu
const navListMenuItems: INavListMenuItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon className="h-[18px] w-[18px]"/>
  },
  {
    title: "Need help? Join our community",
    //href: "https://discord.gg/AnUXutpHZz",
    href: "https://discord.gg/u4gtXTBEx3",
    target: "_blank",
    icon: <Icon icon={faDiscord} className="text-lg"/>
  },
  {
    title: "GitHub",
    href: "https://github.com/OmiLAXR-Ecosystem",
    target: "_blank",
    icon: <Icon icon={faGithub} className="text-xl"/>
  },
  {
    title: "Ecosystem",
    href: "/ecosystem",
    icon: <Icon icon={faCube} className="text-xl"/>
  },
  {
    title: "Basics",
    href: "/pipeline",
    icon: <Icon icon={faBook} className="text-xl"/>
  },
];

const MENU_ID = "mobile-nav-menu";

function NavList() {
  return (
    <ul className="mb-0 mt-0 flex items-center justify-end gap-2">
      {navListMenuItems.map(({title, href, icon, target}, index) =>
        <li key={index}>
          {/* Labels are hidden below lg, so the link needs an accessible name */}
          <a href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}
             aria-label={title} title={title}
             className="flex min-h-[40px] min-w-[40px] items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-normal text-blue-gray-900 outline-none transition-all hover:bg-blue-gray-50 focus-visible:bg-blue-gray-50 lg:rounded-full">
            {icon} <span className="hidden lg:flex">{title}</span>
          </a>
        </li>
      )}
    </ul>
  );
}

function MobileNavList() {
  return (
    <ul className="flex flex-col gap-1 border-t border-blue-gray-50 pt-2">
      {navListMenuItems.map(({title, href, icon, target}, index) =>
        <li key={index}>
          <a href={href} target={target} rel={target === "_blank" ? "noreferrer" : undefined}
             className="flex min-h-[44px] items-center gap-3 rounded-md px-3 text-base text-blue-gray-900 outline-none hover:bg-blue-gray-50 focus-visible:bg-blue-gray-50">
            <span className="flex w-6 justify-center">{icon}</span> {title}
          </a>
        </li>
      )}
    </ul>
  );
}

// Rendered as static HTML; the menu button and the scroll border are handled by
// src/scripts/interactions.ts (data-navbar), so the navbar needs no hydration.
export default function ComplexNavbar() {
  return (
    <nav
      data-navbar
      className="sticky inset-0 z-10 mt-0 block w-full bg-white/80 px-3 py-2 shadow-md backdrop-blur-2xl backdrop-saturate-200 transition-shadow [view-transition-name:site-nav] sm:px-4 lg:px-6"
    >
      {/* Same max width as the page container (2xl breakpoint), so the logo lines up with the content */}
      <div className="relative mx-auto flex w-full max-w-[1320px] items-center gap-2 text-blue-gray-900">
        <a href="/" className="shrink-0" aria-label="OmiLAXR homepage">
          <img width={120} height={60} src="/logos/OmiLAXR.svg" alt="OmiLAXR" className="h-12 w-auto sm:h-[60px]" />
        </a>
        <div className="ml-auto hidden sm:block">
          <NavList />
        </div>
        <a href="/get-started"
           className="ml-auto whitespace-nowrap rounded-lg bg-blue px-3 py-2 text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg sm:ml-2 sm:px-4">
          Get started
        </a>
        <button type="button"
                className="flex h-10 w-10 items-center justify-center rounded-md text-blue-gray-900 hover:bg-blue-gray-50 focus-visible:bg-blue-gray-50 sm:hidden"
                data-menu-toggle aria-expanded="false" aria-controls={MENU_ID} aria-label="Open menu">
          <span data-menu-icon="open"><Bars3Icon className="h-6 w-6"/></span>
          <span data-menu-icon="close" hidden><XMarkIcon className="h-6 w-6"/></span>
        </button>
      </div>
      <div id={MENU_ID} className="mx-auto mt-2 max-w-[1320px] sm:hidden" hidden>
        <MobileNavList />
      </div>
    </nav>
  );
}
