import type React from "react";
import {imageSize} from "../lib/imageSize";

interface FigureProps {
    src: string;
    caption: React.ReactNode;
    label?: string;
    alt?: string;
    className?: string;
    width?: string;
    maxWidth?: string;
    autoPlay?: boolean;
    loop?: boolean;
}

interface FmFigureProps extends Omit<FigureProps, "src" | "caption"> {
    caption: React.ReactNode;
    label: string;
}

interface FigureRefProps {
    children: string;
    label: string;
}

interface FmFigureRefProps {
    label: string;
}

const VIDEO_EXTENSIONS = ["mp4", "mov", "webm"];

export function FigureRef({children, label}: FigureRefProps) {
    return <a className="figure-ref" href={'#' + label}>{children}</a>
}

export default function Figure({src, caption, label, alt, className, width, maxWidth, autoPlay, loop}: FigureProps) {
    label = (label ?? "").trim().replaceAll(" ", "-");
    const isVideo = VIDEO_EXTENSIONS.includes(src.split('.').pop().toLowerCase());
    return <div className={'figure ' + (className ?? "")} style={{position: "relative", textAlign: "center"}}>
        <figure id={label} style={{width, maxWidth, display: "inline-block"}}>
            {isVideo
                // Browsers only autoplay muted videos
                ? <video className="figure-video" src={src} autoPlay={autoPlay} muted={autoPlay} loop={loop} controls={!autoPlay}
                         preload={autoPlay ? "auto" : "metadata"} playsInline/>
                : <img className="figure-image" src={src} alt={alt ?? 'Figure ' + label} {...imageSize(src)} loading="lazy" decoding="async"/>}
            <figcaption className="figure-caption" style={{textAlign: "center"}}>{caption}</figcaption>
        </figure>
    </div>;
}


type FmConstructorProps = {figures: {label: string, imageSrc: string}[], prefix?: string};

// Numbers figures in registration order so <fm.FigureRef> can refer to them before they appear
export class FigureManager {
    private readonly _prefix: string;
    private _figureNumber = 1;
    private _figures: {[key: string]: { num: number, src: string }} = {};

    constructor({figures, prefix}: FmConstructorProps) {
        this._prefix = prefix ?? "Fig.";
        figures.forEach(({label, imageSrc}) => {
            this._figures[label] = { num: this._figureNumber++, src: imageSrc };
        });
    }

    FigureRef = ({label}: FmFigureRefProps) => {
        const figure = this._figures[label];
        return FigureRef({children: this._prefix + ' ' + figure.num, label});
    }

    Figure = ({caption, label, ...props}: FmFigureProps) => {
        const figure = this._figures[label];
        return Figure({src: figure.src, caption: <span><strong>{this._prefix + ' ' + figure.num}:</strong> {caption}</span>, label, ...props});
    }

}
