import React from "react";

type Props = {
	className?: string;
};

const LoadingSkeleton = ({ className }: Props) => {
	return <div className={`is-loading rounded-2xl border-1 border-neutral-500 ${className}`}></div>;
};

export default LoadingSkeleton;
