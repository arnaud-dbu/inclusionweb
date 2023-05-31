import { LoupeIcon, CrossIcon } from "@/public/icons"; // Assuming you have a CrossIcon component
import React, { useState } from "react";

type Props = {
	handleSearchFilter: any;
	setQuery: any;
};

export const SearchInput = ({ handleSearchFilter, setQuery }: Props) => {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
		handleSearchFilter(event);
	};

	return (
		<div className={`relative mb-3`}>
			{inputValue ? (
				<button>
					<CrossIcon
						className={`absolute right-3 w-6 top-1/2 -translate-y-1/2 fill-primary-800 opacity-70`}
						onClick={() => {
							setInputValue("");
							setQuery("");
						}}
					/>
				</button>
			) : (
				<button>
					<LoupeIcon
						className={`absolute right-3 w-6 top-1/2 -translate-y-1/2 fill-primary-800 opacity-70`}
					/>
				</button>
			)}
			<input
				className={`bg-transparent w-full min-w-[15rem] border-2 px-4 py-2 rounded-lg border-neutral-500`}
				type="text"
				placeholder="Zoek"
				value={inputValue}
				onChange={handleInputChange}
			/>
		</div>
	);
};
