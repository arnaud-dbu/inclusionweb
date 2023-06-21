import Image from "next/image";
import Link from "next/link";

type Props = {
	children?: any;
	className?: string;
	label?: string;
	style: string;
	icon?: React.ReactNode;
	size?: string;
	image?: any;
	active?: boolean;
	href: string;
};

const ButtonLink = ({
	className,
	children,
	style,
	label,
	size,
	image,
	icon,
	href,
	active = true,
	...rest
}: Props) => {
	let btnVariant = null;

	switch (style) {
		case "primary":
			btnVariant = `bg-secondary-900 font-semibold text-white`;
			break;
		case "secondary":
			btnVariant = "bg-neutral-900 font-semibold text-white";
			break;
		case "outline":
			btnVariant = "border-neutral-600 text-neutral-800 border-1";
			break;
		default:
			break;
	}

	return (
		<Link
			href={href}
			{...rest}
			className={` flex items-center justify-center gap-2 rounded-full ${btnVariant} ${className} ${
				!active && "pointer-events-none !bg-neutral-600"
			}
            ${size === "sm" ? "text-md px-6 py-2" : "h-12 px-8"}
            `}>
			{image && <Image className={`h-6 w-6`} src={image} alt="" width={50} height={50} />}
			{children}
			{label}
			{icon}
		</Link>
	);
};

export default ButtonLink;
