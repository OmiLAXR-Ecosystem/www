import {AnimatingText} from "../AnimatingText";
import {OmiLAXRLogo} from "../OmiLAXRLogo";

export default function HeaderPresentation() {
  return (
    <header className="relative h-full w-full place-items-center bg-white px-4 py-6 sm:px-6 lg:mb-36 lg:px-8 lg:py-8">
      <div className="container mx-auto grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="text-center lg:text-left">
          <h1 className="mb-6 text-4xl leading-tight font-black text-gray-900 sm:text-5xl lg:mb-8 lg:mr-20 lg:text-6xl">
            High quality and standardized Learning Analytics foundation for your <span
              className="xr-style">XR Project</span>
          </h1>
          <p className="text-base text-gray-800 sm:text-lg lg:pr-20">
            Enable Learning Analytics in your Unity XR Application by using prepared tracking mechanisms and create
            your own IDE-supported xAPI statements.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:mt-12 lg:justify-start">
            <a href="/get-started">
              <button className="flex items-center rounded bg-blue px-4 py-2.5 font-bold text-white">
                Get Started
              </button>
            </a>
          </div>
        </div>
        <div className="h-full w-full">
          <OmiLAXRLogo className="w-full md:w-auto" long={true} />
          <AnimatingText items={[
            {word: "Learning Analytics", color: "#23304c"},
            {word: "For XR Projects", color: "white", stroke: "2px #23304c"},
            {word: "Made with Unity.", color: "black"}
          ]}/>
        </div>
      </div>
    </header>
  );
}
