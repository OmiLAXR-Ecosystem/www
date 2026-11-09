import type { IconDefinition } from "@fortawesome/free-brands-svg-icons";

interface IconProps {
    icon: IconDefinition;
    className?: string;
}

// Font Awesome icon as inline SVG, rendered at build time: no kit script, no web font, no layout shift.
// Sized like the font icons it replaces: 1em high, so text-* classes set the size.
export default function Icon({icon, className}: IconProps) {
    const [width, height, , , path] = icon.icon;
    return (
        <svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false" fill="currentColor"
             className={`inline-block h-[1em] shrink-0 overflow-visible align-[-0.125em] ${className ?? ""}`}>
            {Array.isArray(path) ? path.map((d, i) => <path key={i} d={d}/>) : <path d={path}/>}
        </svg>
    );
}
