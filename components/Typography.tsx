type Props = {
	children?: string;
	underline?: boolean;
	className?: string;
	title?: string;
	subtitle?: string;
	text?: string;
	blockSpacing?: string;
};

export const H1 = ({ underline, className, title, subtitle, blockSpacing }: Props) => {
	return (
		<div className={`${blockSpacing}`}>
			{subtitle && (
				<span
					className={`whitespace-nowrap font-secondary text-2xl font-light  text-neutral-900 md:text-3xl`}>
					{subtitle}
				</span>
			)}
			<h1
				className={`relative mb-4 font-primary text-4xl font-bold uppercase leading-[1.1] text-neutral-900 md:mb-6 md:text-5xl ${className} ${
					underline && "title-underline-lg"
				}`}>
				{title}
			</h1>
		</div>
	);
};

export const H2 = ({ className, title, underline }: Props) => {
	return (
		<h2
			className={`whitespace-nowrap font-primary text-4xl font-bold uppercase text-neutral-900 lg:text-6xl ${
				underline && "title-underline-sm"
			} ${className}`}>
			{title}
		</h2>
	);
};

export const H3 = ({ className, title, underline }: Props) => {
	return (
		<h2
			className={`whitespace-nowrap font-primary text-3xl font-semibold uppercase text-neutral-900 ${
				underline && "title-underline-sm"
			} ${className}`}>
			{title}
		</h2>
	);
};

export const P = ({ children, className, text }: Props) => {
	return (
		<p className={`font-secondary text-sm text-neutral-900 md:text-base  lg:text-lg ${className}`}>
			{text}
		</p>
	);
};
