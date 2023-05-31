import { ButtonHTMLAttributes } from "react";

type Props = {
	children?: any;
	className?: string;
	label?: string;
	style: string;
	icon?: React.ReactNode;
	size?: string;
	active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
	className,
	children,
	style,
	label,
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
		default:
			break;
	}

	return (
		<button
			{...rest}
			className={` flex gap-2 items-center justify-center rounded-full ${btnVariant} ${className} ${
				!active && "!bg-neutral-600 pointer-events-none"
			}
            ${size === "sm" ? "px-6 py-2 text-md" : "px-8 h-12"}
            `}>
			{children}
			{label}
			{icon}
		</button>
	);
};
