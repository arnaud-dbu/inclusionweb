type Props = {
	text?: string;
	className?: string;
};

const DivisionLine = ({ text, className }: Props) => {
	return (
		<div className={`relative h-px w-full bg-neutral-500 ${className}`}>
			{text && <span className={` absolute-center bg-white  px-3 text-neutral-800 `}>{text}</span>}
		</div>
	);
};

export default DivisionLine;
