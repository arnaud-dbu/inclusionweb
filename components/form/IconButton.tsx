type Props = {
	className?: string;
	icon: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ className, icon, ...rest }: Props) => {
	return (
		<button {...rest} className={`aspect-square flex items-center justify-center ${className}`}>
			{icon}
		</button>
	);
};
