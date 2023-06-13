import { ButtonHTMLAttributes } from "react";

type Props = {
	active: boolean;
	label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CategoryButton = ({ active, label, ...rest }: Props) => {
	return (
		<button
			className={`whitespace-nowrap rounded-full px-4 py-[.5rem] font-semibold ${
				active
					? "border-1 border-primary-800 text-primary-800 shadow-sm"
					: "bg-neutral-400 text-neutral-700"
			}`}
			{...rest}>
			{label}
		</button>
	);
};
