import Image, { StaticImageData } from "next/image"
import Link from "next/link";

type Props = {
    children?: string,
    imgSrc?: string | StaticImageData,
    alt?: any,
    className?: string,
    primary?: boolean,
    secondary?: boolean,
    submit?: boolean,
    href?: any,
}

export const Btn = ({ className, children, imgSrc, alt, primary, secondary, submit, href="" }: Props) => {
    let btnVariant = "";
    primary && (btnVariant = "bg-secondary-900 font-semibold text-white");
    secondary && (btnVariant = "text-neutral-800 border-[1.5px] border-neutral-600");

    if (submit) {
        return (
            <button type="submit" className={`w-full flex gap-2 items-center justify-center px-16 h-12 rounded-full ${className} ${btnVariant}`}>
                {
                    imgSrc &&
                    <Image
                        src={imgSrc}
                        width={20}
                        height={20}
                        alt={alt}
                    />
                }
                {children}
            </button>
        )
    } else {
        return (
            <Link href={href} className={`w-full text-lg flex gap-2 items-center justify-center px-16 h-12 rounded-full ${className} ${btnVariant}`}>
                {
                    imgSrc &&
                    <Image
                        src={imgSrc}
                        width={20}
                        height={20}
                        alt={alt}
                    />
                }
                {children}
            </Link>
        )
    }
}