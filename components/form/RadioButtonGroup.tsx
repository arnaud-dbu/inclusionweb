"use client";

import { useState } from "react";

type Props = {
	register?: any;
	options: any;
	name: string;
};

export const RadioButtons = ({ register, name, options, ...rest }: Props) => {
	return (
		<div className="mt-7 flex gap-2 justify-between relative px-5" {...rest}>
			<div className="frequency-line">
				<div className="block block--1"></div>
				<div className="block block--2"></div>
				<div className="block block--3"></div>
				<div className="block block--4"></div>
			</div>
			{options.map((option) => (
				<div key={option.label} className="flex flex-col items-center gap-2 relative z-20">
					<div className="bg-white dark:bg-gray-100 rounded-full w-4 h-4 flex flex-shrink-0 justify-center items-center relative">
						<input
							type="radio"
							name={name}
							value={option.value}
							{...register(name)}
							className="checkbox appearance-none focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-neutral-700 focus:outline-none border rounded-full border-gray-400 absolute cursor-pointer w-full h-full checked:border-none"
						/>
						<div className="check-icon hidden bg-primary-800 shadow-lg border-primary-800 rounded-full w-full h-full z-1"></div>
					</div>
					<option className="absolute left-1/2 -translate-x-1/2 -bottom-6 text-neutral-900 text-sm">
						{option.label}
					</option>
				</div>
			))}
		</div>
	);
};
