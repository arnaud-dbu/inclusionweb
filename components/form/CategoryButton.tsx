import { ButtonHTMLAttributes } from "react";

type Props = {
	active: boolean;
	label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CategoryButton = ({ active, label, ...rest }: Props) => {
	return (
		<button
			className={`px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap ${
				active ? "bg-primary-700 text-white" : "bg-neutral-400 text-neutral-700"
			}`}
			{...rest}>
			{label}
		</button>
	);
};
