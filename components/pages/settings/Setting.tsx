import DivisionLine from "@/components/DivisionLine";
import { H2, HeadingSecondary } from "@/components/Typography";
import Form from "@/components/form/Form";
import { useForm } from "react-hook-form";

type Props = {
	children: React.ReactNode;
	blockTitle?: string;
	divisionLine?: boolean;
	handleSubmit?: any;
	onSubmit?: any;
	register?: any;
	nameIsUpdated?: string;
	passwordIsUpdated?: string;
	form?: boolean;
};

export const Setting = ({
	children,
	blockTitle,
	divisionLine = false,
	handleSubmit,
	onSubmit,
	register,
	nameIsUpdated,
	passwordIsUpdated,
	form = true,
}: Props) => {
	return (
		<div className={`mb-5 space-y-7`}>
			<div className={`flex items-center gap-3`}>
				{blockTitle && <HeadingSecondary title={blockTitle} />}
				{nameIsUpdated && <span className={`text-primary-800 font-semibold`}>{nameIsUpdated}</span>}
				{passwordIsUpdated && (
					<span className={`text-primary-800 font-semibold`}>{passwordIsUpdated}</span>
				)}
			</div>
			{form ? (
				<Form register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}>
					{children}
				</Form>
			) : (
				<div>{children}</div>
			)}
			{divisionLine && <DivisionLine />}
		</div>
	);
};
