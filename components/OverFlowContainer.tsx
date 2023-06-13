type Props = {
	children: React.ReactNode;
	className?: string;
	overflowTop?: boolean;
	fadeBottom?: boolean;
	bg?: string;
};

const OverFlowContainer = ({ children, className, overflowTop, fadeBottom, bg }: Props) => {
	return (
		<div className={`relative`}>
			{overflowTop && <div className={`absolute top-0 z-50 h-8 w-full bg-primary-200`}></div>}
			<div className={`relative overflow-y-scroll ${className}`}>{children}</div>
			{fadeBottom && (
				<div
					className={`pointer-events-none absolute bottom-0 h-[7.5rem] w-full bg-gradient-to-t ${
						bg === "white" ? "from-white" : "from-primary-200"
					} to-transparent`}></div>
			)}
		</div>
	);
};

export default OverFlowContainer;
