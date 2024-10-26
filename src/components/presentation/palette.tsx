import React from "react";
import {
  Typography,
} from "../../materialTailwind";
import ThemeProvider from "../theme-provider";

export function PalettePresentation() {
 
  return (
    <ThemeProvider>
      <div className="h-full w-screen place-items-center bg-white px-8 py-8">
        <div className="container mx-auto grid items-center relative">
          <div className="text-center lg:text-left">
            <Typography
                color="blue"
                className="flex items-center justify-center lg:justify-start !font-bold text-lg mb-5"
            >
              Attention to our design
            </Typography>

            <Typography
                variant="h2"
                color="blue-gray"
                className="mb-8 leading-tight"
            >
              Simple and modular structure
            </Typography>
            <Typography color="gray" className="lg:pr-20">
              Modular extensible design enabled to realize all kind of tracking mechanism in a strict structure.
            </Typography>
          </div>
          <div>
            <img src="pipeline/OmiLAXR_Pipeline.drawio.png" alt="OmiLAXR Pipeline" style={{width: '100%'}}/>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default PalettePresentation;
