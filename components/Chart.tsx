import React from "react";

const Circle = () => {
	return (
		<div className="circular-progress absolute-center">
			<span>Test</span>
			<div className="circular-progress-circle">
				<div className="segment rotate-[40deg] skew-x-[50deg]"></div>
				<div className="segment rotate-[80deg] skew-x-[50deg]"></div>
				<div className="segment rotate-[120deg] skew-x-[50deg]"></div>
				<div className="segment rotate-[160deg] skew-x-[50deg]"></div>
				<div className="segment rotate-[200deg] skew-x-[50deg]"></div>
				<div className="segment rotate-[240deg] skew-x-[50deg]"></div>
				<div className="segment rotate-[280deg] skew-x-[50deg]"></div>
				<div className="segment rotate-[320deg] skew-x-[50deg]"></div>
				<div className="segment rotate-[360deg] skew-x-[50deg]"></div>
			</div>
		</div>
	);
};

export default Circle;
