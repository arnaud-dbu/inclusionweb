type Props = {
	children?: string;
	underline?: boolean;
	className?: string;
	title?: string;
	subtitle?: string;
	text?: string;
};

export const H1 = ({ children, underline, className }: Props) => {
	return (
		<>
			<h1
				className={`text-7xl leading-[1.1] font-primary font-bold uppercase text-neutral-900 mb-6 relative ${className} ${
					underline && "title-underline"
				}`}>
				{children}
			</h1>
		</>
	);
};

export const H2 = ({ children, className }: Props) => {
	return (
		<h2
			className={`text-3xl whitespace-nowrap font-primary font-bold uppercase text-neutral-900 ${className}`}>
			{children}
		</h2>
	);
};

export const P = ({ children, className, text }: Props) => {
	return <p className={`font-secondary text-neutral-900 text-lg ${className}`}>{text}</p>;
};

export const HeadingPrimary = ({ underline, className, title, subtitle }: Props) => {
	return (
		<>
			<span
				className={`text-3xl whitespace-nowrap font-primary font-bold uppercase text-neutral-900`}>
				{subtitle}
			</span>
			<h1
				className={`text-7xl leading-[1.1] font-primary font-bold uppercase text-neutral-900 mb-6 relative ${className} ${
					underline && "title-underline"
				}`}>
				{title}
			</h1>
		</>
	);
};

export const HeadingSecondary = ({ className, title }: Props) => {
	return (
		<h2
			className={`text-3xl whitespace-nowrap font-primary font-bold uppercase text-neutral-900 ${className}`}>
			{title}
		</h2>
	);
};
