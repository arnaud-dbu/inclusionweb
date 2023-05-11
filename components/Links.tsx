type Props = {
    children: string,
    href: string,
    className?: string
}

const Link = ({ children, href, className }: Props) => {
    return (
        <a className={`block text-neutral-800 font-light underline ${className}`} href={href}>{children}</a>
    )
}

export const PrimaryLink = ({ children, href, className }: Props) => {
    return (
        <Link className={`${className}`} href={href}>{children}</Link>
    )
}
