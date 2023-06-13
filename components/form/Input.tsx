"use client";

import { InputHTMLAttributes } from "react";

type Props = {
	name: string;
	label?: string;
	error?: any;
	register?: any;
	className?: string;
	icon?: React.ReactNode;
	bg?: string;
	secondary?: boolean;
	style?: "primary" | "secondary" | "outline" | "alert" | "disabled" | "link" | "icon";
	size?: "sm" | "md" | "lg";
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
	register,
	name,
	error,
	label,
	className,
	style,
	size,
	bg,
	icon,
	secondary,
	...rest
}: Props) => {
	let inputVariant = null;
	let inputSize = null;
	let labelVariant = null;

	switch (style) {
		case "primary":
			inputVariant = `rounded-lg 
            placeholder-shown:bg-neutral-100 
            placeholder-shown:shadow-sm 
            focus:outline-none 
            focus:bg-transparent 
            focus:border-1 focus:border-primary-800`;
			break;
		case "secondary":
			inputVariant = "bg-neutral-900 font-semibold text-white";
			break;
			break;
	}

	switch (inputVariant) {
		case "primary":
			labelVariant = "bg-neutral-100 ";
			break;
		default:
			break;
	}

	switch (size) {
		case "sm":
			inputSize = "h-10";
			break;
		default:
			inputSize = "h-12";
			break;
	}

	return (
		<div className={`${className}`}>
			<div className={`w-full relative `}>
				{/* <input
					className={`peer placeholder:text-transparent w-full px-4 py-2 h-12 border-1 ${
						error ? "border-red-900" : "border-neutral-600"
					} rounded-lg bg-transparent focus:outline-none focus:border-primary-800`}
					placeholder={label}
					{...register(name)}
					{...rest}
				/> */}
				<input
					className={`peer placeholder:text-transparent w-full px-4 py-2 ${inputVariant} ${inputSize}  ${
						error && "!border-red-900"
					}`}
					placeholder={label}
					{...register(name)}
					{...rest}
				/>
				<label
					htmlFor={name}
					className={`
                    absolute duration-100 ease-linear text-xs -top-2 px-[5px] left-[.6rem] pointer-events-none bg-white text-neutral-800
                    peer-placeholder-shown:bg-neutral-100
                    peer-placeholder-shown:-translate-y-1/2 
                    peer-placeholder-shown:top-1/2 
                    peer-placeholder-shown:text-base 
                    peer-placeholder-shown:text-neutral-700
                    peer-focus:bg-white
                    peer-focus:text-primary-800
                    peer-focus:-top-2 
                    peer-focus:translate-y-0
                    peer-focus:text-xs
                `}>
					{label}
				</label>

				<div className={`absolute right-3 top-1/2 -translate-y-1/2`}>{icon}</div>
			</div>
			{error && (
				<span className={`alert my-0`} role="alert">
					{error}
				</span>
			)}
		</div>
	);
};
