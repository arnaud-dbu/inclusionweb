'use client'

type Props = {
    name: string;
    label?: string;
    error?: any;
    register?: any;
    wrapperClass?: string;
    className?: string;
    icon?: string,
    alt?: string,
    title?: string,
    spacing?: string,
    options?: string[]
}

export const BtnGroup = ({
    register,
    name,
    error,
    label,
    wrapperClass,
    className,
    icon,
    title,
    options,
    alt,
    spacing,
    ...rest
}: Props) => {
    return (
        <select {...register(name)} {...rest}>
            {options.map(value => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    )
}

