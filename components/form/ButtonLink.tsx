type Props = {
	fontWidth?: string;
	color?: string;
	icon?: React.ReactNode;
	label?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonLink = ({ fontWidth, color, icon, label, ...rest }: Props) => {
	return (
		<button {...rest} className="flex items-center gap-2">
			{icon}
			<span
				className={`${color === "red" && "text-red"} ${
					fontWidth === "semibold" ? "font-semibold" : "font-normal"
				}`}>
				{label}
			</span>
		</button>
	);
};
