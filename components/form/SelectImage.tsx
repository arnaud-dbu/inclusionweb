import Image from "next/image";
import React from "react";

type Props = {
	image: any;
	className?: string;
	bg?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SelectImage = ({ image, className, bg, ...rest }: Props) => {
	return (
		<button
			className={` ${bg && "rounded-full bg-primary-300  shadow-sm"}`}
			type="button"
			{...rest}>
			<Image
				className={`aspect-square h-10 w-10  object-cover ${className} ${bg && " p-2 "}`}
				alt="test"
				src={image || "/"}
				width={100}
				height={100}
			/>
		</button>
	);
};

export default SelectImage;
