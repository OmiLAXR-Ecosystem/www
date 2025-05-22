
interface PackageProps {
    children: string,
    scope?: string
}
export default function Package({children, scope}: PackageProps) {
    if (!scope) {
        scope = "com.rwth.unity." + (children.toLowerCase());
    }
    return <span style={{whiteSpace: "nowrap"}}>
        <img src={"/packages/" + scope + ".png"} alt={scope} width={24} style={{display: "inline-block"}} />
        <a href={'https://www.npmjs.com/package/' + scope} target="_blank" rel="noreferrer" style={{
            fontFamily:
                'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Courier New, monospace',
            color: 'black',
            padding: '5px',
        }}>
            {children}
        </a>
    </span>
}