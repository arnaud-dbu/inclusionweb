"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
	overflowTop?: boolean;
	fadeBottom?: boolean;
	bg?: string;
};

const OverFlowContainer = ({ children, className, overflowTop, fadeBottom, bg }: Props) => {
	const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleResize = () => {
			if (ref.current) {
				const windowHeight = window.innerHeight;
				const containerTop = ref.current.getBoundingClientRect().top;
				const containerHeight = windowHeight - containerTop;
				setContainerHeight(containerHeight);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div ref={ref} className="relative">
			{overflowTop && <div className="absolute top-0 z-50 h-8 w-full bg-primary-200"></div>}
			<div
				className={`relative overflow-y-scroll ${className}`}
				style={{ maxHeight: containerHeight }}>
				{children}
			</div>
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
