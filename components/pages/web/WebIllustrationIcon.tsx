import { MinusIcon, PlusIcon } from "@/public/icons";

type WebProps = {
	className?: string;
	plus?: boolean;
};

const WebIllustrationIcon = ({ className, plus }: WebProps) => {
	return (
		<>
			<div className={`web ${className}`}>
				<div className="web-inner opacity-0"></div>
				<div className="web-inner scale-[.75] opacity-0"></div>
				<div className="web-inner scale-[.75] bg-primary-900 opacity-80"></div>
				{plus ? (
					<PlusIcon className={`absolute-center h-5 w-5 fill-white `} />
				) : (
					<MinusIcon className={`absolute-center h-4 w-4 fill-white `} />
				)}
			</div>
		</>
	);
};

export default WebIllustrationIcon;
