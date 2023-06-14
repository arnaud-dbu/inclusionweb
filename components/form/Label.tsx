import { ButtonHTMLAttributes } from "react";

type Props = {
	children?: any;
	className?: string;
	label?: string;
	style: string;
	icon?: React.ReactNode;
	size?: string;
	active?: boolean;
} & ButtonHTMLAttributes<HTMLLabelElement>;

export const Label = ({
	className,
	children,
	style,
	title,
	size,
	icon,
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
			btnVariant = "border-neutral-500 text-neutral-800 border-1";
			break;
		case "link":
			btnVariant = "text-primary-800 underline w-fit";
			break;
		default:
			break;
	}

	return (
		<label
			{...rest}
			className={`flex cursor-pointer items-center justify-center gap-2 rounded-full ${btnVariant} ${className} ${
				!active && "pointer-events-none !bg-neutral-600"
			}
            ${size === "sm" ? "text-md px-6 py-2" : "h-12 px-8"}
            `}>
			{children}
			{title}
			{icon}
		</label>
	);
};
