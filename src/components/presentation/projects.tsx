import { Typography } from "../../materialTailwind";

interface Project {
  name: string,
  logo?: string,
  url: string
}

const projects: Project[] = [
  { name: "RePiX VR", url: "https://gitlab.com/learntech-rwth/repix-vr/repix-vr-app",  },
  { name: "Teach-R", url: "https://gitup.uni-potsdam.de/mm_vr/vr-klassenzimmer/-/wikis/home",  },
  { name: "Inside the Router", url: "https://gitlab.com/dev-ddi/vr/vr-router",  },
  //{ name: "Inside the CPU", url: "",  },
  //{ name: "Interaction Windows", url: "", },
  //{ name: "Gedächtnispalast", url: "", },
];

export function LogoSectionOne() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <Typography
          color="blue-gray"
          className="text-xl font-extrabold mb-8"
        >
          Used and approved by the projects
        </Typography>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {projects.map(({logo, name, url}, key) => (
              <a href={url} target="_blank" key={key}>
                {logo && <img
                    src={`logos/logo-${logo}.svg`}
                    alt="logo"
                    className="w-40"
                />}
                {name}
              </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoSectionOne;
