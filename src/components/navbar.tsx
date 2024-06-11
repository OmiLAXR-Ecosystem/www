import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  MenuItem,
  IconButton,
} from "../materialTailwind";
import {
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  Bars2Icon,
  HomeIcon,
} from "@heroicons/react/24/outline";

interface INavListMenuItem {
  title: string,
  href: string,
  target?: string,
  icon?: React.ReactNode
}

// nav list menu
const navListMenuItems: INavListMenuItem[] = [
  {
    title: "Home",
    href: "/",
    icon: <HomeIcon className="h-[18px] w-[18px]" />
  },
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
  {
    title: "Docs",
    href: "https://docs.omilaxr.dev/",
    target: "_blank",
    icon: React.createElement(CodeBracketSquareIcon, { className: "h-[18px] w-[18px]" }),
  },
];

function NavListMenu() {

  return (
    <React.Fragment>
      {navListMenuItems.map(({title, href, icon, target}, index) =>
        <Typography key={index} as="a" href={href} target={target} variant="small" className="font-normal outline-none focus:outline-none">
          <MenuItem className="hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full">
            {icon ?? <></>} {title + " "}
          </MenuItem>
        </Typography>
      )}
    </React.Fragment>
  );
}

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
    </ul>
  );
}

export default function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [shouldShowBorder, setShouldShowBorder] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

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
      className={`sticky inset-0 z-10 mx-auto max-w-screen-2xl p-2 lg:pl-6 mt-4 transition-shadow ${
        shouldShowBorder ? "border-b border-gray-300 shadow-none" : ""
      }`}
    >
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <img width={120} src="./logos/OmiLAXR.svg" alt="Logo" />
        <div className="hidden lg:flex ml-auto">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <a href="https://discord.gg/AnUXutpHZz" target="_blank">
          {/* @ts-ignore */}
          <Button size="sm" color="dark" variant="text">
            <i className="fab fa-discord text-lg leading-none" aria-hidden="true"></i>
          </Button>
        </a>
        <a href="https://gitlab.com/learntech-rwth/omilaxr-ecosystem" target="_blank">
          {/* @ts-ignore */}
          <Button size="sm" color="dark" variant="text">
            <i className="fab fa-gitlab text-xl leading-none" aria-hidden="true"></i>
          </Button>
        </a>
        <a href="/get-started">
          {/* @ts-ignore */}
          <Button color="dark">
            Get started
          </Button>
        </a>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
