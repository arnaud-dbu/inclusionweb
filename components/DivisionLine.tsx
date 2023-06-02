type Props = {
	text?: string;
	className?: string;
};

const DivisionLine = ({ text, className }: Props) => {
	return (
		<div className={`relative h-px w-full bg-neutral-500 my-5 ${className}`}>
			<span className="absolute-center bg-primary-300 px-3">{text}</span>
		</div>
	);
};

export default DivisionLine;
