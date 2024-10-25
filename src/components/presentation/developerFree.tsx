import React from "react";
import {
  Typography,
} from "../../materialTailwind";
import ThemeProvider from "../theme-provider";

export function DevPresentation() {
 
  return (
    <ThemeProvider>
      <div className="h-full w-screen place-items-center bg-white py-20">
        <div className="container mx-auto grid items-center relative lg:grid-cols-2">
          <div className="mb-3">
            <Typography
              color="blue"
              className="flex items-center font-bold text-lg mb-5"
            >
              Attention to hiqh-quality and consistent xAPI statements
            </Typography>

            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-7 leading-tight"
            >
              We use xAPI consistent and IDE-supported.
            </Typography>
            <Typography color="blue-gray" className="lg:pr-32">
              Using our ecosystem you can get high-quality xAPI statements and ensure consistency. As your xAPI definitions are transformed to C# code, you get full IDE support.
            </Typography>
          </div>
          <video src="Using_xAPI_v2.webm" autoPlay={true} controls={false} className="mx-auto hidden md:flex" />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default DevPresentation;
