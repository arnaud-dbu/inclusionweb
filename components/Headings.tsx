type Props = {
    children?: string,
    underline?: boolean
}

export const H1 = ({ children, underline } : Props) => {
    return (
        <h1 className={`text-7xl leading-[1.1] font-primary font-bold uppercase text-neutral-900 mb-6 relative ${underline && "title-underline"}`}>{children}</h1>
    )
}

export const H2 = ({ children } : Props) => {
    return (
        <h2 className={`text-3xl whitespace-nowrap font-primary font-bold uppercase text-neutral-900`}>{children}</h2>
    )
}
