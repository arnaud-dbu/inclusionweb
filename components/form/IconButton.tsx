type Props = {
	children: React.ReactNode;
	className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ children, className, ...rest }: Props) => {
	return (
		<button {...rest} className={`aspect-square flex items-center justify-center ${className}`}>
			{children}
		</button>
	);
};
