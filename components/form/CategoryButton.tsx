import { ButtonHTMLAttributes } from "react";

type Props = {
	active: boolean;
	label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CategoryButton = ({ active, label, ...rest }: Props) => {
	return (
		<button
			className={`px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap ${
				active
					? "bg-white border-2 border-primary-700 text-primary-700"
					: "bg-neutral-400 text-neutral-700"
			}`}
			{...rest}>
			{label}
		</button>
	);
};
