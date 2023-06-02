import Image from "next/image";
import React from "react";

type Props = {
	image: any;
	className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SelectImage = ({ image, className, ...rest }: Props) => {
	return (
		<button type="button" {...rest}>
			<Image
				className={`rounded-full w-10 h-10 object-cover aspect-square ${className}`}
				alt="test"
				src={image || "/"}
				width={100}
				height={100}
			/>
		</button>
	);
};

export default SelectImage;
