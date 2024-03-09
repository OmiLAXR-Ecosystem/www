import React from "react";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import ThemeProvider from "../theme-provider";
import Navbar from "../navbar";
import {AnimatingText} from "../AnimatingText";
import {OmiLAXRLogo} from "../OmiLAXRLogo";

export default function HeaderPresentation() {

  return (
    <ThemeProvider>
      <Navbar />
      <header className="h-full w-screen place-items-center bg-white relative px-8 py-8 lg:mb-36">
        <div className="container mx-auto grid items-center lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <Typography
                variant="h1"
                color="blue-gray"
                className="mb-8 lg:mr-32 leading-tight font-black"
            >
              High quality and standardized Learning Analytics foundation for your <span
                className="xr-style">XR Project</span>
            </Typography>
            <Typography variant="lead" color="blue-gray" className="lg:pr-32">
              Enable Learning Analytics in your Unity XR Application by using prepared tracking mechanisms and create
              your own IDE-supported xAPI statements.
            </Typography>
            <div className="mt-12 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#get-started">
                <Button color="blue" className="flex items-center">
                  Get Started
                </Button>
              </a>
            </div>
          </div>
          <div className="h-full">
            <OmiLAXRLogo className="w-full md:w-auto" long={true} />
            <AnimatingText items={[
              {word: "Learning Analytics", color: "#23304c"},
              {word: "For XR Projects", color: "white", stroke: "2px #23304c"},
              {word: "Made with Unity.", color: "black"}
            ]}/>
          </div>
        </div>

      </header>
    </ThemeProvider>
  );
}
