type Props = {
	children: React.ReactNode;
};

export const IconButton = ({ children }: Props) => {
	return <button className="bg-neutral-800 h-12 px-3 fill-white rounded-lg">{children}</button>;
};
