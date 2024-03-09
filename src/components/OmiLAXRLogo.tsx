import type React from "react";

interface OmiLAXRLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    long?: boolean
}

export function OmiLAXRLogo({long, ...props}: OmiLAXRLogoProps) {
    const src = long ? "./logos/OmiLAXR_long.png" : "./logos/OmiLAXR.svg";
    return <img src={src} className="w-full md:w-auto" alt="OmiLAXR Logo" {...props} />;
}
