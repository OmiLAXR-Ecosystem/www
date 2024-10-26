interface HyperlinkProps {
    target?: string;
    children: string;
    url?: string;
}

export default function Hyperlink({children, target, url}: HyperlinkProps) {
    return <a className="underline" href={url ?? children} target={target ?? "_blank"}>{children}</a>
}