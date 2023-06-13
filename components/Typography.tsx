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
				className={`relative mb-6 font-primary text-7xl font-bold uppercase leading-[1.1] text-neutral-900 ${className} ${
					underline && "title-underline-lg"
				}`}>
				{children}
			</h1>
		</>
	);
};

export const H2 = ({ children, className }: Props) => {
	return (
		<h2
			className={`whitespace-nowrap font-primary text-3xl font-bold uppercase text-neutral-900 ${className}`}>
			{children}
		</h2>
	);
};

export const P = ({ children, className, text }: Props) => {
	return <p className={`font-secondary text-lg text-neutral-900 ${className}`}>{text}</p>;
};

export const HeadingPrimary = ({ underline, className, title, subtitle }: Props) => {
	return (
		<>
			{subtitle && (
				<span className={`whitespace-nowrap font-secondary text-3xl font-light text-neutral-900`}>
					{subtitle}
				</span>
			)}
			<h1
				className={`relative mb-6 font-primary text-7xl font-bold uppercase leading-[1.1] text-neutral-900 ${className} ${
					underline && "title-underline-lg"
				}`}>
				{title}
			</h1>
		</>
	);
};

export const HeadingSecondary = ({ className, title, underline }: Props) => {
	return (
		<h2
			className={`whitespace-nowrap font-primary text-3xl font-bold uppercase text-neutral-900 ${
				underline && "title-underline-sm"
			} ${className}`}>
			{title}
		</h2>
	);
};
