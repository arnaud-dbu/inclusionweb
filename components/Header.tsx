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
		<header className="relative mt-16 pb-1 pt-4 md:mt-20 xl:mb-[2.5rem] xl:mt-0 xl:h-[12rem] xl:bg-primary-200 xl:pb-4 xl:pt-14 xl:shadow-lg">
			<div className="layout-wrapper relative">
				{pathname !== "/dashboard" && (
					<Link
						href="/dashboard"
						className={`absolute -top-7 z-30 h-7 w-7 transition-opacity hover:opacity-70`}>
						<ArrowLeftIcon className={`h-7 w-7 fill-neutral-800`} />
					</Link>
				)}
				<H1 underline title={title} />
			</div>
		</header>
	);
};

export default Header;
