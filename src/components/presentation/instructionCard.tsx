import type {ReactElement} from "react";
import React from "react";
import {imageSize} from "../../lib/imageSize";
import "./instructionCard.scss";

export interface InstructionCardProps {
    title: string,
    image?: string,
    children: ReactElement<any, any>,
    swapCells?: boolean,
}



export default function InstructionCard({children, image, title, swapCells}: InstructionCardProps) {

    const imageCell = () => <div className="step-image">
        <img
            loading="lazy"
            decoding="async"
            src={image}
            {...imageSize(image)}
            alt={title + ' preview'}
            className="w-full object-top"
        />
    </div>;

    const contentCell = () => <div className="step-content">
        <h4 style={{fontSize: "24px"}}
            className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight dark:border-white/10">
            {title}
        </h4>
        <div color="gray" className="mb-4 font-normal px-5 py-5">
            {children}
        </div>
    </div>;

    return <div
        className="get-started-step relative mt-6 mb-6 flex w-full max-w-none flex-col rounded-lg bg-white bg-clip-border text-gray-700">
        <div className={'w-full min-w-0 grid ' + (image ? 'grid-cols-1 md:grid-cols-2' : '')}>
            {swapCells && contentCell()}
            {image && imageCell()}
            {!swapCells && contentCell()}
        </div>
    </div>
}

export function generateUrlAnchor(title: string): string {
    const umlautMap: Record<string, string> = {
        "ä": "ae",
        "ö": "oe",
        "ü": "ue",
        "ß": "ss"
    };

    return (
        title
            .toLowerCase()
            .replace(/[äöüß]/g, (match) => umlautMap[match]) // Replace German umlauts
            .normalize("NFD") // Normalize to decompose accents
            .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
            .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric except space and hyphen
            .trim()
            .replace(/\s+/g, "-") // Convert spaces to hyphens
            .replace(/-+/g, "-") // Ensure single hyphen usage
    );
}

export function contentOf(items: InstructionCardProps[]) {
    return <div className="get-started-cards w-full max-w-none">
        <h2 style={{fontSize: "1.5em"}}>Table of Contents</h2>
        <ol className="table-of-contents w-full" style={{fontSize: "1.2em", paddingLeft: "1em"}}>
            {
                items.map(({title}, index) => (
                    <li key={index}>
                        <a href={'#' + generateUrlAnchor(title)}>{index}. {title}</a>
                    </li>
                ))
            }
        </ol>

        {
            items.map(({title, children, image}, index) => (
                <section id={generateUrlAnchor(title)} key={index} className="w-full">
                    <InstructionCard title={`Step ${index}: ${title}`}
                                     image={image}
                                     swapCells={index % 2 != 0}>
                        {children}
                    </InstructionCard>
                </section>
            ))
        }
    </div>
}
