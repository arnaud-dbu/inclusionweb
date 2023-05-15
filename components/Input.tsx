'use client'

import Image from "next/image";
import React, { FC, InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    error?: any;
    register?: any;
    wrapperClass?: string;
    className?: string;
    icon?: string,
    alt?: string,
}

const Input: FC<InputProps> = ({
    register,
    name,
    error,
    label,
    wrapperClass,
    className,
    icon,
    alt,
    ...rest
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    }

    return (
        <div className={`form-input w-full relative ${className}  ${isFocused && "active"}`} onFocus={handleFocus}>
            <input
                {...register(name)} {...rest}
            />
            <label className={`absolute pointer-events-none transition-all ease-out duration-300 left-3 top-1/2 -translate-y-1/2 opacity-50 text-neutral-900 font-normal`}>{label}</label>
            {
                icon && alt &&
                <Image
                    src={icon}
                    alt={alt}
                    width={20}
                    height={20}
                    className='absolute right-4 top-1/2 -translate-y-1/2 opacity-30'
                />
            }
            {error && <span role="alert">{error}</span>}
        </div>
    );
};

export default Input;