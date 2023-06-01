import { useEffect, useState } from "react";

type Props = {
	register?: any;
	options: any;
	name: string;
};

export const CheckButtonGroup = ({ register, name, options, ...rest }: Props) => {
	const [selected, setSelected] = useState([]);

	const handleSelection = (e) => {
		const selectedLabel = e.target.innerText;
		if (selected.includes(selectedLabel)) {
			setSelected(selected.filter((item) => item !== selectedLabel));
		} else {
			setSelected([...selected, selectedLabel]);
		}
	};

	useEffect(() => {
		register(name, { value: ["practical", "emotional"] });
	}, [selected, register, name]);

	return (
		<div className="flex gap-2 cursor-pointer" {...rest}>
			{options.map((option) => (
				<button
					type="button"
					onClick={handleSelection}
					key={option.value}
					className={`border-1 border-neutral-500 h-fit whitespace-nowrap text-neutral-800 rounded-full px-3 py-1 ${
						selected.includes(option.label) &&
						"bg-primary-300 border-primary-800 text-primary-900 shadow-lg"
					}`}>
					{option.label}
				</button>
			))}
		</div>
	);
};
