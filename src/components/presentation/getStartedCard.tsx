import {Card, Typography} from "@material-tailwind/react";
import type {ReactElement} from "react";

export interface GetStartedCardProps {
    title: string,
    image?: string,
    children: ReactElement<any, any>,
    swapCells?: boolean,
}

export default function ({children, image, title, swapCells}: GetStartedCardProps) {

    const imageCell = () => <div className="step-image">
        <img
            src={image}
            alt={title + ' preview'}
            className="w-full object-top"
        />
    </div>;

    const contentCell = () => <div className="step-content">
        <h5
            className="border-b-2 border-neutral-100 px-6 py-3 text-xl font-medium leading-tight dark:border-white/10">
            {title}
        </h5>
        <div color="gray" className="mb-4 font-normal">
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