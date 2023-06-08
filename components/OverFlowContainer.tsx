type Props = {
	children: React.ReactNode;
	className?: string;
	overflowTop?: boolean;
	overflowBottom?: boolean;
	bg?: string;
};

const OverFlowContainer = ({ children, className, overflowTop, overflowBottom, bg }: Props) => {
	return (
		<div className={`relative`}>
			{overflowTop && <div className={`absolute top-0 z-50 bg-primary-200 w-full h-8`}></div>}
			<div className={`relative overflow-y-scroll ${className}`}>{children}</div>
			{overflowBottom && (
				<div
					className={`pointer-events-none absolute -bottom-4 w-full h-[7.5rem] bg-gradient-to-t ${
						bg === "white" ? "from-white" : "from-primary-200"
					} to-transparent`}></div>
			)}
		</div>
	);
};

export default OverFlowContainer;
