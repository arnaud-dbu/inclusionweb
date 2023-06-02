import { H2 } from "@/components/Headings";

type Props = {
	children: React.ReactNode;
	title: string;
};

const FormBlock = ({ children, title }: Props) => {
	return (
		<div className={`mb-16`}>
			<H2 className={`mb-5 opacity-80`}>{title}</H2>
			{children}
		</div>
	);
};

export default FormBlock;
