import DivisionLine from "@/components/DivisionLine";
import { H3 } from "@/components/Typography";
import Form from "@/components/form/Form";

type Props = {
	children: React.ReactNode;
	className?: string;
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
	className,
	register,
	nameIsUpdated,
	passwordIsUpdated,
	form = true,
}: Props) => {
	return (
		<div className={`space-y-7 ${className}`}>
			{blockTitle && (
				<>
					<div className={`flex items-center gap-3`}>
						{blockTitle && <H3 title={blockTitle} />}
						{nameIsUpdated && (
							<span className={`font-semibold text-primary-800`}>{nameIsUpdated}</span>
						)}
						{passwordIsUpdated && (
							<span className={`font-semibold text-primary-800`}>{passwordIsUpdated}</span>
						)}
					</div>
				</>
			)}
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
