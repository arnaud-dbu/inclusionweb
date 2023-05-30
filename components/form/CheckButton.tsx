import { ButtonHTMLAttributes } from "react";

type Props = {
	active: any;
	key?: string;
	label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const CheckButton = ({ active, key, label, ...rest }: Props) => {
	return (
		<button
			{...rest}
			key={key}
			className={`border-1 border-neutral-500 h-fit whitespace-nowrap text-neutral-800 rounded-full px-3 py-1 ${
				active && "bg-primary-300 border-primary-800 text-primary-900 shadow-lg"
			}`}>
			{label}
		</button>
	);
};

export default CheckButton;
