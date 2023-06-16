type Props = {
	text?: string;
	className?: string;
	bg?: string;
};

const DivisionLine = ({ text, className, bg }: Props) => {
	return (
		<div className={`relative h-px w-full bg-neutral-500 ${className}`}>
			<span className={` absolute-center px-3  text-neutral-800 `}>{text}</span>
		</div>
	);
};

export default DivisionLine;
