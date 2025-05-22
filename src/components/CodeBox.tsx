import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import type { ButtonProps } from '@material-tailwind/react';

interface CodeBoxProps {
    children: string;
    language: string;
    filename?: string;
    clipboardCode?: string;
}

interface InlineCodeBoxProps {
    children: string;
    href?: string;
    target?: string;
    clipboardButton?: boolean;
}

interface IClipboardButtonProps extends Omit<ButtonProps, 'children'> {
    code: string;
}

export function ClipboardButton({ code, ...props }: IClipboardButtonProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        alert('Copied to clipboard!');
    };

    return (
        <button
            {...props}
            onClick={handleCopy}
            style={{
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                ...props.style,
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
                width={20}
                height={20}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
            </svg>
        </button>
    );
}

export function InlineCodeBox({ children, href, target, clipboardButton }: InlineCodeBoxProps) {
    const code = (
        <span
            className="code-box-inline"
            style={{
                fontFamily:
                    'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Courier New, monospace',
                background: 'rgb(248, 248, 255)',
                color: 'black',
                padding: '5px',
                border: '1px solid #eeeeee',
                borderRadius: '4px',
                whiteSpace: 'pre-wrap',
                overflowWrap: 'anywhere',
                display: 'inline-block',
                maxWidth: '100%',
                boxSizing: 'border-box',
            }}
        >
            {children}
        </span>
    );

    const clipboard = clipboardButton ? (
        <ClipboardButton style={{ marginLeft: '6px', verticalAlign: 'middle' }} code={children} />
    ) : null;

    if (href) {
        return (
            <>
                <a href={href} target={target}>
                    {code}
                </a>
                {clipboard}
            </>
        );
    }

    return (
        <>
            {code}
            {clipboard}
        </>
    );
}

export default function CodeBox({ children: code, clipboardCode, language, filename }: CodeBoxProps) {
    return (
        <div
            className={'code-box code-' + language.toLowerCase()}
            style={{
                position: 'relative',
                maxWidth: '100%',
                overflowX: 'auto',
                boxSizing: 'border-box',
                background: '#f8f8ff',
                border: '1px solid #ddd',
                borderRadius: '4px',
                paddingTop: filename ? '2.5em' : '1em',
                marginBottom: '1rem',
            }}
        >
            {filename && (
                <small
                    className="code-box-filename"
                    style={{
                        position: 'absolute',
                        top: '0.5em',
                        left: '1em',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                    }}
                >
                    {filename}
                </small>
            )}
            <SyntaxHighlighter
                language={language}
                style={docco}
                customStyle={{
                    whiteSpace: 'pre',         // ✅ prevent line wrap
                    overflowX: 'auto',         // ✅ scroll instead of wrap
                    maxWidth: '100%',
                }}
            >
                {code}
            </SyntaxHighlighter>
            <div
                className="code-box-copy-holder"
                style={{
                    position: 'absolute',
                    right: '5px',
                    top: filename ? '0.5em' : '1em',
                    zIndex: 1,
                }}
            >
                <ClipboardButton code={clipboardCode ?? code} />
            </div>
        </div>
    );
}