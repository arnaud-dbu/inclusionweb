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
			inputVariant = `rounded-lg 
            placeholder-shown:bg-transparent 
            placeholder-shown:border-1 
            placeholder-shown:border-neutral-500 
            placeholder-shown:shadow-none 
            focus:outline-none 
            focus:bg-transparent 
            focus:border-1 focus:border-primary-800`;
			break;
			break;
	}

	switch (inputVariant) {
		case "primary":
			labelVariant = "bg-neutral-100 ";
			break;
		case "secondary":
			labelVariant = "bg-white";
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
			<div className={`relative w-full `}>
				<input
					className={`peer w-full px-4 py-2 placeholder:text-transparent ${inputVariant} ${inputSize}  ${
						error && "!border-red-900"
					}`}
					placeholder={label}
					{...register(name)}
					{...rest}
				/>
				<label
					htmlFor={name}
					className={`
                    peer-placeholder-shown: pointer-events-none absolute -top-2 left-[.6rem] bg-white px-[5px] text-xs text-neutral-800 duration-100
                    ease-linear
                    peer-placeholder-shown:top-1/2 
                    peer-placeholder-shown:-translate-y-1/2 ${
											style === "primary" ? "bg-neutral-100" : "bg-white"
										} 
                    peer-placeholder-shown:text-base 
                    peer-placeholder-shown:text-neutral-800
                    peer-focus:-top-2
                    peer-focus:translate-y-0
                    peer-focus:bg-white 
                    peer-focus:text-xs
                    peer-focus:text-primary-800
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
