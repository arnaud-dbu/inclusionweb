type Props = {
	children: React.ReactNode;
};

export const IconButton = ({ children }: Props) => {
	return (
		<button className=" bg-primary-600 h-10 aspect-square flex items-center justify-center rounded-lg">
			{children}
		</button>
	);
};
