import { ButtonHTMLAttributes } from "react";

type Props = {
	active: boolean;
	label: string;
	size?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CategoryButton = ({ active, label, size, ...rest }: Props) => {
	return (
		<button
			className={`h-10 whitespace-nowrap rounded-full px-4 py-[.5rem] text-xs font-semibold lg:text-base ${
				active
					? "border-1 border-primary-800  text-primary-800 shadow-sm"
					: "bg-neutral-400 text-neutral-700"
			}`}
			{...rest}>
			{label}
		</button>
	);
};
