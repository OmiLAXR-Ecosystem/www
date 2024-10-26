interface MailToProps {
    children: string;
    email?: string;
}

export default function MailTo({children, email}: MailToProps) {
    return <a className="underline" href={'mailto:' + (email ?? children)}>{children}</a>
}