import * as lightPkg from "react-syntax-highlighter/dist/cjs/light";
import * as csharpPkg from "react-syntax-highlighter/dist/cjs/languages/hljs/csharp";
import * as javascriptPkg from "react-syntax-highlighter/dist/cjs/languages/hljs/javascript";
import * as jsonPkg from "react-syntax-highlighter/dist/cjs/languages/hljs/json";
import * as doccoPkg from "react-syntax-highlighter/dist/cjs/styles/hljs/docco";
import type React from "react";

// Handle both CJS and ESM shapes of the default export across Vite/Astro SSR.
const defaultOf = (pkg: any) => pkg.default?.default ?? pkg.default ?? pkg;
const SyntaxHighlighter = defaultOf(lightPkg);
const docco = defaultOf(doccoPkg);

// Only register the languages used on the site; the default build bundles all of highlight.js
SyntaxHighlighter.registerLanguage("csharp", defaultOf(csharpPkg));
SyntaxHighlighter.registerLanguage("javascript", defaultOf(javascriptPkg));
SyntaxHighlighter.registerLanguage("json", defaultOf(jsonPkg));

interface CodeBoxProps {
    children: string,
    language: string,
    filename?: string,
    clipboardCode?: string,
}

interface InlineCodeBoxProps {
    children: string,
    href?: string,
    target?: string,
    clipboardButton?: boolean
}

interface IClipboardButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    code: string
}

// Copying is done by src/scripts/interactions.ts (data-copy), so the button needs no hydration.
export function ClipboardButton({code, ...props}: IClipboardButtonProps) {
    return <button type="button" aria-label="Copy to clipboard" title="Copy to clipboard" {...props}
                   style={{width: "32px", height: "32px", ...props.style}} data-copy={code}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
             stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"/>
        </svg>
    </button>;
}

export function InlineCodeBox({children, href, target, clipboardButton}: InlineCodeBoxProps) {
    const code =
        <span className={'code-box-inline'} style={{
            fontFamily: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
            background: 'rgb(248, 248, 255)',
            color: 'black',
            padding: '5px',
            borderColor: '#eeeeee',
            overflowWrap: "anywhere",
            wordBreak: "break-word",
            whiteSpace: "normal"
        }}>{children}</span>;

    const clipboardCode = <>{clipboardButton && <ClipboardButton style={{position: 'relative', top: '8px'}} code={children}/>}</>;

    if (href) {
        return <><a href={href} target={target}>{code}</a>{clipboardCode}</>;
    }

    return <>{code}{clipboardCode}</>;
}

export default function CodeBox({children: code, clipboardCode, language, filename}: CodeBoxProps) {
    return (
        <div
            className={'code-box code-' + language.toLowerCase()}
            style={{position: "relative", width: "100%", maxWidth: "100%", overflowX: "auto"}}
        >
            {filename && <small className="code-box-filename">{filename}</small>}
            <SyntaxHighlighter
                language={language.toLowerCase()}
                style={docco}
                wrapLongLines={true}
                customStyle={{maxWidth: "100%", overflowX: "auto"}}
            >
                {code}
            </SyntaxHighlighter>
            <div className="code-box-copy-holder" style={{position: "absolute", right: "5px", top: "2em"}}>
                <ClipboardButton code={clipboardCode ?? code} />
            </div>
            <div className="code-box-caption"></div>
        </div>
    );
}
