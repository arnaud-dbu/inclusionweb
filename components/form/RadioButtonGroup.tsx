"use client";

type Props = {
	register?: any;
	options: any;
	name: string;
};

export const RadioButtons = ({ register, name, options, ...rest }: Props) => {
	return (
		<div className="relative mt-7 flex justify-between gap-2 px-3" {...rest}>
			<div className="frequency-line">
				<div className="block--1 block"></div>
				<div className="block--2 block"></div>
				<div className="block--3 block"></div>
				<div className="block--4 block"></div>
			</div>
			{options.map((option) => (
				<div key={option} className="relative z-20 flex flex-col items-center gap-2">
					<div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-white dark:bg-gray-100">
						<input
							type="radio"
							name={name}
							value={option}
							{...register(name)}
							className="checkbox focus absolute h-full w-full cursor-pointer appearance-none rounded-full border border-gray-400 checked:bg-primary-800 focus:border-none focus:opacity-100 focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2"
						/>
						<div className="check-icon z-1 hidden h-full w-full rounded-full border-primary-800 bg-primary-800 shadow-lg"></div>
					</div>
					<span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-neutral-900">
						{option}
					</span>
				</div>
			))}
		</div>
	);
};
