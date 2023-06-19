import { WebContext } from "@/context/WebContext";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
	type: string;
	setType: any;
	register: any;
	icons: any[];
	name: string;
	options: any;
};

const SelectButtons = ({ register, type, icons, setType, name, options }: Props) => {
	const { setEditInfoVisible, setSelectedGivenSupport, setSelectedReceivedSupport } =
		useContext(WebContext);
	const { reset, setValue } = useFormContext();

	if (type) {
		register(name, { value: type });
	}

	const handleTypeChange = (value: any) => {
		setType(value);
		setEditInfoVisible("Gegevens");
		setValue("given_support", [""]);
		setValue("received_support", [""]);
		setSelectedGivenSupport([""]);
		setSelectedReceivedSupport([""]);
		reset();
	};

	return (
		<div className="flex w-full gap-1 md:gap-2">
			{options.map((option, i) => (
				<button
					type="button"
					onClick={() => handleTypeChange(option.value)}
					key={option.value}
					className={`flex cursor-pointer items-center gap-1 rounded-full border-1 border-neutral-500 px-4 py-2 ${
						type === option.value && "border-none bg-primary-700 shadow-lg"
					}`}>
					{icons[i]}
					<span
						className={`hidden text-sm text-neutral-900 sm:pointer-events-auto sm:!block sm:opacity-100 ${
							type === option.value && "font-bold text-white"
						} `}>
						{option.label}
					</span>
				</button>
			))}
		</div>
	);
};

export default SelectButtons;
// import { WebContext } from "@/context/WebContext";
// import { useContext } from "react";

// type Props = {
// 	type: string;
// 	setType: any;
// 	register: any;
// 	icons: any[];
// 	name: string;
// 	options: any;
// };

// const SelectButtons = ({ register, type, icons, setType, name, options }: Props) => {
// 	const { setEditInfoVisible } = useContext(WebContext);

// 	if (type) {
// 		register(name, { value: type });
// 	}

// 	const handleTypeChange = (value: any) => {
// 		setType(value);
// 		setEditInfoVisible("Gegevens");
// 	};

// 	return (
// 		<div className="flex w-full gap-2">
// 			{options.map((option, i) => (
// 				<button
// 					type="button"
// 					onClick={() => handleTypeChange(option.value)}
// 					key={option.value}
// 					className={`flex cursor-pointer flex-col items-center rounded-lg border-[1.5px] border-neutral-500 px-4 py-2 ${
// 						type === option.value && "border-none bg-primary-700 shadow-lg"
// 					}`}>
// 					{icons[i]}
// 					<span
// 						className={`text-sm text-neutral-900 ${
// 							type === option.value && "font-bold text-white"
// 						}`}>
// 						{option.label}
// 					</span>
// 				</button>
// 			))}
// 		</div>
// 	);
// };

// export default SelectButtons;
