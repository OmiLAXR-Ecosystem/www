import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface CodeBoxProps {
    children: string,
    language: string,
    filename?: string
}

interface InlineCodeBoxProps {
    children: string,
}

export function InlineCodeBox({children}: InlineCodeBoxProps) {
    return (
        <span className={'code-box-inline'} style={{
            fontFamily: 'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
            background: 'rgb(248, 248, 255)',
            color: 'black',
            padding: '5px',
            borderColor: '#eeeeee'
        }}>{children}</span>
    );
}

export default function CodeBox({children, language, filename}: CodeBoxProps) {
    return (
        <div className={'code-box code-' + language.toLowerCase()}>
            {filename && <small className="code-box-filename">{filename}</small>}
            <SyntaxHighlighter language={language} style={docco}>
                {children}
            </SyntaxHighlighter>
        </div>
    );
}