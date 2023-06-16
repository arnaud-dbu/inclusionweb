import Link from "next/link";

type Props = {
	href: string;
	label: string;
};

const HyperLink = ({ href, label }: Props) => {
	return (
		<Link
			href={href}
			className="text-sm font-light text-neutral-800 underline transition hover:text-primary-800 md:text-base">
			{label}
		</Link>
	);
};

export default HyperLink;
