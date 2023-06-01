"use client";

import { InputHTMLAttributes, useState } from "react";

type Props = {
	name: string;
	label?: string;
	error?: any;
	register?: any;
	className?: string;
	icon?: string;
	secondary?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
	register,
	name,
	error,
	label,
	className,
	icon,
	secondary,
	...rest
}: Props) => {
	return (
		<div className={`w-full ${className}`}>
			<div className="relative">
				<input
					placeholder=""
					className="text-neutral-900 placeholder-gray-500 peer px-4 py-2 w-full m-0 placeholder-transparent border-1 border-neutral-600 rounded-lg bg-transparent focus:outline-none focus:border-primary-800"
					{...register(name)}
					{...rest}
				/>
				<label
					htmlFor="username"
					className="absolute left-3 pointer-events-none -top-2 bg-white px-[.35rem] m-0 text-xs  
                    peer-placeholder-shown:text-gray-400 
                    peer-placeholder-shown:top-1/2
                    peer-placeholder-shown:-translate-y-1/2
                    peer-placeholder-shown: text-primary-800
                    peer-placeholder-shown:text-base 
                    duration-300">
					{label}
				</label>
				{error && <span role="alert">{error}</span>}
			</div>
		</div>
	);
};
