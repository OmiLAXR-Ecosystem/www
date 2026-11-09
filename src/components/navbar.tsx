import React from "react";
import {
  Navbar,
  Typography,
  Button,
  MenuItem,
} from "../materialTailwind";
import {
  HomeIcon,
} from "@heroicons/react/24/outline";

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
    icon: <i className="fab fa-discord text-lg leading-none" aria-hidden="true"></i>
  },
  {
    title: "GitHub",
    href: "https://github.com/OmiLAXR-Ecosystem",
    target: "_blank",
    icon: <i className="fab fa-github text-xl leading-none" aria-hidden="true"></i>
  },
  {
    title: "Ecosystem",
    href: "/ecosystem",
    icon: <i className="fa-solid fa-cube text-xl leading-none" aria-hidden="true"></i>
  },
  {
    title: "Basics",
    href: "/pipeline",
    icon: <i className="fa-solid fa-book text-xl leading-none" aria-hidden="true"></i>
  },
  // {
  //   title: "How to's",
  //   href: "/how-to",
  //   icon: <i className="fa-solid fa-book text-xl leading-none" aria-hidden="true"></i>
  // }
  /*{
    title: "About Us",
    href: "./about",
    icon: <Square3Stack3DIcon className="h-[18px] w-[18px]" />
  },
  {
    title: "Publications",
    href: "./publications",
    icon: <Square3Stack3DIcon className="h-[18px] w-[18px]" />
  },*/
];

function NavListMenu() {

  return (
      <React.Fragment>
        {navListMenuItems.map(({title, href, icon, target}, index) =>
            <Typography key={index} as="a" href={href} target={target} variant="small"
                        className="font-normal outline-none focus:outline-none">
              <MenuItem className="items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
                {icon} <span className="hidden lg:flex">{title}</span>
              </MenuItem>
            </Typography>
        )}
      </React.Fragment>
  );
}

function NavList() {
  return (
      <ul className="mb-0 mt-0 flex flex-wrap items-center justify-end gap-1 sm:gap-2 lg:items-center">
      <NavListMenu />
    </ul>
  );
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [shouldShowBorder, setShouldShowBorder] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShouldShowBorder(true);
      } else {
        setShouldShowBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar
      className={`sticky inset-0 z-10 mt-0 !w-full !max-w-none rounded-none px-3 py-2 sm:px-4 lg:px-6 transition-shadow ${
        shouldShowBorder ? "border-b border-gray-300 shadow-none" : ""
      }`}
    >
      <div className="relative mx-auto flex w-full flex-wrap items-center gap-2 text-blue-gray-900 sm:flex-nowrap">
        <img width={120} src="/logos/OmiLAXR.svg" alt="Logo" className="shrink-0" />
        <div className="order-3 w-full sm:order-2 sm:ml-auto sm:w-auto">
          <NavList />
        </div>
        <a href="/get-started" className="order-2 ml-auto sm:order-3 sm:ml-2">
          {/* @ts-ignore */}
          <Button color="blue" className="whitespace-nowrap px-3 py-2 sm:px-4">
            Get started
          </Button>
        </a>
      </div>
    </Navbar>
  );
}
