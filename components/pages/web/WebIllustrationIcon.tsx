import { MinusIcon, PlusIcon } from "@/public/icons";

type WebProps = {
	className?: string;
	isHover?: boolean;
	plus?: boolean;
};

const WebIllustrationIcon = ({ className, plus, isHover }: WebProps) => {
	return (
		<>
			<div className={`web ${className}`}>
				<div
					className={`web-inner transition delay-[.075s] ${
						isHover ? `scale-[1] ` : ` scale-[.6] opacity-10`
					}  opacity-20`}></div>
				<div
					className={`web-inner transition delay-[.065s] ${
						isHover ? `scale-[.8]  ` : ` scale-[.6] opacity-10`
					}  opacity-20`}></div>
				<div
					className={`web-inner scale-[.6]  !bg-primary-700 transition-opacity ${
						isHover ? "opacity-40" : "opacity-10"
					}`}></div>
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
