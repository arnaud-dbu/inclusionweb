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
			btnVariant = "border-neutral-500 text-neutral-800 border-2";
			break;
		default:
			break;
	}

	return (
		<label
			{...rest}
			className={` flex gap-2 items-center justify-center rounded-full ${btnVariant} ${className} ${
				!active && "!bg-neutral-600 pointer-events-none"
			}
            ${size === "sm" ? "px-6 py-2 text-md" : "px-8 h-12"}
            `}>
			{children}
			{title}
			{icon}
		</label>
	);
};
