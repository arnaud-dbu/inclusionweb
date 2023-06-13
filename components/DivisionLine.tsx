import { GlassMorphStyling } from "@/utils/classes";

type Props = {
	text?: string;
	className?: string;
	bg?: string;
};

const DivisionLine = ({ text, className, bg }: Props) => {
	return (
		<div className={`relative h-px w-full bg-neutral-500 ${className}`}>
			<span
				className={` absolute-center text-neutral-800  px-3 ${
					bg === "white" ? GlassMorphStyling : "bg-primary-300"
				}`}>
				{text}
			</span>
		</div>
	);
};

export default DivisionLine;
