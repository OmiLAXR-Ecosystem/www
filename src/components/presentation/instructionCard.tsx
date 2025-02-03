import {Card} from "../../materialTailwind";
import type {ReactElement} from "react";
import React from "react";
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
            src={image}
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

    return <Card
        className="get-started-step block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface mt-6 mb-6"
        shadow={false}>
        <div className={'grid ' + (image ? 'grid-cols-2' : '')}>
            {swapCells && contentCell()}
            {image && imageCell()}
            {!swapCells && contentCell()}
        </div>
    </Card>
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
    return <div className="get-started-cards">
        <ol className="table-of-contents" style={{fontSize: "1.5em", paddingLeft: "1em"}}>
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
                <section style={{paddingTop: '80px'}} id={generateUrlAnchor(title)} key={index}>
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