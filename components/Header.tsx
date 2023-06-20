"use client";

import Link from "next/link";
import { H1 } from "./Typography";
import { ArrowLeftIcon } from "@/public/icons";
import { usePathname } from "next/navigation";

type Props = {
	title: string;
};

const Header = ({ title }: Props) => {
	// Get pathname
	const pathname = usePathname();

	return (
		<header
			className={`relative ${
				pathname !== "/dashboard" ? "mt-24" : "mt-16 md:mt-20"
			} pb-6 pt-6 lg:mb-[1.5rem] lg:pt-10  xl:mt-0 xl:bg-primary-200 xl:shadow-lg 
            3xl:mb-[2.5rem]`}>
			<div className="layout-wrapper relative">
				{pathname !== "/dashboard" && (
					<Link
						href="/dashboard"
						className={`absolute -top-7 z-20 h-7 w-7 transition-opacity hover:opacity-70`}>
						<ArrowLeftIcon className={`h-7 w-7 fill-neutral-800`} />
					</Link>
				)}
				<H1 underline className="!m-0" title={title} />
			</div>
		</header>
	);
};

export default Header;
