import "./AnimatingText.scss";

type Stroke = string;

export type AnimatingTextEntry = {
    word: string,
    color?: string,
    stroke?: Stroke
};

interface AnimatingTextProps {
    items: AnimatingTextEntry[],
    underscoreColor?: string
}

// Rendered as static HTML; the typing animation runs in src/scripts/interactions.ts (data-animating-text).
export function AnimatingText({items, underscoreColor}: AnimatingTextProps) {
    const defaultColor = "#fff";
    const color = items[0].color ?? defaultColor;

    return <div className="animating-text" data-animating-text={JSON.stringify(items)}
                data-underscore-color={underscoreColor}>
        <div className='console-container' style={{
            fontSize: "clamp(1.75rem, 7vw, 4rem)",
            textAlign: "center",
            minHeight: "4.5rem",
            height: "auto",
            width: "100%",
            maxWidth: "600px",
            display: "block",
            color: underscoreColor ?? color,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: "auto",
        }}>
            <span className={"animating-text-text"} style={{
                color: color,
            }}></span>
            <div style={{
                display: "inline-block",
                position: "relative",
                top: "-0.14em",
                left: "0.3em",
            }} className="blinking console-underscore animating-text-console">&#95;</div>
        </div>
    </div>
}
