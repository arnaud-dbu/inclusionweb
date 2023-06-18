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
	validationMessage?: string[];
	passwordIsUpdated?: string;
	name?: string;
	form?: boolean;
};

export const Setting = ({
	children,
	blockTitle,
	divisionLine = false,
	handleSubmit,
	onSubmit,
	name,
	className,
	register,
	validationMessage,
	passwordIsUpdated,
	form = true,
}: Props) => {
	return (
		<div className={`space-y-7 ${className}`}>
			{blockTitle && (
				<>
					<div className={`flex items-center gap-4`}>
						{blockTitle && <H3 title={blockTitle} />}

						{validationMessage && validationMessage[0] === name && (
							<ValidationMessage message={validationMessage[1]} />
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

const ValidationMessage = ({ message }) => {
	return (
		<div className={`flex items-center gap-[5px]`}>
			<svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
				<circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />{" "}
				<path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />{" "}
			</svg>
			<span className={`font-base text-primary-700`}>{message}</span>
		</div>
	);
};
