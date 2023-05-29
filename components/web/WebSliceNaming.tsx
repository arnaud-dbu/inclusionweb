import React from "react";

type Props = {
	name: string;
	className: string;
};

const WebSliceNaming = ({ name, className }: Props) => {
	return (
		<div
			className={`border-[0] origin-right w-1/2 absolute left-0 top-1/2 -translate-y-1/2 ${className}`}>
			<div className="relative">
				<span className="absolute -left-[8rem] -rotate-[67.5deg] top-1/2 -translate-y-1/2 text-lg text-neutral-800">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="350.77"
						height="206.981"
						viewBox="0 0 474.77 206.981"
						className="text-xl text-center font-secondary font-light opacity-70">
						<path
							d="M.377,206.482l-.755-.656c.053-.061,5.432-6.234,15.148-16.1,8.964-9.1,23.562-23.3,42.2-39.261a674.54,674.54,0,0,1,64.458-48.931,529.906,529.906,0,0,1,81.914-45.108c27.076-11.767,58.173-22.081,92.427-30.658,27.4-6.86,56.867-12.629,87.587-17.148,27.331-4.02,50.615-6.286,65.335-7.479C464.647-.15,474.262-.5,474.357-.5l.035,1c-.1,0-9.7.349-25.629,1.64C434.058,3.332,410.8,5.6,383.492,9.612c-48.216,7.093-118.54,21.132-179.747,47.731S90.514,123.07,57.64,151.213c-18.616,15.937-33.194,30.115-42.145,39.2C5.8,200.264.43,206.421.377,206.482Z"
							transform="translate(0.377 0.5)"
							fill="transparent"
							id="text-path"
						/>

						<text textAnchor="middle" x="270">
							<textPath className="" xlinkHref="#text-path">
								{name}
							</textPath>
						</text>
					</svg>
				</span>
			</div>
		</div>
	);
};

export default WebSliceNaming;
