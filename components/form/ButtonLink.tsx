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
			className={` flex gap-2 items-center justify-center rounded-full ${btnVariant} ${className} ${
				!active && "!bg-neutral-600 pointer-events-none"
			}
            ${size === "sm" ? "px-6 py-2 text-md" : "px-8 h-12"}
            `}>
			{image && <Image className={`w-6 h-6`} src={image} alt="" width={50} height={50} />}
			{children}
			{label}
			{icon}
		</Link>
	);
};

export default ButtonLink;

// type Props = {
// 	fontWidth?: string;
// 	color?: string;
// 	icon?: React.ReactNode;
// 	label?: string;
// } & React.ButtonHTMLAttributes<HTMLButtonElement>;

// export const ButtonLink = ({ fontWidth, color, icon, label, ...rest }: Props) => {
// 	return (
// 		<button {...rest} className="flex items-center gap-2">
// 			{icon}
// 			<span
// 				className={`${color === "red" && "text-red"} ${
// 					fontWidth === "semibold" ? "font-semibold" : "font-normal"
// 				}`}>
// 				{label}
// 			</span>
// 		</button>
// 	);
// };
