import DivisionLine from "@/components/DivisionLine";
import { H2 } from "@/components/Headings";
import Form from "@/components/form/Form";
import { useForm } from "react-hook-form";

type Props = {
	children: React.ReactNode;
	blockTitle: string;
	divisionLine?: boolean;
	handleSubmit?: any;
	onSubmit?: any;
	register: any;
};

export const Setting = ({
	children,
	blockTitle,
	divisionLine,
	handleSubmit,
	onSubmit,
	register,
}: Props) => {
	return (
		<div className={`mb-5`}>
			<H2 className={`mb-6`}>{blockTitle}</H2>
			<Form register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}>
				{children}
			</Form>
			{divisionLine && <DivisionLine />}
		</div>
	);
};
