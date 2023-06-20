import Link from "next/link";

type Props = {
	href: string;
	label: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const HyperLink = ({ href, label, ...rest }: Props) => {
	return (
		<Link
			{...rest}
			href={href}
			className="whitespace-nowrap text-sm font-light text-neutral-800 underline transition hover:text-primary-800 md:text-base">
			{label}
		</Link>
	);
};

export default HyperLink;
