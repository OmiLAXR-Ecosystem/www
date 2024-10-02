interface HyperlinkProps {
    target?: string;
    children: string
}

export default function Hyperlink({children, target}: HyperlinkProps) {
    return <a className="underline" href={children} target={target ?? "_blank"}>{children}</a>
}