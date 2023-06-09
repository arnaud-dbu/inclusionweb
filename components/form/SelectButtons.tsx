import { WebContext } from "@/context/WebContext";
import { useContext } from "react";

type Props = {
	type: string;
	setType: any;
	register: any;
	icons: any[];
	name: string;
	options: any;
};

const SelectButtons = ({ register, type, icons, setType, name, options }: Props) => {
	const { setEditInfoVisible } = useContext(WebContext);

	if (type) {
		register(name, { value: type });
	}

	const handleTypeChange = (value: any) => {
		setType(value);
		setEditInfoVisible("Gegevens");
	};

	return (
		<div className="flex gap-2 w-full">
			{options.map((option, i) => (
				<button
					type="button"
					onClick={() => handleTypeChange(option.value)}
					key={option.value}
					className={`cursor-pointer border-[1.5px] border-neutral-500 flex flex-col items-center rounded-lg py-2 px-4 ${
						type === option.value && "bg-primary-700 border-none shadow-lg"
					}`}>
					{icons[i]}
					<span
						className={`text-neutral-900 text-sm ${
							type === option.value && "text-white font-bold"
						}`}>
						{option.label}
					</span>
				</button>
			))}
		</div>
	);
};

export default SelectButtons;
