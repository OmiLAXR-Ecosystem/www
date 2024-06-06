import type React from "react";

interface FigureProps {
    src: string;
    caption: React.ReactElement;
    label?: string
}

interface FmFigureProps {
    caption: string;
    label: string
}

interface FigureRefProps {
    children: string;
    label: string;
}

interface FmFigureRefProps {
    label: string;
}

export function FigureRef({children, label}: FigureRefProps) {
    return <a href={'#' + label}>{children}</a>
}

export default function Figure({src, caption, label}: FigureProps) {
    label = (label ?? "").trim().replaceAll(" ", "-");
    return <figure id={label}>
        <img src={src} alt={'Figure ' + label }/>
        <figcaption style={{textAlign: "center"}}>{caption}</figcaption>
    </figure>;
}


type FmConstructorProps = {figures: {label: string, imageSrc: string}[], prefix?: string};

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

    Figure = ({caption, label}: FmFigureProps) => {
        const figure = this._figures[label];
        return Figure({src: figure.src, caption: <span><strong>{this._prefix + ' ' + figure.num}:</strong> {caption}</span>, label});
    }

}