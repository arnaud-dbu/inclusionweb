import { HeadingSecondary } from "@/components/Typography";

type Props = {
	children: React.ReactNode;
};

const FormBlock = ({ children }: Props) => {
	return <div className={`flex flex-col`}>{children}</div>;
};

export default FormBlock;
