import Link from "next/link";

type Props = {
	href: string;
	icon: React.ReactNode;
	active?: boolean;
};

export const NavItem = ({ href, icon, active }: Props) => {
	return (
		<li
			className={`px-4 py-2 border-l-[6px] border-primary-700 ${
				active && "border-l-[6px] border-white"
			}`}>
			<Link className={``} href={href}>
				{icon}
			</Link>
		</li>
	);
};
