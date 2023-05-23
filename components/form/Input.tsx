"use client";

import { InputHTMLAttributes, useState } from "react";

type Props = {
    name: string;
    label?: string;
    error?: any;
    register?: any;
    wrapperClass?: string;
    className?: string;
    icon?: string;
    alt?: string;
    title?: string;
    spacing?: string;
    secondary?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
    register,
    name,
    error,
    label,
    wrapperClass,
    className,
    icon,
    title,
    alt,
    spacing,
    secondary,
    ...rest
}: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    };

    return (
        <div className={`w-full ${spacing}`}>
            {/* {title && (
                    <span className="mb-3 font-secondary block font-semibold pl-1 text-neutral-800">
                        {title}
                    </span>
                )} */}
            <div className={`form-input w-full relative ${isFocused && "active"}`} onFocus={handleFocus}>
                <label
                    className={`absolute pointer-events-none transition-all ease-out duration-300 left-3 top-1/2 -translate-y-1/2 opacity-50 text-neutral-900 font-normal`}>
                    {label}
                </label>
                <input
                    className={` h-12 w-full border-0 px-4 rounded-lg ${secondary ? "bg-neutral-300" : "bg-neutral-400"}`}
                    {...register(name)}
                    {...rest}
                />
                {/* {error && <span role="alert">{error}</span>} */}
            </div>
        </div>
    );
}
