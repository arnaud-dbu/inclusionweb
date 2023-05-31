"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
	type: "button" | "link";
	label: string;
	icon?: React.ReactNode;
	color?: string;
	href?: string;
	image?: any;
	onClick?: () => void;
};

const MenuButton = ({ type, label, icon, color, href, image, onClick }: Props) => {
	const buttonClass = `relative overflow-hidden shadow-lg w-[47.5%] h-[17.5rem] flex flex-col gap-2 justify-end px-6 py-6 rounded-2xl aspect-square ${color}`;
	const labelClass = `text-start font-primary text-white uppercase text-4xl font-bold`;

	return type === "link" ? (
		<Link href={href} className={buttonClass}>
			{icon}
			{image && (
				<Image
					className={`w-[20rem] h-[20rem] -top-10 object-contain absolute`}
					alt=""
					src={image}
				/>
			)}
			<span className={labelClass}>{label}</span>
		</Link>
	) : (
		<button onClick={onClick} className={buttonClass}>
			{icon}
			<span className={labelClass}>{label}</span>
		</button>
	);
};

export default MenuButton;
