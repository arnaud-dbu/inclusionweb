type Props = {
	children: React.ReactNode;
	className?: string;
};

export const Card = ({ children, className }) => {
	return (
		<div className={`rounded-3xl border-2 border-neutral-500 bg-white shadow-xl ${className} `}>
			{children}
		</div>
	);
};
