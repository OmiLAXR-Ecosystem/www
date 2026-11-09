import type React from "react";

interface OmiLAXRLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    long?: boolean
}

export function OmiLAXRLogo({long, ...props}: OmiLAXRLogoProps) {
    const src = long ? "/logos/OmiLAXR_long.webp" : "/logos/OmiLAXR.svg";
    const [width, height] = long ? [1300, 719] : [5407, 2724];
    return <img src={src} width={width} height={height} className="w-full md:w-auto" alt="OmiLAXR Logo" {...props} />;
}
