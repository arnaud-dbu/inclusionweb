import { GlassMorphStyling } from "@/utils/classes";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export const Card = ({ children, className }) => {
	return (
		<div className={`bg-white rounded-3xl border-2 border-neutral-500 shadow-xl ${className} `}>
			{children}
		</div>
	);
};
