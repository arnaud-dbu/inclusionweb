import { motion } from "framer-motion";

type Props = {
	children: React.ReactNode;
	onClick: () => void;
};

const Backdrop = ({ children, onClick }: Props) => {
	return (
		<motion.div
			onClick={onClick}
			className="fixed left-0 top-0 z-40 h-full w-full  bg-neutral-800 bg-opacity-30 bg-clip-padding backdrop-blur-sm backdrop-filter"
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			{children}
		</motion.div>
	);
};

export default Backdrop;
