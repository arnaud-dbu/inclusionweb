type Props = {
	children: React.ReactNode;
} & React.HTMLAttributes<HTMLButtonElement>;

export const IconButton = ({ children, ...rest }: Props) => {
	return (
		<button
			{...rest}
			className=" bg-primary-600 h-10 aspect-square flex items-center justify-center rounded-lg">
			{children}
		</button>
	);
};
