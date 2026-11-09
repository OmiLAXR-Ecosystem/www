import {imageSize} from "../../lib/imageSize";
import MailTo from "../MailTo";
import Hyperlink from "../Hyperlink";

type Contributor = "lt" | "chers" | "uop" | "tud";

interface University {
  key: Contributor;
  name: string;
  department: string;
  homepage: string;
}

const universities: University[] = [
    { key: "lt", name: "RWTH Aachen University", department: "Lehr- und Forschungsgebiet Informatik 9 - Lerntechnologien", homepage: "https://learntech.rwth-aachen.de" },
    { key: "chers", name: "RWTH Aachen University", department: "Schülerlabor CheERs! - Didaktik der Chemie", homepage: "https://www.rwth-aachen.de/go/id/moal" },
    { key: "uop", name: "University of Potsdam", department: "Institut für Informatik und Computational Science", homepage: "https://www.uni-potsdam.de/de/multimedia/" },
    { key: "tud", name: "TU Dresden", department: "Didaktik der Informatik", homepage: "https://tu-dresden.de/ing/informatik/smt/ddi" },
];


interface Project {
  name: string,
  image: string,
  url: string,
  contributors: Contributor[]
}

const projects: Project[] = [
  { name: "RePiX VR", contributors: ["lt"], url: "https://gitlab.com/learntech-rwth/repix-vr/repix-vr-app", image: "/projects/repix.webp" },
  { name: "Teach-R", contributors: ["uop", "lt"], url: "https://gitup.uni-potsdam.de/mm_vr/vr-klassenzimmer/-/wikis/home", image: "/projects/teach-r.webp" },
  { name: "Inside the Router", contributors: ["tud"], url: "https://ddigames.inf.tu-dresden.de/sites/vr/router/", image: "/projects/inside-the-router.webp" },
  { name: "SchülerlARbor Chemie", contributors: ["chers", "lt"], url: "https://ddigames.inf.tu-dresden.de/sites/vr/router/", image: "/projects/chemielarbor.webp" },
  //{ name: "Inside the CPU (TU Dresden)", url: "#",  },
  //{ name: "Interaction Windows", url: "", },
  //{ name: "Gedächtnispalast", url: "", },
];

export default function LogoSectionOne() {
  return (
    <section className="py-8 px-8 lg:py-20">
      <div className="container mx-auto text-center">
        <p className="text-xl font-extrabold mb-8 text-gray-900">
          Following projects are using OmiLAXR
        </p>
        <p className="text-md">Are you interested in integrating OmiLAXR into your project? Contact us via <MailTo email="goerzen@cs.rwth-aachen.de">E-Mail</MailTo> or <Hyperlink url="https://discord.com/invite/AnUXutpHZz">Discord</Hyperlink>. We are happy if we can help you to integrate it into your application.</p>
        <br />
        <div className="flex flex-wrap items-center justify-center gap-8">
          {projects.map(({image, name, url, contributors }, index) => (
              <div style={{maxWidth: '450px', width: '100%'}} key={index}>
                <a href={url} target="_blank">
                  <div>
                    <p className="text-xl font-semibold text-blue">
                      {name}
                    </p>
                    <img
                        src={image}
                        alt={name}
                        {...imageSize(image)}
                        loading="lazy"
                        decoding="async"
                    />
                  </div>
                </a>
                <small>by&nbsp;</small>{contributors.map((cont, index) => {
                  const university = universities.find(uni => uni.key === cont);
                  return <small key={index}><a href={university.homepage}>{university.department} ({university.name})</a>{ index < contributors.length - 1 ? ' and ' : ''}</small>;
              })}
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
