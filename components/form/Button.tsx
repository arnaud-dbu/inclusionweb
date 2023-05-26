type Props = {
	children?: any;
	className?: string;
	label?: string;
	style: string;
	onClick?: () => void;
};

export const Button = ({ className, onClick, children, style, label }: Props) => {
	let btnVariant = null;

	switch (style) {
		case "primary":
			btnVariant = "bg-secondary-900 font-semibold text-white";
			break;

		default:
			break;
	}
	// primary && (btnVariant = "bg-secondary-900 font-semibold text-white");
	// secondary && (btnVariant = "text-neutral-800 border-[1.5px] border-neutral-600");
	// tertiary && (btnVariant = "bg-primary-700 font-semibold text-white px-2");

	return (
		<button
			onClick={onClick}
			className={`px-8 flex gap-2 items-center justify-center h-12 rounded-full ${btnVariant} ${className} `}>
			{children}
			{label}
		</button>
	);
};
