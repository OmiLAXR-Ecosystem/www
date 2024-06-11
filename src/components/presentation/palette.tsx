import React from "react";
import {
  Typography,
} from "../../materialTailwind";
import ThemeProvider from "../theme-provider";

export function PalettePresentation() {
 
  return (
    <ThemeProvider>
      <div className="h-full w-screen place-items-center bg-white px-8 py-8">
        <div className="container mx-auto grid items-center relative lg:grid-cols-2">
          <div className="hidden lg:flex">
            <img src="OmiLAXR_Features.png" alt="OmiLAXR Features" className="max-w-xl rounded-3xl mx-auto" />
          </div>
          
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
              Modular, rich and extensible features
            </Typography>
            <Typography color="gray" className="lg:pr-20">
              Modular design, wide collection of tracking systems, combinable with third-party tools through adapters, learning scenario modelling.
            </Typography>
            
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default PalettePresentation;
