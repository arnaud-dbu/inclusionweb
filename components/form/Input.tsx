"use client";

import { InputHTMLAttributes } from "react";

type Props = {
	name: string;
	label?: string;
	error?: any;
	register?: any;
	buttonLabel?: string;
	className?: string;
	icon?: React.ReactNode;
	bg?: string;
	secondary?: boolean;
	style?: "primary" | "secondary" | "tertiary";
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
	buttonLabel,
	secondary,
	...rest
}: Props) => {
	let inputVariant = null;
	let inputSize = null;
	let labelVariant = null;

	switch (style) {
		case "primary":
			inputVariant = `rounded-lg   text-neutral-900
            placeholder-shown:bg-neutral-100 
            placeholder-shown:shadow-sm 
            focus:outline-none 
            focus:bg-transparent 
            focus:border-1 focus:border-primary-800`;
			break;
		case "secondary":
			inputVariant = `rounded-lg  text-neutral-900
            placeholder-shown:bg-transparent 
            placeholder-shown:border-1 
            placeholder-shown:border-neutral-500 
            placeholder-shown:shadow-none 
            focus:outline-none 
            focus:bg-transparent 
            focus:border-1 focus:border-primary-800`;
			break;
		case "tertiary":
			inputVariant = `rounded-lg bg-primary-300 text-neutral-900
            placeholder-shown:bg-primary-300 
            placeholder-shown:border-1 
            placeholder-shown:border-neutral-500 
            placeholder-shown:shadow-none 
            focus:outline-none 
            focus:bg-transparent 
            focus:border-1 focus:border-primary-800`;
			break;
	}

	switch (inputVariant) {
		case "primary":
			labelVariant = "bg-neutral-100 ";
			break;
		case "secondary":
			labelVariant = "bg-white";
			break;
		case "tertiary":
			labelVariant = "bg-primary-300";
			break;
		default:
			break;
	}

	switch (size) {
		case "sm":
			inputSize = "h-10";
			break;
		default:
			inputSize = "h-10 md:h-12";
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
				{buttonLabel && (
					<button
						className={`p2 absolute right-2 top-1/2 -translate-y-1/2 rounded-md bg-neutral-800 px-4 py-2 text-sm font-semibold text-white`}>
						{buttonLabel}
					</button>
				)}
				<label
					htmlFor={name}
					className={`
                    peer-placeholder-shown: pointer-events-none absolute -top-2 left-[.6rem] ${
											style === "tertiary" ? "bg-primary-300" : "bg-white"
										} px-[5px] text-xs text-neutral-800 duration-100
                    ease-linear
                    peer-placeholder-shown:top-1/2 
                    peer-placeholder-shown:-translate-y-1/2 
                    ${style === "primary" && "peer-placeholder-shown:bg-neutral-100"} 
                    ${style === "secondary" && "peer-placeholder-shown:bg-white"} 
                    ${style === "tertiary" && "peer-placeholder-shown:bg-primary-300"} 
                    peer-placeholder-shown:text-sm peer-placeholder-shown:text-neutral-800
                    peer-focus:-top-2
                    peer-focus:translate-y-0
                    md:peer-placeholder-shown:text-base
                    md:peer-focus:text-xs
                    ${style === "tertiary" ? "peer-focus:bg-primary-300" : "peer-focus:bg-white"}
                    peer-focus:text-xs peer-focus:text-primary-800
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
