import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type Props = {
    children?: any;
    icon?: any;
    alt?: any;
    className?: string;
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    submit?: boolean;
    href?: any;
    label?: string;
};

export const Btn = ({
    className,
    children,
    alt,
    primary,
    secondary,
    tertiary,
    submit,
    href = "",
}: Props) => {
    let btnVariant = "";
    primary && (btnVariant = "bg-secondary-900 font-semibold text-white");
    secondary &&
        (btnVariant = "text-neutral-800 border-[1.5px] border-neutral-600");
    tertiary && (btnVariant = "bg-primary-700 font-semibold text-white px-2");

    if (submit) {
        return (
            <button
                type="submit"
                className={`${btnVariant} px-8 flex gap-2 items-center justify-center h-12 rounded-full ${className} `}
            >
                {children}
            </button>
        );
    } else {
        return (
            <Link
                href={href}
                className={`px-8 text-lg flex gap-2 items-center justify-center h-12 rounded-full ${className} ${btnVariant}`}
            >
                {imgSrc && (
                    <Image src={imgSrc} width={20} height={20} alt={alt} />
                )}
                {children}
            </Link>
        );
    }
};

export const BtnLarge = ({
    className,
    children,
    imgSrc,
    alt,
    label,
    href = "",
}: Props) => {
    return (
        <Link
            href={href}
            className={`shadow-lg w-[47.5%] h-[17.5rem] flex flex-col gap-2 justify-end px-6 py-6 rounded-2xl aspect-square ${className}`}
        >
            {imgSrc && <Image src={imgSrc} width={20} height={20} alt={alt} />}
            {children}
            <span className="font-primary text-white uppercase text-4xl font-bold">
                {label}
            </span>
        </Link>
    );
};
