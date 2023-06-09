import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

type Props = {
	children?: any;
	className?: string;
	label?: string;
	style: string;
	icon?: React.ReactNode;
	size?: string;
	image?: any;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
	className,
	children,
	style,
	label,
	size,
	image,
	icon,
	...rest
}: Props) => {
	let btnVariant = null;
	let btnSize = null;

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
		case "alert":
			btnVariant = "border-red-900 text-red-900 border-1";
			break;
		case "disabled":
			btnVariant = "bg-neutral-500 pointer-events-none text-white";
			break;
		case "link":
			btnVariant = "text-primary-800 underline w-fit";
			break;
		case "icon":
			btnVariant = "bg-primary-700 !px-4 rounded-lg";
			break;
		default:
			break;
	}

	switch (size) {
		case "sm":
			btnSize = "px-6 py-2 text-md";
			break;
		case "xs":
			btnSize = "px-3 py-[3px] text-sm";
			break;
		default:
			btnSize = "px-6 py-2 text-md";
			break;
	}

	return (
		<button
			{...rest}
			className={` flex gap-2 items-center justify-center rounded-full h-fit  ${btnSize} ${btnVariant} ${className} 
           
            `}>
			{image && <Image className={`w-6 h-6`} src={image} alt="" width={50} height={50} />}
			{children}
			{label}
			{icon}
		</button>
	);
};
