import Image from "next/image";
import { ButtonHTMLAttributes } from "react";

type Props = {
	className?: string;
	label?: string;
	style: string;
	icon?: React.ReactNode;
	size?: string;
	image?: any;
	loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, style, label, size, image, icon, loading, ...rest }: Props) => {
	let btnVariant = null;
	let btnSize = null;

	switch (style) {
		case "primary":
			btnVariant = `bg-secondary-900 font-semibold text-white shadow-sm hover:bg-secondary-800 transition`;
			break;
		case "secondary":
			btnVariant = "bg-neutral-800 font-semibold text-white shadow-sm";
			break;
		case "tertiary":
			btnVariant =
				"bg-primary-700 font-semibold text-white shadow-sm hover:bg-primary-600 transition";
			break;
		case "outline":
			btnVariant =
				"border-neutral-500 text-neutral-800 border-1 hover:border-neutral-600 transition";
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
		case "xs":
			btnSize = "px-3 py-1 text-sm h-10";
			break;
		case "sm":
			btnSize = "px-6 py-2 text-md h-10";
			break;
		default:
			btnSize = "h-10 md:h-12 px-6 py-2 text-sm md:text-base";
			break;
	}

	return (
		<button
			{...rest}
			className={` focus flex items-center justify-center gap-2 rounded-full ${btnSize} ${btnVariant} ${className} 
            `}>
			{image && (
				<Image className={`h-5 w-5 md:h-6 md:w-6`} src={image} alt="" width={50} height={50} />
			)}
			<span className={`relative`}>
				{label}
				{loading && (
					<div className={`absolute -right-6 top-1/2 -translate-y-1/2`}>
						<div
							className={`relative h-3 w-3 animate-spin rounded-full border-b-2 border-white`}></div>
					</div>
				)}
			</span>
			{icon}
		</button>
	);
};
