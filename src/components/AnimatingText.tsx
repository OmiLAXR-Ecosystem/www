import React from "react";
import "./AnimatingText.scss";

type Stroke = string;

type AnimatingTextEntry = {
    word: string,
    color?: string,
    stroke?: Stroke
};

interface AnimatingTextProps {
    items: AnimatingTextEntry[],
    underscoreColor?: string
}

export function AnimatingText({items, underscoreColor}: AnimatingTextProps) {
    const defaultColor = "#fff";

    const [content, setContent] = React.useState<string>("");
    const [color, setColor] = React.useState<string>(items[0].color ?? defaultColor);
    const [stroke, setStroke] = React.useState<Stroke | undefined>(undefined);

    let letterCount = 1;
    let x = 1;
    let waiting = false;
    let index = 0;

    React.useEffect(() => {
        let wait = 0;

        const colors = items.map(i => i.color ?? defaultColor);
        const strokes = items.map(i => i.stroke);

        const intervalId = window.setInterval(function () {
            const word = items[index].word;
            setContent(word.substring(0, letterCount));

            if (waiting)
                wait += 100;
            else
                letterCount += x;

            if (letterCount === 0) {
                waiting = true;

                if (waiting && wait >= 1000) {

                    index++;
                    if (index >= items.length)
                        index = 0;

                    setColor(colors[index]);
                    setStroke(strokes[index]);

                    x = 1;
                    letterCount += x;
                    wait = 0;

                    waiting = false;
                }
            } else if (letterCount === word.length + 1) {
                waiting = true;

                if (waiting && wait >= 1000) {
                    x = -1;
                    letterCount += x;
                    waiting = false;
                    wait = 0;
                }

            }
        }, 100);

        return () => window.clearInterval(intervalId);
    }, [items]);

    return <div className="animating-text">
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
            WebkitTextStroke: stroke
        }}>
            <span className={"animating-text-text"} style={{
                color: color,
                WebkitTextStroke: stroke
            }}>{content}</span>
            <div style={{
                display: "inline-block",
                position: "relative",
                top: "-0.14em",
                left: "0.3em",
            }} className="blinking console-underscore animating-text-console">&#95;</div>
        </div>
    </div>
}
