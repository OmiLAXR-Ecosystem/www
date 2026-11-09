import {
  faDiscord,
  faGithub,
  faGitlab,
  faLinkedin,
  faOrcid,
  faResearchgate,
  faXTwitter,
  faXing,
} from "@fortawesome/free-brands-svg-icons";
import Icon from "../Icon";


const YEAR = new Date().getFullYear();

const SOCIAL_MEDIA = [
  {
    name: "LinkedIn",
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/sergej-g%C3%B6rzen-a7a77b178/",
  },
  {
    name: "Xing",
    icon: faXing,
    link: "https://www.xing.com/profile/Sergej_Goerzen2",
  },
  {
    name: "X (Twitter)",
    icon: faXTwitter,
    link: "https://twitter.com/sergejg92",
  },
  /*{
    name: "Threads",
    icon: faThreads,
    link: "https://www.threads.net/@sgoerzen92",
  },*/
  {
    name: "ResearchGate",
    icon: faResearchgate,
    link: "https://www.researchgate.net/profile/Sergej-Goerzen",
  },
  {
    name: "ORCID",
    icon: faOrcid,
    link: "https://orcid.org/0000-0003-3853-2435",
  },
  /*{
    name: "Facebook",
    icon: faSquareFacebook,
    link: "https://www.facebook.com/creativetim?ref=astrolaunch-ui",
  },
  {
    name: "Dribbble",
    icon: faDribbble,
    link: "https://www.dribbble.com/creativetim?ref=astrolaunch-ui",
  },*/
  {
    name: "GitHub",
    icon: faGithub,
    link: "https://github.com/SGoerzen/",
  },
  {
    name: "GitLab",
    icon: faGitlab,
    link: "https://gitlab.com/sgoerzen",
  },
  {
    name: "Discord",
    icon: faDiscord,
    link: "https://discord.com/users/sergej.goerzen",
  },
];

const RESEARCHGROUP = [
  {
    name: "About Us",
    link: "https://learntech.rwth-aachen.de",
  },
  {
    name: "Blog",
    link: "https://learntech.rwth-aachen.de/cms/LearnTech/Das-Lehr-und-Forschungsgebiet/~jiyi/Aktuelle-Meldungen/",
  },
  {
    name: "GitLab",
    link: "https://gitlab.com/learntech-rwth",
  },
  {
    name: "xAPI Registry",
    link: "https://xapi.elearn.rwth-aachen.de/",
  },
  /*{
    name: "Technology Landscape (todo)",
    link: "#",
  },*/
];

const RESOURCES = [
  {
    name: "Discord",
    link: "https://discord.com/invite/AnUXutpHZz",
  },
  {
    name: "OmiLAXR Framework and Modules",
    link: "https://gitlab.com/learntech-rwth/omilaxr-ecosystem/v2",
  },
  {
    name: "OmiLAXR Ecosystem",
    link: "https://gitlab.com/learntech-rwth/omilaxr-ecosystem",
  }
];

const TECHS = [
  {
    name: "Unity",
    link: "https://unity.com/",
  },
  {
    name: "TinCan",
    link: "https://github.com/SGoerzen/TinCanUnity",
  },
  {
    name: "xAPI Specification",
    link: "https://xapi.com/",
  }
];

export function Footer() {
  return (
    <footer className="relative z-50 bg-white px-8 pt-12 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-4/12">
            <h2 className="mb-2 block text-2xl font-semibold leading-snug tracking-normal text-primary antialiased">
              Sergej Görzen
            </h2>
            <p className="text-md mt-0 mb-2 block font-normal leading-relaxed text-gray-600 antialiased">
              PhD Student, Research Assistant, Software Engineer and Consultant. Visit my <a href="https://sgoerzen.de">homepage</a> and get in contact with me on
            </p>
            <div className="mt-6">
              {SOCIAL_MEDIA.map(({ name, icon, link }, key) => (
                <a key={key} href={link} target="_blank" rel="noreferrer" aria-label={name} title={name}>
                  <span className="mr-2 inline-flex items-center justify-center rounded-full border-[1.5px] border-blue-gray-50 p-3 text-primary">
                    <Icon icon={icon} className="w-[1.25em]"/>
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="ml-auto w-full px-4 md:w-7/12">
            <div className="items-top mb-6 flex flex-wrap">
              <div className="w-6/12 pt-6 md:ml-auto md:px-4 md:pt-0 xl:w-3/12">
                <span className="text-md mb-4 block font-medium text-primary">
                  Research Group
                </span>
                <ul className="list-unstyled">
                  {RESEARCHGROUP.map(({ name, link }, key) => (
                    <li key={key}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-3/12">
                <span className="text-md mb-4 block font-medium text-primary">
                  Resources
                </span>
                <ul className="list-unstyled">
                  {RESOURCES.map(({ name, link }, key) => (
                    <li key={key}>
                      <a
                        href={link}
                        rel="noreferrer"
                        target={name === "Documentation" ? "_self" : "_blank"}
                        className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ml-auto w-6/12 pt-6 md:px-4 md:pt-0 xl:w-3/12">
                <span className="text-md mb-4 block font-medium text-primary">
                  Technologies
                </span>
                <ul className="list-unstyled">
                  {TECHS.map(({ name, link }, key) => (
                    <li key={key}>
                      <a
                        href={link}
                        className="block pb-2 text-sm font-normal leading-relaxed text-gray-600 transition-colors hover:text-primary"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-blue-gray-50" />
        <div className="flex flex-wrap items-center justify-center gap-2 md:justify-between">
          <div className="text-center lg:text-left">
            <div className="text-md mt-2 py-1 font-normal text-gray-600">
                Template basis: Copyright &copy; 2023 Creative Tim (AstroLaunch UI).
            </div>
              <div className="text-md py-1 font-normal text-gray-600">
                  Customizations & content: Copyright &copy; {YEAR}{" Sergej Görzen"}. All rights reserved.
            </div>
          </div>
          <div className="ml-auto w-full px-4 text-center md:w-4/12 md:px-0 md:text-right">

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
