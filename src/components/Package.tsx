
interface PackageProps {
    children: string,
    scope?: string
}

// Packages with an icon in static/packages/
const PACKAGES_WITH_ICON = new Set([
    "com.rwth.unity.omilaxr",
    "com.rwth.unity.omilaxr.xapi",
    "com.rwth.unity.omilaxr.xapi4unity",
]);

export default function Package({children, scope}: PackageProps) {
    if (!scope) {
        scope = "com.rwth.unity." + (children.toLowerCase());
    }
    return <span style={{whiteSpace: "nowrap"}}>
        {PACKAGES_WITH_ICON.has(scope) &&
            <img src={"/packages/" + scope + ".png"} alt="" aria-hidden="true" width={24} height={24} loading="lazy"
                 style={{display: "inline-block"}} />}
        {children}
    </span>
}
