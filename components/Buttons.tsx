import Image, { StaticImageData } from "next/image"

type Props = {
    children?: string,
    imgSrc?: string | StaticImageData,
    alt: string,
    className?: string
}

const Btn = ({ className, children, imgSrc, alt }: Props) => {
    return (
        <a className={`w-full flex gap-2 items-center justify-center px-16 h-10 rounded-full border-neutral-500 ${className}`}
            href="">
            <Image
                src={imgSrc}
                width={20}
                height={20}
                alt={alt}
            />
            {children}
        </a>
    )
}

export const BtnPrimary = ({ className, children, imgSrc, alt }: Props) => {
    return (
        <Btn imgSrc={imgSrc} alt={alt} className="bg-secondary-800 text-white">{children}</Btn>
    )
}

export const BtnSecondary = ({ className, children, imgSrc, alt }: Props) => {
    return (
        <Btn imgSrc={imgSrc} alt={alt} className="border-[1px]">{children}</Btn>
    )
}
